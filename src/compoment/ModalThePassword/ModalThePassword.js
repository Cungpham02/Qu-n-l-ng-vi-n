import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import httpRequest from "../../utils/HttpRequest";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function ModalThePassWord({ isModal, setModal }) {
  const [changethepassword, setChangePassword] = useState({
    password: "",
    password_moi: "",
    password_moi_check: "",
  });
  const handleChangePass = (e, name) => {
    const value = e.target.value;
    setChangePassword({ ...changethepassword, [name]: value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    changethepasswordModal(setChangePassword);
  };
  const changethepasswordModal = async () => {
    try {
      const response = await httpRequest.post("/user/ChangeThePassword", {
        password: changethepassword.password,
        password_moi: changethepassword.password_moi,
        password_moi_check: changethepassword.password_moi_check,
      });

      if (response.data.isSuccess) {
        toast.success(response.data.message);
        setModal(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };
  return (
    <div className={cx("fixed z-10 w-full top-0 h-[100vh]", "bg_color")}>
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[50%]",
          "mx_top"
        )}
      >
        <div className="overlay">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">Thay đổi mật khẩu</span>
              <span
                id="icon_close"
                className={cx(
                  "absolute right-[10px] text-[#fff] text-[20px] cursor-pointer p-2 top-0"
                )}
                onClick={() => setModal(!isModal)}
              >
                X
              </span>
            </div>
            <div className="container_form">
              <form onSubmit={handleSubmitForm}>
                <div className="form_input">
                  <label>Mật khẩu hiện tại</label>
                  <div className="input_icon">
                    <div className="icon_pass">
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <div className="input_form">
                      <input
                        className={cx("password")}
                        value={changethepassword.password}
                        id="password"
                        name="password"
                        type="text"
                        placeholder="Mật khẩu hiện tại...."
                        onChange={(e) => handleChangePass(e, "password")}
                      />
                    </div>
                  </div>
                </div>
                <div className="form_input">
                  <label>Mật khẩu mới</label>
                  <div className="input_icon">
                    <div className="icon_pass">
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <div className="input_form">
                      <input
                        className={cx("password_moi")}
                        value={changethepassword.password_moi}
                        id="password_moi"
                        name="password_moi"
                        type="password"
                        placeholder="Mật khẩu mới...."
                        onChange={(e) => handleChangePass(e, "password_moi")}
                      />
                    </div>
                    <i className="fa-regular fa-eye"></i>
                    <i className="fa-regular fa-eye-slash eye_block" id=""></i>
                  </div>
                </div>
                <div className="form_input">
                  <label>Xác nhận mật khẩu mới</label>
                  <div className="input_icon">
                    <div className="icon_pass">
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <div className="input_form">
                      <input
                        className={cx("password_moi_check")}
                        value={changethepassword.password_moi_check}
                        type="password"
                        name="password_moi_check"
                        id="password_moi_check"
                        placeholder="Nhập lại mật khẩu...."
                        onChange={(e) =>
                          handleChangePass(e, "password_moi_check")
                        }
                      />
                    </div>
                    <i className="fa-regular fa-eye"></i>
                    <i className="fa-regular fa-eye-slash eye_block"></i>
                  </div>
                </div>
                <div className="btn_Update">
                  <button
                    type="submit"
                    className={cx("btn_update_pass")}
                    id="btn_update_pass"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => setModal(false)}
                    className={cx("btn_close")}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalThePassWord;
