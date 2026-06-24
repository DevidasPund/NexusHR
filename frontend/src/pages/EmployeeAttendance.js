
import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeAttendance() {

  const [attendance, setAttendance] = useState([]);
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

    loadEmployee();

    const clock = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clock);

  }, []);

  const loadEmployee = async () => {

    try {

      const employeeId =
        localStorage.getItem("employeeId");

      if (
        !employeeId ||
        employeeId === "undefined"
      ) {

        alert("Please Login Again");
        return;

      }

      const employeeResponse =
        await API.get(
          `/employees/${employeeId}`
        );

      setEmployee(
        employeeResponse.data
      );

      await loadAttendance(
        employeeId
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const loadAttendance = async (
    employeeId
  ) => {

    try {

      const response =
        await API.get(
          `/attendance/employee/${employeeId}`
        );

      setAttendance(
        response.data || []
      );

    } catch (error) {

      console.error(error);

    }

  };

  const checkIn = async () => {

    try {

      const employeeId =
        localStorage.getItem("employeeId");

      await API.post(
        `/attendance/checkin/${employeeId}`
      );

      alert(
        "✅ Check In Successful"
      );

      loadAttendance(
        employeeId
      );

    } catch (error) {

      console.error(error);

      alert(
        "Already Checked In"
      );

    }

  };

  const checkOut = async () => {

    try {

      const employeeId =
        localStorage.getItem("employeeId");

      await API.post(
        `/attendance/checkout/${employeeId}`
      );

      alert(
        "✅ Check Out Successful"
      );

      loadAttendance(
        employeeId
      );

    } catch (error) {

      console.error(error);

      alert(
        "Check In First"
      );

    }

  };

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayAttendance =
    attendance.find(
      item =>
        item.attendanceDate ===
        today
    );

  const presentDays =
    attendance.filter(
      item =>
        item.attendanceStatus ===
        "PRESENT"
    ).length;

  const absentDays =
    attendance.filter(
      item =>
        item.attendanceStatus ===
        "ABSENT"
    ).length;

  const attendancePercentage =
    attendance.length > 0
      ? (
          presentDays /
          attendance.length
        ) * 100
      : 0;

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
                Employee Attendance
              </h2>

              <p>
                Real Time Attendance Tracking
              </p>

            </div>

          </div>

          <div className="card shadow border-0 mb-4">

            <div className="card-body text-center">

              <h1 className="text-primary">
                {
                  currentTime.toLocaleTimeString()
                }
              </h1>

              <h5>
                {
                  currentTime.toDateString()
                }
              </h5>

            </div>

          </div>

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Present Days
                  </h6>

                  <h2 className="text-success">
                    {presentDays}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Absent Days
                  </h6>

                  <h2 className="text-danger">
                    {absentDays}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Attendance %
                  </h6>

                  <h2 className="text-warning">
                    {
                      attendancePercentage.toFixed(1)
                    }%
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Employee
                  </h6>

                  <h5>
                    {employee.firstName}
                  </h5>

                </div>

              </div>

            </div>

          </div>

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <div className="row">

                <div className="col-md-6">

                  <h4>
                    Today's Status
                  </h4>

                  <span
                    className={
                      todayAttendance
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >

                    {
                      todayAttendance
                        ? "PRESENT"
                        : "ABSENT"
                    }

                  </span>

                </div>

                <div className="col-md-6 text-end">

                  <button
                    className="btn btn-success me-2"
                    onClick={checkIn}
                    disabled={
                      todayAttendance
                    }
                  >
                    Check In
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={checkOut}
                  >
                    Check Out
                  </button>

                </div>

              </div>

            </div>

          </div>

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
                      <th>Date</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Hours</th>
                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      attendance.length > 0

                        ?

                        attendance.map(
                          item => (

                            <tr
                              key={item.id}
                            >

                              <td>
                                {item.id}
                              </td>

                              <td>
                                {
                                  item.attendanceDate
                                }
                              </td>

                              <td>
                                {
                                  item.checkInTime ||
                                  "-"
                                }
                              </td>

                              <td>
                                {
                                  item.checkOutTime ||
                                  "-"
                                }
                              </td>

                              <td>
                                {
                                  item.workingHours
                                    ? item.workingHours.toFixed(2)
                                    : "0.00"
                                }
                              </td>

                              <td>

                                <span
                                  className={
                                    item.attendanceStatus === "PRESENT"
                                      ? "badge bg-success"
                                      : item.attendanceStatus === "LEAVE"
                                      ? "badge bg-warning"
                                      : "badge bg-danger"
                                  }
                                >
                                  {
                                    item.attendanceStatus
                                  }
                                </span>

                              </td>

                            </tr>

                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center"
                          >
                            No Attendance Found
                          </td>

                        </tr>

                    }

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

export default EmployeeAttendance;

