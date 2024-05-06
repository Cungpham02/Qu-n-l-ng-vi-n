import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import classNames from "classnames/bind";
import styles from "./QuanLyDanhSachLichHop.module.scss";
import Button from "../../compoment/Button";
import { useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function ModalAddLichHop({ setModalAdd, isModalAdd, setDanhSachLichHop }) {
  const [diadiem, setDiaDiem] = useState("");
  const [noidung, setNoiDung] = useState("");
  const [tieude, setTieuDe] = useState("");
  const [thoigian, setThoiGian] = useState("");
  const [ngayhop, setNgayhop] = useState("");

  const addLichHop = async () => {
    const formattedDateTimeString =
      moment(ngayhop).format("YYYY-MM-DD hh:mm A");
    console.log(formattedDateTimeString);
    try {
      const response = await httpRequest.post("/api/lichhop/save", {
        tieude: tieude,
        diadiem: diadiem,
        noidung: noidung,
        ngayhop: formattedDateTimeString,
      });
      const response2 = await httpRequest.get("/api/lichhop/getAll");
      if (response.data.isSuccess) {
        toast.success(response.data.message);
        setDanhSachLichHop(response2.data.data);
        setModalAdd(!isModalAdd);
      }
    } catch (error) {}
  };
  return (
    <div className={cx("fixed z-10 w-full top-0 h-[100vh]", "bg_color")}>
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[40%] ",
          "mx_top"
        )}
      >
        <div className="overlay ">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">Chi tiết lịch họp</span>
              <span
                onClick={() => setModalAdd(!isModalAdd)}
                id="icon_close"
                className={cx(
                  "absolute right-[10px] font-bold text-[#11d811] text-[20px] cursor-pointer p-2 top-0"
                )}
              >
                <FontAwesomeIcon icon={faClose} />
              </span>
            </div>
            <div className="container_form">
              <div className=" items-center gap-2">
                <div className={cx("form_input", "text_form")}>
                  <label>Tiêu đề</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        value={tieude}
                        onChange={(e) => setTieuDe(e.target.value)}
                        className={cx("password_moi")}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        placeholder="Tiêu đề...."
                      />
                    </div>
                  </div>
                </div>

                <div className={cx("form_input", "text_form")}>
                  <label>Nộp dung</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        className={cx("password_moi")}
                        id="password_moi"
                        name="password_moi"
                        type="text"
                        value={noidung}
                        onChange={(e) => setNoiDung(e.target.value)}
                        placeholder="Nội dung họp...."
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form_input", "text_form")}>
                  <label>Ngày họp</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        value={ngayhop}
                        onChange={(e) => setNgayhop(e.target.value)}
                        className={cx("password_moi")}
                        type="datetime-local"
                        placeholder="Địa điểm...."
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("form_input", "text_form")}>
                  <label>Địa điểm</label>
                  <div className="input_icon">
                    <div className="input_form">
                      <input
                        value={diadiem}
                        onChange={(e) => setDiaDiem(e.target.value)}
                        className={cx("password_moi")}
                        type="text"
                        placeholder="Địa điểm...."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button outline onClick={addLichHop}>
                Thêm mới lịch họp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddLichHop;
