import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice'; // Adjust the import path as needed
import brainReducer from '../Slices/brainSlice'; // Adjust the import path as needed
import profileReducer from '../Slices/profileSlice'


// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Add your slices here
    brain: brainReducer,
    profile : profileReducer
  },
});


// Export store
export default store;
