import React, {
 useEffect,
 useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminProfile() {

 const [user,
        setUser] =
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

   setUser(
    response.data
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

    <div className="card shadow">

     <div className="card-body text-center">

      <img
       src={
        user.profileImage
        ?
        `http://localhost:8080/uploads/${user.profileImage}`
        :
        "https://via.placeholder.com/150"
       }
       alt="profile"
       width="150"
       height="150"
       className="rounded-circle mb-3"
      />

      <h2>
       Admin Profile
      </h2>

      <h4>
       {user.firstName}
       {" "}
       {user.lastName}
      </h4>

      <p>
       {user.email}
      </p>

      <span
       className=
       "badge bg-danger"
      >
       ADMIN
      </span>

      <hr />

      <p>
       Full System Access
      </p>

      <p>
       Employee Management
      </p>

      <p>
       Department Management
      </p>

      <p>
       Reports & Analytics
      </p>

     </div>

    </div>

   </div>

  </div>

 </div>

 );
}

export default AdminProfile;