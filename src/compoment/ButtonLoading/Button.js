import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import { useEffect, useRef } from "react";
import "boxicons/css/boxicons.min.css";
const cx = classNames.bind(styles);
function ButtonLoading({ children, loading, onClick }) {
  const btnRef = useRef();
  useEffect(() => {
    if (btnRef.current) {
      const btnWidth = btnRef.current.clientWidth + 29;
      btnRef.current.style.width = btnWidth + "px";
    }
  }, []);
  return (
    <button className={cx("button", "btn")} onClick={onClick}>
      <span className={cx("spiner", `${loading ? "active" : ""}`)}>
        <i className="bx bx-loader-alt bx-spin bx-flip-horizontal"></i>
      </span>
      <span className={cx("txt")}>{children}</span>
    </button>
  );
}
ButtonLoading.prototype = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
export default ButtonLoading;
