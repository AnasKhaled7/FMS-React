import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Error, Header, Loading, NoResult } from "../../components";
import headerImg from "../../assets/man.png";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const getFavorites = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/userRecipe",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setFavorites(result?.data?.data);
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (id) => {
    setIsRemoveLoading(true);
    try {
      await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/userRecipe/${id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      toast.success("Recipe removed from favorites successfully");
      getFavorites();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsRemoveLoading(false);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  if (error) return <Error message={error} />;

  return (
    <>
      <Header
        titleBold="Favorite"
        titleRegular="Items"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImg}
      />

      {isLoading ? (
        <Loading />
      ) : favorites.length > 0 ? (
        <div className="row g-4">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="col-md-4 col-xl-3">
              <div className="card">
                <img
                  src={`https://upskilling-egypt.com:443/${favorite?.recipe?.imagePath}`}
                  className="card-img-top object-fit-cover bg-body-tertiary"
                  height={250}
                  alt={favorite?.recipe?.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{favorite?.recipe?.name}</h5>
                  <p className="card-text text-truncate">
                    {favorite?.recipe?.description}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    disabled={isRemoveLoading}
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoResult />
      )}
    </>
  );
};

export default Favorites;
