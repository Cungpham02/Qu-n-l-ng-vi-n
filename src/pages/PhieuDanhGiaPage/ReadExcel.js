import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./QuanLyDanhSachLichHop.module.scss";
const cx = classNames.bind(styles);
function ReadExcel({ data, setData }) {
  console.log(data);
  return (
    <div className="p-[2%]">
      <div className="my-2 flex gap-2">
        <Link to="/bithus/danhgiarenluyen">Danh sách Phiếu Đánh giá</Link>/
        <Link>Xem thông tin chi tiết</Link>
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
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.CH}</td>
                  <td>{item.ĐTT}</td>
                  <td>{item.MĐTĐ}</td>
                  <td>
                    {item.MĐTĐ && (
                      <input
                        type="text"
                        className={cx("form_control")}
                        name="selfEvaluation"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ReadExcel;
