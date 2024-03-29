import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { MenuItem } from "react-pro-sidebar";
import { FormHeader } from "./components";
import { passwordValidation } from "../../lib/validator";

const ChangePassword = ({ from }) => {
  const [show, setShow] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleShowOldPassword = () => setShowOldPassword((prev) => !prev);

  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);

  const toggleShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((prev) => !prev);

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
      {from === "sidebar" ? (
        <MenuItem
          icon={<i className="fa-solid fa-lock"></i>}
          onClick={handleShow}
        >
          Change Password
        </MenuItem>
      ) : (
        <li className="nav-item" role="button" onClick={handleShow}>
          <p className="nav-link mb-0">Change Password</p>
        </li>
      )}

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
                {...register("oldPassword", passwordValidation)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleShowOldPassword}
              >
                <i
                  className={`fa-solid  fa-eye${
                    showOldPassword ? "-slash" : ""
                  }`}
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
                {...register("newPassword", passwordValidation)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleShowNewPassword}
              >
                <i
                  className={`fa-solid  fa-eye${
                    showNewPassword ? "-slash" : ""
                  }`}
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
                  className={`fa-solid  fa-eye${
                    showConfirmNewPassword ? "-slash" : ""
                  }`}
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

ChangePassword.propTypes = {
  from: PropTypes.string,
};

export default ChangePassword;
