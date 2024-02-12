import { Link } from "react-router-dom";
import logo from "../../../assets/auth-logo.png";

const Login = () => {
  return (
    <div className="col-sm-10 col-md-8 col-lg-5">
      <div className="bg-white rounded-3 px-4 py-3 py-md-4 px-md-5">
        <div className="text-center mb-3">
          <img src={logo} alt="logo" className="w-75" />
        </div>

        <h2 className="fs-4">Log In</h2>
        <p className="text-muted">Welcome Back! Please enter your details</p>

        <form>
          <div className="input-group input-group-lg flex-nowrap">
            <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="text"
              className="form-control fs-6"
              placeholder="Enter your E-mail"
            />
          </div>

          <div className="input-group input-group-lg flex-nowrap mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control fs-6"
              placeholder="Password"
            />
          </div>

          <div className="d-flex align-items-center justify-content-between mt-2">
            <Link
              to="/register"
              className="text-decoration-none text-black fw-medium"
            >
              Register Now?
            </Link>
            <Link
              to="/forgot-password"
              className="text-decoration-none text-success fw-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="btn btn-success btn-lg w-100 mt-4">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
