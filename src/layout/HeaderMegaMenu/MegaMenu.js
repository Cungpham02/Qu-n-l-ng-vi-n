import { Link, useNavigate } from "react-router-dom";
import "./MegaMenu.scss";
import { useEffect, useState } from "react";
import { getRoleApi } from "../../ApiServices/homeService";
import { ThongTinIcon } from "../../compoment/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
function MegaMenu() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoleApi();
        setRoles(response);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate("/404"); // Redirect to a 403 page
        } else {
          navigate("/404"); // Redirect to a 404 page for other errors
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mega_menu xl:w-full">
      <ul className="min-md:fixed min-md:w-[300px]  min-md:z-10 max-mdh-[100vh]  bg-[#fff] min-md:top-0 right-0">
        {roles.map((item) => {
          if (item === "ROLE_DV") {
            return (
              <>
                <li className="has-submenu ">
                  <a href="#" className="menu_title">
                    <i className="fa-solid fa-network-wired"></i>Chuyển đi
                    <i className="fa-solid fa-caret-down"></i>
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <h3
                        onClick={() => navigate("/dangvien/chuyendi")}
                        className="title_submenu"
                      >
                        Yêu cầu chuyển đi
                      </h3>
                    </div>
                  </div>
                </li>

                <li className="has-submenu ">
                  <a href="#" className="menu_title">
                    Lịch họp
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <Link
                        to="/dangviens/listThongbao"
                        className="title_submenu"
                      >
                        Xem danh sách lịch họp
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="has-submenu ">
                  <a href="#" className="menu_title">
                    Học tập
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <Link
                        to="/dangviens/danhgiaRenLuyen"
                        className="title_submenu"
                      >
                        Tự đánh giá rèn luyện
                      </Link>
                    </div>
                  </div>
                </li>
              </>
            );
          } else if (item === "ROLE_BT") {
            return (
              <>
                <li className="has-submenu ">
                  <a href="#" className="menu_title">
                    Quản trị
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <Link to="/dangviens/getListDv" className="title_submenu">
                        Quản lý hồ sơ đảng viên
                      </Link>
                      <Link
                        to="/dangviens/danhsachDangVien"
                        className="title_submenu"
                      >
                        Quản lý danh sách đảng viên
                      </Link>
                      <Link to="/dangviens/taikhoan" className="title_submenu">
                        Quản lý tài khoản
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="has-submenu ">
                  <a href="#" className="menu_title">
                    Quản lý lịch họp
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <Link
                        to="/dangviens/danhsachLichHop"
                        className="title_submenu"
                      >
                        Danh sách lịch họp
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="has-submenu ">
                  <a href="#" className="menu_title">
                    Quản lý sinh hoạt đảng
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <Link
                        // onClick={() => navigate("/bithus/chuyendenchuyendi")}
                        to="/bithus/chuyendenchuyendi"
                        className="title_submenu"
                      >
                        Quản lý chuyển đi
                      </Link>
                      <Link to="/bithus/chuyenden" className="title_submenu">
                        Quản lý chuyển đến
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="has-submenu ">
                  <a href="#" className="menu_title">
                    Đánh giá rèn luyện
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <Link
                        // onClick={() => navigate("/bithus/chuyendenchuyendi")}
                        to="/bithus/danhgiarenluyen"
                        className="title_submenu"
                      >
                        Phiếu đánh giá rèn luyện
                      </Link>
                      <Link
                        // onClick={() => navigate("/bithus/chuyendenchuyendi")}
                        to="/bithus/danhgiarenluyendangvien"
                        className="title_submenu"
                      >
                        Xếp loại rèn luyện
                      </Link>
                    </div>
                  </div>
                </li>
                {/* <li className="has-submenu">
                  <a href="#" className="menu_title">
                    Danh sách Lớp cảm tình đảng
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <Link
                        to="/dangvien/danhsachlopcamTinh"
                        className="title_submenu"
                      >
                        Xem danh sách
                      </Link>
                    </div>
                  </div>
                </li> */}
                <li className="has-submenu ">
                  <a href="#" className="menu_title">
                    Quy trình phát triển đảng
                  </a>
                  <div className="submenu_container">
                    <div className="submenu">
                      <Link
                        to="/doanvien/lopcamtinhdang"
                        className="title_submenu"
                      >
                        Danh sách đoàn viên ưu tú
                      </Link>
                      <Link
                        to="/dangvien/danhsachlopcamTinh"
                        className="title_submenu"
                      >
                        Danh sách lớp cảm tình đảng
                      </Link>
                      <Link
                        to="/doanvien/danhsachphattrienDang"
                        className="title_submenu"
                      >
                        Danh sách phát triển Đảng
                      </Link>
                      <Link to="/doanvien/ketnapDang" className="title_submenu">
                        Danh sách xét kết nạp đảng
                      </Link>
                      <Link
                        to="/doanvien/ds_ketNapDang"
                        className="title_submenu"
                      >
                        Danh sách kết nạp đảng
                      </Link>
                    </div>
                  </div>
                </li>
              </>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default MegaMenu;
