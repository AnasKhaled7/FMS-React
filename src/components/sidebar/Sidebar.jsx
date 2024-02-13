import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column align-items-center border-end border-1">
      <p>Sidebar</p>

      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
