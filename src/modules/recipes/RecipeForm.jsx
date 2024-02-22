import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Error, Loading, RecipesHeader } from "../../components";

const RecipeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");

  const [tags, setTags] = useState([]);
  const [isTagsLoading, setIsTagsLoading] = useState(false);
  const [tagsError, setTagsError] = useState("");

  const [recipe, setRecipe] = useState(null);
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const [recipeError, setRecipeError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const getCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=20&pageNumber=1",
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
        "https://upskilling-egypt.com:443/api/v1/tag/",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setTags(result?.data);
    } catch (error) {
      setTagsError(error?.response?.data?.message);
    } finally {
      setIsTagsLoading(false);
    }
  };

  const getRecipe = async (id) => {
    setIsRecipeLoading(true);
    try {
      const result = await axios.get(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setRecipe(result?.data);
    } catch (error) {
      setRecipeError(error?.response?.data?.message);
    } finally {
      setIsRecipeLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      for (let key in data) {
        if (key !== "recipeImage") {
          formData.append(key, data[key]);
        }
      }

      if (data.recipeImage[0]) {
        formData.append("recipeImage", data.recipeImage[0]);
      } else {
        formData.append("recipeImage", recipe?.imagePath);
      }

      if (id) {
        // Update existing recipe
        await axios.put(
          `https://upskilling-egypt.com:443/api/v1/Recipe/${id}`,
          formData,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        toast.success("Recipe updated successfully");
      } else {
        // Create new recipe
        await axios.post(
          "https://upskilling-egypt.com:443/api/v1/Recipe/",
          formData,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        toast.success("Recipe added successfully");
      }

      navigate("/dashboard/recipes");
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

  useEffect(() => {
    if (id) {
      getRecipe(id);
    }
  }, [id]);

  useEffect(() => {
    if (recipe) {
      setValue("name", recipe?.name);
      setValue("description", recipe?.description);
      setValue("price", recipe?.price);
      setValue("categoriesIds", recipe?.category[0]?.id);
      setValue("tagId", recipe?.tag?.id);
      setValue("recipeImage", recipe?.imagePath);
    }
  }, [recipe, setValue]);

  if (isCategoriesLoading || isTagsLoading || isRecipeLoading) {
    return <Loading />;
  }

  if (categoriesError || tagsError || recipeError) {
    return <Error message={categoriesError || tagsError || recipeError} />;
  }

  return (
    <>
      <RecipesHeader text="All Recipes" />

      <form
        noValidate
        autoComplete="off"
        className="d-flex flex-column gap-4 container-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name input */}
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <div className="invalid-feedback d-block">
              {errors.name.message}
            </div>
          )}
        </div>

        {/* description input */}
        <div>
          <textarea
            type="text"
            className="form-control"
            placeholder="Description"
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <div className="invalid-feedback d-block">
              {errors.description.message}
            </div>
          )}
        </div>

        {/* price input */}
        <div>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            {...register("price", {
              required: "Price is required",
            })}
          />
          {errors.price && (
            <div className="invalid-feedback d-block">
              {errors.price.message}
            </div>
          )}
        </div>

        {/* category select */}
        <div>
          <select
            className="form-select"
            aria-label="select category"
            {...register("categoriesIds", {
              required: "Category is required",
            })}
            value={recipe?.category[0]?.id || ""}
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
          {errors.categoriesIds && (
            <div className="invalid-feedback d-block">
              {errors.categoriesIds.message}
            </div>
          )}
        </div>

        {/* tags select */}
        <div>
          <select
            className="form-select"
            aria-label="select tag"
            {...register("tagId", { required: "Tag is required" })}
            value={recipe?.tag?.id || ""}
          >
            <option value="">Tag</option>
            {tags.map((tag) => (
              <option key={tag?.id} value={tag?.id}>
                {tag?.name}
              </option>
            ))}
          </select>
          {errors.tagId && (
            <div className="invalid-feedback d-block">
              {errors.tagId.message}
            </div>
          )}
        </div>

        {/* file upload */}
        <div>
          {recipe?.imagePath && (
            <img
              src={`https://upskilling-egypt.com/${recipe.imagePath}`}
              alt={recipe?.name}
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <input
            type="file"
            className="form-control"
            {...register("recipeImage", {
              required: !recipe?.imagePath && "Image is required",
            })}
          />
          {errors.recipeImage && (
            <div className="invalid-feedback d-block">
              {errors.recipeImage.message}
            </div>
          )}
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="btn btn-success btn-lg w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : id ? (
            "Update"
          ) : (
            "Add"
          )}
        </button>
      </form>
    </>
  );
};

export default RecipeForm;
