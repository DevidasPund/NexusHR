import React, { useEffect, useState } from "react";
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

  const [data, setData] = useState({
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

  }, []);

  const loadDashboard = async () => {

    try {

      const response =
        await API.get("/dashboard");

      setData(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const chartData = {

    labels: [
      "Employees",
      "Departments",
      "Attendance",
      "Leaves"
    ],

    datasets: [
      {
        label: "NexusHR Analytics",

        data: [
          data.totalEmployees,
          data.totalDepartments,
          data.totalAttendance,
          data.pendingLeaves
        ]
      }
    ]
  };

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">
            NexusHR Dashboard
          </h2>

          <div className="row">

            <div className="col-md-3 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Total Employees</h5>
                <h2>{data.totalEmployees}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Departments</h5>
                <h2>{data.totalDepartments}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Attendance</h5>
                <h2>{data.totalAttendance}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Pending Leaves</h5>
                <h2>{data.pendingLeaves}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Approved Leaves</h5>
                <h2>{data.approvedLeaves}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Active Employees</h5>
                <h2>{data.activeEmployees}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow text-center p-3">
                <h5>Total Salary</h5>
                <h2>₹{data.totalSalary}</h2>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow text-center p-3">
                <h5>System Status</h5>
                <h2>🟢 Online</h2>
              </div>
            </div>

          </div>

          <div className="card shadow p-4 mt-4">

            <h4>
              HR Analytics
            </h4>

            <Bar data={chartData} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;