import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  query: "",
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const exists = state.bookmarks.find(
        (blog) => blog.id === action.payload.id
      );
      if (exists) {
        state.bookmarks = state.bookmarks.filter(
          (blog) => blog.id !== action.payload.id
        );
      } else {
        state.bookmarks.push(action.payload);
      }
    },
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearchQuery: (state) => {
      state.query = "";
    },
  },
});

export const { toggleBookmark, setSearchQuery, clearSearchQuery } =
  bookmarkSlice.actions;
export default bookmarkSlice.reducer;
