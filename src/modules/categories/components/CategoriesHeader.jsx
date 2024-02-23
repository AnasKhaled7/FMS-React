import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { categoryNameValidation } from "../../../lib/validator";

const CategoriesHeader = ({ getCategories }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Category/",
        data,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      toast.success("Category added successfully");
      getCategories();
      handleClose();
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
      <div>
        <h3 className="mb-0">Categories Table Details</h3>
        <p>You can check all details</p>
      </div>

      <Button variant="success" onClick={handleShow}>
        Add New Category
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body className="my-2">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              autoComplete="off"
              {...register("name", categoryNameValidation)}
            />
            {errors.name && (
              <div className="invalid-feedback d-block">
                {errors.name.message}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success">
              {isSubmitting ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

CategoriesHeader.propTypes = {
  getCategories: PropTypes.func.isRequired,
};

export default CategoriesHeader;
