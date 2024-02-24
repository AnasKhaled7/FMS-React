import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FormHeader } from "./components";
import {
  countryValidation,
  emailValidation,
  passwordValidation,
  phoneNumberValidation,
  userNameValidation,
} from "../../lib/validator";

const Register = () => {
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
      const formData = new FormData();

      for (let key in data) {
        if (key !== "profileImage") formData.append(key, data[key]);
      }

      if (data.profileImage.length > 0)
        formData.append("profileImage", data.profileImage[0]);

      const result = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Register",
        formData
      );
      navigate("/email-confirmation");
      toast.success(result?.data?.message || "Registered successfully");
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="col-md-10">
      <div className="bg-white rounded-3 px-4 py-3 py-md-4 px-md-5">
        <FormHeader
          title="Register"
          text="Welcome! Please enter your details"
        />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-4">
            {/* userName input */}
            <div className="col-md-6">
              <div className="input-group input-group-lg">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  autoComplete="username"
                  {...register("userName", userNameValidation)}
                />
              </div>
              {errors.userName && (
                <div className="invalid-feedback d-block">
                  {errors.userName.message}
                </div>
              )}
            </div>

            {/* email input */}
            <div className="col-md-6">
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
            </div>

            {/* country input */}
            <div className="col-md-6">
              <div className="input-group input-group-lg">
                <span className="input-group-text">
                  <i className="fa-solid fa-flag"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  autoComplete="country"
                  {...register("country", countryValidation)}
                />
              </div>
              {errors.country && (
                <div className="invalid-feedback d-block">
                  {errors.country.message}
                </div>
              )}
            </div>

            {/* phone number input */}
            <div className="col-md-6">
              <div className="input-group input-group-lg">
                <span className="input-group-text">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  autoComplete="tel"
                  {...register("phoneNumber", phoneNumberValidation)}
                />
              </div>
              {errors.phoneNumber && (
                <div className="invalid-feedback d-block">
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>

            {/* password input */}
            <div className="col-md-6">
              <div className="input-group input-group-lg">
                <span className="input-group-text">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  autoComplete="new-password"
                  {...register("password", passwordValidation)}
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
            </div>

            {/* confirm password input */}
            <div className="col-md-6">
              <div className="input-group input-group-lg">
                <span className="input-group-text">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
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
                    className={
                      showConfirmPassword
                        ? "fa-solid fa-eye-slash"
                        : "fa-solid fa-eye"
                    }
                  ></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback d-block">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <div className="col-md-12">
              <div className="input-group input-group-lg">
                <span className="input-group-text">
                  <i className="fa-solid fa-image"></i>
                </span>
                <input
                  type="file"
                  className="form-control"
                  {...register("profileImage")}
                />
              </div>
              {errors.profileImage && (
                <div className="invalid-feedback d-block">
                  {errors.profileImage.message}
                </div>
              )}
            </div>
          </div>

          {/* link */}
          <Link
            to="/login"
            className="text-decoration-none text-success fw-medium mt-2 d-block text-end"
          >
            Login Now?
          </Link>

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
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
