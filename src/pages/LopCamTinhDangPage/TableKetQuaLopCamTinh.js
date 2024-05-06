import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";
import TableDanhSachPhatTrienDang from "./TableDanhSachPhatTrienDang";
import Button from "../../compoment/Button";

function TableKetQuaLopCamTinh({ data, setDanhSachKetQua, dot }) {
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [danhsachPhatTrienDang, setDanhSachPhatTrienDang] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [chonDot1, setChonDot1] = useState("");
  useEffect(() => {
    setOriginalData(data);
  }, [data]);
  useEffect(() => {
    const newDataDanhSach = searchPartyMembersByIds(originalData, checked);
    setDanhSachPhatTrienDang(newDataDanhSach);
  }, [checked]);
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
  const handleSelectAllChecked = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    if (newSelectAllChecked) {
      setChecked(originalData.map((item) => item.mssv));
    } else {
      setChecked([]);
    }
  };
  // let handleAddDoanVien = () => {
  //   let newData = originalData.filter((item) => !checked.includes(item.mssv));
  //   setDanhSachKetQua(newData);
  //   // searchDoanViensByIds(checked);

  //   const newDataDanhSach = searchPartyMembersByIds(originalData, checked);
  //   setDanhSachPhatTrienDang(searchPartyMembersByIds(originalData, checked));
  // };
  let searchPartyMembersByIds = (data, checked) => {
    return data.filter((member) => checked.includes(member.mssv));
  };
  const saveDangVienKetQua = data.map((item) => {
    return {
      ...item,
      fullname: item.ngaysinh,
      quequan: item.quequan,
      mssv: item.mssv,
      ngaysinh: item.ngaysinh,
      diemTrungBinh: item.diemTrungBinh,
      chonDot: dot,
      ketqua: item.ketqua,
    };
  });
  const handleSaveAllKetQua = async () => {
    try {
      const response = await httpRequest.post(
        "/savekq_lopcamtinh",
        saveDangVienKetQua
      );
      if (response.data.isSuccess) {
        toast.success(response.data.message);
      } else {
        toast.error("Quá trình ghi lại kết quả thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi khi lưu dữ liệu");
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  // console.log(danhsachPhatTrienDang);
  // console.log(chonDot1);
  const handleChangle = (e) => {
    let valueOptons = e.target.value;
    setChonDot1(valueOptons);
  };
  const updatedSinhVienList = danhsachPhatTrienDang.map((item) => {
    return {
      ...item,
      fullname: item.ngaysinh,
      quequan: item.quequan,
      mssv: item.mssv,
      ngaysinh: item.ngaysinh,
      diemTrungBinh: item.diemTrungBinh,
      chonDot: chonDot1,
      ketqua: item.ketqua,
    };
  });
  const handleSubmitUpdate = async () => {
    try {
      const response = await httpRequest.post(
        "/api/dangvien/save_phattriendang",
        updatedSinhVienList
      );
      if (response.data.isSuccess) {
        setChecked([]);
        toast.success(response.data.message);
      } else {
        toast.error("Quá trình ghi lại kết quả thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi khi lưu dữ liệu");
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };
  return (
    <>
      <Button
        onClick={handleSaveAllKetQua}
        leftIcon={<FontAwesomeIcon icon={faSave} />}
        green
        outline
      >
        Lưu
      </Button>

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
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Quê quán</th>
            <th>Điểm trung bình</th>
            <th>Kết quả</th>
          </tr>
        </thead>
        <tbody>
          {originalData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleChecked(item.mssv)}
                  checked={checked.includes(item.mssv)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.mssv}</td>
              <td>{item.fullname}</td>
              <td>{item.ngaysinh}</td>
              <td>{item.quequan}</td>
              <td>{item.diemTrungBinh}</td>
              <td>{item.ketqua}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {danhsachPhatTrienDang && (
        <>
          <span>Bảng xét phát triển đảng</span>
          <Button outline>
            <select value={chonDot1} onChange={handleChangle}>
              <option>---Chọn đợt---</option>
              <option>Đợt 1 năm học 2020-2021</option>
              <option>Đợt 2 năm học 2020-2021</option>
              <option>Đợt 1 năm học 2021-2022</option>
              <option>Đợt 2 năm học 2021-2022</option>
            </select>
          </Button>
          <Button primary onClick={handleSubmitUpdate}>
            Thêm vào danh sách phát triển đảng
          </Button>
          <TableDanhSachPhatTrienDang
            data={danhsachPhatTrienDang}
            setDanhSachPhatTrienDang={setDanhSachPhatTrienDang}
          />
        </>
      )}
    </>
  );
}

export default TableKetQuaLopCamTinh;
