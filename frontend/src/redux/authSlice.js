import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.userData = null;
      state.token = null;
    },
    login(state, action) {
      state.userData = action.payload.user;
      state.token = action.payload.accessToken;
    },
  },
});
export const { logout, login } = authSlice.actions;
export default authSlice.reducer;

/*
//   extraReducers: (builder) => {
  //     builder
  //       .addCase(registerUser.pending, (state) => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(registerUser.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.userData = action.payload.user;
  //         state.token = action.payload.accessToken;
  //       })
  //       .addCase(registerUser.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.error.message;
  //       })
  //       .addCase(login.pending, (state) => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(login.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.userData = action.payload.user;
  //         state.token = action.payload.accessToken;
  //       })
  //       .addCase(login.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.error.message;
  //       });
  //   },
*/
