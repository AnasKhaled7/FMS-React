import { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import noImg from "../../../assets/no-img.jpg";
import { DeleteRecipe } from "./";

const RecipesTable = ({ recipes, getRecipes, favorites, toggleFavorite }) => {
  const navigate = useNavigate();

  const userData = useContext(UserContext);
  return (
    <table className="table table-striped text-center align-middle">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {recipes?.data.map((recipe) => (
          <tr key={recipe?.id}>
            <th scope="row">{recipe?.id}</th>
            <td>
              <img
                src={
                  recipe?.imagePath
                    ? `https://upskilling-egypt.com/${recipe.imagePath}`
                    : `${noImg}`
                }
                alt={recipe?.name}
                width="50"
                height="50"
                className="rounded-circle object-fit-cover"
              />
            </td>
            <td>{recipe?.name}</td>
            <td>{recipe?.category[0]?.name}</td>
            <td>
              {userData?.userGroup === "SuperAdmin" ? (
                <>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => navigate(`edit-recipe/${recipe?.id}`)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <DeleteRecipe getRecipes={getRecipes} recipeId={recipe?.id} />
                </>
              ) : (
                <button
                  className={`btn btn-sm btn-${
                    favorites?.find((fav) => fav?.recipe?.id === recipe?.id)
                      ? "danger"
                      : "outline-danger"
                  }
                        `}
                  onClick={() => toggleFavorite(recipe?.id)}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

RecipesTable.propTypes = {
  recipes: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default RecipesTable;
