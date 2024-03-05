import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../assets/sidebar-logo.png";
import { ChangePassword } from "../modules";
import { UserContext } from "../context/UserContext";

const Sidebar = ({ logout }) => {
  const userData = useContext(UserContext);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <ProSidebar
      backgroundColor="transparent"
      rootStyles={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        borderTopRightRadius: "58px",
        backgroundColor: "#1F263E",
      }}
      collapsed={isCollapsed}
    >
      <Menu
        menuItemStyles={{
          button: {
            color: "#FFF",
            [`&.active`]: {
              backgroundColor: "#0092471A",
              borderLeft: "4px solid #009247",
            },
            [`&:hover`]: {
              backgroundColor: "#0092471A",
            },
          },
        }}
      >
        <div className="text-center py-4" onClick={toggleSidebar}>
          <img
            src={logo}
            alt="menu"
            className="w-50"
            style={{ cursor: "pointer" }}
          />
        </div>

        <MenuItem
          icon={<i className="fa fa-home"></i>}
          component={<NavLink to="/dashboard" end />}
        >
          Home
        </MenuItem>

        {userData?.userGroup === "SuperAdmin" && (
          <MenuItem
            icon={<i className="fa fa-users"></i>}
            component={<NavLink to="/dashboard/users" />}
          >
            Users
          </MenuItem>
        )}

        <MenuItem
          icon={<i className="fa-solid fa-fire-flame-curved"></i>}
          component={<NavLink to="/dashboard/recipes" />}
        >
          Recipes
        </MenuItem>

        {userData?.userGroup === "SuperAdmin" && (
          <MenuItem
            icon={<i className="fa-solid fa-table-cells"></i>}
            component={<NavLink to="/dashboard/categories" />}
          >
            Categories
          </MenuItem>
        )}

        {userData?.userGroup === "SystemUser" && (
          <MenuItem
            icon={<i className="fa-solid fa-heart"></i>}
            component={<NavLink to="/dashboard/favorites" />}
          >
            Favorites
          </MenuItem>
        )}

        <ChangePassword from="sidebar" />

        <MenuItem
          icon={<i className="fa-solid fa-right-from-bracket"></i>}
          onClick={logout}
        >
          Logout
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func,
};

export default Sidebar;
