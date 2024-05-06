import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Button from "../../compoment/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import httpRequest from "../../utils/HttpRequest";
// import { post } from "../../utils/HttpRequest";
import { useDispatch, useSelector } from "react-redux";
import { LoginAuth } from "../../Store/authSilce";
import Label from "../../compoment/Label";
import Input from "../../compoment/Input";
import Image from "../../compoment/Images";
import httpRequest from "../../utils/HttpRequest";
const cx = classNames.bind(styles);
function LoginPage() {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e, payload) => {
    let actualValue = e.target.value;
    setLoginDetail({
      ...loginDetail,
      [payload]: actualValue,
    });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    dispatch(LoginAuth(loginDetail)).then((result) => {
      if (result.payload.username) {
        setLoginDetail({
          username: "",
          password: "",
        });
        toast.success(result.payload.message);
        navigate("/thongke");
      } else {
        toast.error(result.payload.message);
      }
    });
  };
  return (
    <>
      <div className="h-[100vh] w-full flex">
        <div className="flex items-center flex-col justify-center w-1/3 ">
          <div className={cx("logo")}>
            <Image
              src="https://quanlydoanvien.doanthanhnien.vn/assets/images/yum-logo-2.png"
              alt="logo"
            />
          </div>
          <h1
            className={cx(
              "text-[25px]",
              "text-[#1890ff]",
              "text_login",
              "relative"
            )}
          >
            Trang đăng nhập
          </h1>
          <div className={cx("form_login")}>
            <form onSubmit={handleSubmitForm}>
              <div className={cx("filed")}>
                <Label htmlFor="username" className={cx("label")}>
                  Username
                </Label>
                <Input
                  placeholder="Enter your Username..."
                  type="text"
                  value={loginDetail.username}
                  id="username"
                  onChange={(e) => handleChange(e, "username")}
                />
              </div>
              <div className={cx("filed")}>
                <Label htmlFor="password" className={cx("label")}>
                  Password
                </Label>
                <Input
                  placeholder="Enter your Password..."
                  id="password"
                  type="password"
                  value={loginDetail.password}
                  onChange={(e) => handleChange(e, "password")}
                />
              </div>
              <Button className={cx("btn_Submit")} primary type="submit">
                {loading ? "Loading...." : "Login"}
              </Button>
              {error && <div>"Lỗi kìa"</div>}
            </form>
          </div>
        </div>
        <div className={cx("w-2/3 bg-[#fff]", "img_login")}>
          <img
            alt="Ảnh đẹp"
            src="https://www.xaydungdang.org.vn/Uploads/Images/2022/10/29/22/%C4%91%E1%BA%A3ng-%C4%91h-13.jpg"
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
