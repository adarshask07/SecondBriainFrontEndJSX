import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  memories: [],
  loading: false,
};

// Create a slice for memory state management
const memorySlice = createSlice({
  name: 'memories',
  initialState,
  reducers: {
    // Action to start loading
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Action to set memories data
    setMemories(state, action) {
      state.memories = action.payload;
    },
  },
});

// Export actions to be used in components
export const { setLoading, setMemories } = memorySlice.actions;

// Export the reducer to be added to the store
export default memorySlice.reducer;
