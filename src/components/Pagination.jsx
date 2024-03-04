import PropTypes from "prop-types";
import BootstrapPagination from "react-bootstrap/Pagination";

const Pagination = ({ pageNumber, setPageNumber, data }) => {
  return (
    <BootstrapPagination className="justify-content-center">
      <BootstrapPagination.Prev
        linkClassName="text-success"
        onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
      />
      {Array.from({ length: data?.totalNumberOfPages }, (_, i) => (
        <BootstrapPagination.Item
          key={i}
          active={i === pageNumber - 1}
          onClick={() => setPageNumber(i + 1)}
          linkClassName={`${
            i === pageNumber - 1
              ? "text-bg-success border-success"
              : "text-success"
          }`}
        >
          {i + 1}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next
        linkClassName="text-success"
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
