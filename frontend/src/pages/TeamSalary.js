import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function TeamSalary() {

const [employees, setEmployees] = useState([]);
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

const filteredEmployees = employees.filter(emp =>
`${emp.firstName || ""} ${emp.lastName || ""}`
.toLowerCase()
.includes(search.toLowerCase())
);

const totalSalary = employees.reduce(
(sum, emp) => sum + (emp.salary || 0),
0
);

const averageSalary =
employees.length > 0
? Math.round(totalSalary / employees.length)
: 0;

const highestSalary =
employees.length > 0
? Math.max(...employees.map(emp => emp.salary || 0))
: 0;

const formatCurrency = (amount) => {


return new Intl.NumberFormat(
  "en-IN",
  {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }
).format(amount);


};

if (loading) {


return (
  <div className="text-center mt-5">
    <h3>Loading Salary Report...</h3>
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

          <h2>💰 Team Salary Report</h2>

          <p className="mb-0">
            Employee Salary Analytics Dashboard
          </p>

        </div>

      </div>

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

              <h6>Total Salary</h6>

              <h4 className="text-success">
                {formatCurrency(totalSalary)}
              </h4>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>Average Salary</h6>

              <h4 className="text-warning">
                {formatCurrency(averageSalary)}
              </h4>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>Highest Salary</h6>

              <h4 className="text-danger">
                {formatCurrency(highestSalary)}
              </h4>

            </div>

          </div>

        </div>

      </div>

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

      <div className="card border-0 shadow">

        <div className="card-body">

          <h4 className="mb-3">
            Employee Salary Details
          </h4>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>

                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {filteredEmployees.length > 0 ? (

                  filteredEmployees.map(emp => (

                    <tr key={emp.id}>

                      <td>{emp.id}</td>

                      <td>
                        {emp.firstName} {emp.lastName}
                      </td>

                      <td>{emp.department}</td>

                      <td>{emp.designation}</td>

                      <td>
                        <strong className="text-success">
                          {formatCurrency(emp.salary || 0)}
                        </strong>
                      </td>

                      <td>

                        <span
                          className={
                            emp.status === "ACTIVE"
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
                          {emp.status}
                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center"
                    >
                      No Employees Found
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

export default TeamSalary;
