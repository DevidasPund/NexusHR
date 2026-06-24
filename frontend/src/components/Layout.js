import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Layout;