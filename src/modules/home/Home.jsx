import PropTypes from "prop-types";
import { Header, RecipesHeader } from "../../components";
import img from "../../assets/woman.png";

const Home = ({ userData }) => {
  return (
    <>
      <Header
        titleBold="Welcome"
        titleRegular={userData?.userName || "User"}
        text="This is a welcoming screen for the entry of the application, you can now see the options"
        image={img}
      />
      <RecipesHeader text="Fill Recipes" />
    </>
  );
};

Home.propTypes = {
  userData: PropTypes.object,
};

export default Home;
