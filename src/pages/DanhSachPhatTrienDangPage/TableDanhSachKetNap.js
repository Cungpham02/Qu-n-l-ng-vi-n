import { useState } from "react";
import Button from "../../compoment/Button";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";

function DanhSachKetNapDang({ data, setDanhsachKetNap }) {
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
  const handleSubmitForm = async () => {
    try {
      const response = await httpRequest.post(
        "/api/dangvien/save_ketnapdang",
        updatedSinhVienList
      );
      console.log(response.data);
      setDanhsachKetNap([]);
      if (response.data.isSuccess) {
        toast.success(response.data.message);
      } else {
        toast.success("Lưu danh sach thất bại");
      }
    } catch (error) {}
  };
  return (
    <>
      <Button outline>
        <select onChange={(e) => setChonDot(e.target.value)} value={chonDot}>
          <option>--Chọn đợt---</option>
          <option>Đợt 1 năm học 2020-2021</option>
          <option>Đợt 2 năm học 2020-2021</option>
          <option>Đợt 1 năm học 2021-2022</option>
          <option>Đợt 2 năm học 2021-2022</option>
        </select>
      </Button>
      <Button green onClick={handleSubmitForm}>
        Lưu
      </Button>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Stt</th>
            <th>Mã số sinh viên</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Quê quán</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.id}</td>
              <td>{item.mssv}</td>
              <td>{item.fullname}</td>
              <td>{item.ngaysinh}</td>
              <td>{item.quequan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DanhSachKetNapDang;
