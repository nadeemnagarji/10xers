import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (user) => {
  const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
    password: user.password,
    email: user.email,
  });
  return res.data.data;
});

export const registerUser = createAsyncThunk("auth/signUp", async (user) => {
  const res = await axios.post("http://localhost:3000/api/v1/auth/register", {
    firstName: user.email,
    password: user.password,
    role: user.role,
  });
  return res.data.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.userData = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
