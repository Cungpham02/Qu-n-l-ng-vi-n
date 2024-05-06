import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
function Button({
  to,
  href,
  rounded = false,
  text = false,
  primary = false,
  green = false,
  outline = false,
  small = false,
  disabled = false,
  onClick,
  className,
  leftIcon,
  rigthIcon,
  large = false,
  children,
  ...passProps
}) {
  const props = {
    onClick,
    ...passProps,
  };
  let Compoment = "button";
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && props[key] === "function") {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Compoment = Link;
  } else if (href) {
    props.href = href;
    Compoment = "a";
  }
  const classname = cx("wrapper", {
    [className]: className,
    primary,
    outline,
    green,
    small,
    text,
    large,
    disabled,
    rounded,
  });
  return (
    <Compoment className={classname} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {rigthIcon && <span className={cx("icon")}>{rigthIcon}</span>}
    </Compoment>
  );
}

export default Button;
