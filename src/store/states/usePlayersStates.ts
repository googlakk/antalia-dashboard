import { Users } from "../../entities/Entities";
import useSyncStore from "../hooks/useSyncStore";
const usePlayersStates = () => {
  const [{ users }, setUsers] = useSyncStore("users", {
    users: [] as Users[],
  });

  const addUser = (user: Users) => {
    setUsers({ users: [...users, user] });
  };

  const editUser = (id: Users["id"], data: Omit<Users, "id">) => {
    setUsers({
      users: users.map((user) => {
        return user.id === id
          ? {
              ...user,
              ...data,
            }
          : user;
      }),
    });
  };
  const deliteUser = (id: Users["id"]) => {
    setUsers({ users: users.filter((user) => user.id !== id) });
  };

  return { addUser, editUser, deliteUser, users };
};
export default usePlayersStates;
