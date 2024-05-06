import { Bar } from "react-chartjs-2";

function BarChart({ chartData, chonDot }) {
  return (
    <div className="w-[50%]">
      <Bar data={chartData} options={""} />
      <h1 className="text-center text-[15px]">{chonDot}</h1>
    </div>
  );
}

export default BarChart;
