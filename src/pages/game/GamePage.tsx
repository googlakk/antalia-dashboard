import { FC, useEffect, useMemo, useState } from "react";
//export default GamePage;import { FC, useCallback, useEffect, useMemo, useState } from "react";
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

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedPlayers, setSortedPlayers] = useState<Users[]>([]);
  const [isSorted, setIsSorted] = useState(false); // флаг отслеживания сортировки

  const handleChangeGroupSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentGroup(Number(e.target.value));
    setIsSorted(false); // Сбрасываем сортировку при изменении группы
  };

  const handleChangeStageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentStage(Number(e.target.value));
  };

  const decrementPoints = (playerId: number) => {
    players.delitePoints(playerId, 10);
    updatePlayerPoints(playerId);
  };

  const incrementPoints = (playerId: number) => {
    players.addPoints(playerId, 10);
    updatePlayerPoints(playerId);
  };

  // Обновление баллов конкретного игрока в sortedPlayers
  const updatePlayerPoints = (playerId: number) => {
    setSortedPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? {
              ...player,
              points: players.users.find((u) => u.id === playerId)?.points || 0,
            }
          : player
      )
    );
  };

  const groupedPlayers = useMemo(
    () =>
      players.users.reduce((result, value) => {
        result[value.groupId] = [...(result[value.groupId] || []), value];
        return result;
      }, {} as Record<Group["id"], Users[]>),
    [players.users]
  );

  const sortPlayers = (playersToSort: Users[]) => {
    return [...playersToSort].sort((a, b) =>
      sortDirection === "asc" ? a.points - b.points : b.points - a.points
    );
  };

  useEffect(() => {
    if (currentGroup !== 0 && groupedPlayers[currentGroup]) {
      const playersToDisplay = groupedPlayers[currentGroup].slice();
      setSortedPlayers(
        isSorted ? sortPlayers(playersToDisplay) : playersToDisplay
      );
    }
  }, [currentGroup, isSorted, groupedPlayers]); // обновление при изменении группы и флага сортировки

  const handleSortPoints = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setIsSorted(true); // Устанавливаем флаг сортировки
    setSortedPlayers((prevPlayers) => sortPlayers(prevPlayers)); // сортировка при нажатии
  };

  return (
    <div className="w-full min-h-screen relative mx-auto bg-hero-bg bg-cover bg-fixed flex flex-col items-center">
      <h1 className="text-white text-center italic text-5xl mt-2">Intellect</h1>
      <label htmlFor="modalSettings" className="btn">
        <IoSettingsSharp />
      </label>

      <div className="font-sans mb-5">
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="font-bold text-neutral-400">
                <tr>
                  <th></th>
                  <th>Имя</th>
                  <th>Школа</th>
                  <th onClick={handleSortPoints} style={{ cursor: "pointer" }}>
                    Очки
                  </th>
                </tr>
              </thead>
              <tbody ref={animationParent}>
                {sortedPlayers.map((player, idx) => (
                  <tr
                    key={idx}
                    className="text-sm font-bold text-neutral-50 backdrop-blur-sm bg-white/30"
                  >
                    <th></th>
                    <td>{player.name}</td>
                    <td></td>
                    <td>{player.points || 0}</td>
                    <td className="flex gap-5">
                      <button
                        className="btn"
                        onClick={() => decrementPoints(player.id)}
                      >
                        -
                      </button>
                      <button
                        className="btn"
                        onClick={() => incrementPoints(player.id)}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <input type="checkbox" id="modalSettings" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <div className=" mb-5">
              <h3 className="font-bold">Отобразить группы:</h3>
              <div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={handleChangeGroupSelect}
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
              <h3 className="font-bold">Отобразить этап:</h3>
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
  );
};

export default GamePage;
