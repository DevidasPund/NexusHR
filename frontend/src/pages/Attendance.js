
import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Attendance() {

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const employeeId =
    localStorage.getItem("employeeId");

  useEffect(() => {

    loadAttendance();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const loadAttendance = async () => {

    try {

      if (!employeeId) {

        console.log("Employee ID Missing");
        return;

      }

      const response =
        await API.get(
          `/attendance/employee/${employeeId}`
        );

      setAttendance(response.data || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const checkIn = async () => {

    try {

      await API.post(
        `/attendance/checkin/${employeeId}`
      );

      alert("✅ Check In Successful");

      loadAttendance();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        "Already Checked In"
      );

    }

  };

  const checkOut = async () => {

    try {

      await API.post(
        `/attendance/checkout/${employeeId}`
      );

      alert("✅ Check Out Successful");

      loadAttendance();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        "Check In First"
      );

    }

  };

  const presentCount =
    attendance.filter(
      a =>
        a.attendanceStatus ===
        "PRESENT"
    ).length;

  const absentCount =
    attendance.filter(
      a =>
        a.attendanceStatus ===
        "ABSENT"
    ).length;

  const leaveCount =
    attendance.filter(
      a =>
        a.attendanceStatus ===
        "LEAVE"
    ).length;

  const attendancePercentage =
    attendance.length > 0
      ? (
          presentCount /
          attendance.length
        ) * 100
      : 0;

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayAttendance =
    attendance.find(
      a =>
        a.attendanceDate ===
        today
    );

  const filteredAttendance =
    attendance.filter(item =>
      String(item.attendanceDate)
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h3>Loading...</h3>
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

          {/* Hero */}

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
                📅 Attendance Dashboard
              </h2>

              <p>
                Real-Time Workforce Attendance
              </p>

              <h5>
                {currentTime.toLocaleDateString()}
              </h5>

              <h4>
                {currentTime.toLocaleTimeString()}
              </h4>

            </div>

          </div>

          {/* Summary Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h6>Total Records</h6>
                  <h2 className="text-primary">
                    {attendance.length}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h6>Present Days</h6>
                  <h2 className="text-success">
                    {presentCount}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h6>Absent Days</h6>
                  <h2 className="text-danger">
                    {absentCount}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h6>Attendance %</h6>
                  <h2 className="text-warning">
                    {attendancePercentage.toFixed(1)}%
                  </h2>
                </div>
              </div>
            </div>

          </div>

          {/* Today Status */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                Today's Attendance
              </h4>

              <div className="row">

                <div className="col-md-6">

                  <h6>
                    Status :
                    <span
                      className={
                        todayAttendance?.attendanceStatus === "PRESENT"
                          ? "badge bg-success ms-2"
                          : todayAttendance?.attendanceStatus === "LEAVE"
                          ? "badge bg-warning ms-2"
                          : "badge bg-danger ms-2"
                      }
                    >
                      {
                        todayAttendance?.attendanceStatus ||
                        "ABSENT"
                      }
                    </span>
                  </h6>

                  <p>
                    Check In :
                    {" "}
                    {
                      todayAttendance?.checkInTime ||
                      "--"
                    }
                  </p>

                  <p>
                    Check Out :
                    {" "}
                    {
                      todayAttendance?.checkOutTime ||
                      "--"
                    }
                  </p>

                </div>

                <div className="col-md-6 text-end">

                  <button
                    className="btn btn-success me-2"
                    onClick={checkIn}
                    disabled={
                      todayAttendance?.checkInTime
                    }
                  >
                    ✅ Check In
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={checkOut}
                  >
                    🚪 Check Out
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="Search Attendance Date"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* History */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                Attendance History
              </h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead className="table-dark">

                    <tr>

                      <th>ID</th>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Date</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Hours</th>
                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredAttendance.length > 0
                      ? filteredAttendance.map(
                          (att) => (

                            <tr key={att.id}>

                              <td>{att.id}</td>

                              <td>
                                {att.employeeName}
                              </td>

                              <td>
                                {att.department}
                              </td>

                              <td>
                                {att.attendanceDate}
                              </td>

                              <td>
                                {att.checkInTime || "-"}
                              </td>

                              <td>
                                {att.checkOutTime || "-"}
                              </td>

                              <td>
                                {
                                  att.workingHours
                                    ? att.workingHours.toFixed(2)
                                    : "0.00"
                                } hrs
                              </td>

                              <td>

                                <span
                                  className={
                                    att.attendanceStatus === "PRESENT"
                                      ? "badge bg-success"
                                      : att.attendanceStatus === "LEAVE"
                                      ? "badge bg-warning"
                                      : "badge bg-danger"
                                  }
                                >
                                  {att.attendanceStatus}
                                </span>

                              </td>

                            </tr>

                          )
                        )
                      : (

                        <tr>

                          <td
                            colSpan="8"
                            className="text-center"
                          >
                            No Attendance Found
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

export default Attendance;

