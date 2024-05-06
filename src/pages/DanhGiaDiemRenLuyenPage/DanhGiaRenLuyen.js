import classNames from "classnames/bind";
import styles from "./DanhGiaRenLuyen.module.scss";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { ToastContainer, toast } from "react-toastify";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getListDanhSachDangVienChuaDanhGiaTheoDot } from "../../Store/ThongKeSlice";
import BarChart from "../../compoment/Charts/BarChart";

const cx = classNames.bind(styles);

function DanhGiaRenLuyen() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [chart, setChart] = useState(false);
  const [listdanhsach, setListDanhsach] = useState([]);
  const [chonDot, setChonDot] = useState("");
  const [message, setMessage] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [dangvienchuadanhgia, setDangVienChuaDanhGia] = useState([]);
  const [data, setData] = useState([
    { id: 1, count: 0, label: "Đảng viên đánh giá" },
    { id: 2, count: 0, label: "Đảng viên chưa đánh giá" },
  ]);

  //Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const userData = {
    labels: data.map((data) => data.label),
    datasets: [
      {
        label: "Số lượng",
        data: data.map((data, index) => data.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const getDanhSachPhieuDanhGiaByDot = async () => {
    console.log(chonDot);
    if (chonDot === "") {
      toast.error("Mời bạn nhập vào học kì muốn lấy thông tin");
    } else {
      try {
        const res = await httpRequest.get(
          "/api/phieudanhgia/getListDangVienNyDot",
          { params: { chonDot } }
        );
        console.log(res);
        if (res.data.length === 0) {
          setListDanhsach([]);
          setMessage("Chưa có bản đánh giá nào");
          setChart(false);
        } else {
          setMessage(
            `Có tất cả ${res.data.length} đảng viên đã thực việc việc đánh giá`
          );
          setChart(true);
          setListDanhsach(res.data.data);
          dispatch(getListDanhSachDangVienChuaDanhGiaTheoDot(chonDot)).then(
            (result) => {
              setDangVienChuaDanhGia(result.payload);
              setData([
                {
                  id: 1,
                  count: listdanhsach.length,
                  label: "Đảng viên đánh giá",
                },
                {
                  id: 2,
                  count: dangvienchuadanhgia,
                  label: "Đảng viên chưa đánh giá",
                },
              ]);
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(listdanhsach.slice(indexOfFirstItem, indexOfLastItem));
  }, [listdanhsach, currentPage, itemsPerPage]);

  // Logic to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSelectAllChecked = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    if (newSelectAllChecked) {
      setChecked(currentItems.map((item) => item.id)); // Cập nhật trạng thái cho tất cả các checkbox
    } else {
      setChecked([]);
    }
  };

  const handleChecked = (item) => {
    setChecked((prev) => {
      const isChecked = prev.includes(item);
      if (isChecked) {
        return prev.filter((id) => id !== item);
      } else {
        return [...prev, item];
      }
    });
  };
  const handleChangeItemUpdate = (id, e) => {
    const valueOutput = e.target.value;
    const updatedData = currentItems.map((item1) => {
      if (item1.id === id) {
        return { ...item1, trangthai: valueOutput };
      }
      return item1;
    });

    setCurrentItems(updatedData);
  };
  const handleUpdateTrangThai = async () => {
    console.log(currentItems);
    try {
      const response = await httpRequest.post(
        "/api/phieudanhgia/update-trangthai",
        currentItems
      );
      if (response.data.isSuccess) {
        toast.success(response.data.message);
        getDanhSachPhieuDanhGiaByDot();
        setSelectAllChecked(false);
        setChecked([]);
      } else {
      }
    } catch (error) {
      toast.error("Xin lỗi nhé! Cập nhật thất bại");
    }
  };
  const handleSort = (sortBy) => {
    const sortedList = [...currentItems].sort((a, b) => {
      if (sortBy === "asc") {
        return a.id_dangvien - b.id_dangvien;
      } else if (sortBy === "desc") {
        return b.id_dangvien - a.id_dangvien;
      }
    });
    setCurrentItems(sortedList);
  };

  return (
    <div className="p-[2%]">
      <h1>Danh sách Phiếu đánh giá rèn luyện Đảng viên</h1>
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
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
              onClick={() => getDanhSachPhieuDanhGiaByDot(chonDot)}
              icon={faSearch}
            />
          </div>
        </div>
        <div className="my-2 flex items-center justify-end">
          <Button
            leftIcon={<FontAwesomeIcon icon={faSave} />}
            className={cx("output")}
            onClick={handleUpdateTrangThai}
          >
            Cập nhật tất cả
          </Button>
        </div>
      </div>

      <div className="my-2">
        {currentItems.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAllChecked}
                    onChange={handleSelectAllChecked}
                  />
                </th>
                <th>STT</th>
                <th onClick={() => handleSort("asc")}>
                  Mã đảng viên
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faArrowDownWideShort}
                  />
                </th>
                <th>Họ và tên</th>
                <th>Đảng viên tự xếp loại</th>
                <th>Tổng điểm đánh giá</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleChecked(item.id)}
                      checked={checked.includes(item.id)}
                    />
                  </td>
                  <td>{index + 1}</td>

                  <td>{item.mdd}</td>
                  <td>{item.fullname}</td>
                  <td>{item.xeploai}</td>
                  <td>{item.tongDiem}</td>
                  <td>
                    <select
                      value={item.trangthai ? item.trangthai : ""}
                      onChange={(e) => handleChangeItemUpdate(item.id, e)}
                    >
                      <option value="hoàn_thành_xuất_sắc">
                        Hoàn thành xuất sắc nhiệm vụ
                      </option>
                      <option value="hoàn_thành_tốt">
                        Hoàn thành tốt nhiệm vụ
                      </option>
                      <option value="hoàn_thành">Hoàn thành nhiệm vụ</option>
                      <option value="Không_hoàn_thành">
                        Không hoàn thành nhiệm vụ
                      </option>
                    </select>
                  </td>
                  {/* <td>
                    <button
                      onClick={() =>
                        handleClickUpdateTrangThai(item.id, item.trangthai)
                      }
                    >
                      Cập nhật
                    </button> */}
                  {/* </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from(
            { length: Math.ceil(listdanhsach.length / itemsPerPage) },
            (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className="mx-2">
                {i + 1}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(listdanhsach.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
        <>
          {message && (
            <div className="text-center text-[17px] my-4">{message}</div>
          )}
        </>
        {chart && <BarChart chartData={userData} chonDot={chonDot} />}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default DanhGiaRenLuyen;
