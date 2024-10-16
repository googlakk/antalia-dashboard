import AddUsers from "../../features/add-users-form/AddUsers";
import UsersList from "../../features/users-list/UsersList";

const AddUsersList = () => {
  return (
    <div className=" bg-[#0100]">
      <AddUsers />
      <UsersList />
    </div>
  );
};

export default AddUsersList;
