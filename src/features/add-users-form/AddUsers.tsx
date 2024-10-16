import { FC, useState, useCallback, useMemo } from "react";
import Select from "react-select";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Users } from "../../entities/TodoEntity";
import { addUsers } from "../../store/users/usersSlice";

const AddUsers: FC = () => {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [userGroups, setUserGroup] = useState("");
  const [points, setPoint] = useState(0);
  const dispatch = useDispatch();

  const users = useSelector<RootState, Users[]>(
    (state) => state.usersSlice.users
  );

  const handleAddUsers = useCallback(() => {
    if (name && school && userGroups != "") {
      dispatch(
        addUsers({
          id: +Date.now(),
          userGroups: userGroups,
          name: name,
          school: school,
          points: points,
        })
      );
      setUserGroup("");
      setName("");
      setSchool("");
    } else {
      alert("Please enter a values");
    }
  }, [userGroups, name, school, points]);

  return (
    <div className="">
      <h2>Add Users</h2>
      <div>
        <label> Name: </label>
        <TextField value={name} onChange={(val) => setName(val)} />
      </div>
      <div>
        <label> School: </label>
        <TextField value={school} onChange={(val) => setSchool(val)} />
      </div>
      <div>
        <label> Groups: </label>
        <TextField value={userGroups} onChange={(val) => setUserGroup(val)} />
      </div>
      <div>
        <label> Points: </label>
        <TextField value={points} onChange={(val) => setPoint(val)} />
      </div>
      <Button onClick={handleAddUsers}>Add </Button>
    </div>
  );
};
export default AddUsers;
