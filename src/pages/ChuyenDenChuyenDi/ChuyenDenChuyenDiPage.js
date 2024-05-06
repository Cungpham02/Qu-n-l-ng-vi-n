import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import TableDanhSachChuyenDi from "../../compoment/TableChuyenDen/TableChuyenDen";
// import TableChuyenDen from "../../compoment/TableChuyenDen/TableChuyenDen";
import TableChuyenDi from "../../compoment/TableChuyenDi/TableChuyenDi";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import httpRequest from "../../utils/HttpRequest";
import Button from "../../compoment/Button";
import { getListDvChuyenDi } from "../../Store/DangVienChuyenDiSlice";
import ModalEditTrangThaiChuyenDi from "./ModalEditTrangThaiChuyenDi";
const cx = classNames.bind(styles);
function ChuyenDenChuyenDiPage() {
  const [list_Dv_CDi, setListDVCDi] = useState([]);
  const [editTrangThai, setEditTrangThai] = useState(false);
  const [dangvienById, setDangVienById] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    get_List_dv_cd();
  }, []);
  const get_List_dv_cd = async () => {
    try {
      const response = await httpRequest.get("/api/dvcdcd/getListChuyenDi");
      setListDVCDi(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleClickUpdateTrangThai = async (id) => {
    setEditTrangThai(true);
    try {
      const response = await httpRequest.post(`/api/dvcdcd/seachByID/${id}`);
      setDangVienById(response.data.data);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };
  return (
    <>
      {" "}
      <div className="content_container">
        <h1>Quản lý thông tin chuyển đi và chuyển đến của đảng viên</h1>

        <div class="tab_container">
          <input className="clear" id="tab2" type="radio" name="tabs" checked />
          <label className="labelCD" for="tab2">
            <i class="fa fa-pencil-square-o"></i>
            <span>Xác nhận chuyển đi</span>
          </label>
          <input className="clear" id="tab1" type="radio" name="tabs" />
          <label className="labelCD" for="tab1">
            <i class="fa fa-code"></i>
            <span>Danh sách chuyển đi</span>
          </label>

          <section id="content2" class="tab-content">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Nơi chuyển đến</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {list_Dv_CDi.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td
                      className="cursor-pointer"
                      onClick={() => handleClickUpdateTrangThai(item.id)}
                    >
                      {item.fullname}
                    </td>
                    <td>{item.noichuyenden}</td>
                    <td>
                      {item.trangthai === "1" ? (
                        <>
                          <span>Hủy yêu cầu</span>
                        </>
                      ) : (
                        <></>
                      )}
                      {item.trangthai === "2" ? (
                        <>
                          <span>Hoàn thành </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              green
              leftIcon={
                <FontAwesomeIcon
                  icon={faFileExcel}
                  style={{ color: "#e91691" }}
                />
              }
            >
              Xuất file Excel
            </Button>
          </section>
          <section id="content1" class="tab-content">
            <TableDanhSachChuyenDi />
          </section>
        </div>
      </div>
      {editTrangThai && (
        <ModalEditTrangThaiChuyenDi
          setEditTrangThai={setEditTrangThai}
          dangvienById={dangvienById}
          setListDVCDi={setListDVCDi}
          setDangVienById={setDangVienById}
        />
      )}
    </>
  );
}

export default ChuyenDenChuyenDiPage;
