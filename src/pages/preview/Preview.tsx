import { useEffect, useRef, useState } from "react";

import useGameState from "../../store/states/useGameState";
import useGroupState from "../../store/states/useGroupsStates";
import usePlayersStates from "../../store/states/usePlayersStates";
import useStageState from "../../store/states/useStagesStates";

const Preview = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  // Refs
  const contentRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const nameRef = useRef("");
  const schoolRef = useRef("");
  const games = useGameState();
  const stages = useStageState();
  const players = usePlayersStates();
  const groups = useGroupState();

  // Функция для получения игроков определенной игры
  function getPlayersByGame(gameId: number) {
    // Получить этапы для заданной игры
    const stagesForGame = stages.stages.filter(
      (stage) => stage.gameId === gameId
    );

    // Получить группы для каждого этапа
    const groupsForGame = stagesForGame.flatMap((stage) =>
      groups.groups.filter((group) => group.stageId === stage.id)
    );

    // Получить игроков для каждой группы
    const playersForGame = groupsForGame.flatMap((group) =>
      players.users.filter((player) => player.groupId === group.id)
    );

    return playersForGame;
  }
  const gameIdToQuery = 1704646530777;
  const playersForGame = getPlayersByGame(gameIdToQuery);

  const sliderContent = playersForGame.map((player) => ({
    img: player.img,
    name: player.name,
    school: player.school,
  }));

  const Slide = (type) => {
    let local;
    if (type === "next") {
      local = active + 1;
      sliderContent.length - 1 < local ? setActive(0) : setActive(local);
    }
    if (type === "prev") {
      local = active - 1;
      local < 0 ? setActive(sliderContent.length - 1) : setActive(local);
    }
    setPrev(active);
  };

  useEffect(() => {
    contentRef.current.style.bottom = "-100%";
    prevRef.current.style.left = "-10%";
    nextRef.current.style.right = "-10%";
    setTimeout(() => {
      nameRef.current.innerText = sliderContent[active]?.name;
      schoolRef.current.innerText = sliderContent[active]?.school;
      contentRef.current.style.bottom = "0%";
      prevRef.current.style.left = "0%";
      nextRef.current.style.right = "0%";
    }, 1000);
  }, [active]);

  return (
    <div className="body bg-hero-bg bg-cover bg-fixed">
      <div className="text-center text-5xl  h-full font-dela tracking-wider font-bold gameTitle">
        Absolute champion
      </div>
      <div className="rounded-xl relative shadow-lg overflow-hidden">
        <div className="w-[1200px] h-[800px] relative p-5">
          {sliderContent.map((slide, i) => {
            return (
              <img
                src={slide.img}
                key={i}
                alt="slideImg"
                className={`h-full w-full absolute object-cover inset-0 duration-[2s] ease-out transition-[clip-path] ${
                  i === active ? "clip-visible" : "clip-hidden"
                }`}
              />
            );
          })}
          <img
            src={sliderContent[prev]?.img}
            alt="previmg"
            className="w-full h-full  object-cover"
          />
        </div>
        <div>
          <button id="back" ref={prevRef} onClick={() => Slide("prev")}>
            <ion-icon name="chevron-back-outline" size="large"></ion-icon>
          </button>
          <button
            id="forward"
            ref={nextRef}
            className="right-0"
            onClick={() => Slide("next")}
          >
            <ion-icon name="chevron-forward-outline" size="large"></ion-icon>
          </button>
        </div>
        <div className="content" ref={contentRef}>
          <h1 ref={nameRef}>{sliderContent[0]?.name}</h1>
          <h2 ref={schoolRef}>{sliderContent[0]?.school}</h2>
        </div>
      </div>
    </div>
  );
};

export default Preview;
