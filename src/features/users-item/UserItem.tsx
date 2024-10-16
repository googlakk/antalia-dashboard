import { FC, useState } from "react";
import { Users } from "../../entities/TodoEntity";
import { AiFillEdit, AiOutlineEdit } from "react-icons/ai";
import { TfiReload } from "react-icons/all";
import { editPoints } from "../../store/users/usersSlice";
import { useDispatch } from "react-redux";
import TextField from "../../components/TextField";
interface UserItemProps {
  user: Users;
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  const [editble, setEditble] = useState(false);
  const [points, setPoints] = useState(0);
  const dispatch = useDispatch();
  const changePoints = (id: Users["id"]) => {
    setEditble(!editble);
    if (editble) {
      dispatch(editPoints({ id, points }));
    }
  };
  return (
    <div className=" w-[80%] opacity-75 rounded-[28px] bg-black mb-5">
      {
        <div className="flex justify-around items-center py-1 rounded-xl ">
          <div className="flex flex-col  bg-black text-white ">
            <h3>{user.name}</h3>
            <h4>{user.school}</h4>
          </div>
          <div className=" text-3xl text-white flex items-center">
            {user.points}
            <AiOutlineEdit
              onClick={() => changePoints(user.id)}
              className="w-[20px] cursor-pointer h-[20px]"
            />
          </div>
        </div>
      }
      {editble ? (
        <TextField value={points} onChange={(val) => setPoints(val)} />
      ) : null}
    </div>
  );
};
export default UserItem;
