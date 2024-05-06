import className from "classnames/bind";
import styles from "./Headersearch.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import { useEffect, useRef, useState } from "react";
import WapperPopper from "../../../compoment/Popper/Wapper";
import useDebounce from "../../../hooks/useDebound";
const cx = className.bind(styles);
function SearchHeader() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValues, setSearchValues] = useState("");
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const usedebounce = useDebounce(searchValues, 500);
  const handleHideResult = () => {
    setShowResult(false);
  };
  useEffect(() => {
    if (!usedebounce.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    fetch(
      `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        usedebounce
      )}&type=less`
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        console.log(searchResult);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [usedebounce]);
  return (
    <HeadlessTippy
      interactive
      visible={showResult && searchResult.length > 0}
      onClickOutside={handleHideResult}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex="-1" {...attrs}>
          <WapperPopper>
            <h4 className={cx("search-title")}>Kết quả tìm kiếm</h4>
          </WapperPopper>
        </div>
      )}
    >
      <div className={cx("search")}>
        <input
          ref={inputRef}
          placeholder="Search đảng viên.."
          spellCheck={false}
          value={searchValues}
          onFocus={() => setShowResult(true)}
          onChange={(e) => setSearchValues(e.target.value)}
        />
        {!!searchValues && !loading && (
          <button
            className={cx("clear")}
            onClick={() => {
              setSearchValues("");
              inputRef.current.focus();
              setShowResult(false);
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && (
          <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
        )}
        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default SearchHeader;
