import classNames from "classnames/bind";
import styles from "./ModalAddChuyenDen.module.scss";
import Button from "../../compoment/Button";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function ModalThemMoiChuyenDen({ setModal, modal, setListChuyenDen }) {
  const [selectedPartyMember, setSelectedPartyMember] = useState(null);
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [mdd, setMdd] = useState("");
  const [errorFullName, setFullNameError] = useState("");
  const [errorPhoneNumber, setPhoenNumberError] = useState("");
  const [errorMdd, setMddErr] = useState("");

  const [id, setId] = useState();
  const [listDanhSach, setListDanhSach] = useState([]);

  function isValidDangVienID(input) {
    // Kiểm tra độ dài của chuỗi

    // Kiểm tra 6 chữ số đầu tiên
    const firstSixDigits = input.substring(0, 6);
    if (!/^\d{6}$/.test(firstSixDigits)) {
      return false;
    }

    // Kiểm tra các chữ hoa
    const remainingChars = input.substring(6);
    if (!/^[A-Z]+$/.test(remainingChars)) {
      return false;
    }

    return true;
  }
  const validatePhoneNumBer = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)) {
      setPhoenNumberError("");
    } else {
      setPhoenNumberError("");
    }
  };
  const handleAddChuyenDen = async () => {
    console.log(selectedPartyMember);
    if (fullname === "") {
      setFullNameError("Họ và tên không được để trống");
    } else if (phonenumber === "") {
      setPhoenNumberError("Số điện thoại không được để trống");
    } else {
      setFullNameError("");
      setPhoenNumberError("");
      try {
        const res = await httpRequest.post("/api/dvchuyenden/add", {
          fullname: fullname,
          phonenumber: phonenumber,
          mdd: mdd,
          partyMemberInfo: selectedPartyMember,
        });
        if (res.data.isSuccess) {
          const response = await httpRequest.get(
            "/api/dvchuyenden/getListChuyenDen"
          );
          setListChuyenDen(response.data.data);
          setModal(false);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      const response = await httpRequest.get(
        "/api/dv/getListDangVienChinhThuc"
      );
      setListDanhSach(response.data.data);
    } catch (error) {}
  };
  console.log(listDanhSach);

  const handleMaDinhDanh = (e) => {
    const value = e.target.value;
    setMdd(value);
    if (isValidDangVienID(value)) {
      setMddErr("");
    } else {
      setMddErr(
        "Mã định danh bắt đầu bằng 6 chữ số và sau đó là các chữ in hoa"
      );
    }
  };
  return (
    <div
      className={cx(
        "fixed z-10 w-full items-center top-0 h-[100vh]",
        "bg_color"
      )}
    >
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[50%] bg-[#fff]",
          "mx_top"
        )}
      >
        <div className={cx("overlay p-5", "overlay_form")}>
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">
                Thêm mới đảng viên chuyển đến
              </span>
              <span
                id="icon_close"
                onClick={() => setModal(false)}
                className={cx(
                  "absolute right-[10px] text-[20px] cursor-pointer p-2 top-0",
                  "weth"
                )}
              >
                X
              </span>
            </div>
            <div className="container_form">
              <div className="form_input">
                <label>Mã định danh</label>
                <div className="input_icon">
                  <div className="icon_pass">
                    <i className="fa-solid fa-key"></i>
                  </div>
                  <div className={cx("input_form")}>
                    <input
                      type="text"
                      value={mdd}
                      onChange={(e) => handleMaDinhDanh(e)}
                    />
                  </div>
                  {errorMdd && <span className="text-[red]">{errorMdd}</span>}
                </div>
              </div>
              <div className="form_input">
                <label>Họ và tên</label>
                <div className="input_icon">
                  <div className="icon_pass">
                    <i className="fa-solid fa-key"></i>
                  </div>
                  <div className={cx("input_form")}>
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  {errorFullName && (
                    <span className="text-[red]">{errorFullName}</span>
                  )}
                </div>
              </div>

              <div className="form_input">
                <label>Số điện thoại</label>
                <div className={cx("input_form")}>
                  <input
                    type="text"
                    value={phonenumber}
                    onChange={(e) => validatePhoneNumBer(e)}
                  />
                </div>
                {errorPhoneNumber && (
                  <span className="text-[red]">{errorPhoneNumber}</span>
                )}
              </div>
              <div className="form_input">
                <label>Đảng viên hướng dẫn</label>
                <div className="input_icon">
                  <div className="icon_pass">
                    <i className="fa-solid fa-key"></i>
                  </div>

                  {/* <select
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className={cx("input_form", "w-full")}
                  >
                    <option>---Chọn đợt---</option>
                    {listDanhSach.length > 0 &&
                      listDanhSach.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.fullname}
                          </option>
                        );
                      })}
                  </select> */}
                  <select
                    value={selectedPartyMember} // Thay đổi giá trị được chọn sang selectedPartyMember
                    onChange={(e) => setSelectedPartyMember(e.target.value)} // Thay đổi cách xử lý sự kiện onChange
                    className={cx("input_form", "w-full")}
                  >
                    <option>---Chọn đảng viên---</option>
                    {listDanhSach.length > 0 &&
                      listDanhSach.map((item, index) => {
                        return (
                          <option key={index} value={JSON.stringify(item)}>
                            {item.fullname}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="btn_Update">
                <Button
                  onClick={handleAddChuyenDen}
                  className={cx("btn_add")}
                  id="btn_update_pass"
                >
                  Thêm mới
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalThemMoiChuyenDen;
