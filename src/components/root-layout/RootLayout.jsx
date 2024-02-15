import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../";

const RootLayout = () => {
  return (
    <main className="d-flex">
      <Sidebar />

      <div className="w-100">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
