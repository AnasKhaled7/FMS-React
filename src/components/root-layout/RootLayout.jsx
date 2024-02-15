import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Sidebar } from "../";

const RootLayout = ({ userData }) => {
  return (
    <main className="d-flex">
      <Sidebar />

      <div className="w-100 p-3 d-flex flex-column gap-3">
        <Navbar userData={userData} />
        <Outlet />
      </div>
    </main>
  );
};

RootLayout.propTypes = {
  userData: PropTypes.object,
};

export default RootLayout;
