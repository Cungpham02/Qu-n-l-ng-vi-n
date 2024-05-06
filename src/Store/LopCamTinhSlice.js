import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../utils/HttpRequest";
export const getListdanhsachLopCamTinh = createAsyncThunk(
  "dangvien/danhsachLopCamTinh",
  async () => {
    try {
      const request = await httpRequest.get("/doanvien/danhsachlopcamtinh");
      const response = await request.data.data;
      return response;
    } catch (error) {
      console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
      throw error;
    }
  }
);
export const getListDvChuyenDiByDot = createAsyncThunk(
  "dangvien/danhsachLopCamTinhByDot",
  async (name) => {
    try {
      const request = await httpRequest.get(
        `/doanvien/danhsachlopcamtinhByDot`,
        {
          params: {
            dot: name,
          },
        }
      );
      const response = await request.data.data;
      return response;
    } catch (error) {
      console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
      throw error;
    }
  }
);
export const ExportToExcelDanhSachLopCamTinh = createAsyncThunk(
  "dangvien/danhsachLopCamTinhByDot/exportToExcel",
  async (name) => {
    try {
      const request = await httpRequest.get(
        `/doanvien/danhsachlopcamtinhByDot/export-to-excel`,

        {
          responseType: "blob",
          params: {
            dot: name,
          },
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
      console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
      throw error;
    }
  }
);
export const getListDanhSachPhatTrienDang = createAsyncThunk(
  "dangvien/danhsachPhattrienDang",
  async (name) => {
    try {
      const request = await httpRequest.get(
        `/api/doanvien/getListDanhSachPhatTrienDang`,
        {
          params: {
            dot: name,
          },
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
      console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
      throw error;
    }
  }
);
export const getListDanhSachXetKetNapDang = createAsyncThunk(
  "dangvien/danhsachXetKetNap",
  async (name) => {
    try {
      const request = await httpRequest.get(
        `/api/doanvien/getListDanhSachKetNapDang`,
        {
          params: {
            dot: name,
          },
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
      console.error("Login failed:", "Rất tiếc là sever ko hoạt động");
      throw error;
    }
  }
);
const LopCamTinhSlice = createSlice({
  name: "LopCamTinhDang",
  initialState: {
    loading: false,
    user: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListdanhsachLopCamTinh.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getListdanhsachLopCamTinh.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getListDvChuyenDiByDot.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getListDvChuyenDiByDot.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(ExportToExcelDanhSachLopCamTinh.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(ExportToExcelDanhSachLopCamTinh.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getListDanhSachPhatTrienDang.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getListDanhSachPhatTrienDang.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getListDanhSachXetKetNapDang.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(getListDanhSachXetKetNapDang.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      });
  },
});
export default LopCamTinhSlice.reducer;
