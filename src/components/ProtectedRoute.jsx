import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) =>
  !localStorage.getItem("token") ? <Navigate to="/login" /> : children;

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
