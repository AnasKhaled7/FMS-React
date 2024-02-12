import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <div className="auth-overlay container-fluid">
        <div className="row h-100 justify-content-center align-items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
