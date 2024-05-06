import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ExportToExcelDanhSachLopCamTinh,
  getListDvChuyenDiByDot,
} from "../../Store/LopCamTinhSlice";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";

function DanhSachLopCamTinhDang() {
  const [listDanhSachCamTinh, setDanhSachLopCamTinhDang] = useState([]);
  const [chonDot, setChonDot] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    get_List_dv_cd();
  }, [chonDot]);
  console.log(listDanhSachCamTinh);
  const get_List_dv_cd = async () => {
    dispatch(getListDvChuyenDiByDot(chonDot)).then((result) => {
      console.log(result);
      if (result.payload) {
        setDanhSachLopCamTinhDang(result.payload);
      }
    });
  };
  const handleXuatFileExcel = () => {
    dispatch(ExportToExcelDanhSachLopCamTinh(chonDot))
      .then((result) => {
        console.log(result);
        if (result.payload) {
          const url = window.URL.createObjectURL(new Blob([result.payload]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `Danh Sách Lớp cảm tình ${chonDot} .xlsx`
          );
          document.body.appendChild(link);
          link.click();
        } else {
          console.error("Không có dữ liệu Excel để xuất.");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi xuất file Excel:", error);
      });
  };
  return (
    <div>
      <Button outline>
        <select
          className="w-full"
          value={chonDot}
          onChange={(e) => setChonDot(e.target.value)}
        >
          <option>----Chọn đợt-----</option>
          <option>Đợt 1 năm 2023-2024</option>
          <option>Đợt 2 năm 2023-2024</option>
          <option>Đợt 1 năm 2024-2025</option>
        </select>
      </Button>
      {listDanhSachCamTinh.length > 0 && (
        <>
          <Button
            green
            leftIcon={
              <FontAwesomeIcon
                icon={faFileExcel}
                onClick={(listDanhSachCamTinh) =>
                  handleXuatFileExcel(listDanhSachCamTinh)
                }
              />
            }
          >
            Xuất file Excel
          </Button>
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>STT</th>
                <th>Mssv</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Quê quán</th>
                <th>Điểm trung bình</th>
              </tr>
            </thead>
            <tbody>
              {listDanhSachCamTinh.map((item, index) => (
                <tr>
                  <td>
                    <input type="checkbox" />
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
      )}
    </div>
  );
}

export default DanhSachLopCamTinhDang;
