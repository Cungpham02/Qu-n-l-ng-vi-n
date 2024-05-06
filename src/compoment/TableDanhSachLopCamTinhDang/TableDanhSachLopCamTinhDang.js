import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function TableDanhSachLopCamTinhDang({ data, setDanhSachLopCamTinhDang }) {
  const [chonDot, setChonDot] = useState("");
  const updatedSinhVienList = data.map((item) => {
    return {
      ...item,
      fullname: item.fullname,
      quequan: item.quequan,
      mssv: item.mssv,
      ngaysinh: item.ngaysinh,
      trangthai: false,
      diemTrungBinh: item.diemTrungBinh,
      dottrongnam: chonDot,
    };
  });
  const handleClick = async () => {
    try {
      const response = await httpRequest.post(
        "/save_lopcamtinh",
        updatedSinhVienList
      );
      console.log(response.data);
      setDanhSachLopCamTinhDang([]);
      if (response.data.isSuccess) {
        toast.success(response.data.message);
      } else {
        toast.success("Lưu danh sach thất bại");
      }
    } catch (error) {}
  };
  return (
    <>
      <Button
        onClick={handleClick}
        leftIcon={<FontAwesomeIcon icon={faSave} />}
        green
        outline
      >
        Lưu lại
      </Button>
      <select value={chonDot} onChange={(e) => setChonDot(e.target.value)}>
        <option>----Chọn đợt-----</option>
        <option>Đợt 1 năm 2023-2024</option>
        <option>Đợt 2 năm 2023-2024</option>
        <option>Đợt 1 năm 2024-2025</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>
              <input className={cx("checkbox")} type="checkbox" />
            </th>
            <th>STT</th>
            <th>Mssv</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Quê quán</th>
            <th>Điểm trung bình tích lũy</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <td>
                <input className={cx("checkbox")} type="checkbox" />
              </td>
              <td>{index + 1}</td>
              <td>{item.mssv}</td>
              <td>{item.fullname}</td>
              <td>{item.ngaysinh}</td>
              <td>{item.quequan}</td>
              <td>{item.diemTrungBinh}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableDanhSachLopCamTinhDang;
