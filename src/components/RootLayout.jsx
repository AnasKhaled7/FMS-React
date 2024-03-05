import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "./";

const RootLayout = () => {
  return (
    <main className="d-flex">
      <div className="d-none d-md-block">
        <Sidebar />
      </div>

      <div className="w-100 p-3 d-flex flex-column gap-4">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
