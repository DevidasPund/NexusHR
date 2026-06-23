import React,
{
 useEffect,
 useState
}
from "react";

import API from "../services/ApiService";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
 useParams,
 useNavigate
}
from "react-router-dom";

function EditEmployee() {

 const { id } =
 useParams();

 const navigate =
 useNavigate();

 const [employee,
        setEmployee] =
 useState({

  firstName:"",
  lastName:"",
  email:"",
  phone:"",
  department:"",
  designation:"",
  salary:""

 });

 useEffect(() => {

  loadEmployee();

 }, []);

 const loadEmployee =
 async()=>{

  try{

   const response =
   await API.get(
    `/employee/${id}`
   );

   setEmployee(
    response.data
   );

  }catch(error){

   console.error(error);
  }
 };

 const handleChange =
 (e)=>{

  setEmployee({

   ...employee,

   [e.target.name]:
   e.target.value

  });
 };

 const updateEmployee =
 async(e)=>{

  e.preventDefault();

  try{

   await API.put(
    `/employee/${id}`,
    employee
   );

   alert(
    "Employee Updated"
   );

   navigate(
    "/employees"
   );

  }catch(error){

   console.error(error);

   alert(
    "Update Failed"
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
      Edit Employee
     </h2>

     <form
      onSubmit={
       updateEmployee
      }
     >

      <input
       className=
       "form-control mb-3"
       name="firstName"
       value={
        employee.firstName
       }
       onChange={
        handleChange
       }
      />

      <input
       className=
       "form-control mb-3"
       name="lastName"
       value={
        employee.lastName
       }
       onChange={
        handleChange
       }
      />

      <input
       className=
       "form-control mb-3"
       name="email"
       value={
        employee.email
       }
       onChange={
        handleChange
       }
      />

      <input
       className=
       "form-control mb-3"
       name="phone"
       value={
        employee.phone
       }
       onChange={
        handleChange
       }
      />

      <input
       className=
       "form-control mb-3"
       name="department"
       value={
        employee.department
       }
       onChange={
        handleChange
       }
      />

      <input
       className=
       "form-control mb-3"
       name="designation"
       value={
        employee.designation
       }
       onChange={
        handleChange
       }
      />

      <input
       className=
       "form-control mb-3"
       name="salary"
       value={
        employee.salary
       }
       onChange={
        handleChange
       }
      />

      <button
       className=
       "btn btn-primary"
      >
       Update Employee
      </button>

     </form>

    </div>

   </div>

  </div>

 </div>

 );
}

export default EditEmployee;