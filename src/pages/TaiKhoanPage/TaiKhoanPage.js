import { useDispatch } from "react-redux";
import styles from "./TaiKhoanPage.module.scss";
import classNames from "classnames/bind";
import { getListDv } from "../../Store/DangVienSlice";
import { useEffect, useState } from "react";
import ModalTaiKhoan from "../../compoment/ModalTaiKhoan/ModalTaiKhoan";
import { ToastContainer } from "react-toastify";
import { getListTK } from "../../Store/TaiKhoanSilce";
import ListTaiKhoan from "./ListTaiKhoan";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import httpRequest from "../../utils/HttpRequest";
const cx = classNames.bind(styles);
function TaiKhoanPage() {
  const [listDangVien, setListDangVien] = useState([]);
  const [listTaiKhoan, setListTaiKhoan] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [isModal, setModalTaiKhoan] = useState(false);
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };
  const handleSelectedIds = () => {
    const selectedIds = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    setModalTaiKhoan(true);
    // getlistDangVienNotTaiKhoan();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getListDangVien();
  }, []);
  const getListDangVien = () => {
    dispatch(getListDv()).then((result) => {
      if (result.payload) {
        setListDangVien(result.payload);
      }
    });
  };

  return (
    <>
      <div className="w-full p-[2%]  items-center">
        <h1>Danh sách tài khoản đảng viên</h1>
        <div className="w-full my-4 justify-end flex items-center">
          <Button
            primary
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleSelectedIds}
          >
            Thêm mới tài khoản
          </Button>
        </div>
        <div>
          <ListTaiKhoan
            listTaiKhoan={listTaiKhoan}
            setListTaiKhoan={setListTaiKhoan}
          />
        </div>
        {/* <div className={cx("w-full")}>
          <Button
            primary
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleSelectedIds}
          >
            Thêm mới tài khoản
          </Button>
          <div className="">Quản lý tài khoản</div>
          <ListTaiKhoan
            listTaiKhoan={listTaiKhoan}
            setListTaiKhoan={setListTaiKhoan}
          />
        </div> */}
      </div>

      {isModal && (
        <ModalTaiKhoan
          setCheckedItems={setCheckedItems}
          id={checkedItems}
          isModal={isModal}
          setModalTaiKhoan={setModalTaiKhoan}
          setListTaiKhoan={setListTaiKhoan}
        />
      )}
      <ToastContainer autoClose={"2000"} />
    </>
  );
}

export default TaiKhoanPage;
