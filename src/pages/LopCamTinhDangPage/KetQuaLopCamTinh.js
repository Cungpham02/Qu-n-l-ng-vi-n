import Button from "../../compoment/Button";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import { ToastContainer, toast } from "react-toastify";
import TableKetQuaLopCamTinh from "./TableKetQuaLopCamTinh";
import { useDispatch } from "react-redux";
import { getListDvChuyenDiByDot } from "../../Store/LopCamTinhSlice";

function KetQuaLopCamTinh() {
  const [file, setFile] = useState(null);
  const [danhsachKetQua, setDanhSachKetQua] = useState([]);
  const [danhsachCamTinh, setLopCamTinh] = useState([]);
  const [dotKetQuaLopCamTinh, setDotKetQuaLopCamTinh] = useState("");
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  useEffect(() => {
    get_List_dv_cd();
  }, []);
  const get_List_dv_cd = async () => {
    dispatch(getListDvChuyenDiByDot(dotKetQuaLopCamTinh)).then((result) => {
      console.log(result);
      if (result.payload) {
        setLopCamTinh(result.payload);
      }
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await httpRequest.post(
        "/readExcelDanhSachCamTinh",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (compareData(response.data, danhsachCamTinh) === false) {
        toast.error("File tải lên không trùng với danh sách học lớp cảm tình");
        setDanhSachKetQua([]);
      } else {
        setDanhSachKetQua(response.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleChangleOption = async (e) => {
    const value = e.target.value;
    setDotKetQuaLopCamTinh(value);
    try {
      const existingListResponse = await httpRequest.get(
        `/api/ketquaLopCamTinh/ds_kqLopCamTinh?dot=${value}`
      );
      setDanhSachKetQua(existingListResponse.data.data);
    } catch (error) {
      console.error("Error retrieving existing list:", error);
    }
  };
  const compareData = (list1, list2) => {
    console.log(list1, list2);
    // Nếu hai danh sách có độ dài khác nhau, không cần so sánh
    if (list1.length !== list2.length) {
      console.log("Hai danh sách có độ dài khác nhau");
      return;
    }

    // Lặp qua từng phần tử của danh sách
    for (let i = 0; i < list1.length; i++) {
      // Tạo một bản sao của từng phần tử để bỏ qua trường xeploai
      const record1 = { ...list1[i] };
      const record2 = { ...list2[i] };

      // Bỏ qua trường xeploai
      delete record1.ketqua;
      delete record2.dottrongnam;
      record1.ngaysinh = record1.ngaysinh.slice(0, 10);
      record1.diemTrungBinh = record1.diemTrungBinh.toString();
      record1.mssv = record1.mssv.toString();
      record1.id = record1.id.toString();
      record2.id = record2.id.toString();
      console.log(record1);
      console.log(record2);
      // So sánh các phần tử có giống nhau không
      if (
        record2.ngaysinh === record1.ngaysinh &&
        record2.diemTrungBinh === record1.diemTrungBinh &&
        record2.mssv === record1.mssv &&
        record2.id === record1.id &&
        record2.fullname === record1.fullname &&
        record2.quequan === record1.quequan
      ) {
        return true;
      } else {
        return false;
      }
    }
    console.log("Hai danh sách giống nhau");
  };

  return (
    <>
      <Button outline>
        <select value={dotKetQuaLopCamTinh} onChange={handleChangleOption}>
          <option>----Chọn đợt-----</option>
          <option>Đợt 1 năm 2023-2024</option>
          <option>Đợt 2 năm 2023-2024</option>
          <option>Đợt 1 năm 2024-2025</option>
        </select>
      </Button>
      <form className="p-20" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <Button outline type="submit">
          Upload file kết quả
        </Button>
      </form>
      {danhsachKetQua.length > 0 && (
        <TableKetQuaLopCamTinh
          data={danhsachKetQua}
          setDanhSachKetQua={setDanhSachKetQua}
          dot={dotKetQuaLopCamTinh}
        />
      )}

      <ToastContainer autoClose={2000} />
    </>
  );
}

export default KetQuaLopCamTinh;
