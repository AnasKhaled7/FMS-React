import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditCategory = ({ getCategories, categoryId, categoryName }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    setValue("name", categoryName);
  }, [setValue, categoryName]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Category updated successfully");
      getCategories();
      handleClose();
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-success me-2" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square"></i> Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              autoComplete="off"
              {...register("name", {
                required: "Category Name is required",
              })}
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
                "Edit"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

EditCategory.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default EditCategory;
