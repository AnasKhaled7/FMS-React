import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(UserContext);

  return !userData && !localStorage.getItem("token") ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
