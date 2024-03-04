import PropTypes from "prop-types";
import BootstrapPagination from "react-bootstrap/Pagination";

const Pagination = ({ pageNumber, setPageNumber, data }) => {
  return (
    <BootstrapPagination className="mx-auto">
      <BootstrapPagination.Prev
        onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
      />
      {Array.from({ length: data?.totalNumberOfPages }, (_, i) => (
        <BootstrapPagination.Item
          key={i}
          active={i === pageNumber - 1}
          onClick={() => setPageNumber(i + 1)}
        >
          {i + 1}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next
        onClick={() =>
          pageNumber < data?.totalNumberOfPages && setPageNumber(pageNumber + 1)
        }
      />
    </BootstrapPagination>
  );
};

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default Pagination;
