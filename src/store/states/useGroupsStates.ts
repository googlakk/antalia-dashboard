import { Group } from "../../entities/Entities";
import useSyncStore from "../hooks/useSyncStore";

const useGroupState = () => {
  const [{ groups }, setGroups] = useSyncStore("groups", {
    groups: [] as Group[],
  });
  const addGroup = (group: Group) => {
    setGroups({ groups: [...groups, group] });
  };
  const editGroup = (id: Group["id"], data: Omit<Group, "id">) => {
    setGroups({
      groups: groups.map((group) => {
        return group.id === id
          ? {
              ...group,
              ...data,
            }
          : group;
      }),
    });
  };
  const deliteGroup = (id: Group["id"]) => {
    setGroups({ groups: groups.filter((group) => group.id !== id) });
  };

  return { addGroup, editGroup, deliteGroup, groups };
};
export default useGroupState;
