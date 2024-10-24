import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Group, Users } from "../../entities/Entities";

import { IoSettingsSharp } from "react-icons/io5";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useGroupState from "../../store/states/useGroupsStates";
import usePlayersStates from "../../store/states/usePlayersStates";
import useStageState from "../../store/states/useStagesStates";

const GamePage: FC = () => {
  const [animationParent] = useAutoAnimate();

  const stages = useStageState();
  const players = usePlayersStates();
  const groups = useGroupState();

  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const handleChangeGroupSelelct = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentGroup(e.target.value);
  };
  const handleChangeStageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentStage(e.target.value);
  };
  const decrementPoints = (playerId: number) => {
    players.addPoints(playerId, 10);
  };
  const incrementPoints = (playerId: number) => {
    players.delitePoints(playerId, 10);
  };
  const groupedPlayers = useMemo(
    () =>
      players.users.reduce((result, value) => {
        result[value.groupId] = [...(result[value.groupId] || []), value];
        return result;
      }, {} as Record<Group["id"], Users[]>),
    [players.users]
  );
  const sortedGroupPlayers = useMemo(() => {
    if (currentGroup !== 0 && groupedPlayers[currentGroup]) {
      return groupedPlayers[currentGroup]
        .slice()
        .sort((a, b) => (b.points && a.points ? b.points - a.points : 0));
    } else {
      return [];
    }
  }, [currentGroup, groupedPlayers]);

  return (
    <>
      <div className="w-full min-h-screen relative mx-auto bg-hero-bg bg-cover bg-fixed flex flex-col items-center">
        <h1 className="text-white text-center italic text-5xl mt-2">
          Intellect
        </h1>
        <label htmlFor="modalSettings" className="btn">
          <IoSettingsSharp />
        </label>

        <div className="font-sans mb-5">
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className=" font-bold text-neutral-400">
                  <tr>
                    <th></th>
                    <th>Имя</th>
                    <th>Школа</th>
                    <th>Очки</th>
                  </tr>
                </thead>
                <tbody ref={animationParent}>
                  {/* row 1 */}
                  {sortedGroupPlayers.map((players, idx) => (
                    <tr
                      key={idx}
                      className=" text-sm font-bold text-neutral-50 backdrop-blur-sm bg-white/30"
                    >
                      <th></th>
                      <td>{players.name}</td>
                      <td></td>
                      <td>{players.points || 0} </td>
                      <td className=" flex gap-5">
                        {" "}
                        <button className=" btn " onClick={() => decrementPoints(players.id)}>
                          {" "}
                          +{" "}
                        </button>
                        <button className=" btn " onClick={() => incrementPoints(players.id)}> - </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="modalSettings" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <div className=" mb-5">
                <h3 className="font-bold">Отобразить группы:</h3>
                <div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={handleChangeGroupSelelct}
                  >
                    <option disabled selected>
                      Группа
                    </option>

                    {groups.groups.map((group, idx) => (
                      <option value={group.id} key={idx}>
                        {group.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className=" mb-5">
                <h3 className="font-bold">Отобразить группы:</h3>
                <div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={handleChangeStageSelect}
                  >
                    <option disabled selected>
                      Этап
                    </option>

                    {stages.stages.map((stage, idx) => (
                      <option value={stage.title} key={idx}>
                        {stage.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <label className="modal-backdrop" htmlFor="modalSettings">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
