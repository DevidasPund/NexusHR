
import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminAttendance() {

  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");

  const [summary, setSummary] = useState({
    totalAttendance: 0,
    presentCount: 0,
    absentCount: 0,
    leaveCount: 0
  });

  useEffect(() => {
    loadAttendance();
    loadSummary();

    const interval = setInterval(() => {
      loadAttendance();
      loadSummary();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadAttendance = async (
    url = "/attendance/history"
  ) => {
    try {
      const response = await API.get(url);
      setAttendance(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSummary = async () => {
    try {
      const response =
        await API.get("/attendance/summary");

      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAttendance =
    attendance.filter((item) =>
      String(item.employeeId)
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      String(item.attendanceStatus || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const attendancePercentage =
    summary.totalAttendance > 0
      ? (
          (summary.presentCount /
            summary.totalAttendance) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: "280px",
          background: "#f4f7fc",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px"
            }}
          >
            <div className="card-body text-white">
              <h2>📅 Attendance Dashboard</h2>
              <p className="mb-0">
                Real-Time Employee Attendance Monitoring
              </p>
            </div>
          </div>

          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h6>Total Records</h6>
                  <h2 className="text-primary">
                    {summary.totalAttendance}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h6>Present</h6>
                  <h2 className="text-success">
                    {summary.presentCount}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h6>Absent</h6>
                  <h2 className="text-danger">
                    {summary.absentCount}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h6>Attendance %</h6>
                  <h2 className="text-warning">
                    {attendancePercentage}%
                  </h2>
                </div>
              </div>
            </div>

          </div>

          <div className="card shadow border-0 mb-4">
            <div className="card-body">

              <div className="mb-3">

                <button
                  className="btn btn-primary me-2"
                  onClick={() =>
                    loadAttendance("/attendance/today")
                  }
                >
                  Today
                </button>

                <button
                  className="btn btn-success me-2"
                  onClick={() =>
                    loadAttendance("/attendance/month")
                  }
                >
                  Monthly
                </button>

                <button
                  className="btn btn-dark me-2"
                  onClick={() =>
                    loadAttendance("/attendance/history")
                  }
                >
                  History
                </button>

                <button
                  className="btn btn-info"
                  onClick={() => {
                    loadAttendance();
                    loadSummary();
                  }}
                >
                  Refresh
                </button>

              </div>

              <input
                type="text"
                className="form-control"
                placeholder="Search Employee ID or Status"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>
          </div>

          <div className="card shadow border-0">
            <div className="card-body">

              <h4 className="mb-4">
                Attendance Records
              </h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Date</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredAttendance.length > 0 ? (

                      filteredAttendance.map((item) => (

                        <tr key={item.id}>

                          <td>{item.id}</td>

                          <td>{item.employeeId}</td>

                          <td>{item.employeeName}</td>

                          <td>
                            {item.attendanceDate}
                          </td>

                          <td>
                            {item.checkInTime || "-"}
                          </td>

                          <td>
                            {item.checkOutTime || "-"}
                          </td>

                          <td>

                            <span
                              className={
                                item.attendanceStatus === "PRESENT"
                                  ? "badge bg-success"
                                  : item.attendanceStatus === "ABSENT"
                                  ? "badge bg-danger"
                                  : item.attendanceStatus === "LEAVE"
                                  ? "badge bg-warning text-dark"
                                  : "badge bg-secondary"
                              }
                            >
                              {item.attendanceStatus}
                            </span>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>
                        <td
                          colSpan="7"
                          className="text-center"
                        >
                          No Attendance Records Found
                        </td>
                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminAttendance;

