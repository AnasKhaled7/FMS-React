import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import img from "../../../assets/woman-2.png";

const DeleteRecipe = ({ getRecipes, recipeId }) => {
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
        `https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      toast.success("Recipe deleted successfully");
      getRecipes();
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

      <Modal centered show={show} onHide={handleClose}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="text-end">
              <CloseButton onClick={handleClose} />
            </div>
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center my-4">
              <div>
                <img src={img} alt="delete category" />
                <hr className="my-0" />
              </div>
              <h4>Delete This Category?</h4>
              <p className="text-center text-muted">
                are you sure you want to delete this item? if you are sure just
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

DeleteRecipe.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired,
};

export default DeleteRecipe;
