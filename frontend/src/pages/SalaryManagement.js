import React,
{
 useEffect,
 useState
}
from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function SalaryManagement() {

 const [salaries,
        setSalaries] =
        useState([]);

 const [salary,
        setSalary] =
        useState({

  employeeId:"",
  employeeName:"",
  basicSalary:0,
  bonus:0,
  deduction:0

 });

 useEffect(()=>{

  loadSalaries();

 },[]);

 const loadSalaries =
 async()=>{

  try{

   const response =
   await API.get(
    "/salary"
   );

   setSalaries(
    response.data
   );

  }catch(error){

   console.error(error);
  }
 };

 const saveSalary =
 async(e)=>{

  e.preventDefault();

  try{

   const netSalary =

   Number(
    salary.basicSalary
   )
   +
   Number(
    salary.bonus
   )
   -
   Number(
    salary.deduction
   );

   await API.post(
    "/salary",
    {
      ...salary,
      netSalary
    }
   );

   alert(
    "Salary Saved"
   );

   loadSalaries();

  }catch(error){

   console.error(error);
  }
 };

 const downloadPayslip =
 (id)=>{

  window.open(
   `http://localhost:8080/salary/payslip/${id}`
  );
 };

 return(

 <div className="d-flex">

  <Sidebar/>

  <div className="flex-grow-1">

   <Navbar/>

   <div className="container-fluid p-4">

    <div className="card shadow p-4">

     <h2>
      Salary Management
     </h2>

     <form
      onSubmit={
       saveSalary
      }
     >

      <input
       className="form-control mb-3"
       placeholder="Employee ID"
       onChange={(e)=>
        setSalary({
         ...salary,
         employeeId:e.target.value
        })
       }
      />

      <input
       className="form-control mb-3"
       placeholder="Employee Name"
       onChange={(e)=>
        setSalary({
         ...salary,
         employeeName:e.target.value
        })
       }
      />

      <input
       type="number"
       className="form-control mb-3"
       placeholder="Basic Salary"
       onChange={(e)=>
        setSalary({
         ...salary,
         basicSalary:e.target.value
        })
       }
      />

      <input
       type="number"
       className="form-control mb-3"
       placeholder="Bonus"
       onChange={(e)=>
        setSalary({
         ...salary,
         bonus:e.target.value
        })
       }
      />

      <input
       type="number"
       className="form-control mb-3"
       placeholder="Deduction"
       onChange={(e)=>
        setSalary({
         ...salary,
         deduction:e.target.value
        })
       }
      />

      <button
       className="btn btn-success"
      >
       Save Salary
      </button>

     </form>

    </div>

    <div className="card shadow mt-4 p-4">

     <h3>
      Payroll Records
     </h3>

     <table className="table table-bordered">

      <thead>

       <tr>
        <th>Employee</th>
        <th>Basic</th>
        <th>Bonus</th>
        <th>Deduction</th>
        <th>Net Salary</th>
        <th>Payslip</th>
       </tr>

      </thead>

      <tbody>

       {
        salaries.map(
        (s)=>(
        <tr key={s.id}>

         <td>
          {s.employeeName}
         </td>

         <td>
          ₹{s.basicSalary}
         </td>

         <td>
          ₹{s.bonus}
         </td>

         <td>
          ₹{s.deduction}
         </td>

         <td>
          ₹{s.netSalary}
         </td>

         <td>

          <button
           className=
           "btn btn-primary btn-sm"
           onClick={()=>
            downloadPayslip(
             s.id
            )
           }
          >
           Download
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

 );
}

export default SalaryManagement;