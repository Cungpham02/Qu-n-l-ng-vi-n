import { useEffect, useState } from "react";
import styles from "./ModalTaiKhoan.module.scss";
import classNames from "classnames/bind";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getListTK } from "../../Store/TaiKhoanSilce";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlug } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function ModalTaiKhoan({ isModal, setModalTaiKhoan, setListTaiKhoan }) {
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erorUsername, setErorFullname] = useState("");
  const [erorPassword, setPasswordErr] = useState("");
  const dispatch = useDispatch();
  const [listDanhSachDangVienNotTaiKhoan, setListDanhSachNotTaiKhoan] =
    useState([]);
  useEffect(() => {
    getlistDangVienNotTaiKhoan();
  }, []);
  let getId;
  const getlistDangVienNotTaiKhoan = async () => {
    try {
      const response = await httpRequest.get(
        "/api/dv/listDanhSachDangVienNoTaiKhoan"
      );
      setListDanhSachNotTaiKhoan(response.data);
    } catch (error) {}
  };
  const handleSelectAllChecked = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    if (newSelectAllChecked) {
      setChecked(listDanhSachDangVienNotTaiKhoan.map((item) => item.id));
    } else {
      setChecked([]);
    }
  };
  const handleChecked = (item) => {
    setChecked((prev) => {
      const ischecked = checked.includes(item);
      if (ischecked) {
        return checked.filter((id) => id !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const getDangVienById = async (checked) => {
    try {
      const response = await httpRequest.get("/api/dv/dangviens", {
        params: {
          id: checked,
        },
      });
      setUsername(response.data.mdd);
    } catch (error) {
      // Handle error
    }
  };

  const TaoTaiKhoan = async (checked) => {
    if (checked.length === 0) {
      toast.error("Bạn cần chọn vào đảng viên cần gửi thông tin");
      return;
    } else if (checked.length > 1) {
      toast.error("Chỉ được chọn 1 đảng viên để tạo tài khoản");
      return;
    } else if (checked.length === 1) {
      console.log(checked[0]);
      if (username === "") {
        setErorFullname("Username không được để trống");
        return;
      } else {
        const data = { username: username, password: "1" };
        try {
          const response = await httpRequest.post(
            `/user/create/${checked[0]}`,
            data
          );
          if (response.data.isSuccess) {
            toast.success(response.data.message);
            setListDanhSachNotTaiKhoan(getlistDangVienNotTaiKhoan());
            setChecked([]);
            setModalTaiKhoan(false);
            dispatch(getListTK()).then((result) => {
              if (result.payload) {
                setListTaiKhoan(result.payload);
              }
            });
          } else {
            toast.success(response.data.message);
          }
        } catch (error) {}
      }
    }
  };
  if (checked.length > 0) {
    const getId = parseInt(checked[0]);
    getDangVienById(getId);
  }

  return (
    <div className={cx("fixed z-10 w-full top-0 h-[100vh]", "bg_color")}>
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[80%] ",
          "mx_top"
        )}
      >
        <div className="overlay">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">Thêm mới tài khoản</span>
              <span
                onClick={() => setModalTaiKhoan(!isModal)}
                id="icon_close"
                className={cx(
                  "absolute right-[10px] font-bold text-[#11d811] text-[20px] cursor-pointer p-2 top-0"
                )}
              >
                <FontAwesomeIcon icon={faClose} />
              </span>
            </div>
            <div className="container_form">
              <div className=" items-center gap-2">
                <div className={cx("form_input", "text_form")}>
                  <label>Username:</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={cx("password_moi", "disabled")}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        placeholder="Nhập username...."
                      />
                    </div>
                  </div>
                </div>
                {/* <div className={cx("form_input", "text_form")}>
                  <label>Mật khẩu</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={cx("password_moi", "disabled")}
                        id="password_moi"
                        name="password_moi"
                        type="password"
                        placeholder="Nhập mật khẩu...."
                      />
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="p-[2%]  ">
                <div className="flex justify-between">
                  <span>Đảng viên chưa có tài khoản</span>
                  <div className="w-full flex ">
                    <div className="w-full justify-end flex items-center">
                      <Button
                        className={cx("btn_add", "color")}
                        leftIcon={<FontAwesomeIcon icon={faPlug} />}
                        onClick={() => TaoTaiKhoan(checked)}
                      >
                        Tạo tài khoản
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="my-2">
                  <div className={cx("tableList")} id="style1">
                    <div>
                      <div className="table-container">
                        <table>
                          <thead>
                            <tr>
                              <th>
                                <input
                                  type="checkbox"
                                  checked={selectAllChecked}
                                  onChange={handleSelectAllChecked}
                                />
                              </th>
                              <th className={cx("fixed-header")}>
                                Mã định danh
                              </th>
                              <th className={cx("fixed-header")}>Họ và tên</th>
                              <th>Ngày sinh</th>
                              <th>Giới tính</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listDanhSachDangVienNotTaiKhoan.length > 0 &&
                              listDanhSachDangVienNotTaiKhoan.map(
                                (item, index) => {
                                  return (
                                    <tr
                                      className={
                                        item.is_check_thongbao === false
                                          ? "opacity-65 bg-[#d9caca87]"
                                          : ""
                                      }
                                      style={{
                                        pointerEvents:
                                          item.is_check_thongbao === false
                                            ? "none"
                                            : "auto",
                                        cursor:
                                          item.is_check_thongbao === false
                                            ? "default"
                                            : "pointer",
                                      }}
                                    >
                                      <td>
                                        <input
                                          type="checkbox"
                                          onChange={() =>
                                            handleChecked(item.id)
                                          }
                                          checked={checked.includes(item.id)}
                                        />
                                      </td>
                                      <td>{item.mdd}</td>
                                      <td>{item.fullname}</td>
                                      <td>{item.ngaysinh}</td>
                                      <td>{item.gioitinh}</td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* {danhsachDangViens.length === 0 && (
                    <div className={cx("emty_tr", "w-full px-2 py-4 mx-2")}>
                      Danh sách đảng viên trống
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalTaiKhoan;
