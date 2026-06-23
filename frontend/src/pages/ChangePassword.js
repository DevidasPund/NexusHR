import React,
{
 useState
}
from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ChangePassword() {

 const [data,
        setData] =
        useState({

  username:"",
  oldPassword:"",
  newPassword:"",
  confirmPassword:""

 });

 const changePassword =
 async(e)=>{

  e.preventDefault();

  if(
   data.newPassword !==
   data.confirmPassword
  ){

   alert(
    "Passwords Do Not Match"
   );

   return;
  }

  try{

   const response =
   await API.post(
    "/auth/change-password",
    {
      username:
      data.username,

      oldPassword:
      data.oldPassword,

      newPassword:
      data.newPassword
    }
   );

   alert(
    response.data
   );

   setData({

    username:"",
    oldPassword:"",
    newPassword:"",
    confirmPassword:""

   });

  }catch(error){

   console.error(error);

   alert(
    "Password Change Failed"
   );
  }
 };

 return(

 <div className="d-flex">

  <Sidebar/>

  <div className="flex-grow-1">

   <Navbar/>

   <div className="container mt-4">

    <div className="card shadow p-4">

     <h2>
      Change Password
     </h2>

     <form
      onSubmit={
       changePassword
      }
     >

      <input
       className=
       "form-control mb-3"
       placeholder=
       "Username"
       value={
        data.username
       }
       onChange={(e)=>
        setData({

         ...data,

         username:
         e.target.value

        })
       }
      />

      <input
       type="password"
       className=
       "form-control mb-3"
       placeholder=
       "Old Password"
       value={
        data.oldPassword
       }
       onChange={(e)=>
        setData({

         ...data,

         oldPassword:
         e.target.value

        })
       }
      />

      <input
       type="password"
       className=
       "form-control mb-3"
       placeholder=
       "New Password"
       value={
        data.newPassword
       }
       onChange={(e)=>
        setData({

         ...data,

         newPassword:
         e.target.value

        })
       }
      />

      <input
       type="password"
       className=
       "form-control mb-3"
       placeholder=
       "Confirm Password"
       value={
        data.confirmPassword
       }
       onChange={(e)=>
        setData({

         ...data,

         confirmPassword:
         e.target.value

        })
       }
      />

      <button
       className=
       "btn btn-primary"
      >
       Update Password
      </button>

     </form>

    </div>

   </div>

  </div>

 </div>

 );
}

export default ChangePassword;