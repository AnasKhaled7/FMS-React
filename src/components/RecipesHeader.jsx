import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const RecipesHeader = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-3 p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4"
      style={{ backgroundColor: "#F0FFEF" }}
    >
      <div>
        <h2>
          Fill the <span className="text-success">Recipes</span>!
        </h2>
        <p>
          you can now fill the meals easily using the table and form,
          <br />
          click here and sill it with the table!
        </p>
      </div>

      <button
        className="btn btn-success btn-lg px-4"
        onClick={() => navigate("/dashboard/recipes")}
      >
        {text} <i className="fa-solid fa-arrow-right ms-2"></i>
      </button>
    </div>
  );
};

RecipesHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default RecipesHeader;
