import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Attendance() {

  const [attendance, setAttendance] =
    useState([]);

  const [employeeId, setEmployeeId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        );

      const employeeResponse =
        await API.get(
          `/employees/username/${username}`
        );

      const employee =
        employeeResponse.data;

      setEmployeeId(employee.id);

      const response =
        await API.get(
          `/attendance/employee/${employee.id}`
        );

      setAttendance(
        response.data
      );

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

      alert(
        "✅ Check In Successful"
      );

      loadAttendance();

    } catch (error) {

      console.error(error);

      alert(
        "Already Checked In"
      );

    }

  };

  const checkOut = async () => {

    try {

      await API.post(
        `/attendance/checkout/${employeeId}`
      );

      alert(
        "✅ Check Out Successful"
      );

      loadAttendance();

    } catch (error) {

      console.error(error);

      alert(
        "Check In First"
      );

    }

  };

  const filteredAttendance =
    attendance.filter(item =>
      String(item.attendanceDate)
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const presentCount =
    attendance.filter(
      a => a.status === "PRESENT"
    ).length;

  const attendancePercentage =
    attendance.length > 0
      ?
      (
        presentCount /
        attendance.length
      ) * 100
      :
      0;

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h3>
          Loading...
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
                📅 Attendance Management
              </h2>

              <p className="mb-0">
                Track Daily Attendance
              </p>

            </div>

          </div>

          {/* Summary Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Records
                  </h6>

                  <h2 className="text-primary">
                    {attendance.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Present Days
                  </h6>

                  <h2 className="text-success">
                    {presentCount}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Attendance %
                  </h6>

                  <h2 className="text-warning">
                    {attendancePercentage.toFixed(1)}%
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Check In / Out */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body text-center">

              <h4 className="mb-4">
                Today's Attendance
              </h4>

              <button
                className="btn btn-success btn-lg me-3"
                onClick={checkIn}
              >
                ✅ Check In
              </button>

              <button
                className="btn btn-danger btn-lg"
                onClick={checkOut}
              >
                🚪 Check Out
              </button>

            </div>

          </div>

          {/* Search */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="Search by Date"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Attendance Table */}

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
                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredAttendance.length > 0
                        ?

                        filteredAttendance.map(
                          att => (

                            <tr key={att.id}>

                              <td>
                                {att.id}
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

                                <span
                                  className={
                                    att.status ===
                                    "PRESENT"
                                      ?
                                      "badge bg-success"
                                      :
                                      "badge bg-danger"
                                  }
                                >

                                  {att.status}

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

export default Attendance;