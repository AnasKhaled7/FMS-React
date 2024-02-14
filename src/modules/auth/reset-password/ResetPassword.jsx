import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FormHeader } from "../components";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Reset",
        data
      );
      navigate("/login");
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="col-sm-10 col-md-8 col-lg-5">
      <div className="bg-white rounded-3 px-4 py-3 py-md-4 px-md-5">
        <FormHeader
          title="Reset  Password"
          text="Please Enter Your Otp or Check Your Inbox"
        />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* email input */}
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
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

          {/* OTP input */}
          <div className="input-group mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="OTP"
              autoComplete="off"
              {...register("seed", {
                required: "OTP is required",
                minLength: {
                  value: 4,
                  message: "OTP must be exactly 4 characters long",
                },
                maxLength: {
                  value: 4,
                  message: "OTP must be exactly 4 characters long",
                },
              })}
            />
          </div>
          {errors.seed && (
            <div className="invalid-feedback d-block">
              {errors.seed.message}
            </div>
          )}

          {/* new password input */}
          <div className="input-group mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="New Password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
                },
              })}
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

          {/* confirm password input */}
          <div className="input-group mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm New Password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
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
          {errors.confirmPassword && (
            <div className="invalid-feedback d-block">
              {errors.confirmPassword.message}
            </div>
          )}

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
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
