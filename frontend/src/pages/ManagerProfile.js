import React, {
useEffect,
useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ManagerProfile() {

const [manager,
setManager] =
useState({});

const [teamCount,
setTeamCount] =
useState(0);

const [projectCount,
setProjectCount] =
useState(0);

const [pendingLeaves,
setPendingLeaves] =
useState(0);

useEffect(() => {


loadProfile();
loadTeamCount();
loadProjects();
loadLeaves();


}, []);

const loadProfile =
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

  setManager(
    response.data
  );

} catch(error){

  console.error(error);
}


};

const loadTeamCount =
async () => {


try {

  const response =
  await API.get(
    "/employees"
  );

  setTeamCount(
    response.data.length
  );

} catch(error){

  console.error(error);
}


};

const loadProjects =
async () => {


try {

  const response =
  await API.get(
    "/projects"
  );

  setProjectCount(
    response.data.length
  );

} catch(error){

  console.error(error);
}


};

const loadLeaves =
async () => {


try {

  const response =
  await API.get(
    "/leave"
  );

  const pending =
  response.data.filter(
    leave =>
    leave.status ===
    "PENDING"
  );

  setPendingLeaves(
    pending.length
  );

} catch(error){

  console.error(error);
}


};

return (


<div className="d-flex">

  <Sidebar />

  <div className="flex-grow-1">

    <Navbar />

    <div className="container-fluid p-4">

      <div
        className="card shadow border-0 mb-4"
      >

        <div
          className=
          "text-center text-white p-5"
          style={{
            background:
            "linear-gradient(135deg,#0d6efd,#6610f2)"
          }}
        >

          <img
            src={
              manager.profileImage
              ?
              `https://nexushr-production-612e.up.railway.app/uploads/${manager.profileImage}`
              :
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            width="170"
            height="170"
            className=
            "rounded-circle border border-5 border-white shadow"
            style={{
              objectFit:
              "cover"
            }}
          />

          <h2
            className="mt-3"
          >

            {
              manager.firstName
            }

            {" "}

            {
              manager.lastName
            }

          </h2>

          <h5>

            {
              manager.designation
            }

          </h5>

          <p>

            {
              manager.department
            }

          </p>

          <span
            className=
            "badge bg-warning text-dark fs-6"
          >
            MANAGER
          </span>

        </div>

      </div>

      <div className="row">

        <div className="col-md-3">

          <div
            className=
            "card bg-primary text-white shadow"
          >

            <div
              className=
              "card-body text-center"
            >

              <h6>
                Team Members
              </h6>

              <h1>
                {
                  teamCount
                }
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className=
            "card bg-success text-white shadow"
          >

            <div
              className=
              "card-body text-center"
            >

              <h6>
                Projects
              </h6>

              <h1>
                {
                  projectCount
                }
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className=
            "card bg-warning shadow"
          >

            <div
              className=
              "card-body text-center"
            >

              <h6>
                Pending Leaves
              </h6>

              <h1>
                {
                  pendingLeaves
                }
              </h1>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div
            className=
            "card bg-danger text-white shadow"
          >

            <div
              className=
              "card-body text-center"
            >

              <h6>
                Performance
              </h6>

              <h1>
                4.8⭐
              </h1>

            </div>

          </div>

        </div>

      </div>

      <div className="row mt-4">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h4>
                Personal Information
              </h4>

              <hr />

              <p>
                <strong>
                  Name :
                </strong>
                {" "}
                {
                  manager.firstName
                }
                {" "}
                {
                  manager.lastName
                }
              </p>

              <p>
                <strong>
                  Email :
                </strong>
                {" "}
                {
                  manager.email
                }
              </p>

              <p>
                <strong>
                  Phone :
                </strong>
                {" "}
                {
                  manager.phone
                }
              </p>

              <p>
                <strong>
                  Department :
                </strong>
                {" "}
                {
                  manager.department
                }
              </p>

              <p>
                <strong>
                  Designation :
                </strong>
                {" "}
                {
                  manager.designation
                }
              </p>

              <p>
                <strong>
                  Salary :
                </strong>
                {" "}
                ₹{
                  manager.salary
                }
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h4>
                Team Overview
              </h4>

              <hr />

              <p>
                Team Members :
                {" "}
                {
                  teamCount
                }
              </p>

              <p>
                Active Projects :
                {" "}
                {
                  projectCount
                }
              </p>

              <p>
                Pending Leaves :
                {" "}
                {
                  pendingLeaves
                }
              </p>

              <p>
                Team Performance :
                {" "}
                Excellent
              </p>

            </div>

          </div>

          <div
            className=
            "card shadow mt-4"
          >

            <div
              className=
              "card-body"
            >

              <h4>
                Manager Permissions
              </h4>

              <hr />

              <ul>

                <li>
                  Leave Approval
                </li>

                <li>
                  Team Management
                </li>

                <li>
                  Project Monitoring
                </li>

                <li>
                  Performance Review
                </li>

                <li>
                  Team Salary View
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>


);
}

export default ManagerProfile;
