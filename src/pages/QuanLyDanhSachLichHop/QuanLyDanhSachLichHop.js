import classNames from "classnames/bind";
import styles from "./QuanLyDanhSachLichHop.module.scss";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import ModalChiTietLichHop from "./ModalChiTietLichHop";
import { ToastContainer, toast } from "react-toastify";

import ModalAddLichHop from "./ModalAddLichHop";
const cx = classNames.bind(styles);
function QuanLyDanhSachLichHop() {
  const [danhsachLichHops, setDanhSachLichHop] = useState([]);
  const [lichhopByID, setLichHopBId] = useState();
  const [isModal, setModal] = useState(false);
  const [isModalAdd, setModalAdd] = useState(false);
  useEffect(() => {
    getListLichHop();
  }, []);
  const getListLichHop = async () => {
    try {
      const response = await httpRequest.get("/api/lichhop/getAll");

      setDanhSachLichHop(response.data.data);
    } catch (error) {}
  };
  const handleClick = async (id) => {
    console.log(id);
    try {
      const response1 = await httpRequest.get("/api/lichhop/getLichHopById", {
        params: { id: id },
      });
      setLichHopBId(response1.data.data);
      setModal(true);
    } catch (error) {}
  };
  return (
    <>
      {" "}
      <div className="p-[4%]">
        <span>Quản lý danh sách Lich họp</span>
        <div className="w-full flex ">
          <div className="w-full justify-end flex items-center">
            <Button
              className={cx("btn_add bg-[red]", "color")}
              leftIcon={<FontAwesomeIcon icon={faPlus} />}
              onClick={() => setModalAdd(true)}
            >
              Tạo lịch họp
            </Button>
          </div>
        </div>
        <div className="my-2">
          <table>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Ngày họp</th>

                <th>Địa điểm</th>
                <th>Nội dung</th>
              </tr>
            </thead>
            <tbody>
              {danhsachLichHops.length > 0 &&
                danhsachLichHops.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>
                  <input
                    type="checkbox"
                    onChange={() => handleChecked(item.id)}
                    checked={checked.includes(item.id)}
                  />
                </td> */}
                      <td
                        className={cx("tieude")}
                        onClick={() => handleClick(item.id)}
                      >
                        {item.tieude}
                      </td>
                      <td>{item.ngayhop}</td>
                      <td>{item.diadiem}</td>
                      <td>{item.noidung}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {danhsachLichHops.length === 0 && (
            <div className={cx("emty_tr", "w-full px-2 py-4 mx-2")}>
              Danh sách lịch họp
            </div>
          )}
        </div>
      </div>
      {lichhopByID && isModal && (
        <ModalChiTietLichHop
          setModal={setModal}
          isModal={isModal}
          lichhopByID={lichhopByID}
        />
      )}
      {isModalAdd && (
        <ModalAddLichHop
          setModalAdd={setModalAdd}
          isModalAdd={isModalAdd}
          setDanhSachLichHop={setDanhSachLichHop}
        />
      )}
      <ToastContainer autoClose={"2000"} />
    </>
  );
}

export default QuanLyDanhSachLichHop;
