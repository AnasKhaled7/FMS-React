import { useEffect, useState } from "react";
import axios from "axios";
import { Header, NoResult } from "../../components";
import headerImg from "../../assets/man.png";
import profilePic from "../../assets/empty-profile-pic.png";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const result = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/?pageSize=20&pageNumber=1",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setUsers(result?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="d-flex flex-column gap-4">
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

      {users.length > 0 ? (
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
            {users.map((user) => (
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
                    className="rounded-circle object-fit-contain"
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
      ) : (
        <NoResult />
      )}
    </section>
  );
};

export default Users;
