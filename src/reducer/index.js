import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice'; // Adjust the import path as needed
import memoriesReducer from "../Slices/memorySlice"

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Add your slices here
    content: memoriesReducer
  },
});

// Export store
export default store;
