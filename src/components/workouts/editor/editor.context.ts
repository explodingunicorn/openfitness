import { createContext, RefObject, useContext } from "react";
import {
  Category,
  ExerciseDict,
  ExerciseMap,
  WorkoutWeek,
  WorkoutExercise,
  WorkoutDay,
} from "./types";

export type ExerciseEditorArgs = {
  returnButton: RefObject<HTMLButtonElement>;
  exercise?: WorkoutExercise;
  dayId: number;
  weekId: number;
};

export type ExerciseSaveArgs = {
  exercise: WorkoutExercise;
  dayId: number;
  weekId: number;
};

export interface EditorContext {
  weeks: WorkoutWeek[];
  exercises: ExerciseMap;
  exerciseDict: ExerciseDict;
  categories: Category[];
  addDay: (day: WorkoutDay, weekIndex: number) => void;
  editExercise: (args: ExerciseSaveArgs) => void;
  addExercise: (args: ExerciseSaveArgs) => void;
  openExerciseEditor: (args: ExerciseEditorArgs) => void;
}

export const editorContext = createContext<EditorContext>({
  weeks: [],
  exercises: {},
  exerciseDict: {},
  categories: [],
  addDay: () => {},
  editExercise: () => {},
  addExercise: () => {},
  openExerciseEditor: () => {},
});

export const useEditor = () => {
  return useContext(editorContext);
};
