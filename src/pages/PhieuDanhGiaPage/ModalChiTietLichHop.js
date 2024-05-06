import Button from "../../compoment/Button";

import classNames from "classnames/bind";
import styles from "./QuanLyDanhSachLichHop.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function ModalChiTietLichHop({ lichhopByID, setModal, isModal }) {
  const [danhsachDangViens, setDanhSachDangViens] = useState("");
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  useEffect(() => {
    getListDangVien(lichhopByID.id);
  }, []);
  const getListDangVien = async (id) => {
    try {
      const response = await httpRequest.get(
        "/api/listDangVienChuaNhanThongBao",
        {
          params: {
            id: id,
          },
        }
      );
      console.log(response);
      setDanhSachDangViens(response.data.data);
    } catch (error) {}
  };
  const handleSelectAllChecked = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    if (newSelectAllChecked) {
      setChecked(danhsachDangViens.map((item) => item.id));
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
  const GuiThongBao = async (checked) => {
    if (checked.length === 0) {
      alert("Bạn cần chọn vào đảng viên cần gửi thông tin");
    } else {
      console.log(checked);
      try {
        const response = await httpRequest.post("/thongbaolichhop", {
          lichHopId: lichhopByID.id,
          danhSachDangVienIds: checked,
        });
        getListDangVien(lichhopByID.id);
        toast.success("Gửi lịch họp thành công");
        console.log(response);
      } catch (error) {}
    }
  };
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
              <span className="heading_text">Chi tiết lịch họp</span>
              <span
                onClick={() => setModal(!isModal)}
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
                  <label>Tiêu đề</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        disabled
                        value={lichhopByID && lichhopByID.tieude}
                        className={cx("password_moi", "disabled")}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        placeholder="Họ và tên...."
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form_input", "text_form")}>
                  <label>Nộp dung</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        disabled
                        value={lichhopByID && lichhopByID.noidung}
                        className={cx("password_moi", "disabled")}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        placeholder="Họ và tên...."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-[2%]  ">
                <div className="flex justify-between">
                  <span>Quản lý danh sách Đảng viên</span>
                  <div className="w-full flex ">
                    <div className="w-full justify-end flex items-center">
                      <Button
                        className={cx("btn_add", "color")}
                        leftIcon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => GuiThongBao(checked)}
                      >
                        Gửi thông báo
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
                              <th className={cx("fixed-header")}>Họ và tên</th>
                              <th className={cx("fixed-header")}>Ngày sinh</th>
                              <th>Giới tính</th>
                              <th>Dân tộc</th>
                              <th>Tôn giáo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {danhsachDangViens.length > 0 &&
                              danhsachDangViens.map((item, index) => {
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
                                        onChange={() => handleChecked(item.id)}
                                        checked={checked.includes(item.id)}
                                      />
                                    </td>
                                    <td>{item.fullname}</td>
                                    <td>{item.ngaysinh}</td>
                                    <td>{item.gioitinh}</td>
                                    <td>{item.dantoc}</td>
                                    <td>{item.tongiao}</td>
                                  </tr>
                                );
                              })}
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

export default ModalChiTietLichHop;
