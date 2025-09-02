import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [], 
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state) => {
      const newTask = {
        id: Date.now(),
        title: "",
        description: "",
        isCreated: false,
        isEditing: false,
        isNew: true, 
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action) => {
      const { id, field, value } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task[field] = value;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
