import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="p-5 d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="success" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
