import { useEffect, useState } from "react";
import "./TableChuyenDen.scss";
import Button from "../Button";
import httpRequest from "../../utils/HttpRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { getListDvChuyenDi } from "../../Store/DangVienChuyenDiSlice";
function TableDanhSachChuyenDi() {
  const [list_Dv_CDen, setListDVCDen] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    get_List_dv_cd();
  }, []);
  const get_List_dv_cd = async () => {
    dispatch(getListDvChuyenDi()).then((result) => {
      if (result.payload) {
        setListDVCDen(result.payload);
      }
    });
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày chuyển đi</th>
            <th>Địa điểm chuyển đến</th>
          </tr>
        </thead>
        <tbody>
          {list_Dv_CDen.length > 0 &&
            list_Dv_CDen.map((item, index) => (
              <>
                {item.trangthai === "2" ? (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.fullname}</td>
                    <td>{item.ngaychuyendi}</td>
                    <td>{item.noichuyenden}</td>
                  </tr>
                ) : (
                  <></>
                )}
              </>
            ))}
        </tbody>
      </table>
      <Button
        green
        leftIcon={
          <FontAwesomeIcon icon={faFileExcel} style={{ color: "#e91691" }} />
        }
      >
        Xuất file Excel
      </Button>
    </>
  );
}

export default TableDanhSachChuyenDi;
