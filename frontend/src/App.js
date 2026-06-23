import React from "react";
import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import { ToastContainer }
from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import NotificationListener
from "./components/NotificationListener";

import ProtectedRoute
from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import Department from "./pages/Department";

import Attendance from "./pages/Attendance";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import FaceAttendance from "./pages/FaceAttendance";
import AdminAttendance from "./pages/AdminAttendance";

import Leave from "./pages/MyLeave";
import LeaveManagement from "./pages/LeaveManagement";

import Recruitment from "./pages/Recruitment";
import PerformanceManagement from "./pages/PerformanceManagement";
import Projects from "./pages/Project";
import Tasks from "./pages/Tasks";
import MyTasks from "./pages/MyTasks";
import Team from "./pages/Team";

import Salary from "./pages/Salary";
import SalaryManagement from "./pages/SalaryManagement";
import TeamSalary from "./pages/TeamSalary";

import Ratings from "./pages/Ratings";
import Reports from "./pages/Reports";
import PayslipManagement from "./pages/PayslipManagement";
import NotificationManagement
from "./pages/NotificationManagement";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import AuditLogs from "./pages/AuditLogs";
import EmailManagement from "./pages/EmailManagement";
import Milestones from "./pages/Milestones";
import AIInsights from "./pages/AIInsights";
import AttritionRisk from "./pages/AttritionRisk";
import SkillGapAnalysis from "./pages/SkillGapAnalysis";
import EmployeeNotification from "./pages/EmployeeNotification";
function App() {

return (

  <BrowserRouter>

   <NotificationListener />

<ToastContainer
 position="top-right"
 autoClose={5000}
 newestOnTop
 closeOnClick
 pauseOnHover
/>

   <Routes>


{/* Public Routes */}

<Route
 path="/"
 element={<Login />}
/>
<Route
  path="/payslips"
  element={<PayslipManagement />}
/>
<Route
 path="/register"
 element={<Register />}
/>
<Route
 path="/performance"
 element={<PerformanceManagement />}
/>
<Route
 path="/forgot-password"
 element={<ForgotPassword />}
/>
<Route path="/ai-insights" element={<ProtectedRoute><AIInsights /></ProtectedRoute>} />

<Route path="/attrition-risk" element={<ProtectedRoute><AttritionRisk /></ProtectedRoute>} />

<Route path="/skill-gap-analysis" element={<ProtectedRoute><SkillGapAnalysis /></ProtectedRoute>} />
{/* Dashboard */}

<Route
 path="/admin/dashboard"
 element={
  <ProtectedRoute>
   <AdminDashboard />
  </ProtectedRoute>
 }
/>

<Route
 path="/manager/dashboard"
 element={
  <ProtectedRoute>
   <ManagerDashboard />
  </ProtectedRoute>
 }
/>

<Route
 path="/employee-dashboard"
 element={
  <ProtectedRoute>
   <EmployeeDashboard />
  </ProtectedRoute>
 }
/>
<Route
 path="/milestones"
 element={
  <ProtectedRoute>
   <Milestones />
  </ProtectedRoute>
 }
/>
{/* Employee */}

<Route
 path="/employees"
 element={
  <ProtectedRoute>
   <Employees />
  </ProtectedRoute>
 }
/>

<Route
 path="/add-employee"
 element={
  <ProtectedRoute>
   <AddEmployee />
  </ProtectedRoute>
 }
/>

<Route
 path="/edit-employee/:id"
 element={
  <ProtectedRoute>
   <EditEmployee />
  </ProtectedRoute>
 }
/>

{/* Department */}

<Route
 path="/departments"
 element={
  <ProtectedRoute>
   <Department />
  </ProtectedRoute>
 }
/>

{/* Attendance */}

<Route
 path="/attendance"
 element={
  <ProtectedRoute>
   <Attendance />
  </ProtectedRoute>
 }
/>

<Route
 path="/employee-attendance"
 element={
  <ProtectedRoute>
   <EmployeeAttendance />
  </ProtectedRoute>
 }
/>

<Route
 path="/admin-attendance"
 element={
  <ProtectedRoute>
   <AdminAttendance />
  </ProtectedRoute>
 }
/>

<Route
 path="/face-attendance"
 element={
  <ProtectedRoute>
   <FaceAttendance />
  </ProtectedRoute>
 }
/>

{/* Leave */}

<Route
 path="/leave"
 element={
  <ProtectedRoute>
   <Leave />
  </ProtectedRoute>
 }
/>

<Route
 path="/leave-management"
 element={
  <ProtectedRoute>
   <LeaveManagement />
  </ProtectedRoute>
 }
/>

{/* Recruitment */}

<Route
 path="/recruitment"
 element={
  <ProtectedRoute>
   <Recruitment />
  </ProtectedRoute>
 }
/>

{/* Projects */}

<Route
 path="/projects"
 element={
  <ProtectedRoute>
   <Projects />
  </ProtectedRoute>
 }
/>

{/* Tasks */}

<Route
 path="/tasks"
 element={
  <ProtectedRoute>
   <Tasks />
  </ProtectedRoute>
 }
/>

<Route
 path="/my-tasks"
 element={
  <ProtectedRoute>
   <MyTasks />
  </ProtectedRoute>
 }
/>

{/* Team */}

<Route
 path="/teams"
 element={
  <ProtectedRoute>
   <Team />
  </ProtectedRoute>
 }
/>

{/* Salary */}

<Route
 path="/salary"
 element={
  <ProtectedRoute>
   <Salary />
  </ProtectedRoute>
 }
/>

<Route
 path="/salary-management"
 element={
  <ProtectedRoute>
   <SalaryManagement />
  </ProtectedRoute>
 }
/>

<Route
 path="/team-salary"
 element={
  <ProtectedRoute>
   <TeamSalary />
  </ProtectedRoute>
 }
/>

{/* Ratings */}

<Route
 path="/ratings"
 element={
  <ProtectedRoute>
   <Ratings />
  </ProtectedRoute>
 }
/>

{/* Reports */}

<Route
 path="/reports"
 element={
  <ProtectedRoute>
   <Reports />
  </ProtectedRoute>
 }
/>

{/* Notifications */}

<Route
 path="/employee-notification"
 element={
  <ProtectedRoute>
   <EmployeeNotification />
  </ProtectedRoute>
 }
/>
<Route
 path="/notification-management"
 element={
  <ProtectedRoute>
   <NotificationManagement />
  </ProtectedRoute>
 }
/>
<Route
 path="/audit-logs"
 element={
  <ProtectedRoute>
   <AuditLogs />
  </ProtectedRoute>
 }
/>
{/* Profile */}

<Route
 path="/profile"
 element={
  <ProtectedRoute>
   <Profile />
  </ProtectedRoute>
 }
/>

{/* Settings */}

<Route
 path="/settings"
 element={
  <ProtectedRoute>
   <Settings />
  </ProtectedRoute>
 }
/>

{/* Password */}

<Route
 path="/change-password"
 element={
  <ProtectedRoute>
   <ChangePassword />
  </ProtectedRoute>
 }
/>
<Route
  path="/email-management"
  element={<EmailManagement />}
/>

   </Routes>

  </BrowserRouter>

);
}

export default App;
