import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [], // List of placed orders
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // Add new order to the list
      state.orders.push(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
