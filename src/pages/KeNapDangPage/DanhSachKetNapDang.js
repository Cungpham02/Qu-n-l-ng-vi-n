import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import Button from "../../compoment/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getListDanhSachXetKetNapDang } from "../../Store/LopCamTinhSlice";
import { useDispatch } from "react-redux";

function DanhSachKetNapDangVien() {
  const [danhsachPhatTrienDang, setDanhSach] = useState([]);
  const [chonDot, setChonDot] = useState("");
  const dispath = useDispatch();
  useEffect(() => {
    getListDanhSachTheoDot();
  }, [chonDot]);
  const getListDanhSachTheoDot = async () => {
    dispath(getListDanhSachXetKetNapDang(chonDot)).then((result) => {
      console.log(result);
      if (result.payload) {
        setDanhSach(result.payload.data);
      }
    });
  };

  return (
    <>
      <div className="p-[4%]">
        <Button leftIcon={<FontAwesomeIcon icon={faFileExcel} />} green outline>
          Xuất file Excel
        </Button>

        <select value={chonDot} onChange={(e) => setChonDot(e.target.value)}>
          <option>--Chọn đợt---</option>
          <option>Đợt 1 năm học 2020-2021</option>
          <option>Đợt 2 năm học 2020-2021</option>
          <option>Đợt 1 năm học 2021-2022</option>
          <option>Đợt 2 năm học 2021-2022</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  //   checked={selectAllChecked}
                  //   onChange={handleSelectAllChecked}
                />
              </th>
              <th>Stt</th>
              <th>Mã số sinh viên</th>
              <th>Họ và tên</th>
              <th>Ngày vào đảng</th>
            </tr>
          </thead>
          <tbody>
            {danhsachPhatTrienDang.length > 0 &&
              danhsachPhatTrienDang.map((item, index) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      //   onChange={() => handleChecked(item.mssv)}
                      //   checked={checked.includes(item.mssv)}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.mssv}</td>
                  <td>{item.fullname}</td>
                  <td>{item.ngayvaodang}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DanhSachKetNapDangVien;
