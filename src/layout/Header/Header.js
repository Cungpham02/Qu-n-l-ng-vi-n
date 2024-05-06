import className from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Store/authSilce";
import SearchHeader from "../compoments/SearchHeader";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faLock,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "../../compoment/Popper/Menu";
import { Notification, UploadIcon } from "../../compoment/Icons";
import Image from "../../compoment/Images";
import { Link, useNavigate } from "react-router-dom";
import MegaMenu from "../HeaderMegaMenu/MegaMenu";
import { useState } from "react";
import ModalThePassword from "../../compoment/ModalThePassword";
import { ToastContainer } from "react-toastify";
const cx = className.bind(styles);
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "English",
    children: {
      title: "Languge",
      data: [
        {
          code: "en",
          title: "English",
        },
        {
          code: "vi",
          title: "VietNamese",
        },
      ],
    },
  },
  // {
  //   icon: <FontAwesomeIcon icon={faCircleQuestion} />,
  //   title: "Feedback and help",
  //   to: "/feedback",
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faKeyboard} />,
  //   title: "Keyboard shortcuts",
  // },
];
const userMenu = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "Xem thông tin cá nhân",
    type: "profile",
  },
  // {
  //   icon: <FontAwesomeIcon icon={faCoins} />,
  //   title: "Get coins",
  //   to: "/coin",
  // },
  // {
  //   icon: <FontAwesomeIcon icon={faGear} />,
  //   title: "Settings",
  //   to: "/settings",
  // },
  {
    icon: <FontAwesomeIcon icon={faLock} />,
    title: "Thay đổi mật khẩu",
    type: "changethepassword",
  },
  ...MENU_ITEMS,
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: "Đăng xuất",
    type: "logout",
    separate: true,
  },
];
function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);

  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "profile":
        navigate(`/profile?username=${localStorage.getItem("username")}`);
        break;
      case "logout":
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate("/login");
        break;
      case "changethepassword":
        setModal(true);
        break;
      default:
        break;
    }
  };
  return (
    <>
      {" "}
      <div>
        <header className={cx("wapper")}>
          <div className={cx("inner")}>
            <Link to="/thongke" className={cx("logo")}>
              <Image
                src="https://quanlydoanvien.doanthanhnien.vn/huy_hieu_doan.37691e508161ab02.png"
                alt="Nguyen Van A"
              />
            </Link>
            <SearchHeader />
            <div className={cx("action")}>
              {user ? (
                <>
                  {" "}
                  <Tippy
                    delay={[0, 200]}
                    content="Upload video"
                    placement="bottom"
                  >
                    <button className={cx("action-btn")}>
                      <UploadIcon />
                    </button>
                  </Tippy>
                  <Tippy
                    delay={[0, 200]}
                    content="Notification"
                    placement="bottom"
                  >
                    <button className={cx("action-btn")}>
                      <Notification />
                    </button>
                  </Tippy>
                </>
              ) : (
                <>
                  <Button text>Upload</Button>
                  <Button primary to="/login">
                    Log in
                  </Button>
                </>
              )}
              <Menu
                items={user ? userMenu : MENU_ITEMS}
                onChange={handleMenuChange}
              >
                {user ? (
                  <Image
                    className={cx("user-avatar")}
                    src="https://img.lovepik.com/free-png/20210924/lovepik-party-emblem-png-image_401366282_wh1200.png"
                    // src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/hinh-anh-avatar-dep-cho-con-gai-dai-dien-30-14-16-51.jpg"
                    alt="Nguyen Van A"
                  />
                ) : (
                  <button className={cx("more-btn")}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                )}
              </Menu>
            </div>
          </div>
        </header>
        <MegaMenu />
      </div>
      {isModal && <ModalThePassword isModal={isModal} setModal={setModal} />}
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default Header;
