import React,
{
 useEffect,
 useState
}
from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Payroll(){

 const [employees,
        setEmployees] =
        useState([]);

 useEffect(()=>{

   loadPayroll();

 },[]);

 const loadPayroll =
 async()=>{

   const response =
   await API.get(
     "/employee"
   );

   setEmployees(
     response.data
   );
 };

 const totalSalary =
 employees.reduce(
 (sum,emp)=>
 sum + (emp.salary || 0),
 0
 );

 return(

  <div className="d-flex">

   <Sidebar/>

   <div className="flex-grow-1">

    <Navbar/>

    <div className="container p-4">

      <div className="card p-4 shadow">

       <h2>
        Payroll
       </h2>

       <h3>
        Total Salary :
        ₹{totalSalary}
       </h3>

      </div>

    </div>

   </div>

  </div>
 );
}

export default Payroll;