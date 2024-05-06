import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import httpRequest from "../../../utils/HttpRequest";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function ModalAddDangVien({
  isModalAddDV,
  setModalDangVien,
  setListDangVien,
  listDangVien,
}) {
  //Tạm trú
  const [provinces_tamtru, setProvincesTamtru] = useState([]);
  const [selectedProvince_tamtru, setSelectedProvinceTamtru] = useState("");
  const [selectedQuanHuyen_tamtru, setSelectedQuanHuyenTamtru] = useState("");
  const [phuongxa_tamtru, setPhuongXaTamtru] = useState("");
  const [districts_tamtru, setDistrictsTamtru] = useState([]);
  const [wards_tamtru, setWardsTamtru] = useState([]);
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
  // {*form  //Mã định danh, họ và tên, giới tính, ngày sinh, nơi sinh, quê
  // quán, nơi thường trú, nơi tạm trú, dân tộc, tôn giáo, nghề nghiệp,
  // ngày vào đảng, ngày chính thức, ngày vào đoàn, số CCCD, trình độ
  // lý luận chính trị, Tóm tắt quá trình hoạt động và công tác, khen
  // thưởng, kỷ luật */}
  const [quequan, setQueQuan] = useState("");
  const [thuongtru, setThuongtru] = useState("");
  const [tamtru, setTamtru] = useState("");
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
  const [gmail, setGmail] = useState("");
  const [sodienthoai, setSoDienThoai] = useState("");
  const [lopquanly, setLopQuanLy] = useState("");
  const [khoaquanly, setKhoaQuanLy] = useState("");
  const [mdd, setMaDinhDanh] = useState("");

  //erro
  const [erroCCCD, setErrorCCCD] = useState();
  const [erroNgaySinh, setErrorNgaySinh] = useState();
  const [erroSosanh, setErroSoSanh] = useState("");
  const [erroFullName, setErrorFullname] = useState("");
  useEffect(() => {
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
  const handldelNgayVaoDang = (e) => {
    const value = e.target.value;
    setNgayvaoDang(value);
    if (value) {
      const birthDate = new Date(ngaysinh); // Chuyển ngaysinh thành đối tượng Date
      const joinDate = new Date(value); // Chuyển ngày vào đảng thành đối tượng Date
      const age = joinDate.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        toast.error("Đảng viên phải đủ 18 tuổi");
        return;
      }
    }
  };
  const handleNgayChinhThuc = (e) => {
    setNgaychinhthuc(e.target.value);
    if (e.target.value) {
      const ngayvaodangAdd = new Date(ngayvaodang); // Chuyển ngày vào đảng thành đối tượng Date
      const joinDate = new Date(e.target.value); // Chuyển ngày chính thức thành đối tượng Date

      // So sánh cả ngày, tháng và năm
      if (
        joinDate.getFullYear() < ngayvaodangAdd.getFullYear() + 1 ||
        (joinDate.getFullYear() === ngayvaodangAdd.getFullYear() + 1 &&
          joinDate.getMonth() < ngayvaodangAdd.getMonth()) ||
        (joinDate.getFullYear() === ngayvaodangAdd.getFullYear() + 1 &&
          joinDate.getMonth() === ngayvaodangAdd.getMonth() &&
          joinDate.getDate() < ngayvaodangAdd.getDate())
      ) {
        toast.error("Ngày chính thức sau 1 năm kể từ ngày vào đảng");
        return;
      }
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
    setQueQuan(selectedProvince + "," + selectedQuanHuyen + "," + value);
  };

  const handleProvinceChangeTT = (event) => {
    const selectedProvinceNameTT = event.target.value;
    console.log(selectedProvinceNameTT);
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
      console.log(wards);
    } else {
      setWardsTT([]);
    }
  };
  const handleChangePhuongXaTT = (e) => {
    const value = e.target.value;
    setPhuongXaTT(value);
    setThuongtru(
      selectedProvince_tt + "," + selectedQuanHuyen_tt + "," + value
    );
  };
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
    setTamtru(
      selectedProvince_tamtru + "," + selectedQuanHuyen_tamtru + "," + value
    );
  };
  const handleProvinceChangeNS = (event) => {
    const selectedProvinceNameNS = event.target.value;
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
    setNoiSinh(selectedProvince_ns + "," + selectedQuanHuyen_ns + "," + value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (mdd === "") {
      toast.error("Bạn chưa nhập mã định danh");
      return;
    } else if (ngaysinh === "") {
      toast.error("Bạn chưa nhập ngày sinh");
      return;
    } else if (gmail === "") {
      toast.error("Bạn chưa nhập gmail");
      return;
    } else if (cccd === "") {
      toast.error("Bạn chưa nhập thông tin căn cước công dân");
      return;
    } else if (ngayvaodang === "") {
      toast.error("Ngày vào đảng không được để trống");
      return;
    } else if (noisinh === "") {
      toast.error("Nơi sinh không có dữ liệu");
      return;
    } else if (dantoc === "") {
      toast.error("Bạn chưa nhập dân tộc");
      return;
    } else if (tongiao === "") {
      toast.error("Bạn chưa nhập tôn giáo");
      return;
    } else if (khenthuong === "") {
      toast.error("Bạn chưa nhập khen thưởng");
      return;
    } else if (kyluat === "") {
      toast.error("Bạn chưa nhập kỷ luật");
      return;
    } else if (sodienthoai === "") {
      toast.error("Bạn chưa nhập số điện thoại");
      return;
    } else if (lopquanly === "") {
      toast.error("Bạn chưa nhập lớp quản lý");
      return;
    } else if (khoaquanly === "") {
      toast.error("Bạn chưa nhập khoa quản lý");
      return;
    } else if (quatrinhhd === "") {
      toast.error("Bạn chưa nhập quá trình công tác");
      return;
    } else if (nghenghiep === "") {
      toast.error("Bạn chưa nhập nghề nghiệp");
      return;
    } else {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("gioitinh", gioitinh);
      formData.append("ngaysinh", ngaysinh);
      formData.append("quequan", quequan);
      formData.append("thuongtru", thuongtru);
      formData.append("noisinh", noisinh);
      formData.append("dantoc", dantoc);
      formData.append("tongiao", tongiao);
      formData.append("cccd", cccd);
      formData.append("ngayvaodang", ngayvaodang);
      formData.append("ngaychinhthuc", ngaychinhthuc);
      formData.append("ngayvaodoan", ngayvaodoan);
      formData.append("nghenghiep", nghenghiep);
      formData.append("khenthuong", khenthuong);
      formData.append("kyluat", kyluat);
      formData.append("quatrinhhd", quatrinhhd);
      formData.append("trinhdo", trinhdo);
      formData.append("tamtru", tamtru);
      formData.append("gmail", gmail);
      formData.append("sodienthoai", sodienthoai);
      formData.append("lopquanly", lopquanly);
      formData.append("khoaquanly", khoaquanly);

      try {
        // Gửi formData lên máy chủ bằng Axios
        const response = await httpRequest.post("/api/dv/addDangVien", {
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
          tamtru,
          gmail,
          sodienthoai,
          lopquanly,
          khoaquanly,
          mdd,
        });
        if (response.data.isSuccess) {
          toast.success(response.data.message);
          setModalDangVien(!isModalAddDV);
          setListDangVien([...listDangVien, response.data.data]);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className={cx("fixed z-10 w-full top-0 h-[100vh]", "bg_color")}>
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[80%] ",
          "mx_top"
        )}
      >
        <div className="overlay">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">Thêm mới đảng viên</span>
              <span
                id="icon_close"
                className={cx(
                  "absolute right-[10px] font-bold text-[#11d811] text-[20px] cursor-pointer p-2 top-0"
                )}
                onClick={() => setModalDangVien(!isModalAddDV)}
              >
                X
              </span>
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
                          className={cx("password")}
                          id="password"
                          name="password"
                          type="text"
                          onChange={(e) => setMaDinhDanh(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx("form_input", "text_form")}>
                    <label>Họ và tên</label>
                    <div className="input_icon">
                      <div className="input_form">
                        <input
                          value={fullname}
                          className={cx("password_moi")}
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
                          className={cx("password_moi")}
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
                          className={cx("password_moi")}
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
                {/* Quê quán */}
                <div className={cx("form_input", "form_input_quequan")}>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="province">Quê quán</label>
                    <select
                      id="province"
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                    >
                      <option value="">-- Chọn tỉnh/thành phố --</option>
                      {provinces.length > 0 &&
                        provinces.map((province) => (
                          <option key={province.name} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={cx("quequan_form")}>
                    <label htmlFor="ward">*</label>
                    <select
                      value={selectedQuanHuyen}
                      onChange={handleQuan}
                      id="district"
                    >
                      <option value="">-- Chọn quận/huyện --</option>
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
                      id="ward"
                    >
                      <option value="">-- Chọn phường/xã --</option>
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
                      id="province"
                      value={selectedProvince_ns}
                      onChange={handleProvinceChangeNS}
                    >
                      <option value="">-- Chọn tỉnh/thành phố --</option>
                      {provinces_ns.length > 0 &&
                        provinces_ns.map((province) => (
                          <option key={province.name} value={province.name}>
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
                      id="district"
                    >
                      <option value="">-- Chọn quận/huyện --</option>
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
                      <option value="">-- Chọn phường/xã --</option>
                      {wards_ns.map((ward) => (
                        <option key={ward.name} value={ward.name}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Thường trú */}
                <div className={cx("form_input", "form_input_quequan")}>
                  <div className={cx("quequan_form")}>
                    <label htmlFor="province">Thường trú</label>
                    <select
                      id="province"
                      value={selectedProvince_tt}
                      onChange={handleProvinceChangeTT}
                    >
                      <option value="">-- Chọn tỉnh/thành phố --</option>
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
                      id="district"
                    >
                      <option value="">-- Chọn quận/huyện --</option>
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
                      <option value="">-- Chọn phường/xã --</option>
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
                      <option value="">-- Chọn quận/huyện --</option>
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
                      <option value="">-- Chọn phường/xã --</option>
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
                          className={cx("password_moi")}
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
                          className={cx("password_moi")}
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
                          className={cx("password_moi")}
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
                          className={cx("password_moi")}
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
                          className={cx("password_moi")}
                          id="password_moi"
                          required
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
                          className={cx("password_moi")}
                          id="password_moi"
                          required
                          name="password_moi"
                          type="date"
                          onChange={handldelNgayVaoDang}
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
                          className={cx("password_moi")}
                          required
                          id="password_moi"
                          name="password_moi"
                          type="date"
                          onChange={(e) => handleNgayChinhThuc(e)}
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
                          className={cx("password_moi")}
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
                          className={cx("password_moi")}
                          id="password_moi"
                          name="password_moi"
                          required
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
                          className={cx("password_moi")}
                          id="password_moi"
                          name="password_moi"
                          required
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
                        required
                        className={cx("password_moi")}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        onChange={(e) => setQuaTrinhHoatDong(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="btn_Update">
                  <button
                    onClick={handleSubmit}
                    className={cx("btn_update_pass")}
                    id="btn_update_pass"
                  >
                    Thêm mới đảng viên
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddDangVien;
