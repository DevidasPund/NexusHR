import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

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
  const navigate = useNavigate();

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
      const res = await API.get("/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
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
        label: "HR Analytics",
        data: [
          dashboard.totalEmployees || 0,
          dashboard.totalAttendance || 0,
          dashboard.pendingLeaves || 0,
          dashboard.approvedLeaves || 0,
          dashboard.totalDepartments || 0
        ],
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f59e0b",
          "#14b8a6",
          "#dc2626"
        ]
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
          minHeight: "100vh",
          marginLeft: "280px"
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
              <h2>Welcome Back Admin 👋</h2>
              <p>
                Manage Employees, Attendance,
                Payroll and Reports in Real Time
              </p>
            </div>
          </div>

          {/* KPI Cards */}

          <div className="row g-4">

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h6>Total Employees</h6>
                  <h2 className="text-primary">
                    {dashboard.totalEmployees || 0}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h6>Active Employees</h6>
                  <h2 className="text-success">
                    {dashboard.activeEmployees || 0}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h6>Pending Leaves</h6>
                  <h2 className="text-warning">
                    {dashboard.pendingLeaves || 0}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h6>Total Payroll</h6>
                  <h2 className="text-danger">
                    ₹{dashboard.totalSalary || 0}
                  </h2>
                </div>
              </div>
            </div>

          </div>

          {/* Analytics Chart */}

          <div className="card shadow border-0 mt-4">
            <div className="card-body">
              <h4>📊 HR Analytics Overview</h4>
              <Bar data={chartData} />
            </div>
          </div>

          {/* Recent Employees */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <div className="d-flex justify-content-between mb-3">

                <h4>Recent Employees</h4>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/add-employee")
                  }
                >
                  ➕ Add Employee
                </button>

              </div>

              <div className="table-responsive">

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

                    {employees
                      .slice(0, 5)
                      .map(emp => (

                        <tr key={emp.id}>

                          <td>
                            <img
                              src={
                                emp.profileImage
                                  ? `https://nexushr-production-612e.up.railway.app/uploads/${emp.profileImage}`
                                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                              }
                              alt=""
                              width="45"
                              height="45"
                              style={{
                                borderRadius: "50%"
                              }}
                            />
                          </td>

                          <td>
                            {emp.firstName}
                            {" "}
                            {emp.lastName}
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

                          <td>
                            {emp.attritionRisk || "Low"}
                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          {/* AI Workforce Insights */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h3>🤖 AI Workforce Insights</h3>

              <div className="row g-4 mt-2">

                <div className="col-md-4">
                  <div className="card bg-danger text-white">
                    <div className="card-body text-center">
                      <h5>High Risk</h5>
                      <h2>
                        {dashboard.highRiskEmployees || 0}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-warning">
                    <div className="card-body text-center">
                      <h5>Medium Risk</h5>
                      <h2>
                        {dashboard.mediumRiskEmployees || 0}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-success text-white">
                    <div className="card-body text-center">
                      <h5>Low Risk</h5>
                      <h2>
                        {dashboard.lowRiskEmployees || 0}
                      </h2>
                    </div>
                  </div>
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