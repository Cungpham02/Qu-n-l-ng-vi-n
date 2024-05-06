import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import * as XLSX from "xlsx";
import classNames from "classnames/bind";
import styles from "./QuanLyDanhSachLichHop.module.scss";
import Button from "../../compoment/Button";
import { useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function ModalAddPhieuDanhGia({
  setModalAdd,
  isModalAdd,
  setDanhsachPhieuDanhGia,
}) {
  const [excelData, setExcelData] = React.useState(null);
  const [chonDot, setChonDot] = useState("");
  const [fileName, setFileName] = React.useState("");
  const [fileData, setFileData] = React.useState("");
  useEffect(() => {
    getListDotDanhGia(chonDot);
  }, [chonDot]);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setFileData(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleChonDot = async (e) => {
    let value = e.target.value;
    setChonDot(value);
  };
  const getListDotDanhGia = async () => {
    try {
      const response = await httpRequest.get(
        "/api/v1/phieudanhgia/getByDotDanhGia",
        {
          params: {
            chonDot: chonDot,
          },
        }
      );
      if (response.data.data.chonDot !== null) {
        toast.error("Đợt này đã được tạo, mời bạn chọn đợt khác");
        return;
      }
    } catch (error) {}
  };
  const addLichHop = async () => {
    if (excelData === "") {
      toast.error("Bạn chưa chọn file để tải");
      return;
    } else if (chonDot === "") {
      toast.error("Bạn chưa chọn đợt để lưu");
      return;
    } else {
      const formData = new FormData();
      formData.append("fileData", fileData);
      formData.append("chonDot", chonDot);
      try {
        const response = await httpRequest.post(
          "/api/v1/phieudanhgia",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const response2 = await httpRequest.get("/api/v1/phieudanhgia");
        if (response.data.isSuccess) {
          toast.success(response.data.message);
          setDanhsachPhieuDanhGia(response2.data.data);
          setModalAdd(!isModalAdd);
        }
      } catch (error) {}
    }
  };
  return (
    <div className={cx("fixed z-10 w-full top-0 h-[100vh]", "bg_color")}>
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[70%] ",
          "mx_top"
        )}
      >
        <div className="overlay ">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">Thêm mới Phiếu đánh giá</span>
              <span
                onClick={() => setModalAdd(!isModalAdd)}
                id="icon_close"
                className={cx(
                  "absolute right-[10px] font-bold text-[#11d811] text-[20px] cursor-pointer p-2 top-0"
                )}
              >
                <FontAwesomeIcon icon={faClose} />
              </span>
            </div>
            <div className="container_form">
              <div className=" items-center gap-2">
                <div className={cx("form_input", "text_form")}>
                  <label>Chọn đượt đánh giá</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <select
                        value={chonDot}
                        onChange={(e) => handleChonDot(e)}
                        className={cx("password_moi")}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        placeholder="Họ và tên...."
                      >
                        <option>---Chọn đợt---</option>
                        <option>Năm học 2020-2021</option>
                        <option>Năm học 2021-2022</option>
                        <option>Năm học 2022-2023</option>
                        <option>Năm học 2023-2024</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={cx("form_input", "text_form")}>
                  <label>Tệp đánh giá </label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        onChange={handleFileUpload}
                        type="file"
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                      <div>
                        {fileName === "" ? (
                          <div className="my-2 text-[black]">
                            Chưa có file được chọn
                          </div>
                        ) : (
                          <>{fileName}</>
                        )}
                      </div>
                      <div className={cx("tableList")} id="style1">
                        <div>
                          <div className="table-container">
                            {" "}
                            {excelData && (
                              <table>
                                <thead>
                                  <tr>
                                    {excelData[0].map((cell, index) => (
                                      <th key={index}>{cell}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {excelData.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {excelData && (
                <div className="my-3">
                  <Button outline onClick={addLichHop}>
                    Thêm mới phiếu đánh giá
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddPhieuDanhGia;
