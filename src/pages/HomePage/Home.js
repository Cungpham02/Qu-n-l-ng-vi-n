import { useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import TableDoanVienUuTu from "../../compoment/TableDoanVienUuTu";
import { ToastContainer } from "react-toastify";
import Button from "../../compoment/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [file, setFile] = useState(null);
  const [ds_doanvienuutu, setdsdoanvienuutu] = useState([]);
  const [dotDoanVienUuTu, setDotDoanVienUuTu] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const updatedSinhVienList = ds_doanvienuutu.map((sinhVien) => {
    return {
      fullname: sinhVien.fullname,
      quequan: sinhVien.quequan,
      mssv: sinhVien.mssv,
      ngaysinh: sinhVien.ngaysinh,
      diemTrungBinh: sinhVien.diemTrungBinh,
      dotdoanvienuutu: dotDoanVienUuTu,
    };
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await httpRequest.post("/readExcel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response2 = await httpRequest.post(
        "/save_daonvienuutu",
        updatedSinhVienList
      );
      console.log(response2);
      setdsdoanvienuutu(uploadResponse.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleClickOnChangleOption = async (e) => {
    const selectedDot = e.target.value;
    setDotDoanVienUuTu(selectedDot);
    try {
      const existingListResponse = await httpRequest.get(
        `/api/doanvienuutu/ds_doanvienuutu?dotdoanvienuutu=${selectedDot}`
      );
      setdsdoanvienuutu(existingListResponse.data.data);
    } catch (error) {
      console.error("Error retrieving existing list:", error);
    }
  };
  return (
    <>
      <div className="p-[4%]">
        <Button outline>
          <select value={dotDoanVienUuTu} onChange={handleClickOnChangleOption}>
            <option>----Chọn đợt-----</option>
            <option>Đợt 1 năm 2023-2024</option>
            <option>Đợt 2 năm 2023-2024</option>
            <option>Đợt 1 năm 2024-2025</option>
          </select>
        </Button>
        <div className="my-2">
          <form className="my-1" onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <div>
              <Button
                leftIcon={<FontAwesomeIcon icon={faUpload} />}
                outline
                type="submit"
              >
                Upload
              </Button>
            </div>
          </form>
        </div>
      </div>

      {Array.isArray(ds_doanvienuutu) && ds_doanvienuutu.length > 0 && (
        <TableDoanVienUuTu
          data={ds_doanvienuutu}
          setdsdoanvienuutu={setdsdoanvienuutu}
        />
      )}

      <ToastContainer autoClose={2000} />
    </>
  );
}

export default Home;
