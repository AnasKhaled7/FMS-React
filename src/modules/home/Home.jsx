import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import img from "../../assets/woman.png";

const Home = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <section className="d-flex flex-column gap-4">
      <Header
        titleBold="Welcome"
        titleRegular={userData?.userName || "User"}
        text="This is a welcoming screen for the entry of the application, you can now see the options"
        image={img}
      />
      <div
        className="rounded-3 p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4"
        style={{ backgroundColor: "#F0FFEF" }}
      >
        <div>
          <h2>
            Fill the <span className="text-success">Recipes</span>!
          </h2>
          <p>
            you can now fill the meals easily using the table and form,
            <br />
            click here and sill it with the table!
          </p>
        </div>

        <button
          className="btn btn-success btn-lg px-4"
          onClick={() => navigate("recipes")}
        >
          Fill Recipes <i className="fa-solid fa-arrow-right ms-2"></i>
        </button>
      </div>
    </section>
  );
};

Home.propTypes = {
  userData: PropTypes.object,
};

export default Home;
