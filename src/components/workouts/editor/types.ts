import { Database } from "../../../lib/database.types";

export type Exercise = Database['public']['Tables']['exercises']['Row'];

export type Category = Database['public']['Tables']['exercise_categories']['Row'];

type choice = Database['public']['Tables']['workout_exercise_choice']['Row'];

export interface WorkoutChoice extends choice {
  exercise: Exercise;
};

type exercise = Database['public']['Tables']['workout_exercise']['Row'];

export interface WorkoutExercise extends exercise {
 choices?: WorkoutChoice[];
};

type day = Database['public']['Tables']['workout_day']['Row'];

export interface WorkoutDay extends day {
  exercises?: WorkoutExercise[];
};

type week = Database['public']['Tables']['workout_week']['Row'];

export interface WorkoutWeek extends week {
  days?: WorkoutDay[]
};

type workout = Database['public']['Tables']['workout']['Row'];

export interface Workout extends workout {
  weeks?: WorkoutWeek[];
};

export type ExerciseMap = { [key: number]: Exercise[] };

export type ExerciseDict = { [key: number]: Exercise };