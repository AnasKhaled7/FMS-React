import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const RecipesHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
      <div>
        <h3 className="mb-0">Recipe Table Details</h3>
        <p>You can check all details</p>
      </div>

      <Button variant="success" onClick={() => navigate("add-recipe")}>
        Add New Recipe
      </Button>
    </div>
  );
};
export default RecipesHeader;
