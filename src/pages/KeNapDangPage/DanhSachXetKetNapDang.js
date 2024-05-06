import { useState } from "react";
import Button from "../../compoment/Button";
import httpRequest from "../../utils/HttpRequest";

function DanhSachXetKetNapDang({ data }) {
  const [chonDot, setChonDot] = useState("");
  const updatedSinhVienList = data.map((item) => {
    console.log(item);
    return {
      fullname: item.fullname,
      mssv: item.mssv,
      chonDot: chonDot,
    };
  });
  const handleAddDanhSach = async () => {
    try {
      const response = await httpRequest.post(
        "/api/dangvien/save_xetketnapdang",
        updatedSinhVienList
      );
      console.log(response);
    } catch (error) {}
  };
  return (
    <>
      {" "}
      <Button>
        <select value={chonDot} onChange={(e) => setChonDot(e.target.value)}>
          <option>----Chọn đợt----</option>
          <option>Đợt 1 năm học 2020-2021</option>
          <option>Đợt 2 năm học 2020-2021</option>
          <option>Đợt 1 năm học 2021-2022</option>
          <option>Đợt 2 năm học 2021-2022</option>
        </select>
      </Button>
      <Button green onClick={handleAddDanhSach}>
        Lưu danh sách
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DanhSachXetKetNapDang;
