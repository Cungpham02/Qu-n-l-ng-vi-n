import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styles from "./KetNapDang.module.scss";
import { getListDanhSachPhatTrienDang } from "../../Store/LopCamTinhSlice";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faSave } from "@fortawesome/free-solid-svg-icons";
import httpRequest from "../../utils/HttpRequest";
import DanhSachXetKetNapDang from "./DanhSachXetKetNapDang";
const cx = classNames.bind(styles);
function KetnapDang() {
  const [chonDot, setChonDot] = useState("");
  const [danhsachPhatTrienDang, setDanhSachPhatTrienDang] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [danhsachXetKetNap, setDanhSachXetKetNap] = useState([]);
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [file5, setFile5] = useState("");
  const [file6, setFile6] = useState("");
  const [file7, setFile7] = useState("");
  const [file8, setFile8] = useState("");
  const [file9, setFile9] = useState("");
  const dispath = useDispatch();
  useEffect(() => {
    getListDanhSachTheoDot();
  }, [chonDot]);
  const getListDanhSachTheoDot = async () => {
    dispath(getListDanhSachPhatTrienDang(chonDot)).then((result) => {
      console.log(result);
      if (result.payload) {
        setDanhSachPhatTrienDang(result.payload.data);
      }
    });
  };
  const handleUploadFile = (e) => {
    setFile1(e.target.files[0]);
  };
  const handleUploadFile2 = (e) => {
    setFile2(e.target.files[0]);
  };
  const handleUploadFile3 = (e) => {
    setFile3(e.target.files[0]);
  };
  const handleUploadFile4 = (e) => {
    setFile4(e.target.files[0]);
  };
  const handleUploadFile5 = (e) => {
    setFile5(e.target.files[0]);
  };
  const handleUploadFile6 = (e) => {
    setFile6(e.target.files[0]);
  };
  const handleUploadFile7 = (e) => {
    setFile7(e.target.files[0]);
  };
  const handleUploadFile8 = (e) => {
    setFile8(e.target.files[0]);
  };
  const handleUploadFile9 = (e) => {
    setFile9(e.target.files[0]);
  };
  const handleSubmit = async (mssv) => {
    const formData = new FormData();
    formData.append("file", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("file4", file4);
    formData.append("file5", file5);
    formData.append("file6", file6);
    formData.append("file7", file7);
    formData.append("file8", file8);
    formData.append("file9", file9);
    formData.append("mssv", mssv);
    try {
      const response = await httpRequest.put(
        "/api/dangvien/updateKetnapDang",
        formData
      );
      getListDanhSachTheoDot();
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleDowloadFile = async (filename) => {
    try {
      window.open(`http://localhost:8000/files/${filename}`, "_blank");
    } catch (error) {
      console.error("Error uploading file:", error);
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
  console.log(checked);
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
    const fileAllEmty = checked.every((mssv) => {
      const selectedMember = danhsachPhatTrienDang.find(
        (item) => item.mssv === mssv && item.file2 !== ""
      );
      console.log(selectedMember);

      return selectedMember && selectedMember.file2 !== "";
    });
    if (fileAllEmty) {
      // Nếu tất cả các đoàn viên đều có điểm trung bình lớn hơn 2.5, thực hiện thêm vào danh sách
      // let newData = danhsachPhatTrienDang.filter(
      //   (item) => !checked.includes(item.mssv)
      // );
      let newData = danhsachPhatTrienDang.filter(
        (item) => !checked.includes(item.mssv)
      );
      setDanhSachPhatTrienDang(newData);

      setDanhSachXetKetNap(
        searchPartyMembersByIds(danhsachPhatTrienDang, checked)
      );
    } else {
      alert("Các đoàn viên phải có hết tất cả file mới được thêm");
      return;
    }
    // let newData = danhsachPhatTrienDang.filter(
    //   (item) => !checked.includes(item.mssv)
    // );
    // setDanhSachPhatTrienDang(newData);
    // const newDataDanhSach = searchPartyMembersByIds(
    //   danhsachPhatTrienDang,
    //   checked
    // );
    // setDanhSachXetKetNap(
    //   searchPartyMembersByIds(danhsachPhatTrienDang, checked)
    // );
  };
  let searchPartyMembersByIds = (data, checked) => {
    return data.filter((member) => checked.includes(member.mssv));
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
            <th>Kết quả học lớp cảm tình</th>
            <th>Đơn xin vào đảng</th>
            <th>Giấy giới thiệu</th>
            <th>Bản tự kiểm điểm</th>
            <th>Biên bản họp chi đoàn</th>
            <th>Nghị quyết chi đoàn</th>
            <th>Nghị quyết đoàn trường</th>
            <th>Tổng hợp ý kiến</th>
            <th>Biên bản họp chi bộ</th>
            <th>Nghị quyết chi bộ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {danhsachPhatTrienDang.length > 0 &&
            danhsachPhatTrienDang.map((item, index) => (
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
                <td>{item.ketqua}</td>
                <td>
                  {item.donxinvaodang ? (
                    <span onClick={() => handleDowloadFile(item.donxinvaodang)}>
                      {item.donxinvaodang}
                    </span>
                  ) : (
                    <>
                      {" "}
                      {file1 ? (
                        <FontAwesomeIcon icon={faFileExcel} />
                      ) : (
                        <>
                          <input
                            type="file"
                            onChange={handleUploadFile}
                            name="file-input"
                            id="file-input"
                            className={cx("file-input__input")}
                          />
                          <label
                            className={cx("file-input__label")}
                            htmlFor="file-input"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="upload"
                              class="svg-inline--fa fa-upload fa-w-16"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                              ></path>
                            </svg>
                            <span>Upload</span>
                          </label>
                        </>
                      )}
                    </>
                  )}
                  {/* {file1 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )} */}
                </td>
                <td>
                  {item.giaygioithieu}
                  {file9 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile9}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )}
                </td>
                <td>
                  {file2 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile2}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )}
                </td>
                <td>
                  {file3 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile3}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )}
                </td>
                <td>
                  {file4 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile4}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )}
                </td>
                <td>
                  {file5 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile5}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )}
                </td>
                <td>
                  {file6 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile6}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )}
                </td>{" "}
                <td>
                  {file7 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile7}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )}
                </td>
                <td>
                  {file8 ? (
                    <FontAwesomeIcon icon={faFileExcel} />
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handleUploadFile8}
                        name="file-input"
                        id="file-input"
                        className={cx("file-input__input")}
                      />
                      <label
                        className={cx("file-input__label")}
                        htmlFor="file-input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="upload"
                          class="svg-inline--fa fa-upload fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                          ></path>
                        </svg>
                        <span>Upload</span>
                      </label>
                    </>
                  )}
                </td>
                <td onClick={() => handleSubmit(item.mssv)}>Cập nhật</td>
              </tr>
            ))}
        </tbody>
      </table>
      {danhsachXetKetNap && (
        <>
          <Button outline onClick={addDangVien}>
            Thêm vào danh sách kết nạp đảng
          </Button>
          {danhsachXetKetNap.length > 0 && (
            <DanhSachXetKetNapDang
              data={danhsachXetKetNap}
              setDanhSachXetKetNap={setDanhSachXetKetNap}
            />
          )}
        </>
      )}
    </div>
  );
}

export default KetnapDang;
