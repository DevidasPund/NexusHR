import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function PerformanceManagement() {

const [performances, setPerformances] = useState([]);

const [formData, setFormData] = useState({
employeeId: "",
employeeName: "",
reviewMonth: "",
kpiScore: "",
managerComments: ""
});

useEffect(() => {
loadPerformance();
}, []);

const loadPerformance = async () => {


try {

  const response =
    await API.get("/performance");

  setPerformances(response.data);

} catch (error) {

  console.error(error);

}


};

const handleChange = (e) => {


setFormData({
  ...formData,
  [e.target.name]: e.target.value
});


};

const savePerformance = async () => {


try {

  await API.post(
    "/performance",
    formData
  );

  alert(
    "Performance Review Saved Successfully"
  );

  loadPerformance();

  setFormData({
    employeeId: "",
    employeeName: "",
    reviewMonth: "",
    kpiScore: "",
    managerComments: ""
  });

} catch (error) {

  console.error(error);

}


};

const averageScore =
performances.length > 0
? (
performances.reduce(
(sum, p) =>
sum +
Number(
p.overallScore || 0
),
0
) /
performances.length
).toFixed(0)
: 0;

return (


<div className="d-flex">

  <Sidebar />

  <div
    className="flex-grow-1"
    style={{
      background: "#f4f7fc",
      minHeight: "100vh"
    }}
  >

    <Navbar />

    <div className="container-fluid p-4">

      <div
        className="card border-0 shadow-lg text-white mb-4"
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)"
        }}
      >
        <div className="card-body">

          <h2>
            ⭐ Performance Management
          </h2>

          <p>
            Employee Performance Review & Analytics
          </p>

        </div>
      </div>

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Average Score</h6>
              <h2 className="text-primary">
                {averageScore}%
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Top Performers</h6>
              <h2 className="text-success">
                {
                  performances.filter(
                    p =>
                      p.rating ===
                      "EXCELLENT"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Good Performers</h6>
              <h2 className="text-info">
                {
                  performances.filter(
                    p =>
                      p.rating ===
                      "GOOD"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Needs Improvement</h6>
              <h2 className="text-danger">
                {
                  performances.filter(
                    p =>
                      p.rating ===
                      "NEEDS IMPROVEMENT"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <h4>
            Add Performance Review
          </h4>

          <div className="row g-3">

            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Employee ID"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Employee Name"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Review Month"
                name="reviewMonth"
                value={formData.reviewMonth}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-3">

              <input
                type="number"
                className="form-control"
                placeholder="KPI Score"
                name="kpiScore"
                value={formData.kpiScore}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-12">

              <textarea
                rows="3"
                className="form-control"
                placeholder="Manager Comments"
                name="managerComments"
                value={formData.managerComments}
                onChange={handleChange}
              />

            </div>

          </div>

          <button
            className="btn btn-success mt-3"
            onClick={savePerformance}
          >
            Save Review
          </button>

        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <h4>
            Performance Reviews
          </h4>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead className="table-dark">

                <tr>

                  <th>Employee</th>
                  <th>Month</th>
                  <th>Attendance</th>
                  <th>Task</th>
                  <th>Overall</th>
                  <th>Rating</th>

                </tr>

              </thead>

              <tbody>

                {
                  performances.map(
                    (item) => (

                      <tr
                        key={item.id}
                      >

                        <td>
                          {item.employeeName}
                        </td>

                        <td>
                          {item.reviewMonth}
                        </td>

                        <td>
                          {item.attendanceScore?.toFixed(0)}%
                        </td>

                        <td>
                          {item.taskScore?.toFixed(0)}%
                        </td>

                        <td>
                          {item.overallScore?.toFixed(0)}%
                        </td>

                        <td>

                          <span
                            className={
                              item.rating === "EXCELLENT"
                              ? "badge bg-success"
                              : item.rating === "GOOD"
                              ? "badge bg-primary"
                              : item.rating === "AVERAGE"
                              ? "badge bg-warning text-dark"
                              : "badge bg-danger"
                            }
                          >
                            {item.rating}
                          </span>

                        </td>

                      </tr>

                    )
                  )
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

export default PerformanceManagement;
