import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../utils/HttpRequest";
import { toast } from "react-toastify";
export const getListDanhSachDangVienChuaDanhGiaTheoDot = createAsyncThunk(
  "dangvien/danhsachphieudanhgiaByDot",
  async (chonDot) => {
    try {
      const request = await httpRequest.get(
        "/api/phieudanhgia/countDangVienByDot",
        { params: { chonDot } }
      );
      console.log(request);
      const response = await request.data.data;
      return response;
    } catch (error) {
      toast.error("Xin lỗi gọi API thất bại");
    }
  }
);
const ThongKeSlice = createSlice({
  name: "ThongKeTheoDotPhieuDanhGia",
  initialState: {
    loading: false,
    danhsachPhieuDanhGiaTheoDot: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListDanhSachDangVienChuaDanhGiaTheoDot.pending, (state) => {
        state.loading = true;
        state.danhsachPhieuDanhGiaTheoDot = null;
        state.error = null;
      })
      .addCase(
        getListDanhSachDangVienChuaDanhGiaTheoDot.fulfilled,
        (state, action) => {
          state.loading = false;
          state.danhsachPhieuDanhGiaTheoDot = action.payload;
          state.error = null;
        }
      );
  },
});
export default ThongKeSlice.reducer;
