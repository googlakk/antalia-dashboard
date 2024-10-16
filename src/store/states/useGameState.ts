import { Game } from "../../entities/Entities";
import useSyncStore from "../hooks/useSyncStore";

const useGameState = () => {
  const [{ games }, setGames] = useSyncStore("games", {
    games: [] as Game[],
  });

  const addGame = (game: Game) => {
    setGames({ games: [...games, game] });
  };

  const editGame = (id: Game["id"], data: Omit<Game, "id">) => {
    setGames({
      games: games.map((game) => {
        return game.id === id
          ? {
              ...game,
              ...data,
            }
          : game;
      }),
    });
  };

  const deliteGame = (id: Game["id"]) => {
    setGames({ games: games.filter((game) => game.id !== id) });
  };

  return { addGame, editGame, deliteGame, games };
};
export default useGameState;
