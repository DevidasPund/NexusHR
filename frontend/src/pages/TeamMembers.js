import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function TeamMembers() {

const [employees, setEmployees] = useState([]);
const [selectedEmployee, setSelectedEmployee] = useState(null);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

useEffect(() => {


loadEmployees();

const interval = setInterval(() => {
  loadEmployees();
}, 10000);

return () => clearInterval(interval);


}, []);

const loadEmployees = async () => {


try {

  const response =
    await API.get("/employees");

  setEmployees(response.data);

} catch (error) {

  console.error(error);

} finally {

  setLoading(false);

}


};

const filteredEmployees =
employees.filter(emp =>
`${emp.firstName || ""}
       ${emp.lastName || ""}`
.toLowerCase()
.includes(search.toLowerCase())
);

const activeEmployees =
employees.filter(
emp => emp.status === "ACTIVE"
).length;

if (loading) {


return (
  <div className="text-center mt-5">
    <h3>Loading Team Members...</h3>
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

          <h2>👥 Team Members</h2>

          <p className="mb-0">
            Employee Directory & Team Overview
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="row g-4 mb-4">

        <div className="col-md-4">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>Total Employees</h6>

              <h2 className="text-primary">
                {employees.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>Active Employees</h6>

              <h2 className="text-success">
                {activeEmployees}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>Departments</h6>

              <h2 className="text-warning">
                {
                  [...new Set(
                    employees.map(
                      emp => emp.department
                    )
                  )].length
                }
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
            key={emp.id}
            className="col-lg-3 col-md-4 mb-4"
          >

            <div
              className="card border-0 shadow h-100"
              style={{
                cursor: "pointer",
                transition: "0.3s"
              }}
              onClick={() =>
                setSelectedEmployee(emp)
              }
            >

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
                  {emp.firstName}
                  {" "}
                  {emp.lastName}
                </h5>

                <p className="text-primary fw-bold">
                  {emp.designation}
                </p>

                <hr />

                <p>
                  <strong>Department</strong>
                  <br />
                  {emp.department}
                </p>

                <p>
                  <strong>Email</strong>
                  <br />
                  {emp.email}
                </p>

                <span
                  className={
                    emp.status === "ACTIVE"
                      ? "badge bg-success"
                      : "badge bg-danger"
                  }
                >
                  {emp.status}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Employee Details Modal */}

      {selectedEmployee && (

        <div
          className="modal d-block"
          style={{
            background:
              "rgba(0,0,0,0.5)"
          }}
        >

          <div className="modal-dialog modal-lg">

            <div className="modal-content">

              <div className="modal-header">

                <h5>
                  Employee Details
                </h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setSelectedEmployee(null)
                  }
                />

              </div>

              <div className="modal-body">

                <div className="text-center">

                  <img
                    src={
                      selectedEmployee.profileImage
                        ? selectedEmployee.profileImage
                        : `https://ui-avatars.com/api/?name=${selectedEmployee.firstName}+${selectedEmployee.lastName}`
                    }
                    alt="Employee"
                    width="120"
                    height="120"
                    className="rounded-circle mb-3"
                  />

                  <h3>
                    {selectedEmployee.firstName}
                    {" "}
                    {selectedEmployee.lastName}
                  </h3>

                  <span
                    className="badge bg-primary"
                  >
                    {selectedEmployee.designation}
                  </span>

                </div>

                <hr />

                <div className="row">

                  <div className="col-md-6">

                    <p>
                      <strong>ID :</strong>
                      {" "}
                      {selectedEmployee.id}
                    </p>

                    <p>
                      <strong>Employee Code :</strong>
                      {" "}
                      {selectedEmployee.employeeCode}
                    </p>

                    <p>
                      <strong>Email :</strong>
                      {" "}
                      {selectedEmployee.email}
                    </p>

                    <p>
                      <strong>Phone :</strong>
                      {" "}
                      {selectedEmployee.phone}
                    </p>

                  </div>

                  <div className="col-md-6">

                    <p>
                      <strong>Department :</strong>
                      {" "}
                      {selectedEmployee.department}
                    </p>

                    <p>
                      <strong>Designation :</strong>
                      {" "}
                      {selectedEmployee.designation}
                    </p>

                    <p>
                      <strong>Salary :</strong>
                      {" "}
                      ₹{selectedEmployee.salary}
                    </p>

                    <p>
                      <strong>Status :</strong>
                      {" "}
                      {selectedEmployee.status}
                    </p>

                  </div>

                </div>

                <hr />

                <h5>Skills</h5>

                <div>

                  {selectedEmployee.skills
                    ?.split(",")
                    .map((skill, index) => (

                      <span
                        key={index}
                        className="badge bg-info me-2 mb-2"
                      >
                        {skill.trim()}
                      </span>

                    ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  </div>

</div>


);

}

export default TeamMembers;
