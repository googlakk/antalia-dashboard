import { Game, Group, Stage } from "../../entities/Entities";

import Button from "../../components/Button";
import useGameState from "../../store/states/useGameState";
import useGroupState from "../../store/states/useGroupsStates";
import usePlayersStates from "../../store/states/usePlayersStates";
import useStageState from "../../store/states/useStagesStates";

const Admins = () => {
  const { games, addGame, deliteGame, editGame } = useGameState();
  const { stages, addStage, deliteStage, editStage } = useStageState();
  const { users, addUser, deliteUser, editUser } = usePlayersStates();
  const { groups, addGroup, editGroup, deliteGroup } = useGroupState();
  function getGameById(gameId: number): Game | undefined {
    return games.find((game) => game.id === gameId);
  }

  // Функция для получения информации о конкретном этапе
  function getStageById(stageId: number): Stage | undefined {
    return stages.find((stage) => stage.id === stageId);
  }

  // Функция для получения информации о конкретной группе
  function getGroupById(groupId: number): Group | undefined {
    return groups.find((group) => group.id === groupId);
  }
  return (
    <div>
      <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
        <div className="h-full">
          <div className="w-full max-w-4xl mx-auto mt-5 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h1 className="font-semibold text-gray-800">Games</h1>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className=" table-auto  w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">id</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">name</div>
                      </th>
                    </tr>
                  </thead>
                  {games.map((game) => (
                    <tr
                      key={game.id}
                      onBlur={(event) => {
                        const key =
                          (event.target as HTMLTableRowElement).dataset.key ||
                          "";
                        const value = (event.target as HTMLTableRowElement)
                          .innerHTML;
                        editGame(game.id, { ...game, [key]: value });
                      }}
                    >
                      <td className="font-medium text-left text-gray-800">
                        {game.id}
                      </td>
                      <td
                        className="font-medium text left text-gray-800"
                        contentEditable
                        data-key="title"
                        dangerouslySetInnerHTML={{ __html: game.title }}
                      />
                      <td>
                        <Button onClick={() => deliteGame(game.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <Button
                        onClick={() =>
                          addGame({ id: +Date.now(), title: "new Game" })
                        }
                      >
                        Add game
                      </Button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto mt-5 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h1 className="font-semibold text-gray-800">Stages</h1>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className=" table-auto  w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">id</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">games</div>
                      </th>
                    </tr>
                  </thead>
                  {stages.map((stage) => (
                    <tr
                      key={stage.id}
                      onBlur={(event) => {
                        const key =
                          (event.target as HTMLTableRowElement).dataset.key ||
                          "";
                        const value = (event.target as HTMLTableRowElement)
                          .innerHTML;
                        editStage(stage.id, { ...stage, [key]: value });
                      }}
                    >
                      <td className="font-medium text-left text-gray-800">
                        {stage.id}
                      </td>
                      <td
                        className="font-medium text left text-gray-800"
                        contentEditable
                        data-key="title"
                        dangerouslySetInnerHTML={{ __html: stage.title }}
                      />
                      <td>
                        <select
                          className="font-bold text-left text-gray-800"
                          value={stage.gameId}
                          onChange={(event) => {
                            editStage(stage.id, {
                              ...stage,
                              gameId: +event.target.value,
                            });
                          }}
                        >
                          {games.map((game) => (
                            <option value={game.id}>{game.title}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <Button onClick={() => deliteStage(stage.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <Button
                        onClick={() =>
                          addStage({
                            id: +Date.now(),
                            title: "none",
                            gameId: 1,
                          })
                        }
                      >
                        Add stage
                      </Button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto mt-5 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h1 className="font-semibold text-gray-800">Groups</h1>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">id</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">stages</div>
                      </th>
                    </tr>
                  </thead>
                  {groups.map((group) => (
                    <tr
                      key={group.id}
                      onBlur={(event) => {
                        const key =
                          (event.target as HTMLTableRowElement).dataset.key ||
                          "";
                        const value = (event.target as HTMLTableRowElement)
                          .innerHTML;
                        editGroup(group.id, { ...group, [key]: value });
                      }}
                    >
                      <td className="font-bold text-left text-gray-800">
                        {group.id}
                      </td>
                      <td
                        contentEditable
                        data-key="title"
                        className="font-bold text-left text-gray-800"
                        dangerouslySetInnerHTML={{ __html: group.title }}
                      />
                      <td>
                        <select
                          className="font-bold text-left text-gray-100"
                          value={group.stageId}
                          onChange={(event) => {
                            editGroup(group.id, {
                              ...group,
                              stageId: +event.target.value,
                            });
                          }}
                        >
                          {stages.map((stage) => (
                            <option value={stage.id}>{stage.title}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <Button onClick={() => deliteGroup(group.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <Button
                        onClick={() =>
                          addGroup({
                            id: +Date.now(),
                            title: "none",
                            stageId: 1,
                          })
                        }
                      >
                        Add group
                      </Button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto mt-5 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h1 className="font-semibold text-gray-800">PLayers</h1>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Image</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Points</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">School</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Groups</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Game</div>
                      </th>
                    </tr>
                  </thead>
                  {users.map((player) => (
                    <tr
                      key={player.id}
                      onBlur={(event) => {
                        const key =
                          (event.target as HTMLTableRowElement).dataset.key ||
                          "";
                        const value = (event.target as HTMLTableRowElement)
                          .innerHTML;
                        editUser(player.id, { ...player, [key]: value });
                      }}
                    >
                      <td
                        contentEditable
                        data-key="img"
                        dangerouslySetInnerHTML={{
                          __html: player.img || "image",
                        }}
                        className="font-medium items-center text-gray-800"
                      />
                      <td
                        contentEditable
                        dangerouslySetInnerHTML={{ __html: player.name }}
                        data-key="name"
                        className="font-medium items-center text-gray-800"
                      />
                      <td
                        contentEditable
                        data-key="points"
                        dangerouslySetInnerHTML={{
                          __html: player.points || "",
                        }}
                        className="font-medium items-center text-gray-800"
                      />
                      <td
                        contentEditable
                        data-key="school"
                        dangerouslySetInnerHTML={{ __html: player.school }}
                        className="font-medium items-center text-gray-800"
                      />
                      <td className="font-medium flex items-center ">
                        <select
                          value={player.groupId}
                          onChange={(event) => {
                            editUser(player.id, {
                              ...player,
                              groupId: +event.target.value,
                            });
                          }}
                        >
                          {groups.map((group) => (
                            <option value={group.id}>{group.title}</option>
                          ))}
                        </select>
                      </td>
                      <td className="font-medium flex items-center text-gray-100">
                        {/* Определение к какой игре относится игрок */}
                      </td>
                      <td>
                        {getGroupById(player.groupId)?.stageId !== undefined &&
                          getStageById(getGroupById(player.groupId)!.stageId)
                            ?.gameId !== undefined &&
                          getGameById(
                            getStageById(getGroupById(player.groupId)!.stageId)!
                              .gameId
                          )?.title}
                      </td>
                      <td>
                        <Button onClick={() => deliteUser(player.id)}>
                          delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <Button
                        onClick={() =>
                          addUser({
                            id: +Date.now(),
                            img: "",
                            name: "john",
                            points: 0,
                            school: "refal",
                            groupId: 1,
                          })
                        }
                      >
                        Add player
                      </Button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admins;
