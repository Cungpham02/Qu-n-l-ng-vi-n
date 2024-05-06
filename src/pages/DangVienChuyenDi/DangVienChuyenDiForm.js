import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../compoment/Button/Button";
import classNames from "classnames/bind";
import styles from "./DangVienChuyenDiForm.module.scss";
import httpRequest from "../../utils/HttpRequest";
import { ToastContainer, toast } from "react-toastify";
import { Profile_Api } from "../../ApiServices/userService";
const cx = classNames.bind(styles);
function DangVienChuyenDi() {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedQuanHuyen, setSelectedQuanHuyen] = useState("");
  const [phuongxa, setPhuongXa] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  //
  const [noichuyenden, setNoiChuyenDen] = useState("");
  const [diadiems, setDiaDiem] = useState("");
  const [fullname, setFullName] = useState("");
  const [ghichu, setGhiChu] = useState("");
  const [username, setUsername] = useState(() => {
    let username = localStorage.getItem("username");
    return username;
  });
  const [dangvienByUsername, setDangVienByUsername] = useState();
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const value = {
      fullname: fullname,
      noichuyenden: diadiems + "," + noichuyenden,
      ghichu: ghichu,
    };

    try {
      const response = await httpRequest.post(
        `/api/dvcdcd/yeucauchuyendi?username=${username}`,
        value
      );
      if (response.data.isSuccess) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
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
    setNoiChuyenDen(selectedProvince + "," + selectedQuanHuyen + "," + value);
  };
  const loadTinhThanh = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/daohoangson/dvhcvn/master/data/dvhcvn.json"
      );
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Error loading provinces:", error);
    }
  };
  useEffect(() => {
    // Load dữ liệu từ URL
    loadTinhThanh();

    getProfileUser();
    handleSlectUsername();
  }, []);
  const handleSlectUsername = async () => {
    try {
      const response = await httpRequest.get(
        `/api/dvcdcd/seachByUsername/${username}`
      );
      setDangVienByUsername(response.data.data);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };
  console.log(dangvienByUsername);
  async function getProfileUser() {
    const reponse = await Profile_Api(localStorage.getItem("username"));
    console.log(reponse);
    if (reponse.isSuccess) {
      setFullName(reponse.data.fullname);
    } else {
      alert("Lấy thông tin người dùng thất bại");
    }
  }
  return (
    <div className="w-[1100px] mx-auto p-4">
      <div class="tab_container">
        <input className="clear" id="tab2" type="radio" name="tabs" checked />
        <label className="labelCD" for="tab2">
          <i class="fa fa-pencil-square-o"></i>
          <span>Yêu cầu chuyển đi</span>
        </label>
        <input className="clear" id="tab1" type="radio" name="tabs" />
        <label className="labelCD" for="tab1">
          <i class="fa fa-code"></i>
          <span>Yêu cầu của bạn</span>
        </label>

        <section id="content2" class="tab-content">
          <form>
            <label className="text-black" htmlFor="fullname" id="fullname">
              Họ và tên
            </label>
            <input
              type="text"
              disabled
              className="opacity-80 bg-[#4543434f]"
              value={fullname}
            />
            <label
              className="text-black"
              htmlFor="noichuyenden"
              id="noichuyenden"
            >
              Nơi chuyển đến
            </label>
            <input
              type="text"
              value={diadiems}
              className="text-black text-[700]"
              onChange={(e) => setDiaDiem(e.target.value)}
            />
            <div className={cx("form_input", "form_input_quequan")}>
              <div className={cx("quequan_form")}>
                <label htmlFor="province" className="text-black">
                  Chọn tỉnh/thành phố:(Quê quán)
                </label>
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
                <label
                  className={cx("quequan", "text-black")}
                  htmlFor="district"
                >
                  Chọn quận/huyện:(Quê quán)
                </label>
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
                <label className="text-black" htmlFor="ward">
                  Chọn phường/xã:(Quê quán)
                </label>
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
            <label id="lydochuyendi" className="text-black" htmlFor="lydo">
              Lý do chuyển đi
            </label>
            <textarea
              value={ghichu}
              onChange={(e) => setGhiChu(e.target.value)}
              className={cx("textarea", "text-[green]")}
              id="lydochuyendi"
              rows={5}
            />
          </form>
          <Button primary onClick={(e) => handleSubmitForm(e)}>
            Gửi yêu cầu
          </Button>
        </section>
        <section
          onClick={handleSlectUsername}
          id="content1"
          class="tab-content"
        >
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                {/* <th>Ngày chuyển đi</th> */}
                <th>Nơi chuyển đi</th>
                <th>Thông báo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dangvienByUsername && dangvienByUsername.id}</td>
                <td>{dangvienByUsername && dangvienByUsername.fullname}</td>
                <td>{dangvienByUsername && dangvienByUsername.noichuyenden}</td>
                <td>
                  {dangvienByUsername &&
                  dangvienByUsername.trangthai === "0" ? (
                    <>Yêu cầu đang xử lý</>
                  ) : (
                    <></>
                  )}
                  {dangvienByUsername &&
                  dangvienByUsername.trangthai === "1" ? (
                    <>Yêu cầu đã hủy</>
                  ) : (
                    <></>
                  )}
                  {dangvienByUsername &&
                  dangvienByUsername.trangthai === "2" ? (
                    <>Hoàn thành</>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default DangVienChuyenDi;
