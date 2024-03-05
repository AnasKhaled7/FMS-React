import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Error,
  Header,
  Loading,
  LocalSearch,
  NoResult,
  Pagination,
} from "../../components";
import { RecipesHeader, RecipesTable } from "./components";
import headerImg from "../../assets/man.png";
import { UserContext } from "../../context/UserContext";

const Recipes = () => {
  const userData = useContext(UserContext);

  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");

  const [tags, setTags] = useState([]);
  const [isTagsLoading, setIsTagsLoading] = useState(false);
  const [tagsError, setTagsError] = useState("");

  const [favorites, setFavorites] = useState([]);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState("");
  const [tagId, setTagId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const getCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setCategories(result?.data?.data);
    } catch (error) {
      setCategoriesError(error?.response?.data?.message);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const getTags = async () => {
    setIsTagsLoading(true);
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setTags(result?.data);
    } catch (error) {
      setTagsError(error?.response?.data?.message);
    } finally {
      setIsTagsLoading(false);
    }
  };

  const getRecipes = async (pageNumber, pageSize, name, tagId, categoryId) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `https://upskilling-egypt.com:443/api/v1/Recipe`,
        {
          headers: { Authorization: localStorage.getItem("token") },
          params: { pageNumber, pageSize, name, tagId, categoryId },
        }
      );
      setRecipes(result?.data);
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFavorites = async () => {
    setIsFavoritesLoading(true);
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/userRecipe",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setFavorites(result?.data?.data);
    } catch (error) {
      setFavoritesError(error?.response?.data?.message);
    } finally {
      setIsFavoritesLoading(false);
    }
  };

  const toggleFavorite = async (recipeId) => {
    const favorite = favorites.find(
      (favorite) => favorite.recipe.id === recipeId
    );

    if (favorite) {
      try {
        await axios.delete(
          `https://upskilling-egypt.com:443/api/v1/userRecipe/${favorite.id}`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        getFavorites();
        toast.success("Recipe removed from favorites successfully");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else if (favorites.length >= 5) {
      toast.error("You can only add up to 5 favorites.");
    } else {
      try {
        await axios.post(
          "https://upskilling-egypt.com:443/api/v1/userRecipe",
          { recipeId },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        getFavorites();
        toast.success("Recipe added to favorites successfully");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    getCategories();
    getTags();
    if (userData?.userGroup === "SystemUser") getFavorites();
  }, []);

  useEffect(() => {
    getRecipes(pageNumber, 10, name, tagId, categoryId);
  }, [pageNumber, name, tagId, categoryId]);

  if (error || categoriesError || tagsError || favoritesError)
    return <Error message={error || categoriesError || tagsError} />;

  return (
    <>
      <Header
        titleBold="Recipe"
        titleRegular="items"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImg}
      />

      <RecipesHeader />

      {isCategoriesLoading || isTagsLoading || isFavoritesLoading ? (
        <Loading />
      ) : (
        <>
          <div className="row g-4 align-items-center">
            <LocalSearch
              placeholder="Search by name..."
              onChange={(e) => {
                setName(e.target.value);
                setPageNumber(1);
              }}
            />

            {/* category select */}
            <div className="col-md-4">
              <select
                className="form-select"
                aria-label="select category"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Category</option>
                {categories.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* tags select */}
            <div className="col-md-4">
              <select
                className="form-select"
                aria-label="select tag"
                onChange={(e) => setTagId(e.target.value)}
              >
                <option value="">Tag</option>
                {tags.map((tag) => (
                  <option key={tag?.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : recipes?.totalNumberOfPages > 0 ? (
            <>
              <div className="table-responsive">
                <RecipesTable
                  recipes={recipes}
                  getRecipes={getRecipes}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </div>

              {recipes?.totalNumberOfPages > 1 && (
                <Pagination
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  data={recipes}
                />
              )}
            </>
          ) : (
            <NoResult />
          )}
        </>
      )}
    </>
  );
};

export default Recipes;
