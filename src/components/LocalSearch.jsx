import PropTypes from "prop-types";

const LocalSearch = ({ placeholder, onChange }) => {
  return (
    <div className="col-md-4">
      <div className="input-group">
        <span className="input-group-text fs-6">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="search"
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

LocalSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LocalSearch;
