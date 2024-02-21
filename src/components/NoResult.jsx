import noDataImg from "../assets/woman-2.png";

const NoResult = () => {
  return (
    <div className="d-flex flex-column gap-4 justify-content-center align-items-center my-4">
      <div>
        <img src={noDataImg} alt="No Data" />
        <hr className="my-0" />
      </div>
      <h4>No Data !</h4>
    </div>
  );
};

export default NoResult;
