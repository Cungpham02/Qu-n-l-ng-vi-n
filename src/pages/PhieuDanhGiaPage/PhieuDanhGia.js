import classNames from "classnames/bind";
import styles from "./QuanLyDanhSachLichHop.module.scss";
import Button from "../../compoment/Button";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ModalAddPhieuDanhGia from "./ModalAddPhieuDanhGia";

import ReadExcel from "./ReadExcel";
const cx = classNames.bind(styles);
function PhieuDanhGia() {
  const [danhsachPhieuDanhGia, setDanhsachPhieuDanhGia] = useState([]);
  const navigate = useNavigate();
  const [isModalAdd, setModalAdd] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    getListPhieuDanhGia();
  }, []);
  const getListPhieuDanhGia = async () => {
    try {
      const response = await httpRequest.get("/api/v1/phieudanhgia");
      setDanhsachPhieuDanhGia(response.data);
    } catch (error) {}
  };
  return (
    <>
      <div className="p-[4%]">
        <span>Phiếu đánh giá</span>
        <div className="w-full flex ">
          <div className="w-full justify-end flex items-center">
            <Button
              className={cx("btn_add bg-[#5eb541] text-[#fff]", "color")}
              leftIcon={<FontAwesomeIcon icon={faPlus} />}
              onClick={() => setModalAdd(true)}
            >
              Tạo phiếu đánh giá
            </Button>
          </div>
        </div>
        <div className="my-2">
          <table>
            <thead>
              <tr>
                <th>Tên phiếu</th>
                <th>Đợt đánh giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {danhsachPhieuDanhGia &&
                danhsachPhieuDanhGia.length > 0 &&
                danhsachPhieuDanhGia.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.chonDot}</td>
                      <td>
                        <span
                          onClick={() =>
                            navigate(`/bithus/phieuDanhGia?id=${item.id}`)
                          }
                          className={cx(
                            "text-[green] text-[17px] font-medium",
                            "font_style"
                          )}
                        >
                          {" "}
                          Xem chi tiết
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalAdd && (
        <ModalAddPhieuDanhGia
          setModalAdd={setModalAdd}
          isModalAdd={isModalAdd}
          setDanhsachPhieuDanhGia={setDanhsachPhieuDanhGia}
        />
      )}
      {data && <ReadExcel data={data} setData={setData} />}
      <ToastContainer autoClose={"2000"} />
    </>
  );
}

export default PhieuDanhGia;
