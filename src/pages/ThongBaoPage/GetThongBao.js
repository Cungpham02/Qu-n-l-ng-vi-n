import classNames from "classnames/bind";
import styles from "./ListThongBao.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function GetThongBao({ getThongBaoById, setModal, modal }) {
  console.log(getThongBaoById);
  return (
    <div
      className={cx(
        "fixed z-10 w-full top-0 h-[100vh] bg-[#3d3b3b23]",
        "bg_color"
      )}
    >
      <div
        className={cx(
          "modal_form_edit_password mx-auto h-auto w-[50%] ",
          "mx_top"
        )}
      >
        <div className="overlay">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">Thông tin chi tiết lịch họp</span>
              <span
                onClick={() => setModal(!modal)}
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
                  Tiều đề :{" "}
                  <span className="font-[700]">{getThongBaoById.tieude}</span>
                </div>
                <div className={cx("form_input", "text_form")}>
                  Nội dung cuộc họp :{" "}
                  <span className="font-[700]">{getThongBaoById.noidung}</span>
                </div>
                <div className={cx("form_input", "text_form")}>
                  Địa điểm :{" "}
                  <span className="font-[700]">{getThongBaoById.diadiem}</span>
                </div>
                <div className={cx("form_input", "text_form")}>
                  Thời gian họp :{" "}
                  <span className="font-[700]">{getThongBaoById.ngayhop}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetThongBao;
