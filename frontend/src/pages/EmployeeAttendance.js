import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeAttendance() {

  const [attendance, setAttendance] =
    useState([]);

  const [employee, setEmployee] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  useEffect(() => {

    loadEmployee();

    const clock =
      setInterval(() => {

        setCurrentTime(
          new Date()
        );

      }, 1000);

    const refresh =
      setInterval(() => {

        loadEmployee();

      }, 10000);

    return () => {

      clearInterval(clock);
      clearInterval(refresh);

    };

  }, []);

  const loadEmployee =
    async () => {

      try {

        const username =
          localStorage.getItem(
            "username"
          );

        const response =
          await API.get(
            `/employees/username/${username}`
          );

        setEmployee(
          response.data
        );

        await loadAttendance(
          response.data.id
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const loadAttendance =
    async (employeeId) => {

      try {

        const response =
          await API.get(
            `/attendance/employee/${employeeId}`
          );

        setAttendance(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  const checkIn =
    async () => {

      try {

        await API.post(
          `/attendance/checkin/${employee.id}`
        );

        alert(
          "✅ Checked In Successfully"
        );

        loadAttendance(
          employee.id
        );

      } catch (error) {

        alert(
          error.response?.data ||
          "Already Checked In Today"
        );

      }

    };

  const checkOut =
    async () => {

      try {

        await API.post(
          `/attendance/checkout/${employee.id}`
        );

        alert(
          "✅ Checked Out Successfully"
        );

        loadAttendance(
          employee.id
        );

      } catch (error) {

        alert(
          error.response?.data ||
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
      a =>
        a.attendanceDate ===
        today
    );

  const presentDays =
    attendance.filter(
      a =>
        a.status ===
        "PRESENT"
    ).length;

  const attendancePercentage =
    attendance.length > 0
      ?
      (
        presentDays /
        attendance.length
      ) * 100
      :
      0;

  if (loading) {

    return (

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >

        <h3>
          Loading Attendance...
        </h3>

      </div>

    );

  }

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: "280px",
          background: "#f4f7fe",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          {/* Header */}

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
                🕒 Employee Attendance
              </h2>

              <p className="mb-0">
                Real-Time Attendance Tracking
              </p>

            </div>

          </div>

          {/* Live Clock */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body text-center">

              <h1 className="fw-bold text-primary">

                {
                  currentTime
                    .toLocaleTimeString()
                }

              </h1>

              <h5>

                {
                  currentTime
                    .toDateString()
                }

              </h5>

            </div>

          </div>

          {/* Summary Cards */}

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
                    Attendance %
                  </h6>

                  <h2 className="text-warning">

                    {
                      attendancePercentage
                        .toFixed(1)
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

                    {
                      employee.firstName
                    }

                  </h5>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Department
                  </h6>

                  <h5>

                    {
                      employee.department
                    }

                  </h5>

                </div>

              </div>

            </div>

          </div>

          {/* Today Status */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <div className="row align-items-center">

                <div className="col-md-6">

                  <h4>
                    Today's Status
                  </h4>

                  <span
                    className={
                      todayAttendance
                        ?
                        "badge bg-success fs-6"
                        :
                        "badge bg-danger fs-6"
                    }
                  >

                    {
                      todayAttendance
                        ?
                        "PRESENT"
                        :
                        "ABSENT"
                    }

                  </span>

                </div>

                <div className="col-md-6 text-end">

                  <button
                    className="btn btn-success me-3"
                    onClick={
                      checkIn
                    }
                    disabled={
                      todayAttendance
                    }
                  >
                    ✅ Check In
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={
                      checkOut
                    }
                    disabled={
                      !todayAttendance ||
                      todayAttendance.checkOutTime
                    }
                  >
                    🚪 Check Out
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Attendance History */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4 className="mb-4">
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
                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      attendance.length > 0

                        ?

                        attendance.map(
                          (a) => (

                            <tr
                              key={a.id}
                            >

                              <td>
                                {a.id}
                              </td>

                              <td>
                                {a.attendanceDate}
                              </td>

                              <td>
                                {a.checkInTime}
                              </td>

                              <td>
                                {
                                  a.checkOutTime ||
                                  "-"
                                }
                              </td>

                              <td>

                                <span
                                  className={
                                    a.status === "PRESENT"
                                      ? "badge bg-success"
                                      : a.status === "LATE"
                                      ? "badge bg-warning text-dark"
                                      : "badge bg-danger"
                                  }
                                >

                                  {a.status}

                                </span>

                              </td>

                            </tr>

                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="5"
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