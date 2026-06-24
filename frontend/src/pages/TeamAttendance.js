import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function TeamAttendance() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadEmployees();

    const interval = setInterval(() => {
      loadEmployees();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadEmployees = async () => {

    try {

      const response = await API.get("/employees");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const updateAttendance = async (id, status) => {

    try {

      await API.put(`/attendance/${id}`, {
        attendanceStatus: status
      });

      setEmployees(
        employees.map(emp =>
          emp.id === id
            ? {
                ...emp,
                attendanceStatus: status
              }
            : emp
        )
      );

    } catch (error) {

      console.error(error);

      alert("Failed to Update Attendance");

    }

  };

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const presentCount = employees.filter(
    emp => emp.attendanceStatus === "PRESENT"
  ).length;

  const absentCount = employees.filter(
    emp => emp.attendanceStatus === "ABSENT"
  ).length;

  const leaveCount = employees.filter(
    emp => emp.attendanceStatus === "LEAVE"
  ).length;

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h3>Loading Attendance...</h3>
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

              <h2>📅 Team Attendance</h2>

              <p className="mb-0">
                Real-Time Attendance Management
              </p>

            </div>
          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Total Employees</h6>

                  <h2 className="text-primary">
                    {employees.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Present</h6>

                  <h2 className="text-success">
                    {presentCount}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Absent</h6>

                  <h2 className="text-danger">
                    {absentCount}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Leave</h6>

                  <h2 className="text-warning">
                    {leaveCount}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search Employee..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* Employee Cards */}

          <div className="row">

            {filteredEmployees.map(emp => (

              <div
                className="col-lg-3 col-md-4 mb-4"
                key={emp.id}
              >

                <div className="card border-0 shadow h-100">

                  <div className="card-body text-center">

                    <img
                      src={
                        emp.profileImage
                          ? emp.profileImage
                          : `https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=2563eb&color=fff`
                      }
                      alt="Employee"
                      width="90"
                      height="90"
                      className="rounded-circle mb-3"
                    />

                    <h5>
                      {emp.firstName} {emp.lastName}
                    </h5>

                    <p className="text-muted">
                      {emp.designation}
                    </p>

                    <p>
                      <strong>
                        {emp.department}
                      </strong>
                    </p>

                    <div className="d-flex justify-content-center gap-2">

                      <button
                        className={
                          emp.attendanceStatus === "PRESENT"
                            ? "btn btn-success"
                            : "btn btn-outline-success"
                        }
                        onClick={() =>
                          updateAttendance(
                            emp.id,
                            "PRESENT"
                          )
                        }
                      >
                        Present
                      </button>

                      <button
                        className={
                          emp.attendanceStatus === "ABSENT"
                            ? "btn btn-danger"
                            : "btn btn-outline-danger"
                        }
                        onClick={() =>
                          updateAttendance(
                            emp.id,
                            "ABSENT"
                          )
                        }
                      >
                        Absent
                      </button>

                      <button
                        className={
                          emp.attendanceStatus === "LEAVE"
                            ? "btn btn-warning"
                            : "btn btn-outline-warning"
                        }
                        onClick={() =>
                          updateAttendance(
                            emp.id,
                            "LEAVE"
                          )
                        }
                      >
                        Leave
                      </button>

                    </div>

                    <hr />

                    <span
                      className={
                        emp.attendanceStatus === "PRESENT"
                          ? "badge bg-success"
                          : emp.attendanceStatus === "ABSENT"
                          ? "badge bg-danger"
                          : emp.attendanceStatus === "LEAVE"
                          ? "badge bg-warning"
                          : "badge bg-secondary"
                      }
                    >
                      {emp.attendanceStatus ||
                        "NOT MARKED"}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default TeamAttendance;