import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Users } from "../../entities/TodoEntity";
import UserItem from "../users-item/UserItem";
import Button from "../../components/Button";
import { TfiReload } from "react-icons/tfi";

const UsersList: FC = () => {
  const users = useSelector<RootState, Users[]>(
    (state) => state.usersSlice.users
  );

  const memoUsers = useMemo(() => {
    const sortedUsers = [...users].sort((a, b) => {
      return b.points - a.points;
    });
    return sortedUsers;
  }, [users]);
  const addPoints = () => {};
  return (
    <div className="flex justify-around">
      <div></div>
      <div className="w-[100%] bg-lime-500 flex justify-center flex-col items-center  ">
        <h1>Группа А</h1>

        {memoUsers.map((user) => {
          if (user.userGroups === "A") {
            return <UserItem user={user} />;
          }
        })}
      </div>
      <div className="w-[100%] bg-slate-500 flex justify-center flex-col items-center ">
        <h1>Группа B</h1>
        {memoUsers.map((user) => {
          if (user.userGroups === "B") {
            return <UserItem user={user} />;
          }
        })}
      </div>
      <div className="w-[100%] bg-red-400 flex justify-center flex-col items-center ">
        <h1>Группа C</h1>
        {memoUsers.map((user) => {
          if (user.userGroups === "C") {
            return <UserItem user={user} />;
          }
        })}
      </div>
      <div className="w-[100%] bg-violet-400 flex justify-center flex-col items-center ">
        <h1>Группа D</h1>
        {memoUsers.map((user) => {
          if (user.userGroups === "D") {
            return <UserItem user={user} />;
          }
        })}
      </div>
    </div>
  );
};

export default UsersList;
