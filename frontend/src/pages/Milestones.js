import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Milestones() {

const [milestones, setMilestones] =
useState([]);

const [milestone, setMilestone] =
useState({
projectName: "",
milestoneName: "",
dueDate: "",
status: "PENDING"
});

useEffect(() => {


loadMilestones();


}, []);

const loadMilestones = async () => {


try {

  const response =
    await API.get("/milestones");

  setMilestones(
    response.data
  );

} catch(error) {

  console.error(error);

}


};

const saveMilestone = async () => {


try {

  await API.post(
    "/milestones",
    milestone
  );

  setMilestone({
    projectName: "",
    milestoneName: "",
    dueDate: "",
    status: "PENDING"
  });

  loadMilestones();

} catch(error) {

  console.error(error);

}


};

const deleteMilestone =
async(id) => {


  try {

    await API.delete(
      `/milestones/${id}`
    );

    loadMilestones();

  } catch(error) {

    console.error(error);

  }

};


return (


<div className="d-flex">

  <Sidebar />

  <div
    className="flex-grow-1"
    style={{
      background:"#f4f7fe",
      minHeight:"100vh"
    }}
  >

    <Navbar />

    <div className="container-fluid p-4">

      <div
        className="card border-0 shadow-lg mb-4"
        style={{
          background:
          "linear-gradient(135deg,#2563eb,#7c3aed)"
        }}
      >

        <div className="card-body text-white">

          <h2>
            📌 Project Milestones
          </h2>

          <p>
            Track Project Progress
          </p>

        </div>

      </div>

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <h4>
            Add Milestone
          </h4>

          <div className="row g-3">

            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Project Name"
                value={milestone.projectName}
                onChange={(e)=>
                  setMilestone({
                    ...milestone,
                    projectName:
                    e.target.value
                  })
                }
              />

            </div>

            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Milestone Name"
                value={milestone.milestoneName}
                onChange={(e)=>
                  setMilestone({
                    ...milestone,
                    milestoneName:
                    e.target.value
                  })
                }
              />

            </div>

            <div className="col-md-3">

              <input
                type="date"
                className="form-control"
                value={milestone.dueDate}
                onChange={(e)=>
                  setMilestone({
                    ...milestone,
                    dueDate:
                    e.target.value
                  })
                }
              />

            </div>

            <div className="col-md-2">

              <select
                className="form-select"
                value={milestone.status}
                onChange={(e)=>
                  setMilestone({
                    ...milestone,
                    status:
                    e.target.value
                  })
                }
              >

                <option>
                  PENDING
                </option>

                <option>
                  IN_PROGRESS
                </option>

                <option>
                  COMPLETED
                </option>

              </select>

            </div>

            <div className="col-md-1">

              <button
                className="btn btn-primary w-100"
                onClick={
                  saveMilestone
                }
              >
                Save
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <h4>
            Milestone List
          </h4>

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>

                <th>Project</th>
                <th>Milestone</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
                milestones.map(m => (

                  <tr key={m.id}>

                    <td>
                      {m.projectName}
                    </td>

                    <td>
                      {m.milestoneName}
                    </td>

                    <td>
                      {m.dueDate}
                    </td>

                    <td>
                      {m.status}
                    </td>

                    <td>

                      <div
                        className="progress"
                      >

                        <div
                          className="progress-bar"
                          style={{
                            width:
                              m.status === "COMPLETED"
                              ? "100%"
                              : m.status === "IN_PROGRESS"
                              ? "50%"
                              : "10%"
                          }}
                        />

                      </div>

                    </td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteMilestone(
                            m.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>

</div>


);

}

export default Milestones;
