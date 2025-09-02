import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LoginReducer from "../features/login/LoginSlice";
import TodoReducer from "../features/todos/TodoSlice";
import wishlistReducer from "../features/shopping/wishlistSlice"; 
import cartReducer from "../features/shopping/cartSlice"; 
import orderReducer from "../features/shopping/orderSlice";
import searchReducer from "../features/shopping/searchSlice";
import  bookmarkReducer  from "../features/blogging/BookmarkSlice";

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "todo", "wishlist", "cart","orders","search","bookmark"], 
};

// Combine Reducers
const rootReducer = combineReducers({
  login: LoginReducer,
  todo: TodoReducer,
  wishlist: wishlistReducer, 
  cart: cartReducer, 
  search:searchReducer,
  orders:orderReducer,
  bookmark:bookmarkReducer,
});

// Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Persistor for Redux Persist
const persistor = persistStore(store);

// Log Redux State Changes
store.subscribe(() => {
  console.log("Updated Redux State:", store.getState());
});

export { store, persistor };
