import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ userData, children }) => {
  return !userData && !localStorage.getItem("token") ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

ProtectedRoute.propTypes = {
  userData: PropTypes.object,
  children: PropTypes.node,
};

export default ProtectedRoute;
