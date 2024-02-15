import { Header } from "../../components";
import img from "../../assets/man.png";

const Categories = () => {
  return (
    <div>
      <Header
        titleBold="Categories"
        titleRegular="Item"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={img}
      />
      <p>Categories</p>
    </div>
  );
};

export default Categories;
