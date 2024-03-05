import { useContext } from "react";
import { Header, RecipesHeader } from "../../components";
import headerImg from "../../assets/woman.png";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const userData = useContext(UserContext);

  return (
    <>
      <Header
        titleBold="Welcome"
        titleRegular={userData?.userName || "User"}
        text="This is a welcoming screen for the entry of the application, you can now see the options"
        image={headerImg}
      />
      <RecipesHeader text="Fill Recipes" />
    </>
  );
};

export default Home;
