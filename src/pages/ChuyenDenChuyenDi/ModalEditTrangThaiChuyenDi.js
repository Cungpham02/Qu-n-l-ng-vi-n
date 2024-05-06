import { useDispatch } from "react-redux";
import httpRequest from "../../utils/HttpRequest";
import { getListDvChuyenDi } from "../../Store/DangVienChuyenDiSlice";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "../../compoment/Button";
const cx = classNames.bind(styles);
function ModalEditTrangThaiChuyenDi({
  dangvienById,
  setListDVCDi,
  setEditTrangThai,
}) {
  const [trangthaiValue, setTrangThai] = useState("");
  const dispatch = useDispatch();

  const handleUpdateYeuCau = async (id, username, trangthaiValue) => {
    try {
      const response = await httpRequest.post(
        `/api/dvcdcd/xacnhanYeuCauChuyenDi/${id}/${username}`,
        {
          trangthai: trangthaiValue,
        }
      );
      if (response.data.isSuccess) {
        setEditTrangThai(false);
        const response = await httpRequest.get("/api/dvcdcd/getListChuyenDi");
        setListDVCDi(response.data.data);
      }
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };
  return (
    // <div className="fixed z-10 w-full top-0 h-[100vh] bg_color">
    //   <div
    //     className="modal_form_edit_password mx-auto h-auto w-[50%] bg-[#c4d0d9]
    //       mx_top"
    //   >
    //     <div className="overlay">
    //       <div className="form_edit_password relative">
    //         <div className="heading_form">
    //           <span className="heading_text">Chỉnh sửa yêu cầu</span>
    //           <span
    //             id="icon_close"
    //             className="absolute right-[10px] text-[#fff] text-[20px] cursor-pointer p-2 top-0"
    //             onClick={() => setEditTrangThai(false)}
    //           >
    //             X
    //           </span>
    //         </div>
    //         <div className="container_form">
    //           <div className="form_input">
    //             <label>FullName</label>
    //             <div className="input_icon">
    //               <div className="icon_pass">
    //                 <i className="fa-solid fa-key"></i>
    //               </div>
    //               <div className="input_form">
    //                 <input
    //                   id="password"
    //                   value={dangvienById && `${dangvienById.fullname}`}
    //                   disabled
    //                   name="password"
    //                   type="text"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="form_input">
    //             <label>Trạng thái</label>
    //             <div className="input_icon">
    //               <select
    //                 value={trangthaiValue}
    //                 onChange={(e) => setTrangThai(e.target.value)}
    //               >
    //                 <option value="" defaultChecked>
    //                   --Chọn trạng thái--
    //                 </option>
    //                 <option value="1">Hủy yêu cầu</option>
    //                 <option value="2">Xác nhận yêu cầu</option>
    //               </select>
    //             </div>
    //           </div>

    //           <div className="btn_Update">
    //             <button
    //               className="btn_update_pass"
    //               id="btn_update_pass"
    //               onClick={() =>
    //                 handleUpdateYeuCau(
    //                   `${dangvienById.id}`,
    //                   `${dangvienById.username}`,
    //                   trangthaiValue
    //                 )
    //               }
    //             >
    //               Cập nhật
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className={cx("fixed z-10 w-full top-0 h-[100vh]", "bg_color")}>
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[70%]",
          "mx_top"
        )}
      >
        <div className="overlay">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">
                Cập nhật trạng thái chuyển đi
              </span>
              <span
                onClick={() => setEditTrangThai(false)}
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
                  <label>Họ và tên</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        value={dangvienById && `${dangvienById.fullname}`}
                        className={cx(
                          "password_moi",
                          "opacity-60 cursor-no-drop"
                        )}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        placeholder="Họ và tên...."
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form_input", "text_form")}>
                  <label>Nơi chuyển đến</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        className={cx(
                          "password_moi",
                          "opacity-60 cursor-no-drop"
                        )}
                        id="password_moi"
                        name="password_moi"
                        value={dangvienById && `${dangvienById.noichuyenden}`}
                        type="text"
                        placeholder="Họ và tên...."
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form_input", "text_form")}>
                  <label>Trạng thái</label>
                  <div className="input_icon">
                    <select
                      className={cx("form_control")}
                      value={trangthaiValue}
                      onChange={(e) => setTrangThai(e.target.value)}
                    >
                      <option value="" defaultChecked>
                        --Chọn trạng thái--
                      </option>
                      <option value="1">Hủy yêu cầu</option>
                      <option value="2">Xác nhận yêu cầu</option>
                    </select>
                  </div>
                </div>
                <div className="btn_Update my-5">
                  <Button
                    className={cx("add")}
                    id="btn_update_pass"
                    onClick={() =>
                      handleUpdateYeuCau(
                        `${dangvienById.id}`,
                        `${dangvienById.username}`,
                        trangthaiValue
                      )
                    }
                  >
                    Cập nhật
                  </Button>
                </div>
              </div>

              {/* <div className="p-[2%]  ">
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

                 
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditTrangThaiChuyenDi;
