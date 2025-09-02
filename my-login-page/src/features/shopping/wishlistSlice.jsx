import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      
      const existingIndex = state.wishlist.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.wishlist.splice(existingIndex, 1);
      } else {
        state.wishlist.push(action.payload); 
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
