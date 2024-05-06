import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../compoment/Button";
import {
  faCheck,
  faClose,
  faEyeLowVision,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./QuanLyDanhSachDangVien.module.scss";
import httpRequest from "../../utils/HttpRequest";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
function ModalXacNhan({
  setChecked,
  checked,
  setDanhSachDangViens,
  isModalXacNhan,
  setModalXacNhan,
}) {
  const getListDanhSach = async () => {
    try {
      const response = await httpRequest.get("/api/ds/getList");
      if (response.data.isSuccess) {
        setDanhSachDangViens(response.data.data);
      } else {
        toast.error("Lỗi sever");
      }
    } catch (error) {}
  };
  const handleDelete = async (checked) => {
    console.log(checked);
    try {
      const response = await httpRequest.post(
        "/api/ds/deleteByListId",
        checked
      );

      console.log(response);
      toast.success(response.data.message);
      setModalXacNhan(!isModalXacNhan);
      getListDanhSach();
      setChecked([]);
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
        <div className="overlay">
          <div className={cx("form_edit_password", "relative")}>
            <div className="heading_form">
              <span className="heading_text">Xác nhận xóa</span>
              <span
                onClick={() => setModalXacNhan(!isModalXacNhan)}
                id="icon_close"
                className={cx(
                  "absolute right-[10px] font-bold text-[#11d811] text-[20px] cursor-pointer p-2 top-0"
                )}
              >
                <FontAwesomeIcon icon={faClose} />
              </span>
            </div>
            <div className="container_form">
              <div className="flex justify-between">
                <span>Bạn có muốn xóa các bản ghi vừa chọn không?</span>
                <div className="w-full flex "></div>
              </div>
              <div className="w-full justify-end flex items-center">
                <Button
                  className={cx("btn_add", "color")}
                  leftIcon={<FontAwesomeIcon icon={faCheck} />}
                  onClick={() => handleDelete(checked)}
                >
                  Yes
                </Button>
                <Button
                  className={cx("btn_delete", "color", "text-[red]")}
                  leftIcon={<FontAwesomeIcon icon={faClose} />}
                  onClick={() => setModalXacNhan(!isModalXacNhan)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalXacNhan;
