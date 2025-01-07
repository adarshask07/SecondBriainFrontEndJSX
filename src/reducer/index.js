import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice'; // Adjust the import path as needed
import brainReducer from '../Slices/brainSlice'; // Adjust the import path as needed


// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Add your slices here
    brain: brainReducer
  },
});


// Export store
export default store;
