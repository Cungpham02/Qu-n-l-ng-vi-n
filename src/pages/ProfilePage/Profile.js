import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Profile_Api } from "../../ApiServices/userService";
import useDebounce from "../../hooks/useDebound";
import styles from "./Profile.module.scss";
import Button from "../../../src/compoment/Button/Button";
import classNames from "classnames/bind";
import httpRequest from "../../utils/HttpRequest";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
function Profile() {
  const [profileUser, setProfileUser] = useState({
    fullname: "",
    ngaysinh: "",
    gioitinh: "",
    ngaychinhthuc: "",
    ngayvaodang: "",
    ngayvaodoan: "",
    noisinh: "",
    thuongtru: "",
    tongiao: "",
    khenthuong: "",
    kyluat: "",
    trinhdo: "",
    nghenghiep: "",
    cccd: "",
    dantoc: "",
    quequan: "",
    quatrinhhd: "",
    gmail: "",
    sodienthoai: "",
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const usernamedebounce = useDebounce(username, 500);
  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    setProfileUser((prevProfileUser) => ({
      ...prevProfileUser,
      gmail: emailValue,
    }));
  };
  const handleChangePhonnumber = (e) => {
    const emailValue = e.target.value;
    setProfileUser((prevProfileUser) => ({
      ...prevProfileUser,
      sodienthoai: emailValue,
    }));
  };
  const handleChangeTamTru = (e) => {
    const emailValue = e.target.value;
    setProfileUser((prevProfileUser) => ({
      ...prevProfileUser,
      tamtru: emailValue,
    }));
  };
  useEffect(() => {
    async function getProfileUser() {
      const reponse = await Profile_Api(usernamedebounce);
      console.log(reponse);
      if (reponse.isSuccess) {
        setProfileUser({
          hoten: reponse.data.fullname,
          ngaysinh: reponse.data.ngaysinh,
          gioitinh: reponse.data.gioitinh,
          ngaychinhthuc: reponse.data.ngaychinhthuc,
          ngayvaodang: reponse.data.ngayvaodang,
          ngayvaodoan: reponse.data.ngayvaodoan,
          noisinh: reponse.data.noisinh,
          thuongtru: reponse.data.thuongtru,
          tongiao: reponse.data.tongiao,
          khenthuong: reponse.data.khenthuong,
          kyluat: reponse.data.kyluat,
          trinhdo: reponse.data.trinhdo,
          nghenghiep: reponse.data.nghenghiep,
          cccd: reponse.data.cccd,
          dantoc: reponse.data.dantoc,
          quequan: reponse.data.quequan,
          quatrinhhd: reponse.data.quatrinhhd,
          tamtru: reponse.data.tamtru,
          gmail: reponse.data.gmail,
          sodienthoai: reponse.data.sodienthoai,
        });
      } else {
        alert("Lấy thông tin người dùng thất bại");
      }
    }
    getProfileUser();
  }, [usernamedebounce]);
  const submitUpdateInfor = async () => {
    try {
      const response = await httpRequest.put(
        `/user/update/${usernamedebounce}`,
        {
          gmail: profileUser.gmail,
          sodienthoai: profileUser.sodienthoai,
          tamtru: profileUser.tamtru,
        }
      );
      if (response.data.isSuccess) {
        toast.success(response.data.message);
      }
    } catch (error) {}
  };
  return (
    <div className="content_container">
      <div className={cx("content")}>
        <div className={cx("w-full flex items-center flex-col justify-center")}>
          <h1>Chỉnh sửa thông tin cá nhân</h1>
          <div className={cx("w-full")}>
            <div
              className={cx("content_profile", "flex justify-between my-5 ")}
            >
              <span>Họ và tên : {profileUser.hoten}</span>
              <span>Ngày Sinh : {profileUser.ngaysinh}</span>
            </div>
            <div className={cx("content_profile", "flex justify-between my-5")}>
              <span>CCCD : {profileUser.cccd}</span>
              <span>Ngày vào đảng : {profileUser.ngayvaodang}</span>
            </div>
            {/* <div className={cx("content_profile", "flex justify-between my-5")}>
              <span className="mx-10">CCCD : {profileUser.cccd}</span>
            </div> */}
            <div
            // className={cx(
            //   "content_profile",
            //   "flex justify-between items-center my-5"
            // )}
            >
              <span>Gmail </span>
              <input
                className={cx("input")}
                value={profileUser.gmail}
                onChange={(e) => handleChangeEmail(e)}
              />
            </div>
            <div
            // className={cx(
            //   "content_profile",
            //   "flex justify-between items-center my-5"
            // )}
            >
              <span>Số điện thoại </span>
              <input
                className={cx("input")}
                value={profileUser.sodienthoai}
                onChange={(e) => handleChangePhonnumber(e)}
              />
            </div>
            <div
            // className={cx(
            //   "content_profile",
            //   "flex justify-between items-center my-5"
            // )}
            >
              <span>Tạm trú </span>
              <input
                className={cx("input")}
                value={profileUser.tamtru}
                onChange={(e) => handleChangeTamTru(e)}
              />
            </div>
          </div>
        </div>
        <div>
          <Button green onClick={submitUpdateInfor}>
            Cập nhật thông tin
          </Button>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Profile;
