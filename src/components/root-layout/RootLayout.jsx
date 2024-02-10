import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../";

const RootLayout = () => {
  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
