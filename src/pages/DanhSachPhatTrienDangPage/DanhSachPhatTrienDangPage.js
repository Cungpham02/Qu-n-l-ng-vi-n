import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import styles from "./DanhSachPhatTrienDangPage.module.scss";
import Button from "../../compoment/Button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faSave } from "@fortawesome/free-solid-svg-icons";
import { getListDanhSachPhatTrienDang } from "../../Store/LopCamTinhSlice";
import DanhSachKetNapDang from "./TableDanhSachKetNap";
const cx = classNames.bind(styles);
function DanhSachPhatTrienDangPage() {
  const [chonDot, setChonDot] = useState("");
  const [danhsachPhatTrienDang, setDanhSachPhatTrienDang] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [danhsachketnap, setDanhsachKetNap] = useState([]);
  const dispath = useDispatch();
  useEffect(() => {
    getListDanhSachTheoDot();
  }, [chonDot]);

  let searchPartyMembersByIds = (data, checked) => {
    return data.filter((member) => checked.includes(member.mssv));
  };
  const getListDanhSachTheoDot = async () => {
    dispath(getListDanhSachPhatTrienDang(chonDot)).then((result) => {
      console.log(result);
      if (result.payload) {
        setDanhSachPhatTrienDang(result.payload.data);
      }
    });
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
  const handleSelectAllChecked = () => {
    const newSelectAllChecked = !selectAllChecked;
    setSelectAllChecked(newSelectAllChecked);
    if (newSelectAllChecked) {
      setChecked(danhsachPhatTrienDang.map((item) => item.mssv));
    } else {
      setChecked([]);
    }
  };
  const addDangVien = () => {
    let newData = danhsachPhatTrienDang.filter(
      (item) => !checked.includes(item.mssv)
    );
    setDanhSachPhatTrienDang(newData);
    const newDataDanhSach = searchPartyMembersByIds(
      danhsachPhatTrienDang,
      checked
    );
    setDanhsachKetNap(searchPartyMembersByIds(danhsachPhatTrienDang, checked));
  };

  return (
    <div className={cx("wapper")}>
      <Button leftIcon={<FontAwesomeIcon icon={faFileExcel} />} green outline>
        Xuất file Excel
      </Button>
      <Button leftIcon={<FontAwesomeIcon icon={faSave} />} green outline>
        Save
      </Button>
      <select value={chonDot} onChange={(e) => setChonDot(e.target.value)}>
        <option>--Chọn đợt---</option>
        <option>Đợt 1 năm học 2020-2021</option>
        <option>Đợt 2 năm học 2020-2021</option>
        <option>Đợt 1 năm học 2021-2022</option>
        <option>Đợt 2 năm học 2021-2022</option>
      </select>
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
            <th>Stt</th>
            <th>Mã số sinh viên</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Quê quán</th>
            <th>Điểm tích lũy</th>
            <th>Kết quả học lớp cảm tình</th>
          </tr>
        </thead>
        <tbody>
          {danhsachPhatTrienDang.length > 0 &&
            danhsachPhatTrienDang.map((item, index) => (
              <tr>
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
      {danhsachketnap && (
        <>
          <Button outline onClick={addDangVien}>
            Thêm vào danh sách kết nạp đảng
          </Button>
          {danhsachketnap.length > 0 && (
            <DanhSachKetNapDang
              data={danhsachketnap}
              setDanhsachKetNap={setDanhsachKetNap}
            />
          )}
        </>
      )}
    </div>
  );
}

export default DanhSachPhatTrienDangPage;
