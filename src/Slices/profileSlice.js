import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: (() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        return JSON.parse(storedUser);
      }
      return null;  // or return undefined if preferred
    })(),
    loading: false,
  }

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {

      state.user = value.payload
      console.log("user set")
      console.log(state.user)
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setUser, setLoading } = profileSlice.actions

export default profileSlice.reducer