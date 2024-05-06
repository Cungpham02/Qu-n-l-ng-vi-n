import { useEffect, useState } from "react";
import { getRoleApi } from "../../ApiServices/homeService";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { UserData } from "./Data";
import PieChart from "../../layout/compoments/PieChart/PieChart";
import { useDispatch } from "react-redux";
import { getListDanhSachDangVienChuaDanhGiaTheoDot } from "../../Store/ThongKeSlice";

Chart.register(CategoryScale);
function ThongKePage() {
  const [roles, setRoles] = useState([]);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoleApi();
        setRoles(response);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate("/404"); // Redirect to a 403 page
        } else {
          navigate("/404"); // Redirect to a 404 page for other errors
        }
      }
    };

    fetchData();
  }, []);

  console.log(roles);

  return (
    <div className="p-[2%]">
      {" "}
      {roles.map((item) => {
        if (item === "ROLE_DV") {
          return (
            <>
              <div className="w-[40%] h-[300px]">
                <PieChart chartData={userData} />
              </div>
            </>
          );
        } else if (item === "ROLE_BT") {
          return <>Thống kê cho Bí thư</>;
        }
      })}
    </div>
  );
}

export default ThongKePage;
