import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../compoment/Button";
import { faClose, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./QuanLyChuyenDen.module.scss";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ToastContainer, toast } from "react-toastify";
import ModalThemMoiChuyenDen from "./ModalThemMoiChuyenDen";
import httpRequest from "../../utils/HttpRequest";
import InforDangVienHuongDan from "./InforDangVienHuongDan";
import { faSave } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function QuanLyChuyenDi() {
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [listDangVienChuyenDen, setListChuyenDen] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const handleClickModal = () => {
    setModal(true);
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const response = await httpRequest.get(
        "/api/dvchuyenden/getListChuyenDen"
      );
      setListChuyenDen(response.data.data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const handleChecked = (item) => {
    setChecked((prev) => {
      const ischecked = checked.includes(item);
      if (ischecked) {
        return checked.filter((id) => id !== item);
      } else {
        return [...prev, item];
      }
    });
  };
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(
      listDangVienChuyenDen.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [listDangVienChuyenDen, currentPage, itemsPerPage]);
  const handleSelectAllChecked = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    if (newSelectAllChecked) {
      setChecked(listDangVienChuyenDen.map((item) => item));
    } else {
      setChecked([]);
    }
  };
  const handleChangeItemUpdate = (id, e) => {
    const valueOutput = e.target.value;
    const updatedData = listDangVienChuyenDen.map((item1) => {
      if (item1.id === id) {
        return { ...item1, trangthai: valueOutput };
      }
      return item1;
    });

    setListChuyenDen(updatedData);
  };
  const handleUpdateTrangThai = async () => {
    console.log(updatelistDangVienChuyenDen);
    try {
      const response = await httpRequest.post(
        "/api/dvdvcd/update-trangthai",
        updatelistDangVienChuyenDen
      );
      if (response.data.isSuccess) {
        toast.success(response.data.message);
        getList();
        setSelectAllChecked(false);
      } else {
      }
    } catch (error) {}
  };
  const updatelistDangVienChuyenDen = listDangVienChuyenDen.map((item) => {
    return {
      id: item.id,
      trangthai: item.trangthai,
    };
  });
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getListDanhSachDangVenByNguoiHuongDan = async (search) => {
    if (search === "") {
      getList();
    } else {
      try {
        const response = await httpRequest.get(
          "/api/dvchuyenden/findByFullnameHuongDan",
          {
            params: {
              fullname: search,
            },
          }
        );
        setListChuyenDen(response.data.data);
      } catch (error) {}
    }
  };
  const hadleClose = async () => {
    setSearch("");
    getList();
  };
  return (
    <>
      <div className="p-[4%]">
        <span>Quản lý chuyển đến</span>
        <div className="w-full flex ">
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <div className="relative">
                <input
                  className={cx("form_control")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FontAwesomeIcon
                  onClick={() => hadleClose()}
                  className={cx(
                    "can_chinh",
                    "absolute top-3 cursor-pointer text-[#e9b1b1] right-4"
                  )}
                  icon={faClose}
                />
              </div>
              <div
                className={cx(
                  "flex items-center justify-center w-[34px] h-[34px]",
                  "css_icon"
                )}
              >
                <FontAwesomeIcon
                  className="text-[15px] cursor-pointer"
                  onClick={() => getListDanhSachDangVenByNguoiHuongDan(search)}
                  icon={faSearch}
                />
              </div>
            </div>
          </div>
          <div className="w-full justify-end flex items-center">
            <Button
              onClick={handleClickModal}
              className={cx("output1")}
              leftIcon={<FontAwesomeIcon icon={faPlus} />}
            >
              Thêm mới
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faSave} />}
              onClick={handleUpdateTrangThai}
              className={cx("output1")}
            >
              Lưu xác nhận
            </Button>
          </div>
        </div>
        <div className="my-2">
          <table>
            <thead>
              <tr>
                <th>
                  STT
                  {/* <input
                    type="checkbox"
                    checked={selectAllChecked}
                    onChange={handleSelectAllChecked}
                  /> */}
                </th>
                <th>Mã định danh</th>
                <th>Họ và tên</th>
                <th>Ngày chuyển đến</th>
                <th>Số điện thoại</th>
                <th>Người hướng dẫn</th>
                {/* <th>Trạng thái</th> */}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    {/* <input
                      type="checkbox"
                      onChange={() => handleChecked(item)}
                      checked={checked.includes(item)}
                    /> */}
                    {item.id}
                  </td>
                  <td>{item.mdd}</td>
                  <td>{item.dvchuyenden_fullname}</td>
                  <td>{item.ngaychuyenden}</td>
                  <td>{item.phonenumber}</td>
                  <td>
                    <Tippy
                      delay={[0, 200]}
                      content={
                        <InforDangVienHuongDan
                          fullname={item.fullname_huongdan}
                          gmail={item.gmail}
                        />
                      }
                      placement="left-start"
                    >
                      <span>{item.fullname_huongdan}</span>
                    </Tippy>
                  </td>
                  {/* <td>
                    <select
                      value={item.trangthai ? item.trangthai : ""}
                      onChange={(e) => handleChangeItemUpdate(item.id, e)}
                    >
                      <option>---Chọn người hướng dẫn---</option>
                      <option value="confirmed">Xác nhận</option>
                      <option value="notConfirmed">Chưa xác nhận</option>
                    </select>
                    
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Phân trang */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from(
            { length: Math.ceil(listDangVienChuyenDen.length / itemsPerPage) },
            (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className="mx-2">
                {i + 1}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(listDangVienChuyenDen.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
      {modal && (
        <ModalThemMoiChuyenDen
          listDangVienChuyenDen={listDangVienChuyenDen}
          setListChuyenDen={setListChuyenDen}
          setModal={setModal}
          modal={modal}
        />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default QuanLyChuyenDi;
