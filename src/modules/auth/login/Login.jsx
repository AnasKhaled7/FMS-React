import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { FormHeader } from "../components";

const Login = ({ saveUserData }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Login",
        data
      );
      localStorage.setItem("token", result.data.token);
      saveUserData();
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="col-sm-10 col-md-8 col-lg-5">
      <div className="bg-white rounded-3 px-4 py-3 py-md-4 px-md-5">
        <FormHeader
          title="Log In"
          text="Welcome Back! Please enter your details"
        />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* email input */}
          <div className="input-group input-group-lg flex-nowrap">
            <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control fs-6"
              placeholder="Enter your E-mail"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
            />
          </div>
          {errors.email && (
            <div className="invalid-feedback d-block">
              {errors.email.message}
            </div>
          )}

          {/* password input */}
          <div className="input-group input-group-lg flex-nowrap mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control fs-6"
              placeholder="Password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
            >
              <i
                className={
                  showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                }
              ></i>
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}

          {/* links */}
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

          {/* submit button */}
          <button
            type="submit"
            className="btn btn-success btn-lg w-100 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  saveUserData: PropTypes.func.isRequired,
};

export default Login;
