import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";

function TeamMembers() {

  const [employees, setEmployees] =
    useState([]);

  const [selectedEmployee,
         setSelectedEmployee] =
         useState(null);

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

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="container-fluid p-4">

        <h2 className="mb-4">
          Team Members
        </h2>

        <div className="row">

          {employees.map((emp) => (

            <div
              key={emp.id}
              className="col-md-3 mb-4">

              <div
                className="card shadow h-100"
                style={{
                  cursor: "pointer"
                }}
                onClick={() =>
                  setSelectedEmployee(emp)
                }>

                <div className="card-body text-center">

                  <img
                    src={
                      emp.profileImage ||
                      `https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=0D6EFD&color=fff`
                    }
                    alt="Employee"
                    className="rounded-circle mb-3"
                    width="90"
                    height="90"
                  />

                  <h5>
                    {emp.firstName}
                    {" "}
                    {emp.lastName}
                  </h5>

                  <p className="text-primary fw-bold">
                    {emp.designation}
                  </p>

                  <hr />

                  <p>
                    <strong>
                      Department:
                    </strong>
                    <br />
                    {emp.department}
                  </p>

                  <p>
                    <strong>
                      Email:
                    </strong>
                    <br />
                    {emp.email}
                  </p>

                  <p>
                    <strong>
                      Salary:
                    </strong>
                    <br />
                    ₹{emp.salary}
                  </p>

                  <p>
                    <strong>
                      Projects:
                    </strong>
                    <br />
                    {emp.projectCount || 0}
                  </p>

                  <div className="mb-2">

                    <strong>
                      Skills
                    </strong>

                    <div className="mt-2">

                      {emp.skills
                        ?.split(",")
                        .map((skill,
                               index) => (

                        <span
                          key={index}
                          className=
                          "badge bg-info me-1">

                          {skill}

                        </span>

                      ))}

                    </div>

                  </div>

                  <span
                    className={
                      emp.status ===
                      "ACTIVE"
                      ? "badge bg-success"
                      : "badge bg-danger"
                    }>

                    {emp.status}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

        {selectedEmployee && (

          <div
            className="modal d-block"
            tabIndex="-1">

            <div
              className=
              "modal-dialog modal-lg">

              <div
                className=
                "modal-content">

                <div
                  className=
                  "modal-header">

                  <h5>
                    Employee Details
                  </h5>

                  <button
                    className=
                    "btn-close"
                    onClick={() =>
                      setSelectedEmployee(
                        null
                      )
                    }>
                  </button>

                </div>

                <div
                  className=
                  "modal-body">

                  <div
                    className=
                    "text-center">

                    <img
                      src={
                        selectedEmployee.profileImage ||
                        `https://ui-avatars.com/api/?name=${selectedEmployee.firstName}+${selectedEmployee.lastName}`
                      }
                      width="120"
                      height="120"
                      alt="employee"
                      className=
                      "rounded-circle"
                    />

                    <h3
                      className=
                      "mt-3">

                      {selectedEmployee.firstName}
                      {" "}
                      {selectedEmployee.lastName}

                    </h3>

                  </div>

                  <hr />

                  <p>
                    <strong>
                      Employee Code:
                    </strong>
                    {" "}
                    {selectedEmployee.employeeCode}
                  </p>

                  <p>
                    <strong>
                      Email:
                    </strong>
                    {" "}
                    {selectedEmployee.email}
                  </p>

                  <p>
                    <strong>
                      Department:
                    </strong>
                    {" "}
                    {selectedEmployee.department}
                  </p>

                  <p>
                    <strong>
                      Designation:
                    </strong>
                    {" "}
                    {selectedEmployee.designation}
                  </p>

                  <p>
                    <strong>
                      Salary:
                    </strong>
                    {" "}
                    ₹{selectedEmployee.salary}
                  </p>

                  <p>
                    <strong>
                      Projects:
                    </strong>
                    {" "}
                    {selectedEmployee.projectCount}
                  </p>

                  <p>
                    <strong>
                      Skills:
                    </strong>
                    {" "}
                    {selectedEmployee.skills}
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>
                    {" "}
                    {selectedEmployee.status}
                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default TeamMembers;