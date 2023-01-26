import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { api } from "../../../utils/api";
import { DayEditor } from "./dayEditor";
import { useEditor } from "./editor.context";
import { WorkoutWeek } from "./types";

export interface WeekEditorProps {
  week: WorkoutWeek;
  index: number;
}

export const WeekEditor: FC<WeekEditorProps> = ({ week, index }) => {
  const { addDay } = useEditor();
  const createDayMutation = api.workouts.createWorkoutDay.useMutation();

  const createNewDay = async () => {
    const { data: day } = await createDayMutation.mutateAsync({
      weekId: week.id,
    });
    if (day) {
      addDay(day, index);
    }
  };

  return (
    <>
      {week.days?.map((day) => {
        return <DayEditor day={day} weekId={week.id} key={day.id} />;
      })}
      <Button
        onClick={() => createNewDay()}
        isLoading={createDayMutation.isLoading}
        loadingText="Creating new day"
      >
        Add a day
      </Button>
    </>
  );
};
