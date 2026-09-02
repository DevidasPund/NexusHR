import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div className="nexus-page-layout">
      <Sidebar />

      <main className="nexus-page-main">
        <Navbar />

        <div className="nexus-page-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;