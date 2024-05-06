import { useEffect, useState } from "react";

import Button from "../../compoment/Button";
import DanhSachLopCamTinhDang from "./DanhSachLopCamTinhDang";
import KetQuaLopCamTinh from "./KetQuaLopCamTinh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer } from "react-toastify";

function LopCamTinh() {
  return (
    <div className="content_container p-[1%]">
      <div class="tab_container">
        <input className="clear" id="tab2" type="radio" name="tabs" checked />
        <label className="labelCD" for="tab2">
          <i class="fa fa-pencil-square-o"></i>
          <span>Danh sách lớp cảm tình đảng</span>
        </label>
        <input className="clear" id="tab1" type="radio" name="tabs" />
        <label className="labelCD" for="tab1">
          <i class="fa fa-code"></i>
          <span>Kết quả lớp học cảm tình đảng</span>
        </label>

        <section id="content2" class="tab-content">
          <DanhSachLopCamTinhDang />
        </section>
        <section id="content1" class="tab-content">
          <KetQuaLopCamTinh />
        </section>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default LopCamTinh;
