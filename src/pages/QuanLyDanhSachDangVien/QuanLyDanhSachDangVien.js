import classNames from "classnames/bind";
import styles from "./QuanLyDanhSachDangVien.module.scss";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { ToastContainer, toast } from "react-toastify";
import ModalXacNhan from "./ModalXacNhan";
const cx = classNames.bind(styles);
function QuanLyDanhSachDangVien() {
  const [danhsachDangViens, setDanhSachDangViens] = useState("");
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [isModalXacNhan, setModalXacNhan] = useState(false);
  useEffect(() => {
    const getListDanhSach = async () => {
      try {
        const response = await httpRequest.get("/api/ds/getList");
        if (response.data.isSuccess) {
          setDanhSachDangViens(response.data.data);
        } else {
          toast.error("Lỗi sever");
        }
      } catch (error) {}
    };
    getListDanhSach();
  }, [setDanhSachDangViens]);

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

  const handleDelete = async (checked) => {
    if (checked.length === 0) {
      alert("Bạn cần chọn vào đảng viên cần xóa khỏi danh sách");
    } else {
      setModalXacNhan(true);
      // console.log(checked);
      // try {
      //   const response = await httpRequest.post(
      //     "/api/ds/deleteByListId",
      //     checked
      //   );
      //   getListDanhSach();
      //   console.log(response);
      //   toast.success(response.data.message);
      // } catch (error) {}
    }
  };
  return (
    <>
      <div className="p-[4%]">
        <span>Quản lý danh sách Đảng viên</span>
        <div className="w-full flex ">
          <div className="w-full justify-end flex items-center">
            <Button
              className={cx("btn_delete", "color")}
              leftIcon={<FontAwesomeIcon icon={faTrash} />}
              onClick={() => handleDelete(checked)}
            >
              Xóa đảng viên
            </Button>
          </div>
        </div>
        <div className="my-2">
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
                <th>STT</th>
                <th>Mã định danh</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Số diện thoại</th>
                <th>Lớp quản lý</th>
                <th>Khoa quản lý</th>
              </tr>
            </thead>
            <tbody>
              {danhsachDangViens.length > 0 &&
                danhsachDangViens.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleChecked(item.id)}
                          checked={checked.includes(item.id)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{item.dangVien.mdd}</td>
                      <td>{item.fullname}</td>
                      <td>{item.ngaysinh}</td>
                      <td>{item.sodienthoai}</td>
                      <td>{item.lopquanly}</td>
                      <td>{item.khoaquanly}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {danhsachDangViens.length === 0 && (
            <div className={cx("emty_tr", "w-full px-2 py-4 mx-2")}>
              Danh sách đảng viên trống
            </div>
          )}
        </div>

        <ToastContainer autoClose={2000} />
      </div>
      {isModalXacNhan && (
        <ModalXacNhan
          setChecked={setChecked}
          checked={checked}
          setDanhSachDangViens={setDanhSachDangViens}
          isModalXacNhan={isModalXacNhan}
          setModalXacNhan={setModalXacNhan}
        />
      )}
    </>
  );
}

export default QuanLyDanhSachDangVien;
