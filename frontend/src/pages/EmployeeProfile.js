import React, {
useEffect,
useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeProfile() {

const [employee,
setEmployee] =
useState({});

useEffect(() => {


loadProfile();


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

  setEmployee(
    response.data
  );

} catch(error){

  console.error(
    "Profile Load Error",
    error
  );
}


};

return (


<div className="d-flex">

  <Sidebar />

  <div className="flex-grow-1">

    <Navbar />

    <div className="container-fluid p-4">

      <div className="card shadow border-0 mb-4">

        <div
          className="text-center text-white p-5"
          style={{
            background:
            "linear-gradient(135deg,#0d6efd,#6610f2)"
          }}
        >

          <img
            src={
              employee.profileImage
              ?
              `https://nexushr-production-612e.up.railway.app/uploads/${employee.profileImage}`
              :
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="rounded-circle border border-4 border-white shadow"
            width="150"
            height="150"
            style={{
              objectFit:"cover"
            }}
          />

          <h2 className="mt-3">

            {employee.firstName}
            {" "}
            {employee.lastName}

          </h2>

          <h5>

            {employee.designation}

          </h5>

          <p>

            {employee.department}

          </p>

          <span className="badge bg-success">

            EMPLOYEE

          </span>

        </div>

      </div>

      <div className="row mb-4">

        <div className="col-md-4">

          <div className="card bg-primary text-white shadow">

            <div className="card-body text-center">

              <h6>Salary</h6>

              <h2>

                ₹{employee.salary || 0}

              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card bg-success text-white shadow">

            <div className="card-body text-center">

              <h6>Status</h6>

              <h2>

                {employee.status || "ACTIVE"}

              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card bg-warning shadow">

            <div className="card-body text-center">

              <h6>Department</h6>

              <h2>

                {employee.department}

              </h2>

            </div>

          </div>

        </div>

      </div>

      <div className="row">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h4>
                Personal Information
              </h4>

              <hr />

              <p>

                <strong>Name :</strong>
                {" "}
                {employee.firstName}
                {" "}
                {employee.lastName}

              </p>

              <p>

                <strong>Email :</strong>
                {" "}
                {employee.email}

              </p>

              <p>

                <strong>Phone :</strong>
                {" "}
                {employee.phone}

              </p>

              <p>

                <strong>Department :</strong>
                {" "}
                {employee.department}

              </p>

              <p>

                <strong>Designation :</strong>
                {" "}
                {employee.designation}

              </p>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h4>
                Employment Details
              </h4>

              <hr />

              <p>

                <strong>Status :</strong>
                {" "}
                {employee.status}

              </p>

              <p>

                <strong>Salary :</strong>
                {" "}
                ₹{employee.salary}

              </p>

              <p>

                <strong>Employee ID :</strong>
                {" "}
                {employee.id}

              </p>

              <p>

                <strong>Username :</strong>
                {" "}
                {localStorage.getItem("username")}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>


);
}

export default EmployeeProfile;
