import PropTypes from "prop-types";

const Header = ({ titleBold, titleRegular, text, image }) => {
  return (
    <div className="container-fluid header-container rounded-3">
      <div className="text-white">
        <h2 className="fs-1 text-capitalize">
          {titleBold} <span className="fw-light">{titleRegular}</span>
        </h2>
        <p>{text}</p>
      </div>
      <div className="d-md-block d-none">
        <img src={image} alt="logo" className="w-100" />
      </div>
    </div>
  );
};

Header.propTypes = {
  titleBold: PropTypes.string.isRequired,
  titleRegular: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Header;
