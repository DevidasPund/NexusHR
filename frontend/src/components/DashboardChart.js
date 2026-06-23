import {
 Bar
} from "react-chartjs-2";

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
}
from "chart.js";

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
);

function DashboardChart({ trend = [] } = {}) {
  const safeTrend = Array.isArray(trend) ? trend : [];
  const data = {
    labels: safeTrend.map((item) => item.label),
    datasets: [
      {
        label: "Attendance",
        data: safeTrend.map((item) => item.value),
        backgroundColor: "#0d6efd",
        borderRadius: 8,
        barThickness: 20
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}% present`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}

export default DashboardChart;