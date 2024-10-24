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
  const addPoints = (id: Users["id"], points: number) => {
    setUsers({
      users: users.map((user) =>
        user.id === id
          ? { ...user, points: (Number(user.points) || 0) + points }
          : user
      ),
    });
  };
  const delitePoints = (id: Users["id"], points: number) => {
    setUsers({
      users: users.map((user) =>
        user.id === id
          ? {
              ...user,
              points: Math.max(0, (Number(user.points) || 0) - points),
            }
          : user
      ),
    });
  };

  return { addUser, editUser, deliteUser, users, addPoints, delitePoints };
};
export default usePlayersStates;
