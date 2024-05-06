import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../utils/HttpRequest";
export const getListDvChuyenDi = createAsyncThunk(
  "dangvien/listDVChuyenDi",
  async () => {
    try {
      const request = await httpRequest.get("/api/dvcdcd/getListChuyenDi");
      const response = await request.data.data;
      return response;
    } catch (error) {
      console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
      throw error;
    }
  }
);

///doanvien/danhsachlopcamtinhByDot
const DangVienChuyenDiSlice = createSlice({
  name: "DangVienChuyenDi",
  initialState: {
    loading: false,
    user: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListDvChuyenDi.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getListDvChuyenDi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      });
  },
});
export default DangVienChuyenDiSlice.reducer;
