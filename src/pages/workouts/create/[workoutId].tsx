import { GetServerSideProps, InferGetServerSidePropsType, Redirect } from "next";
import { AppContainer } from "../../../components/AppContainer";
import { WorkoutEditor } from "../../../components/workouts/editor";
import { Category, Exercise, ExerciseDict, ExerciseMap, Workout } from "../../../components/workouts/editor/types";
import { supabase } from "../../../utils/supabaseClient";

export interface CreateProps {
  workout: Workout;
  exercises: ExerciseMap;
  exerciseDict: ExerciseDict;
  categories: Category[];
}

export default function ({ exercises, categories, exerciseDict, workout }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AppContainer>
      <WorkoutEditor workout={workout} exercises={exercises} categories={categories} exerciseDict={exerciseDict} />
    </AppContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  const workoutId = parseInt(query.workoutId as string);
  const { data: workout } = (await supabase.from('workout').select(`
    *,
    weeks:workout_week (
      *,
      days:workout_day (
        *,
        exercises:workout_exercise (
          *,
          choices:workout_exercise_choice (
            *,
            exercises (
              *
            )
          )
        )
      )
    )
  `).eq('id', workoutId).single()) as unknown as { data: Workout };
  if (!workout) {
    return {
      redirect: {
        destination: '/workouts'
      },
      props: {}
    }
  }
  const { data: exerciseData } = await supabase.from('exercises').select();
  const { data: categoryData } = await supabase.from('exercise_categories').select();
  let exerciseMap: ExerciseMap = {}; 
  let exerciseDict: ExerciseDict = {};
  let categories: Category[] = [];

  exerciseMap = exerciseData ? exerciseData?.reduce((prev, curr) => {
    const exercise = { name: curr.name, description: curr.description || '', id: curr.id, category_id: curr.category_id};
    if (prev[curr.category_id]) {
      (prev[curr.category_id] as Exercise[]).push(exercise);
    } else {
      prev[curr.category_id] = [exercise];
    }
    return prev;
  }, {} as ExerciseMap) : {};

  exerciseDict = exerciseData ? exerciseData?.reduce((prev, curr) => {
    return { ...prev, [curr.id]: curr };
  }, {} as ExerciseDict) : {};

  categories = categoryData ? categoryData.map(category => ({ id: category.id, name: category.name })) : [];

  return {
    props: {
      workout,
      exercises: exerciseMap,
      exerciseDict,
      categories
    } as CreateProps
  }
}
