import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";

function TeamAttendance() {

  const [employees, setEmployees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {

    try {

      const response =
        await API.get("/employee");

      setEmployees(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to Load Employees"
      );
    }
  };

  const updateAttendance =
    async (id, status) => {

      try {

        await API.put(
          `/attendance/${id}`,
          {
            attendanceStatus:
              status
          }
        );

        setEmployees(
          employees.map(emp =>
            emp.id === id
              ? {
                  ...emp,
                  attendanceStatus:
                    status
                }
              : emp
          )
        );

      } catch (error) {

        console.error(error);

        alert(
          "Attendance Update Failed"
        );
      }
    };

  const filteredEmployees =
    employees.filter(emp =>

      `${emp.firstName}
       ${emp.lastName}`

      .toLowerCase()

      .includes(
        search.toLowerCase()
      )
    );

  const presentCount =
    employees.filter(
      emp =>
        emp.attendanceStatus ===
        "PRESENT"
    ).length;

  const absentCount =
    employees.filter(
      emp =>
        emp.attendanceStatus ===
        "ABSENT"
    ).length;

  const leaveCount =
    employees.filter(
      emp =>
        emp.attendanceStatus ===
        "LEAVE"
    ).length;

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="container-fluid p-4">

        <h2 className="mb-4">
          Team Attendance
        </h2>

        <div className="row mb-4">

          <div className="col-md-3">

            <div className="card shadow text-center">

              <div className="card-body">

                <h5>
                  Total Employees
                </h5>

                <h2>
                  {employees.length}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow text-center">

              <div className="card-body">

                <h5>
                  Present
                </h5>

                <h2 className="text-success">
                  {presentCount}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow text-center">

              <div className="card-body">

                <h5>
                  Absent
                </h5>

                <h2 className="text-danger">
                  {absentCount}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow text-center">

              <div className="card-body">

                <h5>
                  Leave
                </h5>

                <h2 className="text-warning">
                  {leaveCount}
                </h2>

              </div>

            </div>

          </div>

        </div>

        <div className="row mb-4">

          <div className="col-md-6">

            <input
              className="form-control"
              placeholder=
              "Search Employee"

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        <div className="row">

          {filteredEmployees.map(
            (emp) => (

            <div
              key={emp.id}
              className=
              "col-md-3 mb-4">

              <div
                className=
                "card shadow h-100">

                <div
                  className=
                  "card-body text-center">

                  <img

                    src={
                      emp.profileImage

                      ? emp.profileImage

                      : `https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=0D6EFD&color=fff`
                    }

                    alt="Employee"

                    width="90"

                    height="90"

                    className=
                    "rounded-circle mb-3"
                  />

                  <h5>

                    {emp.firstName}
                    {" "}
                    {emp.lastName}

                  </h5>

                  <p
                    className=
                    "text-primary">

                    {emp.designation}

                  </p>

                  <p>

                    <strong>
                      Department
                    </strong>

                    <br />

                    {emp.department}

                  </p>

                  <div
                    className=
                    "d-flex justify-content-center gap-2">

                    <button

                      className={
                        emp.attendanceStatus ===
                        "PRESENT"

                        ? "btn btn-success rounded-circle"

                        : "btn btn-outline-success rounded-circle"
                      }

                      onClick={() =>
                        updateAttendance(
                          emp.id,
                          "PRESENT"
                        )
                      }
                    >

                      P

                    </button>

                    <button

                      className={
                        emp.attendanceStatus ===
                        "ABSENT"

                        ? "btn btn-danger rounded-circle"

                        : "btn btn-outline-danger rounded-circle"
                      }

                      onClick={() =>
                        updateAttendance(
                          emp.id,
                          "ABSENT"
                        )
                      }
                    >

                      A

                    </button>

                    <button

                      className={
                        emp.attendanceStatus ===
                        "LEAVE"

                        ? "btn btn-warning rounded-circle"

                        : "btn btn-outline-warning rounded-circle"
                      }

                      onClick={() =>
                        updateAttendance(
                          emp.id,
                          "LEAVE"
                        )
                      }
                    >

                      L

                    </button>

                  </div>

                  <hr />

                  <span

                    className={

                      emp.attendanceStatus ===
                      "PRESENT"

                      ? "badge bg-success"

                      : emp.attendanceStatus ===
                        "ABSENT"

                      ? "badge bg-danger"

                      : "badge bg-warning"

                    }

                  >

                    {emp.attendanceStatus
                      || "NOT MARKED"}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default TeamAttendance;