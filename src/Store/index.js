import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSilce";
import DangVienReducer from "./DangVienSlice";
import TaiKhoanReducer from "./TaiKhoanSilce";
import DangVienChuyenDiReducer from "./DangVienChuyenDiSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import DanhsachCamTinhDangReducer from "./LopCamTinhSlice";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    persistedReducer,
    auth: authReducer,
    doanvien: DanhsachCamTinhDangReducer,
    dangvien: DangVienReducer,
    taikhoan: TaiKhoanReducer,
    dangvienChuyenDi: DangVienChuyenDiReducer,
  },
});
export const persistor = persistStore(store);
export default store;
