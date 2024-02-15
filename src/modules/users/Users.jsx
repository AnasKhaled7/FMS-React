import { Header } from "../../components";
import img from "../../assets/man.png";

const Users = () => {
  return (
    <div>
      <Header
        titleBold="Users"
        titleRegular="List"
        text="You can now add your items that any user can order it from the Application and you can edit"
        image={img}
      />
      <p>Users</p>
    </div>
  );
};

export default Users;
