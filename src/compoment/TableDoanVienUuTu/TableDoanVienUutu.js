import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Button from "../Button";
import TableDanhSachLopCamTinhDang from "../TableDanhSachLopCamTinhDang/TableDanhSachLopCamTinhDang";
const cx = classNames.bind(styles);
function TableDoanVienUutu({ data, setdsdoanvienuutu }) {
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [dsLopCamTinhDang, setDanhSachLopCamTinhDang] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  // const [listdoanvienUutu, setListDoanVienUuTu] = useState([]);
  useEffect(() => {
    setOriginalData(data);
  }, [data]);

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
  let handleSelectAllChecked = () => {
    let newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    if (newSelectAllChecked) {
      setChecked(originalData.map((item) => item.mssv));
    } else {
      setChecked([]);
    }
  };
  // const searchDoanViensByIds = async (ids) => {
  //   try {
  //     // Gửi yêu cầu HTTP GET đến endpoint /search với danh sách IDs được truyền vào qua query parameter
  //     const response = await httpRequest.get("/api/dv/searchIds", {
  //       params: {
  //         ids: checked.join(","),
  //       },
  //     });
  //     // Trả về dữ liệu từ phản hồi
  //     setDanhSachLopCamTinhDang(response.data);
  //   } catch (error) {
  //     // Xử lý lỗi nếu có
  //     console.error("Error searching DoanViens by HoTen:", error);
  //     return null;
  //   }
  // };

  const handleRestoreData = () => {
    setChecked([]);
    const newOriginalData = [...originalData];
    newOriginalData.push(...dsLopCamTinhDang);
    setDanhSachLopCamTinhDang([]);
    setOriginalData(newOriginalData);
    setChecked([]);
  };
  let handleAddDoanVien = () => {
    let allValidDiemTrungBinh = checked.every((mssv) => {
      let selectedMember = originalData.find((item) => item.mssv === mssv);
      return selectedMember && selectedMember.diemTrungBinh > 2.5;
    });

    console.log(checked);
    if (allValidDiemTrungBinh) {
      // Nếu tất cả các đoàn viên đều có điểm trung bình lớn hơn 2.5, thực hiện thêm vào danh sách
      setdsdoanvienuutu(
        originalData.filter((item) => !checked.includes(item.mssv))
      );
      setDanhSachLopCamTinhDang(searchPartyMembersByIds(originalData, checked));
    } else {
      // Nếu có ít nhất một đoàn viên không đạt điểm trung bình 2.5, in ra thông báo lỗi
      alert(
        "Các đảng viên được thêm vào lớp cảm thình phải có điểm trung bình > 2.5"
      );
      return;
    }
  };
  let searchPartyMembersByIds = (data, checked) => {
    return data.filter((member) => checked.includes(member.mssv));
  };

  return (
    <div className="p-[2%]">
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
            <th>Mssv</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Quê quán</th>
            <th>Điểm trung bình tích lũy</th>
          </tr>
        </thead>
        <tbody>
          {originalData.map((item, index) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleChecked(item.mssv)}
                  checked={checked.includes(item.mssv)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.mssv}</td>
              <td>{item.fullname}</td>
              <td>{item.ngaysinh}</td>
              <td>{item.quequan}</td>
              <td>{item.diemTrungBinh}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {dsLopCamTinhDang && (
        <>
          <Button
            outline
            className={cx("btn_add_DoanVien")}
            onClick={handleAddDoanVien}
          >
            Thêm vào Danh sách học lớp cảm tình Đảng
          </Button>

          <TableDanhSachLopCamTinhDang
            data={dsLopCamTinhDang}
            setDanhSachLopCamTinhDang={setDanhSachLopCamTinhDang}
          />
        </>
      )}
    </div>
  );
}

export default TableDoanVienUutu;
