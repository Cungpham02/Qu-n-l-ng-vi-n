import { useState } from "react";
import Button from "../../../compoment/Button";
import "./AddDangVien.scss";
import httpRequest from "../../../utils/HttpRequest";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddDangVienPage() {
  const navigate = useNavigate("");
  const [listDVForm, setListForm] = useState({
    fullname: "",
    dateofbirth: "",
    gender: "",
    ethnicity: "",
    religion: "",
    hometown: "",
    partyjoindate: "",
    officialdate: "",
    classname: "",
    faculty: "",
    email: "",
  });
  const handleChange = (e, payload) => {
    let value = e.target.value;
    setListForm({ ...listDVForm, [payload]: value });
  };
  const handleSubmitFormADD = (e) => {
    e.preventDefault();
    console.log(listDVForm);
    addDangVien(listDVForm);
  };
  const addDangVien = async () => {
    try {
      const response = await httpRequest.post(
        "/api/dv/addDangVien",
        listDVForm
      );
      console.log(response);
      if (response.data.isSuccess) {
        toast.success("Thêm mới đảng viên thành công");
        setTimeout(() => {
          navigate("/dangviens/getListDv");
        }, 2000);
      } else {
        toast.error("Thêm mới thất bại");
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="content_container">
        <h1>Thêm mới đảng viên</h1>
        <form onSubmit={handleSubmitFormADD}>
          <label>FullName</label>
          <input
            value={listDVForm.fullname}
            type="text"
            id="birthday"
            onChange={(e) => handleChange(e, "fullname")}
            name="fullname"
          />
          <label for="birthday">Gender</label>
          <input
            value={listDVForm.gender}
            type="text"
            id="birthday"
            onChange={(e) => handleChange(e, "gender")}
            name="gender"
          />
          <label for="email">Email</label>
          <input
            value={listDVForm.email}
            type="text"
            id="birthday"
            onChange={(e) => handleChange(e, "email")}
            name="email"
          />
          <label for="birthday">Ethnicity</label>
          <input
            type="text"
            id="birthday"
            onChange={(e) => handleChange(e, "ethnicity")}
            name="ethnicity"
          />
          <label for="birthday">Religion</label>
          <input
            value={listDVForm.religion}
            type="text"
            id="birthday"
            onChange={(e) => handleChange(e, "religion")}
            name="religion"
          />
          <label for="birthday">Hometown</label>
          <input
            value={listDVForm.hometown}
            type="text"
            id="birthday"
            onChange={(e) => handleChange(e, "hometown")}
            name="hometown"
          />
          <label for="birthday">Partyjoindate</label>
          <input
            value={listDVForm.partyjoindate}
            type="date"
            id="birthday"
            onChange={(e) => handleChange(e, "partyjoindate")}
            name="partyjoindate"
          />
          <label for="birthday">Officialdate</label>
          <input
            value={listDVForm.officialdate}
            type="date"
            id="birthday"
            onChange={(e) => handleChange(e, "officialdate")}
            name="officialdate"
          />
          <label for="birthday">Classname</label>
          <input
            value={listDVForm.classname}
            type="text"
            id="birthday"
            onChange={(e) => handleChange(e, "classname")}
            name="classname"
          />
          <label for="birthday">faculty</label>
          <input
            value={listDVForm.faculty}
            type="text"
            id="birthday"
            onChange={(e) => handleChange(e, "faculty")}
            name="faculty"
          />
          <label for="birthday">Select your birthday:</label>
          <input
            value={listDVForm.dateofbirth}
            type="date"
            id="birthday"
            onChange={(e) => handleChange(e, "dateofbirth")}
            name="dateofbirth"
          />
          <Button>Thêm mới đảng viên</Button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddDangVienPage;
