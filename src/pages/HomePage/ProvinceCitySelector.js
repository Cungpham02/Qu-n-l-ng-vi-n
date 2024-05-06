import React, { useState, useEffect } from "react";

import axios from "axios";
import { api_tinhThanh } from "../../apiTinhThanh";

const ProvinceCitySelector = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedQuanHuyen, setSelectedQuanHuyen] = useState("");
  const [phuongxa, setPhuongXa] = useState("");

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Load dữ liệu từ URL
    loadTinhThanh();
  }, []);

  const loadTinhThanh = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/daohoangson/dvhcvn/master/data/dvhcvn.json"
      );
      console.log(response);
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Error loading provinces:", error);
    }
  };

  const handleProvinceChange = (event) => {
    const selectedProvinceName = event.target.value;
    console.log(selectedProvinceName);
    setSelectedProvince(selectedProvinceName);
    // Lọc danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    const selectedProvinceData = provinces.find(
      (province) => province.name === selectedProvinceName
    );
    console.log(selectedProvinceData);
    if (selectedProvinceData) {
      setDistricts(selectedProvinceData.level2s || []);
      console.log(districts);
      setWards([]);
    } else {
      setDistricts([]);
    }
  };
  const handleQuan = (e) => {
    const selectedQuanHuyenValue = e.target.value;
    setSelectedQuanHuyen(selectedQuanHuyenValue);
    const selectedPhuongData = districts.find(
      (province) => province.name === selectedQuanHuyenValue
    );
    if (selectedPhuongData) {
      setWards(selectedPhuongData.level3s || []);
      console.log(wards);
    } else {
      setWards([]);
    }
  };
  const handleChangePhuongXa = (e) => {
    const value = e.target.value;
    setPhuongXa(value);
  };
  return (
    <div>
      <label htmlFor="province">Chọn tỉnh/thành phố:</label>
      <select
        id="province"
        value={selectedProvince}
        onChange={handleProvinceChange}
      >
        <option value="">-- Chọn tỉnh/thành phố --</option>
        {api_tinhThanh.province.length > 0 &&
          api_tinhThanh.province.map((province) => (
            <option key={province.name} value={province.name}>
              {province.name}
            </option>
          ))}
      </select>

      <label htmlFor="district">Chọn quận/huyện:</label>
      <select value={selectedQuanHuyen} onChange={handleQuan} id="district">
        <option value="">-- Chọn quận/huyện --</option>
        {districts.length > 0 &&
          districts.map((district) => (
            <option key={district.name} value={district.name}>
              {district.name}
            </option>
          ))}
      </select>
      <label htmlFor="ward">Chọn phường/xã:</label>
      <select onChange={handleChangePhuongXa} value={phuongxa} id="ward">
        <option value="">-- Chọn phường/xã --</option>
        {wards.map((ward) => (
          <option key={ward.name} value={ward.name}>
            {ward.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceCitySelector;
