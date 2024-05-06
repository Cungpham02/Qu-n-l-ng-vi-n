import Tippy from "@tippyjs/react/headless";
import WapperPopper from "../Wapper";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import Header from "./Header";
import { useState } from "react";
const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, items, onChange = defaultFn }) {
  const [result, setResult] = useState([{ data: items }]);
  const currentIndex = result[result.length - 1];
  const renderItems = () => {
    return currentIndex.data.map((item, index) => (
      <MenuItem
        key={index}
        data={item}
        onClick={() => {
          if (item.children) {
            setResult((prev) => [...prev, item.children]);
          } else {
            onChange(item);
          }
        }}
      />
    ));
  };
  const handleBack = () => {
    setResult((prev) => prev.slice(0, prev.length - 1));
  };
  const handleReset = () => {
    setResult((prev) => prev.slice(0, 1));
  };
  return (
    <Tippy
      interactive
      delay={[0, 500]}
      offset={[12, 8]}
      placement="bottom-end"
      onHide={handleReset}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <WapperPopper className={cx("menu-popper")}>
            {result.length > 1 && (
              <Header title={currentIndex.title} onBack={handleBack} />
            )}
            {renderItems()}
          </WapperPopper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
