import { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";
import logo from "../assets/sidebar-logo.png";
import { Link } from "react-router-dom";
import { ChangePassword } from "../modules";

const Navbar = () => {
  const userData = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-md sticky-top bg-body-tertiary rounded-3 d-block d-md-none">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          <img src={logo} alt="logo" width="65" height="52" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Home
              </Link>
            </li>

            {userData?.userGroup === "SuperAdmin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/users">
                  Users
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/recipes">
                Recipes
              </Link>
            </li>

            {userData?.userGroup === "SuperAdmin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/categories">
                  Categories
                </Link>
              </li>
            )}

            {userData?.userGroup === "SystemUser" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/favorites">
                  Favorites
                </Link>
              </li>
            )}

            <ChangePassword from="navbar" />

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userData: PropTypes.object,
};

export default Navbar;
