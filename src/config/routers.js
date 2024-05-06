import DefaultLayout from "../layout/DefaultLayout";
import HeaderOnlyLayout from "../layout/HeaderOnlyLayout/HeaderOnlyLayout";
import Page404 from "../pages/404Page/404.";
import ChuyenDenChuyenDiPage from "../pages/ChuyenDenChuyenDi/ChuyenDenChuyenDiPage";
import AddDangVienPage from "../pages/DangVien/AddDangVienPage/AddDangVienPage";
import DanhSachDangVien from "../pages/DangVien/DanhSachDangVien";
import DangVienChuyenDi from "../pages/DangVienChuyenDi";
import DangVienPage from "../pages/DangVienPage";
import DanhSachPhatTrienDangPage from "../pages/DanhSachPhatTrienDangPage/DanhSachPhatTrienDangPage";
import KetnapDang from "../pages/KeNapDangPage/KetNapDang";
import LoginPage from "../pages/LoginPage";
import LopCamTinhDangPage from "../pages/LopCamTinhDangPage";
import ProfilePage from "../pages/ProfilePage";
import SinhHoatDangPage from "../pages/SinhHoatDangPage";
import TaiKhoanPage from "../pages/TaiKhoanPage";
import Home from "../pages/HomePage/Home";
import DanhSachKetNapDang from "../pages/DanhSachPhatTrienDangPage/TableDanhSachKetNap";
import DanhSachKetNapDangVien from "../pages/KeNapDangPage/DanhSachKetNapDang";
import QuanLyChuyenDi from "../pages/ChuyenDenChuyenDi/QuanLyChuyenDi";
import QuanLyDanhSachDangVien from "../pages/QuanLyDanhSachDangVien";
import QuanLyDanhSachLichHop from "../pages/QuanLyDanhSachLichHop";
import ListThongBao from "../pages/ThongBaoPage/ListThongBao";
import PhieuDanhGia from "../pages/PhieuDanhGiaPage/PhieuDanhGia";
import XemThongTinPhieuDanhGia from "../pages/PhieuDanhGiaPage/XemThongTinPhieuDanhGia";
import TuDanhGiaRenLuyenTheoDotPage from "../pages/TuDanhGiaRenLuyenTheoDotPage";
import ThongKePage from "../pages/ThongKePage";
import DanhGiaDiemRenLuyenPage from "../pages/DanhGiaDiemRenLuyenPage";

export const routers = [
  {
    element: LoginPage,
    compoment: "/login",
    layout: HeaderOnlyLayout,
  },
  {
    element: Home,
    compoment: "/doanvien/lopcamtinhdang",
    layout: DefaultLayout,
  },
  {
    element: Page404,
    compoment: "/404",
    layout: DefaultLayout,
  },
  {
    element: ProfilePage,
    compoment: "/profile",
    layout: DefaultLayout,
  },
  {
    element: DangVienPage,
    compoment: "/listDV",
    layout: DefaultLayout,
  },
  {
    element: AddDangVienPage,
    compoment: "/dangviens/addDangVien",
    layout: DefaultLayout,
  },
  {
    element: DanhSachDangVien,
    compoment: "/dangviens/getListDv",
    layout: DefaultLayout,
  },
  // {
  //   element: UpdateDangVienPage,
  //   compoment: "/dangviens/update/:id",
  //   layout: DefaultLayout,
  // },
  {
    element: ChuyenDenChuyenDiPage,
    compoment: "/bithus/chuyendenchuyendi",
    layout: DefaultLayout,
  },
  {
    element: SinhHoatDangPage,
    compoment: "/bithus/sinhhoatdang",
    layout: DefaultLayout,
  },
  {
    element: TaiKhoanPage,
    compoment: "/dangviens/taikhoan",
    layout: DefaultLayout,
  },
  {
    element: DangVienChuyenDi,
    compoment: "/dangvien/chuyendi",
    layout: DefaultLayout,
  },
  {
    element: LopCamTinhDangPage,
    compoment: "/dangvien/danhsachlopcamTinh",
    layout: DefaultLayout,
  },
  {
    element: DanhSachPhatTrienDangPage,
    compoment: "/doanvien/danhsachphattrienDang",
    layout: DefaultLayout,
  },
  {
    element: KetnapDang,
    compoment: "/doanvien/ketnapDang",
    layout: DefaultLayout,
  },
  {
    element: Home,
    compoment: "/home",
    layout: DefaultLayout,
  },
  {
    element: DanhSachKetNapDangVien,
    compoment: "/doanvien/ds_ketNapDang",
    layout: DefaultLayout,
  },
  {
    element: QuanLyChuyenDi,
    compoment: "/bithus/chuyenden",
    layout: DefaultLayout,
  },
  {
    element: QuanLyDanhSachDangVien,
    compoment: "/dangviens/danhsachDangVien",
    layout: DefaultLayout,
  },
  {
    element: QuanLyDanhSachLichHop,
    compoment: "/dangviens/danhsachLichHop",
    layout: DefaultLayout,
  },
  {
    element: ListThongBao,
    compoment: "/dangviens/listThongbao",
    layout: DefaultLayout,
  },
  {
    element: PhieuDanhGia,
    compoment: "/bithus/danhgiarenluyen",
    layout: DefaultLayout,
  },
  {
    element: XemThongTinPhieuDanhGia,
    compoment: "/bithus/phieuDanhGia",
    layout: DefaultLayout,
  },
  {
    element: TuDanhGiaRenLuyenTheoDotPage,
    compoment: "/dangviens/danhgiaRenLuyen",
    layout: DefaultLayout,
  },
  {
    element: ThongKePage,
    compoment: "/thongke",
    layout: DefaultLayout,
  },
  {
    element: DanhGiaDiemRenLuyenPage,
    compoment: "/bithus/danhgiarenluyendangvien",
    layout: DefaultLayout,
  },
];
