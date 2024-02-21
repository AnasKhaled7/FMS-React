import PropTypes from "prop-types";
import { Header, RecipesHeader } from "../../components";
import img from "../../assets/woman.png";

const Home = ({ userData }) => {
  return (
    <section className="d-flex flex-column gap-4">
      <Header
        titleBold="Welcome"
        titleRegular={userData?.userName || "User"}
        text="This is a welcoming screen for the entry of the application, you can now see the options"
        image={img}
      />
      <RecipesHeader text="Fill Recipes" />
    </section>
  );
};

Home.propTypes = {
  userData: PropTypes.object,
};

export default Home;
