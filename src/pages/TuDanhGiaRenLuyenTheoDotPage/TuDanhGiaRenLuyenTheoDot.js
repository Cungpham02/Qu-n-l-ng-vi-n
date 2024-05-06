import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import classNames from "classnames/bind";
import styles from "./TuDanhGia.module.scss";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
function TuDanhGiaRenLuyenTheoDotPage() {
  const username = localStorage.getItem("username");
  const [dangvien_id, setDangVienId] = useState("");
  const [chonDot, setChonDot] = useState("");
  const [xeploai, setXepLoai] = useState("");
  const [
    phieudanhGiaByDotAndByIdDangVien,
    setphieudanhGiaByDotAndByIdDangVien,
  ] = useState([]);
  useEffect(() => {
    getDangVienByUsername(username);
  }, []);

  const SubmitFormDanhGia = async () => {
    try {
      const jsonData = JSON.stringify(phieudanhGiaByDotAndByIdDangVien);
      const formData = new FormData();
      formData.append("chonDot", chonDot);
      formData.append("tongDiem", calculateTotalScore());
      formData.append("trangthai", false);
      formData.append("xeploai", xeploai);
      formData.append("id_dangvien", dangvien_id);
      formData.append("data", jsonData);
      // Chuyển đổi mảng đối tượng thành chuỗi JSON

      const res = await httpRequest.post(
        "/api/phieudanhgia/addPhieuDanhGia",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.isSuccess) {
        toast.success(res.data.message);
        setphieudanhGiaByDotAndByIdDangVien([]);
      } else {
        toast.error("Lưu đánh giá thất bại");
      }
    } catch (error) {}
  };
  const getDangVienByUsername = async (username) => {
    try {
      const res = await httpRequest.get(`/user`, {
        params: {
          username: username,
        },
      });
      setDangVienId(res.data.data);
    } catch (error) {}
  };
  const [inputValues, setInputValues] = useState({});

  const calculateTotalScore = () => {
    let totalScore = 0;
    phieudanhGiaByDotAndByIdDangVien.forEach((item) => {
      if (item.dgdv) {
        totalScore += parseInt(item.dgdv);
      }
    });
    return totalScore;
  };
  console.log(phieudanhGiaByDotAndByIdDangVien);

  const handleInputChange = (event, index) => {
    const updatedData = [...phieudanhGiaByDotAndByIdDangVien];
    updatedData[index].dgdv = parseInt(event.target.value);
    setphieudanhGiaByDotAndByIdDangVien(updatedData);

    // Cập nhật inputValues
    const newInputValues = {
      ...inputValues,
      [index]: { ...inputValues[index], dgdv: parseInt(event.target.value) },
    };
    setInputValues(newInputValues);

    // Tính toán tổng điểm
    const totalScore = calculateTotalScore(newInputValues);
    console.log(totalScore);
  };

  let getPhieuDanhGia = async (id_dangvien, chonDot) => {
    try {
      const response1 = await httpRequest.get(
        `/api/v1/phieudanhgia/getByIdAndByDot`,
        {
          params: {
            dot: chonDot,
            id_dangvien: id_dangvien,
          },
          responseType: "blob",
        }
      );
      const blobData = response1.data;
      console.log(blobData);
      if (blobData.size === 0) {
        const response2 = await httpRequest.get(
          `/api/phieudanhgia/getPhieuDanhGiaDangVien`,
          {
            params: {
              dot: chonDot,
              id_dangvien: id_dangvien,
            },
          }
        );
        const jsonData = response2.data;
        setphieudanhGiaByDotAndByIdDangVien(jsonData);
        setInputValues("");
      } else {
        const arrayBuffer = await blobData.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
        setphieudanhGiaByDotAndByIdDangVien(jsonData);
        setInputValues("");
      }
    } catch (error) {}
  };

  return (
    <>
      {" "}
      <div className={cx("wapper")}>
        <div className={cx("px-[2%] my-2", "affter")}>
          <h1 className={cx("title_danhgia")}>
            <span className={cx("span")}>Tự đánh giá kết quả rèn luyện</span>
          </h1>
        </div>
        <div className="px-[2%] flex gap-6">
          <select
            className={cx("form_control")}
            value={chonDot}
            onChange={(e) => setChonDot(e.target.value)}
          >
            <option>---Chọn đợt---</option>
            <option>Năm học 2020-2021</option>
            <option>Năm học 2021-2022</option>
            <option>Năm học 2022-2023</option>
            <option>Năm học 2023-2024</option>
          </select>
          <div
            className={cx(
              "flex items-center justify-center w-[34px] h-[34px]",
              "css_icon"
            )}
          >
            <FontAwesomeIcon
              className="text-[15px]"
              onClick={() => getPhieuDanhGia(dangvien_id, chonDot)}
              icon={faSearch}
            />
          </div>
        </div>

        {phieudanhGiaByDotAndByIdDangVien.length > 0 && (
          <div className="px-[2%] my-2">
            <div className="flex my-2 items-center justify-end">
              <button
                onClick={SubmitFormDanhGia}
                className={cx("save_button", "flex items-center gap-3")}
              >
                <FontAwesomeIcon icon={faSave} />
                <span>Lưu kết quả</span>
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th className="">Nội dung và tiêu chí đánh giá</th>
                  <th className="">Điểm tối thiểu</th>
                  <th>Mức điểm tối đa</th>
                  <th>Đảng viên tự đánh giá</th>
                </tr>
              </thead>
              <tbody>
                {phieudanhGiaByDotAndByIdDangVien.length > 0 &&
                  phieudanhGiaByDotAndByIdDangVien.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.CH}</td>
                        <td>{item.ĐTT}</td>
                        <td>{item.MĐTĐ}</td>
                        <td>
                          {item.MĐTĐ && (
                            <input
                              type="number"
                              id="points"
                              name="dgdv"
                              step="1"
                              min={item.ĐTT}
                              max={item.MĐTĐ}
                              className={cx("form_control")}
                              value={
                                inputValues[index]?.dgdv || item.dgdv || ""
                              }
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
                            />
                          )}{" "}
                          {/* {item.dgdv && (
                            <input
                              disabled
                              type="number"
                              id="points"
                              name="dgdv"
                              step="1"
                              min={item.ĐTT}
                              max={item.MĐTĐ}
                              className={cx("form_control")}
                              value={
                                inputValues[index]?.dgdv || item.dgdv || ""
                              }
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
                            />
                          )} */}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className={cx("tong_diem")}>
              Tổng điểm : {calculateTotalScore()}
            </div>
            <div>Đảng viên tự xếp loại</div>
            <select
              className={cx("form_control")}
              value={xeploai}
              onChange={(e) => setXepLoai(e.target.value)}
            >
              <option value="hoàn_thành_xuất_sắc">
                Hoàn thành xuất sắc nhiệm vụ
              </option>
              <option value="hoàn_thành_tốt">Hoàn thành tốt nhiệm vụ</option>
              <option value="hoàn_thành">Hoàn thành nhiệm vụ</option>
              <option value="Không_hoàn_thành">
                Không hoàn thành nhiệm vụ
              </option>
            </select>
          </div>
        )}
      </div>
    </>
  );
}

export default TuDanhGiaRenLuyenTheoDotPage;
