import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  signupData: null, // Replace with a more specific structure if possible
  loading: false,
  token: localStorage.getItem("token") || null,
  error : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  }, 
});

export const { setSignupData, setLoading, setToken, setError } = authSlice.actions;

export default authSlice.reducer;
