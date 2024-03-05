import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "./";

const RootLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <main className="d-flex">
      <div className="d-none d-md-block">
        <Sidebar logout={logout} />
      </div>

      <div className="w-100 p-3 d-flex flex-column gap-4">
        <Navbar logout={logout} />
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
