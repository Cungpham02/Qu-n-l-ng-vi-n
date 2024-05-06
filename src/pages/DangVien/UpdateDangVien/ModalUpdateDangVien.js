import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames/bind";
import Button from "../../../compoment/Button";
import { toast } from "react-toastify";
import axios, { HttpStatusCode } from "axios";
import httpRequest from "../../../utils/HttpRequest";
import { useNavigate } from "react-router-dom";
import { getListDv } from "../../../Store/DangVienSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function ModalUpdateDangVien({
  id,
  setModalEditDangVien,
  isModalEditDV,
  listDangVien,
  setListDangVien,
}) {
  console.log(id);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Quê quán
  const [quanhuyenQuequan, setquanHuyenQueQuan] = useState("");
  const [phuongxaQuequan, setphuongXaQueQuan] = useState("");
  //Tạm trú
  const [quanhuyenTamtruUpdate, setquanHuyenTamTruUpdate] = useState("");
  const [phuongxaTamTruUpdate, setphuongXaTamTruUpdate] = useState("");
  //Nơi sinh
  const [quanhuyenNoiSinhUpdate, setquanHuyenNoiSinhUpdate] = useState("");
  const [phuongxaNoiSinhUpdate, setphuongXaNoiSinhUpdate] = useState("");
  //Thường trú
  const [quanhuyenThuongTruUpdate, setquanHuyenThuongTruUpdate] = useState("");
  const [phuongxaThuongTruUpdate, setphuongXaThuongTruUpdate] = useState("");
  // Quê quán
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedQuanHuyen, setSelectedQuanHuyen] = useState("");
  const [phuongxa, setPhuongXa] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  //   Thường trú
  const [provinces_tt, setProvincesTT] = useState([]);
  const [selectedProvince_tt, setSelectedProvinceTT] = useState("");
  const [selectedQuanHuyen_tt, setSelectedQuanHuyenTT] = useState("");
  const [phuongxa_tt, setPhuongXaTT] = useState("");
  const [districts_tt, setDistrictsTT] = useState([]);
  const [wards_tt, setWardsTT] = useState([]);
  //Nơi sinh
  const [provinces_ns, setProvincesNS] = useState([]);
  const [selectedProvince_ns, setSelectedProvinceNS] = useState("");
  const [selectedQuanHuyen_ns, setSelectedQuanHuyenNS] = useState("");
  const [phuongxa_ns, setPhuongXaNS] = useState("");
  const [districts_ns, setDistrictsNS] = useState([]);
  const [wards_ns, setWardsNS] = useState([]);
  //Tạm trú
  const [provinces_tamtru, setProvincesTamtru] = useState([]);
  const [selectedProvince_tamtru, setSelectedProvinceTamtru] = useState("");
  const [selectedQuanHuyen_tamtru, setSelectedQuanHuyenTamtru] = useState("");
  const [phuongxa_tamtru, setPhuongXaTamtru] = useState("");
  const [districts_tamtru, setDistrictsTamtru] = useState([]);
  const [wards_tamtru, setWardsTamtru] = useState([]);
  // {*form  //Mã định danh, họ và tên, giới tính, ngày sinh, nơi sinh, quê
  // quán, nơi thường trú, nơi tạm trú, dân tộc, tôn giáo, nghề nghiệp,
  // ngày vào đảng, ngày chính thức, ngày vào đoàn, số CCCD, trình độ
  // lý luận chính trị, Tóm tắt quá trình hoạt động và công tác, khen
  // thưởng, kỷ luật */}
  const [quequan, setQueQuan] = useState("");
  const [thuongtru, setThuongtru] = useState("");
  const [noisinh, setNoiSinh] = useState("");
  const [fullname, setFullname] = useState("");
  const [gioitinh, setGioiTinh] = useState("");
  const [tongiao, setTonGiao] = useState("");
  const [dantoc, setDanToc] = useState("");
  const [ngaysinh, setNgaySinh] = useState("");
  const [ngayvaodang, setNgayvaoDang] = useState("");
  const [ngaychinhthuc, setNgaychinhthuc] = useState("");
  const [ngayvaodoan, setNgayvaodoan] = useState("");
  const [nghenghiep, setNgheNghiep] = useState("");
  const [cccd, setCCCD] = useState("");
  const [khenthuong, setKhenThuong] = useState("");
  const [kyluat, setKyLuat] = useState("");
  const [quatrinhhd, setQuaTrinhHoatDong] = useState("");
  const [trinhdo, setTrinhDo] = useState("");
  const [mdd, setMadinhDanh] = useState("");
  const [gmail, setGmail] = useState("");
  const [sodienthoai, setSoDienThoai] = useState("");
  const [lopquanly, setLopQuanLy] = useState("");
  const [khoaquanly, setKhoaQuanLy] = useState("");
  const [tamtru, setTamtru] = useState("");
  //erro
  const [erroCCCD, setErrorCCCD] = useState();
  const [erroNgaySinh, setErrorNgaySinh] = useState();
  const [erroSosanh, setErroSoSanh] = useState("");
  const [erroFullName, setErrorFullname] = useState("");
  useEffect(() => {
    loadDangviebn();

    // Load dữ liệu từ URL
    loadTinhThanh();
  }, []);
  const handleFullName = (e) => {
    const value = e.target.value;
    setFullname(value);
    if (value) {
      const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      // Kiểm tra xem họ và tên có chứa số không
      const numberRegex = /\d/;

      if (specialCharsRegex.test(value) || numberRegex.test(value)) {
        setErrorFullname("Họ và tên không được có ký tự chữ và số");
      } else {
        setErrorFullname("");
      }
    } else {
      setErrorFullname("Không được để trống");
    }
  };
  const handleCCCD = (event) => {
    const inputValue = event.target.value;
    setCCCD(inputValue);
    // Kiểm tra xem giá trị nhập vào có phù hợp với yêu cầu không
    if (/^\d{12}$/.test(inputValue)) {
      // Nếu hợp lệ, cập nhật giá trị CCCD và xóa thông báo lỗi
      setErrorCCCD("");
    } else {
      // Nếu không hợp lệ, hiển thị thông báo lỗi
      setErrorCCCD(
        "Số CCCD phải chứa 12 số và không chứa kí tự chữ hoặc kí tự đặc biệt"
      );
    }
  };
  const handleNgaySinh = (e) => {
    const value = e.target.value;
    setNgaySinh(value);
    if (value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        setErrorNgaySinh("Bạn phải đủ 18 tuổi trở lên để tiếp tục");
        return;
      } else {
        setErrorNgaySinh("");
      }
    } else {
      setErrorNgaySinh("Ngày sinh không được để trống");
    }
  };
  const loadTinhThanh = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/daohoangson/dvhcvn/master/data/dvhcvn.json"
      );
      setProvinces(response.data.data);
      setProvincesTT(response.data.data);
      setProvincesNS(response.data.data);
      setProvincesTamtru(response.data.data);
    } catch (error) {
      console.error("Error loading provinces:", error);
    }
  };

  // Tạm trú
  const handleProvinceChangeTamtru = (event) => {
    const selectedProvinceNameTamtru = event.target.value;
    setSelectedProvinceTamtru(selectedProvinceNameTamtru);
    // Lọc danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    const selectedProvinceData = provinces_tamtru.find(
      (province) => province.name === selectedProvinceNameTamtru
    );
    console.log(selectedProvinceData);
    if (selectedProvinceData) {
      setDistrictsTamtru(selectedProvinceData.level2s || []);
      setWardsTamtru([]);
    } else {
      setDistrictsTamtru([]);
    }
  };
  const handleQuanTamtru = (e) => {
    const selectedQuanHuyenValue = e.target.value;
    setSelectedQuanHuyenTamtru(selectedQuanHuyenValue);
    const selectedPhuongData = districts_tamtru.find(
      (province) => province.name === selectedQuanHuyenValue
    );
    if (selectedPhuongData) {
      setWardsTamtru(selectedPhuongData.level3s || []);
    } else {
      setWardsTamtru([]);
    }
  };
  const handleChangePhuongXaTamtru = (e) => {
    const value = e.target.value;
    setPhuongXaTamtru(value);
    if (
      selectedProvince_tamtru !== null &&
      selectedQuanHuyen_tamtru !== null &&
      value !== null
    ) {
      setTamtru(
        selectedProvince_tamtru + "," + selectedQuanHuyen_tamtru + "," + value
      );
    } else if (selectedProvince_tamtru === null && value === null) {
      setTamtru(
        selectedProvince_tamtru +
          "," +
          quanhuyenTamtruUpdate +
          "," +
          phuongxaTamTruUpdate
      );
    }
  };
  const handleProvinceChange = (event) => {
    const selectedProvinceName = event.target.value;
    console.log(selectedProvinceName);
    setSelectedProvince(selectedProvinceName);
    // Lọc danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    const selectedProvinceData = provinces.find(
      (province) => province.name === selectedProvinceName
    );
    console.log(selectedProvinceData);
    if (selectedProvinceData) {
      setDistricts(selectedProvinceData.level2s || []);
      console.log(districts);
      setWards([]);
    } else {
      setDistricts([]);
    }
  };
  const handleQuan = (e) => {
    const selectedQuanHuyenValue = e.target.value;
    setSelectedQuanHuyen(selectedQuanHuyenValue);
    const selectedPhuongData = districts.find(
      (province) => province.name === selectedQuanHuyenValue
    );
    if (selectedPhuongData) {
      setWards(selectedPhuongData.level3s || []);
      console.log(wards);
    } else {
      setWards([]);
    }
  };
  const handleChangePhuongXa = (e) => {
    const value = e.target.value;
    setPhuongXa(value);

    if (
      selectedProvince !== null &&
      selectedQuanHuyen !== null &&
      value !== null
    ) {
      setQueQuan(selectedProvince + "," + selectedQuanHuyen + "," + value);
    } else if (selectedQuanHuyen && value === null) {
      setQueQuan(
        selectedProvince + "," + quanhuyenQuequan + "," + phuongxaQuequan
      );
    }
  };

  const handleProvinceChangeTT = (event) => {
    const selectedProvinceNameTT = event.target.value;

    setSelectedProvinceTT(selectedProvinceNameTT);
    // Lọc danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    const selectedProvinceData = provinces_tt.find(
      (province) => province.name === selectedProvinceNameTT
    );
    console.log(selectedProvinceData);
    if (selectedProvinceData) {
      setDistrictsTT(selectedProvinceData.level2s || []);
      setWardsTT([]);
    } else {
      setDistrictsTT([]);
    }
  };
  const handleQuanTT = (e) => {
    const selectedQuanHuyenValue = e.target.value;
    setSelectedQuanHuyenTT(selectedQuanHuyenValue);
    const selectedPhuongData = districts_tt.find(
      (province) => province.name === selectedQuanHuyenValue
    );
    if (selectedPhuongData) {
      setWardsTT(selectedPhuongData.level3s || []);
      // console.log(wards);
    } else {
      setWardsTT([]);
    }
  };
  const UpdateDangVien = async (event, id) => {
    event.preventDefault();
    console.log(selectedProvince_ns, selectedQuanHuyen_ns, phuongxa_ns);
    console.log(quequan);
    try {
      const response = await httpRequest.put(
        `/api/dv/UpdateDangVien?id=${id}`,
        {
          fullname,
          ngaysinh,
          gioitinh,
          ngaychinhthuc,
          ngayvaodang,
          ngayvaodoan,
          noisinh,
          thuongtru,
          tongiao,
          khenthuong,
          kyluat,
          trinhdo,
          nghenghiep,
          cccd,
          dantoc,
          quequan,
          quatrinhhd,
          gmail,
          tamtru,
          sodienthoai,
          lopquanly,
          khoaquanly,
        }
      );
      console.log(response);
      if (response.data.isSuccess) {
        toast.success("Update đảng viên thành công");
        setModalEditDangVien(!isModalEditDV);
        dispatch(getListDv()).then((result) => {
          if (result.payload) {
            setListDangVien(result.payload);
          }
        });
      } else {
        toast.error("Update thất bại");
      }
    } catch (error) {}
  };
  const handleChangePhuongXaTT = (e) => {
    const value = e.target.value;
    setPhuongXaTT(value);
    if (
      selectedProvince_tt !== null &&
      selectedProvince_tt !== null &&
      value !== null
    ) {
      setThuongtru(
        selectedProvince_tt + "," + selectedQuanHuyen_tt + "," + value
      );
    } else if (selectedProvince_tt === null && selectedProvince_tt === null) {
      setThuongtru(
        selectedProvince_tt +
          "," +
          quanhuyenThuongTruUpdate +
          "," +
          phuongxaThuongTruUpdate
      );
    }
  };
  console.log(thuongtru);
  const handleProvinceChangeNS = (event) => {
    const selectedProvinceNameNS = event.target.value;
    console.log(selectedProvinceNameNS);
    setSelectedProvinceNS(selectedProvinceNameNS);
    // Lọc danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    const selectedProvinceData = provinces_ns.find(
      (province) => province.name === selectedProvinceNameNS
    );
    console.log(selectedProvinceData);
    if (selectedProvinceData) {
      setDistrictsNS(selectedProvinceData.level2s || []);
      setWardsNS([]);
    } else {
      setDistrictsNS([]);
    }
  };
  const handleQuanNS = (e) => {
    const selectedQuanHuyenValue = e.target.value;
    setSelectedQuanHuyenNS(selectedQuanHuyenValue);
    const selectedPhuongData = districts_ns.find(
      (province) => province.name === selectedQuanHuyenValue
    );
    if (selectedPhuongData) {
      setWardsNS(selectedPhuongData.level3s || []);
      console.log(wards_ns);
    } else {
      setWardsNS([]);
    }
  };
  const handleChangePhuongXaNS = (e) => {
    const value = e.target.value;
    setPhuongXaNS(value);
    if (
      selectedProvince_ns !== null &&
      selectedQuanHuyen_ns !== null &&
      value !== null
    ) {
      setNoiSinh(
        selectedProvince_ns + "," + selectedQuanHuyen_ns + "," + value
      );
    } else if (selectedQuanHuyen_ns === null && value === null) {
      setNoiSinh(
        selectedProvince_ns +
          "," +
          quanhuyenNoiSinhUpdate +
          "," +
          phuongxaNoiSinhUpdate
      );
    }
  };

  const loadDangviebn = async () => {
    try {
      const response = await httpRequest.get(`/api/dv/dangviens?id=${id}`);
      const request = response.data;
      console.log(request);
      setCCCD(request.cccd);
      setDanToc(request.dantoc);
      setFullname(request.fullname);
      setGioiTinh(request.gioitinh);
      setNgaySinh(request.ngaysinh);
      setNgaychinhthuc(request.ngaychinhthuc);
      setNgayvaoDang(request.ngayvaodang);
      setNgayvaodoan(request.ngayvaodoan);
      setTonGiao(request.tongiao);
      setNgheNghiep(request.nghenghiep);
      setKyLuat(request.kyluat);
      setKhenThuong(request.khenthuong);
      setQuaTrinhHoatDong(request.quatrinhhd);
      setTrinhDo(request.trinhdo);
      setThuongtru(request.thuongtru);
      setNoiSinh(request.noisinh);
      setGmail(request.gmail);
      setSoDienThoai(request.sodienthoai);
      setLopQuanLy(request.lopquanly);
      setKhoaQuanLy(request.khoaquanly);
      setQueQuan(request.quequan);
      setTamtru(request.tamtru);
      loadQueQuan(request.quequan);
      loadThuongTru(request.thuongtru);
      loadNoiSinh(request.noisinh);
      loadTamTru(request.tamtru);
      setMadinhDanh(request.mdd);
      if (request.trangthai === false) {
        setIsActive(true);
      }
    } catch (error) {}
  };
  const loadQueQuan = (quequan) => {
    const quequanArray = quequan.split(","); // Tách chuỗi thành mảng
    setSelectedProvince(quequanArray[0].trim());
    setquanHuyenQueQuan(quequanArray[1].trim());
    setphuongXaQueQuan(quequanArray[2].trim()); // Lấy phường/xã
  };
  const loadNoiSinh = (nss) => {
    const quequanArray = nss.split(","); // Tách chuỗi thành mảng
    console.log(quequanArray);

    setSelectedProvinceNS(quequanArray[0].trim());
    setquanHuyenNoiSinhUpdate(quequanArray[1].trim());
    setphuongXaNoiSinhUpdate(quequanArray[2].trim()); // Lấy phường/xã
  };
  const loadTamTru = (nss) => {
    const quequanArray = nss.split(","); // Tách chuỗi thành mảng
    console.log(quequanArray);

    setSelectedProvinceTamtru(quequanArray[0].trim());
    setquanHuyenTamTruUpdate(quequanArray[1].trim());
    setphuongXaTamTruUpdate(quequanArray[2].trim()); // Lấy phường/xã
  };
  // const loadTamTru = (tamtru) => {
  //   const quequanArray = quequan.split(","); // Tách chuỗi thành mảng
  //   setSelectedProvinceTT(quequanArray[0].trim());
  //   setquanHuyenTamTruUpdate(quequanArray[1].trim());
  //   setphuongXaTamTruUpdate(quequanArray[2].trim()); // Lấy phường/xã
  // };
  const loadThuongTru = (thuongtru) => {
    // console.log(thuongtru);
    const quequanArray = thuongtru.split(","); // Tách chuỗi thành mảng
    // console.log(quequanArray);
    setSelectedProvinceTT(quequanArray[0].trim());
    setquanHuyenThuongTruUpdate(quequanArray[1].trim());
    setphuongXaThuongTruUpdate(quequanArray[2].trim()); // Lấy phường/xã
  };
  console.log(quanhuyenThuongTruUpdate);

  return (
    <div className={cx("fixed z-10 w-full top-0 h-[100vh]", "bg_color")}>
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[80%]",
          "mx_top"
        )}
      >
        <div className="overlay">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">Sửa hồ sơ đảng viên</span>
              <FontAwesomeIcon
                icon={faClose}
                id="icon_close"
                className={cx(
                  "absolute right-[10px] z-40 text-[#3cd128] text-[20px] cursor-pointer p-2 top-0"
                )}
                onClick={() => setModalEditDangVien(!isModalEditDV)}
              />
            </div>
            <div className="container_form">
              <form>
                <div className="flex items-center gap-2">
                  {" "}
                  <div className={cx("form_input", "text_form")}>
                    <label>Mã định danh</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          disabled={true}
                          className={cx(
                            "password",
                            "opacity-65 text-[#d65555] cursor-no-drop"
                          )}
                          id="password"
                          name="password"
                          type="text"
                          value={mdd}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Họ và tên</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          disabled={isActive === true ? true : false}
                          value={fullname}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="text"
                          onChange={(e) => handleFullName(e)}
                          placeholder="Họ và tên...."
                        />
                        {erroFullName && <div>{erroFullName}</div>}
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Giới tính</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <select
                          className={cx("password_moi", { disabled: isActive })}
                          value={gioitinh}
                          onChange={(e) => setGioiTinh(e.target.value)}
                        >
                          <option>---Giới tính ---</option>
                          <option name="Nam">Nam</option>
                          <option name="Nữ">Nữ</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Ngày sinh</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={ngaysinh}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          required
                          name="password_moi"
                          type="date"
                          onChange={handleNgaySinh}
                        />
                        {erroNgaySinh && (
                          <div style={{ color: "red" }}>{erroNgaySinh}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("form_input", "form_input_quequan")}>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="province">Quê quán</label>
                    <select
                      classNames={cx("ward", "")}
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                    >
                      {provinces.length > 0 &&
                        provinces.map((province) => (
                          <option key={province.name} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={cx("quequan_form")}>
                    <label className={cx("quequan")} htmlFor="district">
                      *
                    </label>
                    <select
                      value={selectedQuanHuyen}
                      onChange={handleQuan}
                      classNames="text-[700]"
                    >
                      <option>{quanhuyenQuequan}</option>
                      {districts.length > 0 &&
                        districts.map((district) => (
                          <option key={district.name} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="ward">*</label>
                    <select
                      onChange={handleChangePhuongXa}
                      value={phuongxa}
                      classNames={cx("ward")}
                    >
                      <option value="">{phuongxaQuequan}</option>
                      {wards.map((ward) => (
                        <option key={ward.name} value={ward.name}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={cx("form_input ", "form_input_quequan")}>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="province">Nơi sinh</label>
                    <select
                      id="ward"
                      value={selectedProvince_ns}
                      onChange={handleProvinceChangeNS}
                    >
                      <option className={cx("text-[700] text-black")} value="">
                        -- Chọn tỉnh/thành phố --
                      </option>
                      {Array.isArray(provinces_ns) &&
                        provinces_ns.length > 0 &&
                        provinces_ns.map((province) => (
                          <option
                            className={cx("text-[700] text-black")}
                            key={province.name}
                            value={province.name}
                          >
                            {province.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="district">*</label>
                    <select
                      value={selectedQuanHuyen_ns}
                      onChange={handleQuanNS}
                      id="ward"
                    >
                      <option value="">{quanhuyenNoiSinhUpdate}</option>
                      {districts_ns.length > 0 &&
                        districts_ns.map((district) => (
                          <option key={district.name} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="ward">*</label>
                    <select
                      onChange={handleChangePhuongXaNS}
                      value={phuongxa_ns}
                      id="ward"
                    >
                      <option value="">{phuongxaNoiSinhUpdate}</option>
                      {wards_ns.map((ward) => (
                        <option key={ward.name} value={ward.name}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={cx("form_input", "form_input_quequan")}>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="province">Thường trú</label>
                    <select
                      id="ward"
                      value={selectedProvince_tt}
                      onChange={handleProvinceChangeTT}
                    >
                      {provinces_tt.length > 0 &&
                        provinces_tt.map((province) => (
                          <option key={province.name} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="district">*</label>
                    <select
                      value={selectedQuanHuyen_tt}
                      onChange={handleQuanTT}
                      id="ward"
                    >
                      <option value="">{quanhuyenThuongTruUpdate}</option>
                      {districts_tt.length > 0 &&
                        districts_tt.map((district) => (
                          <option key={district.name} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="ward">*</label>
                    <select
                      onChange={handleChangePhuongXaTT}
                      value={phuongxa_tt}
                      id="ward"
                    >
                      <option value="">{phuongxaThuongTruUpdate}</option>
                      {wards_tt.map((ward) => (
                        <option key={ward.name} value={ward.name}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Tạm trú */}
                <div className={cx("form_input", "form_input_quequan")}>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="province">Tạm trú</label>
                    <select
                      id="province"
                      value={selectedProvince_tamtru}
                      onChange={handleProvinceChangeTamtru}
                    >
                      <option value="">-- Chọn tỉnh/thành phố --</option>
                      {provinces_tamtru.length > 0 &&
                        provinces_tamtru.map((province) => (
                          <option key={province.name} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={cx("quequan_form")}>
                    <label htmlFor="ward">*</label>
                    <select
                      value={selectedQuanHuyen_tamtru}
                      onChange={handleQuanTamtru}
                      id="district"
                    >
                      <option value="">{quanhuyenTamtruUpdate}</option>
                      {districts_tamtru.length > 0 &&
                        districts_tamtru.map((district) => (
                          <option key={district.name} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="ward">*</label>
                    <select
                      onChange={handleChangePhuongXaTamtru}
                      value={phuongxa_tamtru}
                      id="ward"
                    >
                      <option value="">{phuongxaTamTruUpdate}</option>
                      {wards_tamtru.map((ward) => (
                        <option key={ward.name} value={ward.name}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cx("form_input", "text_form")}>
                    <label>Dân tộc</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={dantoc}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          required
                          name="password_moi"
                          type="text"
                          onChange={(e) => setDanToc(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Tôn giáo</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={tongiao}
                          required
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="text"
                          onChange={(e) => setTonGiao(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Số CCCD</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          required
                          value={cccd}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="text"
                          onChange={handleCCCD}
                        />
                        {erroCCCD && (
                          <div style={{ color: "red" }}>{erroCCCD}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={cx("form_input", "text_form")}>
                    <label>Nghề nghiệp</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          required
                          value={nghenghiep}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="text"
                          onChange={(e) => setNgheNghiep(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cx("form_input", "text_form")}>
                    <label>Ngày vào đoàn</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={ngayvaodoan}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="date"
                          onChange={(e) => setNgayvaodoan(e.target.value)}
                        />
                        {erroSosanh && (
                          <div style={{ color: "red" }}>{erroSosanh}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={cx("form_input", "text_form")}>
                    <label>Ngày vào đảng</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={ngayvaodang}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="date"
                          onChange={(e) => setNgayvaoDang(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Ngày chính thức</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={ngaychinhthuc}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="date"
                          onChange={(e) => setNgaychinhthuc(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Email</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={gmail}
                          className={cx("password_moi")}
                          id="password_moi"
                          required
                          name="password_moi"
                          type="text"
                          onChange={(e) => setGmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Số điện thoại</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={sodienthoai}
                          className={cx("password_moi")}
                          id="password_moi"
                          required
                          name="password_moi"
                          type="text"
                          onChange={(e) => setSoDienThoai(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="form_input">
                    <label>Trình độ lý luận chính trị</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={trinhdo}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="text"
                          onChange={(e) => setTrinhDo(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form_input">
                    <label>Khen thưởng</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={khenthuong}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="text"
                          onChange={(e) => setKhenThuong(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form_input">
                    <label>Kỷ luật</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={kyluat}
                          className={cx("password_moi", { disabled: isActive })}
                          id="password_moi"
                          name="password_moi"
                          type="text"
                          onChange={(e) => setKyLuat(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form_input">
                    <label>Khoa quản lý</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={khoaquanly}
                          className={cx("password_moi")}
                          id="password_moi"
                          name="password_moi"
                          required
                          type="text"
                          onChange={(e) => setKhoaQuanLy(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form_input">
                    <label>Lớp quản lý</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={lopquanly}
                          className={cx("password_moi")}
                          id="password_moi"
                          name="password_moi"
                          required
                          type="text"
                          onChange={(e) => setLopQuanLy(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form_input">
                  <label>Tóm tắt quá trình công tác</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        value={quatrinhhd}
                        className={cx("password_moi", { disabled: isActive })}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        onChange={(e) => setQuaTrinhHoatDong(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="btn_Update">
                  <Button
                    className={
                      isActive === true ? "opacity-65 bg-[#c1747493]" : ""
                    }
                    style={{
                      pointerEvents: isActive === false ? "auto" : "none",
                      cursor: isActive === false ? "pointer" : "default",
                    }}
                    green
                    leftIcon={<FontAwesomeIcon icon={faPen} />}
                    onClick={(event) => UpdateDangVien(event, id)}
                    // className={cx("btn_update_pass")}
                    id="btn_update_pass"
                  >
                    Cập nhật
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdateDangVien;
