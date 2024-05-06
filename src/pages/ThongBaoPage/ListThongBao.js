import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import classNames from "classnames/bind";
import styles from "./ListThongBao.module.scss";
import GetThongBao from "./GetThongBao";
const cx = classNames.bind(styles);
function ListThongBao() {
  const [listThongBao, setListThongBao] = useState([]);
  const [modal, setModal] = useState(false);
  const [getThongBaoById, setGetThongBaoByID] = useState("");
  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log(username);
    getListTHongBao(username);
  }, []);
  const getListTHongBao = async (username) => {
    try {
      const response = await httpRequest.get("/api/listThongBaoBY_idDangVien", {
        params: {
          username: username,
        },
      });
      setListThongBao(response.data.data);
    } catch (error) {}
  };
  const handleInforThongBao = async (id) => {
    try {
      const response = await httpRequest.get("/api/lichhop/getLichHopById", {
        params: {
          id: id,
        },
      });
      setModal(true);
      setGetThongBaoByID(response.data.data);
    } catch (error) {}
  };
  return (
    <>
      <div className="p-[2%]">
        <span>Danh sách Thông báo</span>
        {listThongBao.length > 0 &&
          listThongBao.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleInforThongBao(item.id)}
                className={cx(
                  "px-4 py-6 bg-[#27c01f] my-5 cursor-pointer",
                  "css_titile"
                )}
              >
                <span className={cx("tieude")}>{item.tieude}</span>
              </div>
            );
          })}
      </div>
      {modal && (
        <GetThongBao
          setModal={setModal}
          modal={modal}
          getThongBaoById={getThongBaoById}
        />
      )}
    </>
  );
}

export default ListThongBao;
