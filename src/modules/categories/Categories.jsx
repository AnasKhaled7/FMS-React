import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components";
import headerImg from "../../assets/man.png";
import noDataImg from "../../assets/woman-2.png";
import { CategoriesHeader, DeleteCategory, EditCategory } from "./components";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setCategories(result?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="d-flex flex-column gap-4">
      <Header
        titleBold="Categories"
        titleRegular="Item"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImg}
      />

      <CategoriesHeader getCategories={getCategories} />

      {categories.length > 0 ? (
        <table className="table table-striped text-center align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {categories.map((category) => (
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>
                  <EditCategory
                    categoryId={category.id}
                    categoryName={category.name}
                    getCategories={getCategories}
                  />
                  <DeleteCategory
                    categoryId={category.id}
                    getCategories={getCategories}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="d-flex flex-column gap-4 justify-content-center align-items-center my-4">
          <div>
            <img src={noDataImg} alt="No Data" />
            <hr className="my-0" />
          </div>
          <h4>No Data !</h4>
        </div>
      )}
    </section>
  );
};

export default Categories;
