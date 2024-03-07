import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FormHeader } from "./components";
import {
  OTPValidation,
  emailValidation,
  passwordValidation,
} from "../../lib/validator";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

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
      toast.success(result?.data?.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="col-sm-10 col-md-8 col-lg-5">
      <div className="bg-white rounded-3 px-4 py-3 py-md-4 px-md-5">
        <FormHeader
          title="Reset Password"
          text="Please Enter Your Otp or Check Your Inbox"
        />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* email input */}
          <div className="input-group input-group-lg">
            <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              autoComplete="email"
              {...register("email", emailValidation)}
            />
          </div>
          {errors.email && (
            <div className="invalid-feedback d-block">
              {errors.email.message}
            </div>
          )}

          {/* OTP input */}
          <div className="input-group input-group-lg mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="OTP"
              autoComplete="off"
              {...register("seed", OTPValidation)}
            />
          </div>
          {errors.seed && (
            <div className="invalid-feedback d-block">
              {errors.seed.message}
            </div>
          )}

          {/* new password input */}
          <div className="input-group input-group-lg mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="New Password"
              autoComplete="new-password"
              {...register("password", passwordValidation)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
            >
              <i
                className={`fa-solid  fa-eye${showPassword ? "-slash" : ""}`}
              ></i>
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}

          {/* confirm password input */}
          <div className="input-group input-group-lg mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
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
              onClick={toggleShowConfirmPassword}
            >
              <i
                className={`fa-solid  fa-eye${
                  showConfirmPassword ? "-slash" : ""
                }`}
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
