import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../assets/sidebar-logo.png";
import { ChangePassword } from "./";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () =>
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
        <MenuItem
          icon={<i className="fa fa-users"></i>}
          component={<NavLink to="/dashboard/users" />}
        >
          Users
        </MenuItem>
        <MenuItem
          icon={<i className="fa-solid fa-fire-flame-curved"></i>}
          component={<NavLink to="/dashboard/recipes" />}
        >
          Recipes
        </MenuItem>
        <MenuItem
          icon={<i className="fa-solid fa-table-cells"></i>}
          component={<NavLink to="/dashboard/categories" />}
        >
          Categories
        </MenuItem>
        <ChangePassword />
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

export default Sidebar;
