import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signup: (state, action) => {
      const userExists = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (!userExists) {
        state.users.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.users));
      }

      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    login2: (state, action) => {
      const foundUser = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (foundUser) {
        state.currentUser = foundUser;
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
      } else {
        state.currentUser = null;
        localStorage.removeItem("currentUser");
      }
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },

    updateUser: (state, action) => {
      const updatedData = {
        ...state.currentUser,
        ...action.payload,
        profileImage:
          action.payload.profileImage || state.currentUser?.profileImage,
      };

      state.currentUser = updatedData;
      localStorage.setItem("currentUser", JSON.stringify(updatedData));

      const userIndex = state.users.findIndex(
        (user) => user.email === state.currentUser.email
      );
      if (userIndex !== -1) {
        state.users[userIndex] = updatedData;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    deleteUser: (state) => {
      state.users = state.users.filter(
        (user) => user.email !== state.currentUser?.email
      );
      state.currentUser = null;
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.removeItem("currentUser");
    },

    uploadProfileImage: (state, action) => {
      if (state.currentUser) {
        state.currentUser.profileImage = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));

        const userIndex = state.users.findIndex(
          (user) => user.email === state.currentUser.email
        );
        if (userIndex !== -1) {
          state.users[userIndex].profileImage = action.payload;
          localStorage.setItem("users", JSON.stringify(state.users));
        }
      }
    },

    deleteProfileImage: (state) => {
      if (state.currentUser) {
        state.currentUser.profileImage = null;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));

        const userIndex = state.users.findIndex(
          (user) => user.email === state.currentUser.email
        );
        if (userIndex !== -1) {
          state.users[userIndex].profileImage = null;
          localStorage.setItem("users", JSON.stringify(state.users));
        }
      }
    },
  },
});

export const {
  signup,
  login2,
  logout,
  updateUser,
  deleteUser,
  uploadProfileImage,
  deleteProfileImage,
} = LoginSlice.actions;

export default LoginSlice.reducer;
