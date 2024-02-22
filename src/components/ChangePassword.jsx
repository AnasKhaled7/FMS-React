import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { MenuItem } from "react-pro-sidebar";
import { FormHeader } from "../modules/auth/components";

const ChangePassword = () => {
  const [show, setShow] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleShowOldPassword = () =>
    setShowOldPassword((prevShowOldPassword) => !prevShowOldPassword);

  const toggleShowNewPassword = () =>
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);

  const toggleShowConfirmNewPassword = () =>
    setShowConfirmNewPassword(
      (prevShowConfirmNewPassword) => !prevShowConfirmNewPassword
    );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      const result = await axios.put(
        "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
        data,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      toast.success(result?.data?.message);
      handleClose();
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <MenuItem
        icon={<i className="fa-solid fa-lock"></i>}
        onClick={handleShow}
      >
        Change Password
      </MenuItem>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="py-3 py-md-4 px-4 px-md-5">
          <FormHeader
            title="Change Your Password"
            text="Enter your details below"
          />

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* old password input */}
            <div className="input-group input-group-lg mt-4">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={showOldPassword ? "text" : "password"}
                className="form-control"
                placeholder="Old Password"
                autoComplete="current-password"
                {...register("oldPassword", {
                  required: "Old password is required",
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
                onClick={toggleShowOldPassword}
              >
                <i
                  className={
                    showOldPassword
                      ? "fa-solid fa-eye-slash"
                      : "fa-solid fa-eye"
                  }
                ></i>
              </button>
            </div>
            {errors.oldPassword && (
              <div className="invalid-feedback d-block">
                {errors.oldPassword.message}
              </div>
            )}

            {/* new password input */}
            <div className="input-group input-group-lg mt-4">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={showNewPassword ? "text" : "password"}
                className="form-control"
                placeholder="New Password"
                autoComplete="new-password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "New password must be at least 6 characters long",
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
                onClick={toggleShowNewPassword}
              >
                <i
                  className={
                    showNewPassword
                      ? "fa-solid fa-eye-slash"
                      : "fa-solid fa-eye"
                  }
                ></i>
              </button>
            </div>
            {errors.newPassword && (
              <div className="invalid-feedback d-block">
                {errors.newPassword.message}
              </div>
            )}

            {/* confirm password input */}
            <div className="input-group input-group-lg mt-4">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm New Password"
                autoComplete="new-password"
                {...register("confirmNewPassword", {
                  required: "Confirm new password is required",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleShowConfirmNewPassword}
              >
                <i
                  className={
                    showConfirmNewPassword
                      ? "fa-solid fa-eye-slash"
                      : "fa-solid fa-eye"
                  }
                ></i>
              </button>
            </div>
            {errors.confirmNewPassword && (
              <div className="invalid-feedback d-block">
                {errors.confirmNewPassword.message}
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
                "Change Password"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePassword;
