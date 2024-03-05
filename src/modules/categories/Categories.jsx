import { useEffect, useState } from "react";
import axios from "axios";
import {
  Error,
  Header,
  Loading,
  LocalSearch,
  NoResult,
  Pagination,
} from "../../components";
import headerImg from "../../assets/man.png";
import { CategoriesHeader, DeleteCategory, EditCategory } from "./components";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState("");

  const getCategories = async (pageNumber, pageSize, name) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category",
        {
          headers: { Authorization: localStorage.getItem("token") },
          params: { pageNumber, pageSize, name },
        }
      );
      setCategories(result?.data);
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories(pageNumber, 10, name);
  }, [pageNumber, name]);

  if (error) return <Error message={error} />;

  return (
    <>
      <Header
        titleBold="Categories"
        titleRegular="Item"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImg}
      />

      <CategoriesHeader getCategories={getCategories} />

      <div className="row">
        <LocalSearch
          placeholder="Search by name..."
          onChange={(e) => {
            setName(e.target.value);
            setPageNumber(1);
          }}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : categories?.totalNumberOfPages > 0 ? (
        <>
          <table className="table table-striped text-center align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {categories?.data.map((category) => (
                <tr key={category?.id}>
                  <th scope="row">{category?.id}</th>
                  <td>{category?.name}</td>
                  <td>
                    <EditCategory
                      categoryId={category?.id}
                      categoryName={category?.name}
                      getCategories={getCategories}
                    />
                    <DeleteCategory
                      categoryId={category?.id}
                      getCategories={getCategories}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {categories?.totalNumberOfPages > 1 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              data={categories}
            />
          )}
        </>
      ) : (
        <NoResult />
      )}
    </>
  );
};

export default Categories;
