import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getListTK } from "../../Store/TaiKhoanSilce";

function ListTaiKhoan({ setListTaiKhoan, listTaiKhoan }) {
  const dispatch = useDispatch();
  useEffect(() => {
    getListTaiKhoan1();
  }, []);
  const getListTaiKhoan1 = () => {
    dispatch(getListTK()).then((result) => {
      if (result.payload) {
        setListTaiKhoan(result.payload);
      }
    });
  };
  return (
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên đảng viên</th>
          <th>Mã định danh đảng viên</th>
          <th>Tên tài khoản</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listTaiKhoan.length > 0 &&
          listTaiKhoan.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.fullname}</td>
              <td>{item.mdd}</td>
              <td>{item.username}</td>

              <td>
                {item.trangthai === "1" && (
                  <span className="px-4 py-2 bg-green-500">Active</span>
                )}
                {item.trangthai === "0" && (
                  <span className="px-4 py-2 bg-red-500">NoneActive</span>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ListTaiKhoan;
