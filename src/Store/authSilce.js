import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../utils/HttpRequest";
export const LoginAuth = createAsyncThunk("user/loginUser", async (p) => {
  try {
    const request = await httpRequest.post("/login/store", p);
    const response = await request.data;
    console.log(response);
    localStorage.setItem("token", request.data.data);
    localStorage.setItem("username", request.data.username);
    return response;
  } catch (error) {
    alert("Sever không hoạt động");
    throw error;
  }
});
export const logoutUser = () => {
  return {
    type: "auth/logoutUser",
  };
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAuth.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(LoginAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      });
  },
});
export default authSlice.reducer;
