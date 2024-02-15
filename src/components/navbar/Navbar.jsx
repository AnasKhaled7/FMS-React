import PropTypes from "prop-types";

const Navbar = ({ userData }) => {
  return (
    <nav className="navbar bg-body-tertiary rounded-3 px-1">
      <div className="container-fluid">
        <form role="search">
          <div className="input-group">
            <button type="submit" className="btn btn-outline-secondary fs-6">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </form>

        <div className="d-flex align-items-center gap-3">
          <div className="btn-group">
            <button type="button" className="btn">
              {userData?.userName || "User"}
            </button>
            <button
              type="button"
              className="btn dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="">
                  Action
                </a>
              </li>
            </ul>
          </div>

          <div className="position-relative">
            <i className="fa-solid fa-bell"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userData: PropTypes.object,
};

export default Navbar;
