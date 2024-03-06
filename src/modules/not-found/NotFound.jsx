import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="container-md d-flex flex-column gap-3 align-items-start">
        <h2 className="fs-1">
          Oops
          <br />
          <span className="text-success">Page not found</span>
        </h2>

        <p className="fs-5">
          This Page doesn’t exist or was removed!
          <br />
          We suggest you back to home.
        </p>

        <Link
          to={localStorage.getItem("token") ? "/dashboard" : "/"}
          className="btn btn-primary btn-success d-flex gap-3 align-items-center"
        >
          <i
            className={`fas ${
              localStorage.getItem("token") ? "fa-home" : "fa-sign-in-alt"
            }`}
          ></i>
          {localStorage.getItem("token") ? "Back To Home" : "Login"}
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
