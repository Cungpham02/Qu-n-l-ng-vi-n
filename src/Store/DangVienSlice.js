import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../utils/HttpRequest";
export const getListDv = createAsyncThunk("dangvien/listDV", async () => {
  try {
    const request = await httpRequest.get("/api/dv/getListDangVien");
    const response = await request.data.data;
    return response;
  } catch (error) {
    console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
    throw error;
  }
});
const DangVienSilce = createSlice({
  name: "DangVien",
  initialState: {
    loading: false,
    user: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListDv.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getListDv.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      });
  },
});
export default DangVienSilce.reducer;
