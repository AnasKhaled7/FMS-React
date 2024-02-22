import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

const Error = ({ message }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Something went wrong! Please try again.</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
