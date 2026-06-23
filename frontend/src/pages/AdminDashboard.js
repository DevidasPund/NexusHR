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

function AdminDashboard() {

  const [dashboard, setDashboard] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {

    loadDashboard();
    loadEmployees();

    const interval = setInterval(() => {

      loadDashboard();
      loadEmployees();

    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const loadDashboard = async () => {

    try {

      const response =
        await API.get("/dashboard");

      setDashboard(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const loadEmployees = async () => {

    try {

      const response =
        await API.get("/employees");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const chartData = {

    labels: [
      "Employees",
      "Attendance",
      "Pending Leaves",
      "Approved Leaves",
      "Departments"
    ],

    datasets: [
      {
        label: "NexusHR Analytics",

        data: [
          dashboard.totalEmployees || 0,
          dashboard.totalAttendance || 0,
          dashboard.pendingLeaves || 0,
          dashboard.approvedLeaves || 0,
          dashboard.totalDepartments || 0
        ],

        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#20c997",
          "#dc3545"
        ],

        borderRadius: 10
      }
    ]
  };

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

          {/* Welcome Banner */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                Welcome Back Admin 👋
              </h2>

              <p className="mb-0">
                Manage Employees, Attendance,
                Payroll and Reports in Real Time
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4">

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body">

                  <h6>Total Employees</h6>

                  <h2 className="text-primary">
                    {dashboard.totalEmployees || 0}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body">

                  <h6>Active Employees</h6>

                  <h2 className="text-success">
                    {dashboard.activeEmployees || 0}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body">

                  <h6>Pending Leaves</h6>

                  <h2 className="text-warning">
                    {dashboard.pendingLeaves || 0}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body">

                  <h6>Total Payroll</h6>

                  <h2 className="text-danger">
                    ₹{dashboard.totalSalary || 0}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Analytics */}
<div className="card shadow border-0 mt-4">

  <div className="card-body">

    <h4>🏢 Department Statistics</h4>

    <hr />

    <p>
      Total Departments :
      {dashboard.totalDepartments || 0}
    </p>

  </div>

</div>
          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4 className="mb-4">
                HR Analytics Overview
              </h4>

              <Bar data={chartData} />

            </div>

          </div>

          {/* Recent Employees */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4 className="mb-3">
                Recent Employees
              </h4>

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>Photo</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Status</th>
<th>Attendance %</th>
<th>Attrition Risk</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    employees
                      .slice(0, 5)
                      .map(emp => (

                        <tr key={emp.id}>

                        <td>
  <img
    src={
      emp.profileImage
        ? `http://localhost:8080/uploads/${emp.profileImage}`
        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    }
    alt=""
    width="45"
    height="45"
    style={{
      borderRadius: "50%",
      objectFit: "cover"
    }}
  />
</td>

<td>
  {emp.firstName} {emp.lastName}
</td>

<td>
  {emp.department}
</td>

<td>
  {emp.designation}
</td>

<td>
  {emp.status}
</td>

<td>
  {emp.attendancePercentage || 0}%
</td>

<td></td>
                          <td>
                            {emp.firstName} {emp.lastName}
                          </td>

                          <td>
                            {emp.department}
                          </td>

                          <td>
                            {emp.designation}
                          </td>

                        </tr>

                      ))
                  }

                </tbody>

              </table>

            </div>

          </div>

          {/* Summary */}
<div className="row g-4 mt-2">

  <div className="col-md-3">
    <div className="card border-0 shadow">
      <div className="card-body">
        <h6>Present Today</h6>
        <h2 className="text-success">
          {dashboard.presentToday || 0}
        </h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card border-0 shadow">
      <div className="card-body">
        <h6>Absent Today</h6>
        <h2 className="text-danger">
          {dashboard.absentToday || 0}
        </h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card border-0 shadow">
      <div className="card-body">
        <h6>Attendance %</h6>
        <h2 className="text-primary">
          {dashboard.attendancePercentage || 0}%
        </h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card border-0 shadow">
      <div className="card-body">
        <h6>Approved Leaves</h6>
        <h2 className="text-info">
          {dashboard.approvedLeaves || 0}
        </h2>
      </div>
    </div>
  </div>

</div>
<div className="row mt-4">

  <div className="col-md-4">
    <div className="card shadow border-0 bg-danger text-white">
      <div className="card-body">
        <h5>⚠ High Attrition Risk</h5>
        <h2>{dashboard.highRiskEmployees || 0}</h2>
      </div>
    </div>
  </div>

  
<div className="card shadow border-0 mt-4">

  <div className="card-body">

    <h3 className="mb-4">
      🤖 AI Workforce Insights
    </h3>

    <div className="row g-4">

      <div className="col-md-4">

        <div className="card bg-danger text-white">

          <div className="card-body text-center">

            <h6>
              High Risk Employees
            </h6>

            <h2>
              {dashboard.highRiskEmployees || 0}
            </h2>

          </div>

        </div>

      </div>
<div className="card shadow border-0 mt-4">

 <div className="card-body">

  <h4>
   📈 Performance Insights
  </h4>

  <div className="row mt-3">

   <div className="col-md-4">

    <div className="card bg-success text-white">

     <div className="card-body text-center">

      <h5>Top Performers</h5>

      <h2>
       {dashboard.topPerformers || 0}
      </h2>

     </div>

    </div>

   </div>

   <div className="col-md-4">

    <div className="card bg-warning">

     <div className="card-body text-center">

      <h5>Average</h5>

      <h2>
       {dashboard.averagePerformers || 0}
      </h2>

     </div>

    </div>

   </div>

   <div className="col-md-4">

    <div className="card bg-danger text-white">

     <div className="card-body text-center">

      <h5>Low Performers</h5>

      <h2>
       {dashboard.lowPerformers || 0}
      </h2>

     </div>

    </div>

   </div>

  </div>

 </div>

</div>
      <div className="col-md-4">

        <div className="card bg-warning">

          <div className="card-body text-center">

            <h6>
              Medium Risk Employees
            </h6>

            <h2>
              {dashboard.mediumRiskEmployees || 0}
            </h2>

          </div>

        </div>

      </div>

      <div className="col-md-4">

        <div className="card bg-success text-white">

          <div className="card-body text-center">

            <h6>
              Low Risk Employees
            </h6>

            <h2>
              {dashboard.lowRiskEmployees || 0}
            </h2>

          </div>

        </div>

      </div>

    </div>
<div className="col-md-3">
  <div className="card bg-success text-white">
    <div className="card-body text-center">
      <h5>⭐ Top Performers</h5>
      <h2>
        {dashboard.topPerformers || 0}
      </h2>
    </div>
  </div>
</div>
    <div className="alert alert-info mt-4">

      <h5>
        Average Performance :
        {" "}
        {dashboard.averagePerformance || 0}%
      </h5>

      <h5>
        Top Skill Gaps :
        {" "}
        {dashboard.topSkillGaps || "None"}
      </h5>

    </div>

  </div>

</div>
</div>
<div className="card shadow border-0 mt-4">

  <div className="card-body">

    <h4>🔔 Real-Time Notifications</h4>

    <hr />

    <h5>
      Total Notifications :
      {dashboard.totalNotifications || 0}
    </h5>

    <span className="badge bg-success">
      WebSocket Connected
    </span>

  </div>

</div>
          <div className="row mt-4">

            <div className="col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>
                    Leave Summary
                  </h4>

                  <hr />

                  <h5 className="text-warning">
                    Pending Leaves :
                    {dashboard.pendingLeaves || 0}
                  </h5>

                  <h5 className="text-success">
                    Approved Leaves :
                    {dashboard.approvedLeaves || 0}
                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>
                    System Status
                  </h4>

                  <hr />

                  <h5 className="text-primary">
                    Departments :
                    {dashboard.totalDepartments || 0}
                  </h5>

                  <h5 className="text-success">
                    Attendance :
                    {dashboard.totalAttendance || 0}
                  </h5>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;