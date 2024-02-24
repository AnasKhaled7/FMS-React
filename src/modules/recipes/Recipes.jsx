import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Error, Header, Loading, NoResult } from "../../components";
import { DeleteRecipe } from "./components";
import headerImg from "../../assets/man.png";
import noImg from "../../assets/no-img.jpg";

const Recipes = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecipes = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=20&pageNumber=1",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setRecipes(result?.data?.data);
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      <Header
        titleBold="Recipe"
        titleRegular="items"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImg}
      />

      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
        <div>
          <h3 className="mb-0">Recipe Table Details</h3>
          <p>You can check all details</p>
        </div>

        <Button variant="success" onClick={() => navigate("add-recipe")}>
          Add New Recipe
        </Button>
      </div>

      {recipes.length > 0 ? (
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
            {recipes.map((recipe) => (
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
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => navigate(`edit-recipe/${recipe?.id}`)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <DeleteRecipe getRecipes={getRecipes} recipeId={recipe?.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoResult />
      )}
    </>
  );
};

export default Recipes;
