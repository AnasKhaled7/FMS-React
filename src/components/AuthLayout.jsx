import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <div className="container-fluid py-4">
        <div className="row justify-content-center align-items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
