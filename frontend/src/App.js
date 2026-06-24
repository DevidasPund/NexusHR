import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotificationListener from "./components/NotificationListener";
import ProtectedRoute from "./components/ProtectedRoute";

/* Authentication */
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

/* Dashboards */
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

/* Employee */
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

/* Department */
import Department from "./pages/Department";

/* Attendance */
import Attendance from "./pages/Attendance";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import AdminAttendance from "./pages/AdminAttendance";
import FaceAttendance from "./pages/FaceAttendance";

/* Leave */
import MyLeave from "./pages/MyLeave";
import LeaveManagement from "./pages/LeaveManagement";

/* Recruitment */
import Recruitment from "./pages/Recruitment";

/* Project & Task */
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import MyTasks from "./pages/MyTasks";
import Milestones from "./pages/Milestones";

/* Team */
import Team from "./pages/Team";
import TeamMembers from "./pages/TeamMembers";
import TeamAttendance from "./pages/TeamAttendance";
import TeamSalary from "./pages/TeamSalary";

/* Performance */
import PerformanceManagement from "./pages/PerformanceManagement";
import PerformanceInsights from "./pages/PerformanceInsights";
import Ratings from "./pages/Ratings";

/* Salary */
import Salary from "./pages/Salary";
import SalaryManagement from "./pages/SalaryManagement";
import PayslipManagement from "./pages/PayslipManagement";

/* Reports */
import Reports from "./pages/Reports";
import AuditLogs from "./pages/AuditLogs";

/* Notifications */
import NotificationManagement from "./pages/NotificationManagement";
import EmployeeNotification from "./pages/EmployeeNotification";

/* Profile */
import Profile from "./pages/Profile";
import ManagerProfile from "./pages/ManagerProfile";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";

/* Email */
import EmailManagement from "./pages/EmailManagement";

/* AI Features */
import AIInsights from "./pages/AIInsights";
import AttritionRisk from "./pages/AttritionRisk";
import SkillGapAnalysis from "./pages/SkillGapAnalysis";

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

        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

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
              <MyLeave />
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

        <Route
          path="/milestones"
          element={
            <ProtectedRoute>
              <Milestones />
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

        <Route
          path="/team-members"
          element={
            <ProtectedRoute>
              <TeamMembers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team-attendance"
          element={
            <ProtectedRoute>
              <TeamAttendance />
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

        {/* Performance */}

        <Route
          path="/performance"
          element={
            <ProtectedRoute>
              <PerformanceManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/performance-insights"
          element={
            <ProtectedRoute>
              <PerformanceInsights />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ratings"
          element={
            <ProtectedRoute>
              <Ratings />
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
          path="/payslips"
          element={
            <ProtectedRoute>
              <PayslipManagement />
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

        <Route
          path="/audit-logs"
          element={
            <ProtectedRoute>
              <AuditLogs />
            </ProtectedRoute>
          }
        />

        {/* Notifications */}

        <Route
          path="/notification-management"
          element={
            <ProtectedRoute>
              <NotificationManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-notification"
          element={
            <ProtectedRoute>
              <EmployeeNotification />
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

        <Route
          path="/manager-profile"
          element={
            <ProtectedRoute>
              <ManagerProfile />
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

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* Email */}

        <Route
          path="/email-management"
          element={
            <ProtectedRoute>
              <EmailManagement />
            </ProtectedRoute>
          }
        />

        {/* AI */}

        <Route
          path="/ai-insights"
          element={
            <ProtectedRoute>
              <AIInsights />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attrition-risk"
          element={
            <ProtectedRoute>
              <AttritionRisk />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skill-gap-analysis"
          element={
            <ProtectedRoute>
              <SkillGapAnalysis />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={
            <div className="container text-center mt-5">
              <h1>404</h1>
              <h3>Page Not Found</h3>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;