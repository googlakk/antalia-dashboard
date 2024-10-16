import { Group, Users } from "../../entities/Entities";
import React, { FC, useMemo, useState } from "react";

import bgVs from "/redBlueBg.jpg";
import useGroupState from "../../store/states/useGroupsStates";
import usePlayersStates from "../../store/states/usePlayersStates";
import useStageState from "../../store/states/useStagesStates";
import vs from "/vs.png";

const GamePage: FC = () => {
  const stages = useStageState();
  const players = usePlayersStates();
  const groups = useGroupState();
  const [currentGroup1, setCurrentGroup1] = useState(0);
  const [currentGroup2, setCurrentGroup2] = useState(0); // Устанавливаем начальное значение текущей группы

  const groupedPlayers = useMemo(
    () =>
      players.users.reduce((result, value) => {
        result[value.groupId] = [...(result[value.groupId] || []), value];
        return result;
      }, {} as Record<Group["id"], Users[]>),
    [players.users]
  );

  const sortedGroup1Players = useMemo(() => {
    if (currentGroup1 !== 0 && groupedPlayers[currentGroup1]) {
      return groupedPlayers[currentGroup1]
        .slice()
        .sort((a, b) => (b.points && a.points ? b.points - a.points : 0));
    } else {
      return [];
    }
  }, [currentGroup1, groupedPlayers]);

  const sortedGroup2Players = useMemo(() => {
    if (currentGroup2 !== 0) {
      return groupedPlayers[currentGroup2]
        .slice() // создаем копию массива, чтобы не изменять исходный
        .sort((a, b) => (b.points && a.points ? b.points - a.points : 0));
    } else {
      return [];
    }
  }, [currentGroup2, groupedPlayers]);
  const handleGroupChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentGroup1(parseInt(e.target.value));
  };
  const handleGroupChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentGroup2(parseInt(e.target.value));
  };

  return (
    <>
      <div className=" w-full min-h-screen relative mx-auto rounded-3xl ">
        <img
          className="absolute w-full left-0 right-0 bottom-0 scale-y-125 top-0 h-full  z-0 brightness-60 shadow-xl"
          src={bgVs}
          alt=""
        />

        {stages.stages.map((stage) => (
          <div className="flex flex-row w-full h-full justify-center items-center z-10 absolute ">
            <div className="grid flex-grow h-[80%] ">
              <div className="w-[60%] mx-auto">
                <div className="flex justify-center">
                  <select
                    className=" border-0 bg-transparent text-white text-2xl"
                    value={currentGroup1}
                    onChange={handleGroupChange1}
                  >
                    {groups.groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.title}
                      </option>
                    ))}
                  </select>
                </div>
                <ul>
                  {sortedGroup1Players.map((player) => (
                    <li
                      className="flex justify-between items-center backdrop-blur-sm bg-black/20 mb-2 px-4 py-2 rounded-2xl"
                      key={player.id}
                    >
                      <div>
                        <div className="text-3xl text-white font-bold">
                          {player.name}
                        </div>
                        <div className=" text-gray-500 text-xl">
                          {player.school}
                        </div>
                      </div>
                      <div
                        className="text-6xl text-white font-bold"
                        contentEditable
                        data-key="points"
                        onBlur={(event) => {
                          const key =
                            (event.target as HTMLTableRowElement).dataset.key ||
                            "";
                          const value = (event.target as HTMLTableRowElement)
                            .innerHTML;
                          players.editUser(player.id, {
                            ...player,
                            [key]: value,
                          });
                        }}
                        dangerouslySetInnerHTML={{
                          __html: player.points || "",
                        }}
                      ></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="divider lg:divider-horizontal">
              <img className="w-[250px]" src={vs} alt="" />
            </div>
            <div className="grid flex-grow h-[80%] ">
              <div className="w-[60%] mx-auto">
                <div className="flex justify-center">
                  <select value={currentGroup2} onChange={handleGroupChange2}>
                    {groups.groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.title}
                      </option>
                    ))}
                  </select>
                </div>
                <ul>
                  {sortedGroup2Players.map((player) => (
                    <li
                      className="flex justify-between items-center backdrop-blur-sm bg-black/20 mb-2 px-4 py-2 rounded-2xl"
                      key={player.id}
                    >
                      <div>
                        <div className="text-3xl text-white font-bold">
                          {player.name}
                        </div>
                        <div className=" text-gray-500 text-xl">
                          {player.school}
                        </div>
                      </div>
                      <div
                        className="text-6xl text-white font-bold"
                        contentEditable
                        data-key="points"
                        onBlur={(event) => {
                          const key =
                            (event.target as HTMLTableRowElement).dataset.key ||
                            "";
                          const value = (event.target as HTMLTableRowElement)
                            .innerHTML;
                          players.editUser(player.id, {
                            ...player,
                            [key]: value,
                          });
                        }}
                        dangerouslySetInnerHTML={{
                          __html: player.points || "",
                        }}
                      ></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GamePage;
