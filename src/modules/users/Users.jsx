import { useEffect, useState } from "react";
import axios from "axios";
import {
  Error,
  Header,
  Loading,
  LocalSearch,
  NoResult,
  Pagination,
} from "../../components";
import headerImg from "../../assets/man.png";
import profilePic from "../../assets/empty-profile-pic.png";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [groups, setGroups] = useState("");

  const getUsers = async (pageNumber, pageSize, groups, userName, email) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users",
        {
          headers: { Authorization: localStorage.getItem("token") },
          params: { pageNumber, pageSize, groups, userName, email },
        }
      );
      setUsers(result?.data);
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers(pageNumber, 10, groups, userName, email);
  }, [pageNumber, userName, email, groups]);

  if (error) return <Error message={error} />;

  return (
    <>
      <Header
        titleBold="Users"
        titleRegular="List"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImg}
      />

      <div>
        <h3 className="mb-0">Users Table Details</h3>
        <p>You can check all details</p>
      </div>

      <div className="row g-4 align-items-center">
        <LocalSearch
          placeholder="Search by username..."
          onChange={(e) => {
            setUserName(e.target.value);
            setPageNumber(1);
          }}
        />

        <LocalSearch
          placeholder="Search by email..."
          onChange={(e) => {
            setEmail(e.target.value);
            setPageNumber(1);
          }}
        />

        {/* user type select */}
        <div className="col-md-4">
          <select
            className="form-select"
            aria-label="select user type"
            onChange={(e) => setGroups(e.target.value)}
          >
            <option value="">User Type</option>

            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : users?.totalNumberOfPages > 0 ? (
        <>
          <table className="table table-striped text-center align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {users?.data?.map((user) => (
                <tr key={user?.id}>
                  <th scope="row">{user?.id}</th>
                  <td>
                    <img
                      src={
                        user?.imagePath
                          ? `https://upskilling-egypt.com/${user.imagePath}`
                          : `${profilePic}`
                      }
                      alt={user?.userName}
                      width="50"
                      height="50"
                      className="rounded-circle object-fit-cover"
                    />
                  </td>
                  <td>{user?.userName}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phoneNumber}</td>
                  <td>{user?.country}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {users?.totalNumberOfPages > 1 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              data={users}
            />
          )}
        </>
      ) : (
        <NoResult />
      )}
    </>
  );
};

export default Users;
