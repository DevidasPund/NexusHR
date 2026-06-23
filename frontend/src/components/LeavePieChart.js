import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function LeavePieChart({ leaveData }) {

  const data = {
    labels: [
      "Approved",
      "Pending",
      "Rejected"
    ],
    datasets: [
      {
        data: [
          leaveData?.approved || 0,
          leaveData?.pending || 0,
          leaveData?.rejected || 0
        ],
        backgroundColor: [
          "#198754",
          "#ffc107",
          "#dc3545"
        ],
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <Pie
      data={data}
      options={options}
    />
  );
}

export default LeavePieChart;