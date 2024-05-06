import { useEffect, useState } from "react";
import "./DangVien.scss";
import httpRequest from "../../../utils/HttpRequest";
import Button from "../../../compoment/Button";
import { useNavigate } from "react-router-dom";
import ModalAddDangVien from "../ModalAddDangVien";
import { ToastContainer, toast } from "react-toastify";
import ModalUpdateDangVien from "../UpdateDangVien/ModalUpdateDangVien";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faFileExcel,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import className from "classnames/bind";
import styles from "./DanhSachDangVien.module.scss";
const cx = className.bind(styles);
function ListDangVienPage() {
  const navigate = useNavigate();
  const [listDangVien, setListDangVien] = useState([]);
  const [isModalAddDV, setModalDangVien] = useState(false);
  const [isModalEditDV, setModalEditDangVien] = useState(false);
  const [id_DangVien, setId] = useState("");
  const [search, setSearch] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  useEffect(() => {
    getListDangVien();
  }, []);
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(listDangVien.slice(indexOfFirstItem, indexOfLastItem));
  }, [listDangVien, currentPage, itemsPerPage]);
  const handleClickDangVienById = (id) => {
    setId(id);
    setModalEditDangVien(true);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getListDangVien = async () => {
    try {
      const response = await httpRequest.get("/api/dv/getListDangVien");
      console.log(response);
      setListDangVien(response.data.data);
    } catch (error) {}
  };

  const handleClickExportExcel = async () => {
    try {
      const response = await httpRequest.get("/api/dv/export-to-excel", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Danh sách đảng viên.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success("Xuất file thành công");
    } catch (error) {
      toast.error("Xuất file thất bại");
    }
  };
  const handleSearch = async () => {
    if (search === "") {
      getListDangVien();
    } else {
      try {
        const response = await httpRequest.get("/api/dv/search", {
          params: {
            search_input: search,
          },
        });
        setListDangVien(response.data);
      } catch (error) {}
    }
  };
  const handleSort = (sortBy) => {
    const filteredList = listDangVien.filter((item) => item && item.fullname);
    console.log(filteredList);
    const sortedList = [...filteredList].sort((a, b) => {
      if (sortBy === "asc") {
        return a.fullname.localeCompare(b.fullname);
      } else if (sortBy === "desc") {
        return b.fullname.localeCompare(a.fullname);
      }
    });
    setListDangVien(sortedList);
  };
  return (
    <>
      <div className="content_container">
        <div>
          <a href="#">Quản trị hệ thống</a>/<a href="#">Danh sách đảng viên</a>
        </div>
        <div className="wapper">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="">Tìm kiếm</span>
              <div className={cx("search_input")}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className={cx("search_text")}
                  placeholder="Tên đảng viên"
                />
                <button
                  onClick={handleSearch}
                  className={cx(
                    "flex items-center justify-center w-[34px] h-[34px]",
                    "css_icon"
                  )}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
            <div className="my-2 flex items-center justify-end">
              <Button
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => setModalDangVien(!isModalAddDV)}
                className={cx("add")}
              >
                Thêm mới
              </Button>
              <Button
                leftIcon={<FontAwesomeIcon icon={faFileExcel} />}
                onClick={handleClickExportExcel}
                className={cx("output")}
              >
                Xuất danh sách
              </Button>
            </div>
          </div>
          {listDangVien && (
            <span> Kết quả tìm kiếm : {listDangVien.length} kết quả</span>
          )}
          <div className="menu_table_listDV" id="style1">
            <div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th className="">STT</th>
                      <th className="" onClick={() => handleSort("asc")}>
                        Họ và tên <FontAwesomeIcon icon={faArrowDownAZ} />
                      </th>
                      <th>Mã định danh</th>
                      <th>Ngày vào đảng</th>
                      <th>Ngày chính thức</th>
                      <th>Lớp</th>
                      <th>Khoa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => {
                      return (
                        <tr
                          className={
                            item.trangthai === false
                              ? "opacity-65 bg-[#d9caca87]"
                              : ""
                          }
                          style={{
                            pointerEvents:
                              item.trangthai === false ? "auto" : "auto",
                            cursor:
                              item.trangthai === false ? "pointer" : "pointer",
                          }}
                        >
                          <td className=" ">{index + 1}</td>
                          <td
                            className=" "
                            onClick={() => handleClickDangVienById(item.id)}
                          >
                            {item.fullname}
                          </td>
                          <td>{item.mdd}</td>
                          <td>{item.ngayvaodang}</td>
                          <td>{item.ngaychinhthuc}</td>
                          <td>{item.lopquanly}</td>
                          <td>{item.khoaquanly}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from(
                {
                  length: Math.ceil(listDangVien.length / itemsPerPage),
                },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className="mx-2"
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(listDangVien.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
          <div className="title_table"></div>
          {/* <div className="panition">
            <span>Đầu</span>
            <span>Trước</span>
            <span>1</span>
            <span>Tiếp</span>
            <span>Cuối</span>
          </div> */}
        </div>
      </div>
      {isModalAddDV && (
        <ModalAddDangVien
          listDangVien={listDangVien}
          setListDangVien={setListDangVien}
          isModalAddDV={isModalAddDV}
          setModalDangVien={setModalDangVien}
        />
      )}
      {isModalEditDV && (
        <ModalUpdateDangVien
          id={id_DangVien}
          setModalEditDangVien={setModalEditDangVien}
          isModalEditDV={isModalEditDV}
          listDangVien={listDangVien}
          setListDangVien={setListDangVien}
        />
      )}
      <ToastContainer autoClose={"2000"} />
    </>
  );
}

export default ListDangVienPage;
