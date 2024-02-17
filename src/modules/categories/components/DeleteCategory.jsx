import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import img from "../../../assets/woman-2.png";

const DeleteCategory = ({ getCategories, categoryId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Category deleted successfully");
      getCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-outline-danger" onClick={handleShow}>
        <i className="fa-solid fa-trash"></i> Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center my-4">
              <div>
                <img src={img} alt="delete category" />
                <hr className="my-0" />
              </div>
              <h4>Delete This Category ?</h4>
              <p className="text-center text-muted">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-danger">
              {isSubmitting ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

DeleteCategory.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default DeleteCategory;
