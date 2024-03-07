import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OTPValidation, emailValidation } from "../../lib/validator";
import { FormHeader } from "./components";

const EmailConfirmation = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await axios.put(
        "https://upskilling-egypt.com:443/api/v1/Users/verify",
        data
      );
      toast.success(result?.data?.message || "Email confirmed successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
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

          {/* code input */}
          <div className="input-group input-group-lg mt-4">
            <span className="input-group-text">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Code"
              autoComplete="off"
              {...register("code", OTPValidation)}
            />
          </div>
          {errors.code && (
            <div className="invalid-feedback d-block">
              {errors.code.message}
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
              "Confirm Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailConfirmation;
