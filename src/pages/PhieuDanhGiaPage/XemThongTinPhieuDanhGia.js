import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import httpRequest from "../../utils/HttpRequest";
import ReadExcel from "./ReadExcel";

function XemThongTinPhieuDanhGia() {
  const [phieuDanhGiaById, setPhieuDanhGiaById] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams);
  const id = searchParams.get("id");
  useEffect(() => {
    getPhieuDanhGiaById(id);
  }, [id]);
  const getPhieuDanhGiaById = async (id) => {
    try {
      const response1 = await httpRequest.get(`/api/v1/phieudanhgia/${id}`, {
        responseType: "blob",
      });
      console.log(response1.data);
      const blobData = response1.data;
      const arrayBuffer = await blobData.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
      setPhieuDanhGiaById(jsonData);
    } catch (error) {}
  };

  console.log(phieuDanhGiaById);
  return (
    <>
      <ReadExcel data={phieuDanhGiaById} setData={setPhieuDanhGiaById} />
    </>
  );
}

export default XemThongTinPhieuDanhGia;
