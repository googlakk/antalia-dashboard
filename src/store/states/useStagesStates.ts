import { Stage } from "../../entities/Entities";
import useSyncStore from "../hooks/useSyncStore";

const useStageState = () => {
  const [{ stages }, setStages] = useSyncStore("stages", {
    stages: [] as Stage[],
  });

  const addStage = (stage: Stage) => {
    setStages({ stages: [...stages, stage] });
  };

  const editStage = (id: Stage["id"], data: Omit<Stage, "id">) => {
    setStages({
      stages: stages.map((stage) => {
        return stage.id === id
          ? {
              ...stage,
              ...data,
            }
          : stage;
      }),
    });
  };

  const deliteStage = (id: Stage["id"]) => {
    setStages({ stages: stages.filter((stage) => stage.id !== id) });
  };

  return { addStage, editStage, deliteStage, stages };
};
export default useStageState;
