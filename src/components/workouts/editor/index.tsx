import { HStack, Divider, Stack, Button } from "@chakra-ui/react";
import { FC, RefObject, useState } from "react";
import { clone } from "ramda";
import { api } from "../../../utils/api";
import { RadioButton, RadioButtonGroup } from "../../radioButtonGroup";
import {
  ExerciseSaveArgs,
  editorContext,
  ExerciseEditorArgs,
} from "./editor.context";
import { ExerciseEditor } from "./exerciseEditor";
import {
  Category,
  Exercise,
  ExerciseDict,
  ExerciseMap,
  Workout,
  WorkoutChoice,
  WorkoutDay,
  WorkoutExercise,
  WorkoutWeek,
} from "./types";
import { WeekEditor } from "./weekEditor";

export interface WorkoutEditorProps {
  workout: Workout;
  exercises: ExerciseMap;
  exerciseDict: ExerciseDict;
  categories: Category[];
}

export const WorkoutEditor: FC<WorkoutEditorProps> = ({
  workout,
  exercises,
  exerciseDict,
  categories,
}) => {
  const newWeekMutation = api.workouts.createWorkoutWeek.useMutation();
  const newExerciseMutation = api.workouts.createWorkoutExercise.useMutation();
  const [editWeeks, setEditWeeks] = useState<WorkoutWeek[]>(() =>
    workout.weeks?.length ? workout.weeks : []
  );
  const [selectedWeekValue, setSelectedWeekValue] = useState<string>(() =>
    workout.weeks?.length ? workout.weeks[0]?.number?.toString() ?? "0" : "0"
  );
  const [selectedWeek, setSelectedWeek] = useState<WorkoutWeek | null>(
    () => workout.weeks?.[0] ?? null
  );

  const [exerciseEditorOpen, setExerciseEditorOpen] = useState(false);
  const [exerciseEditorData, setExerciseData] = useState<ExerciseEditorArgs>();

  const createNewWeek = async () => {
    const { data, error } = await newWeekMutation.mutateAsync({
      workoutId: workout.id,
    });
    if (data) {
      setEditWeeks((prev) => [...prev, data]);
    }
  };

  const addDay = (day: WorkoutDay, weekIndex: number) => {
    setEditWeeks((prev) => {
      if (prev[weekIndex]) {
        const copyPrev = [...prev];
        const weekCopy = copyPrev[weekIndex];
        weekCopy?.days?.push(day);
        return copyPrev;
      }
      return prev;
    });
  };

  const onRadioGroupChange = (value: string) => {
    setSelectedWeekValue(value);
    const number = parseInt(value);
    setSelectedWeek(workout.weeks?.[number] ?? null);
  };

  const openExerciseEditor = (args: ExerciseEditorArgs) => {
    setExerciseData(args);
    setExerciseEditorOpen(true);
  };

  const editExercise = (args: ExerciseSaveArgs) => {};

  const addExercise = async ({ exercise, dayId, weekId }: ExerciseSaveArgs) => {
    const { data } = await newExerciseMutation.mutateAsync({
      dayId,
      choices:
        exercise.choices?.map((choice) => ({
          exerciseId: choice.exercise_id,
          workoutExerciseId: choice.workout_exercise_id,
        })) ?? [],
    });
    if (data) {
      setEditWeeks((prev) => {
        const weeksCopy = clone(prev);
        const selectedWeek = weeksCopy.find((week) => week.id === weekId);
        const selectedDay = selectedWeek?.days?.find((day) => day.id === dayId);
        if (selectedDay) {
          const formattedChoices = data.choices?.map((choice) => {
            return {
              ...choice,
              exercise: (Array.isArray(choice.exercise)
                ? choice.exercise[0]
                : choice.exercise) as Exercise,
            };
          });
          selectedDay.exercises?.push({
            ...data.exercise,
            choices: formattedChoices || ([] as WorkoutChoice[]),
          });
          return weeksCopy;
        }
        return prev;
      });
    }
  };

  return (
    <editorContext.Provider
      value={{
        weeks: editWeeks,
        addDay,
        addExercise,
        editExercise,
        exercises,
        exerciseDict,
        categories,
        openExerciseEditor,
      }}
    >
      <Stack>
        <HStack>
          <RadioButtonGroup
            defaultValue={editWeeks[0]?.number?.toString()}
            value={selectedWeekValue}
            onChange={onRadioGroupChange}
          >
            {editWeeks.map((editWeek) => {
              return (
                <RadioButton
                  value={editWeek.number?.toString() ?? "0"}
                  key={editWeek.number}
                >
                  Week {(editWeek.number ?? 0) + 1}
                </RadioButton>
              );
            })}
          </RadioButtonGroup>
          <Divider />
          <Button
            variant="outline"
            onClick={() => {
              createNewWeek();
            }}
            isLoading={newWeekMutation.isLoading}
            loadingText="Adding week"
          >
            Add week
          </Button>
        </HStack>
        {selectedWeek && (
          <WeekEditor week={selectedWeek} index={parseInt(selectedWeekValue)} />
        )}
      </Stack>
      <ExerciseEditor
        open={exerciseEditorOpen}
        onOpenChange={(open) => setExerciseEditorOpen(open)}
        exercise={exerciseEditorData?.exercise}
        returnBtnRef={exerciseEditorData?.returnButton}
        dayId={exerciseEditorData?.dayId}
        weekId={exerciseEditorData?.weekId}
      />
    </editorContext.Provider>
  );
};
