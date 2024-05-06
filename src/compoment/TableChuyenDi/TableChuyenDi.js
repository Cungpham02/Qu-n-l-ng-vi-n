import React, { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./TableChuyenDi.module.scss";
import { useDispatch } from "react-redux";
import { getListDvChuyenDi } from "../../Store/DangVienChuyenDiSlice";

const cx = classNames.bind(styles);

function TableChuyenDi() {
  const [list_Dv_CDi, setListDVCDi] = useState([]);
  const [editableIndexes, setEditableIndexes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    get_List_dv_cd();
  }, []);

  const get_List_dv_cd = async () => {
    try {
      const response = await httpRequest.get("/api/dvcdcd/getListChuyenDi");
      const updatedList = response.data.data.map((item) => ({
        ...item,
        updateSelect: item.trangthai,
      }));
      setListDVCDi(updatedList);
      setEditableIndexes(new Array(updatedList.length).fill(false)); // Khởi tạo mảng editableIndexes với giá trị false
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleUpdateYeuCau = async (id, username, updateSelect) => {
    console.log(updateSelect);

    try {
      const response = await httpRequest.put(
        `/api/dvcdcd/xacnhanYeuCauChuyenDi/${id}/${username}`,
        {
          trangthai: updateSelect,
        }
      );
      dispatch(getListDvChuyenDi());
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  const handleEdit = (index) => {
    const newEditableIndexes = [...editableIndexes];
    newEditableIndexes[index] = true; // Đặt chỉ mục của hàng được chỉnh sửa thành true
    setEditableIndexes(newEditableIndexes);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            {/* <th>Ngày chuyển đi</th> */}
            <th>Nơi chuyển đi</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {list_Dv_CDi.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.fullname}</td>
              <td>{item.noichuyenden}</td>
              <td>
                {item.trangthai === "1" ? (
                  <>
                    <select
                      disabled={!editableIndexes[index]}
                      value={item.updateSelect}
                      onChange={(e) => {
                        const newUpdateSelect = e.target.value;
                        const newList = [...list_Dv_CDi];
                        newList[index].updateSelect = newUpdateSelect;
                        setListDVCDi(newList);
                      }}
                    >
                      <option value="0">Hủy yêu cầu</option>
                      <option value="1">Xác nhận yêu cầu</option>
                    </select>
                    <button onClick={() => handleEdit(index)}>Chỉnh sửa</button>
                  </>
                ) : (
                  <>
                    <select
                      disabled={!editableIndexes[index]}
                      value={item.updateSelect}
                      onChange={(e) => {
                        const newUpdateSelect = e.target.value;
                        const newList = [...list_Dv_CDi];
                        newList[index].updateSelect = newUpdateSelect;
                        setListDVCDi(newList);
                      }}
                    >
                      <option value="0">Hủy yêu cầu</option>
                      <option value="1">Xác nhận yêu cầu</option>
                    </select>
                    {editableIndexes[index] && ( // Hiển thị button "Cập nhật" nếu hàng đang được chỉnh sửa
                      <button
                        onClick={() =>
                          handleUpdateYeuCau(
                            item.id,
                            item.username,
                            item.updateSelect
                          )
                        }
                        className={cx("btn_xacnhan")}
                      >
                        Cập nhật
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
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

export default TableChuyenDi;
