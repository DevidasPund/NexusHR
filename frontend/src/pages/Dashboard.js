import React, {
useEffect,
useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function Dashboard() {

const [loading, setLoading] =
useState(true);

const [data, setData] =
useState({


  totalEmployees: 0,
  totalDepartments: 0,
  totalAttendance: 0,
  pendingLeaves: 0,
  approvedLeaves: 0,
  activeEmployees: 0,
  totalSalary: 0

});


useEffect(() => {


loadDashboard();

const interval =
  setInterval(() => {

    loadDashboard();

  }, 30000);

return () =>
  clearInterval(interval);


}, []);

const loadDashboard =
async () => {


  try {

    const response =
      await API.get(
        "/dashboard"
      );

    setData(
      response.data
    );

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

};


const chartData = {


labels: [

  "Employees",
  "Departments",
  "Attendance",
  "Pending Leaves",
  "Approved Leaves"

],

datasets: [

  {

    label:
      "NexusHR Analytics",

    data: [

      data.totalEmployees,
      data.totalDepartments,
      data.totalAttendance,
      data.pendingLeaves,
      data.approvedLeaves

    ],

    backgroundColor: [

      "#2563eb",
      "#16a34a",
      "#f59e0b",
      "#dc2626",
      "#7c3aed"

    ]

  }

]


};

if (loading) {


return (

  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      height: "100vh"
    }}
  >

    <h2>
      Loading Dashboard...
    </h2>

  </div>

);


}

return (


<div className="d-flex">

  <Sidebar />

  <div
    className="flex-grow-1"
    style={{
     
      background: "#f4f7fe",
      minHeight: "100vh"
    }}
  >

    <Navbar />

    <div className="container-fluid p-4">

      {/* Hero Section */}

      <div
        className="card border-0 shadow-lg mb-4"
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)",
          borderRadius: "20px"
        }}
      >

        <div className="card-body text-white">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h2>
                🚀 NexusHR Dashboard
              </h2>

              <p className="mb-0">
                Real-Time Human Resource
                Management System
              </p>

            </div>

            <button
              className="btn btn-light"
              onClick={
                loadDashboard
              }
            >
              🔄 Refresh
            </button>

          </div>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="row g-4">

        <div className="col-md-3">

          <div
            className="card border-0 shadow"
            style={{
              height: "140px",
              borderRadius: "15px"
            }}
          >

            <div className="card-body text-center">

              <h6>
                👨‍💼 Employees
              </h6>

              <h2 className="text-primary">
                {data.totalEmployees}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className="card border-0 shadow"
            style={{
              height: "140px",
              borderRadius: "15px"
            }}
          >

            <div className="card-body text-center">

              <h6>
                🏢 Departments
              </h6>

              <h2 className="text-success">
                {data.totalDepartments}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className="card border-0 shadow"
            style={{
              height: "140px",
              borderRadius: "15px"
            }}
          >

            <div className="card-body text-center">

              <h6>
                📅 Attendance
              </h6>

              <h2 className="text-warning">
                {data.totalAttendance}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className="card border-0 shadow"
            style={{
              height: "140px",
              borderRadius: "15px"
            }}
          >

            <div className="card-body text-center">

              <h6>
                🌴 Pending Leaves
              </h6>

              <h2 className="text-danger">
                {data.pendingLeaves}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Second Row */}

      <div className="row g-4 mt-1">

        <div className="col-md-3">

          <div
            className="card border-0 shadow"
            style={{
              height: "140px",
              borderRadius: "15px"
            }}
          >

            <div className="card-body text-center">

              <h6>
                ✅ Approved Leaves
              </h6>

              <h2 className="text-success">
                {data.approvedLeaves}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className="card border-0 shadow"
            style={{
              height: "140px",
              borderRadius: "15px"
            }}
          >

            <div className="card-body text-center">

              <h6>
                🟢 Active Employees
              </h6>

              <h2 className="text-primary">
                {data.activeEmployees}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className="card border-0 shadow"
            style={{
              height: "140px",
              borderRadius: "15px"
            }}
          >

            <div className="card-body text-center">

              <h6>
                💰 Payroll
              </h6>

              <h2 className="text-success">
                ₹{data.totalSalary}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className="card border-0 shadow"
            style={{
              height: "140px",
              borderRadius: "15px"
            }}
          >

            <div className="card-body text-center">

              <h6>
                🌐 System Status
              </h6>

              <h2>
                🟢 Online
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Analytics */}

      <div
        className="card border-0 shadow-lg mt-4"
        style={{
          borderRadius: "20px"
        }}
      >

        <div className="card-body">

          <h4 className="mb-4">
            📊 HR Analytics
          </h4>

          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top"
                }
              }
            }}
          />

        </div>

      </div>

    </div>

  </div>

</div>


);

}

export default Dashboard;
