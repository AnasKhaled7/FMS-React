import { Header } from "../../components";
import img from "../../assets/man.png";

const Recipes = () => {
  return (
    <div>
      <Header
        titleBold="Recipe"
        titleRegular="items"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={img}
      />
      <p>Recipes</p>
    </div>
  );
};

export default Recipes;
