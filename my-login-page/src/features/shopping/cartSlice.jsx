import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  selectedItems: [],
  orderSource: null, 
  isBuyNowMode: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.cart.push({ ...action.payload, quantity: 1 });
      } 
      else {
        existingItem.quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
    },
    setBuyNowItem: (state, action) => {
      state.selectedItems = [action.payload];
      state.source = "buyNow";
      state.isBuyNowMode = true;
    },
    setCartItemsForOrder: (state, action) => {
      state.selectedItems = action.payload;
      state.source = "cart";
      state.isBuyNowMode = false;
    },
    clearOrderItems: (state) => {
      state.selectedItems = [];
      state.source = "";
      state.isBuyNowMode = false;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setOrderSource: (state, action) => {
      state.orderSource = action.payload;
    },
    
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setBuyNowItem,
  setCartItemsForOrder,
  clearOrderItems,
  clearCart,
  setOrderSource,
} = cartSlice.actions;
export default cartSlice.reducer;






