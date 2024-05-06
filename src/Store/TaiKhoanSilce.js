import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../utils/HttpRequest";
export const getListTK = createAsyncThunk("taikhoans/listTK", async () => {
  try {
    const request = await httpRequest.get("/users/listTaiKhoan");
    const response = await request.data.data;
    // localStorage.setItem("token", request.data.data);
    // localStorage.setItem("username", request.data.username);
    return response;
  } catch (error) {
    console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
    throw error;
  }
});
const TaiKhoanSilce = createSlice({
  name: "TaiKhoan",
  initialState: {
    loading: false,
    taikhoans: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTK.pending, (state) => {
        state.loading = true;
        state.taikhoans = null;
        state.error = null;
      })
      .addCase(getListTK.fulfilled, (state, action) => {
        state.loading = false;
        state.taikhoans = action.payload;
        state.error = null;
      });
  },
});
export default TaiKhoanSilce.reducer;
