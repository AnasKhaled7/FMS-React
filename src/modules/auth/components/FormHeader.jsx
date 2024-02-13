import PropTypes from "prop-types";
import logo from "../../../assets/auth-logo.png";

const FormHeader = ({ title, text }) => {
  return (
    <>
      <div className="text-center mb-3">
        <img src={logo} alt="logo" className="w-75" />
      </div>

      <h2 className="fs-4">{title}</h2>
      <p className="text-muted">{text}</p>
    </>
  );
};

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FormHeader;
