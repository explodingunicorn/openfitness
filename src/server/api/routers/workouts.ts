import { z } from "zod";
import { DayEditor } from "../../../components/workouts/editor/dayEditor";
import {
  checkDayAccess,
  checkUser,
  checkWeekAccess,
  checkWorkoutAccess,
} from "../../../utils/auth";
import { supabase } from "../../../utils/supabaseClient";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workoutsRouter = createTRPCRouter({
  getUserWorkouts: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx.session);
    const user = await checkUser(ctx);
    if (user) {
      const { data: workouts } = await supabase
        .from("workout")
        .select()
        .eq("user_id", user.id);
      console.log(workouts);
      if (workouts) {
        return { workouts, error: null };
      }
      return { workouts: null, error: "Couldn't retrieve workouts" };
    }
    return { workouts: null, error: "Couldn't find user" };
  }),
  createWorkout: protectedProcedure.mutation(async ({ ctx }) => {
    const errorMsg = "Workout creation failed";
    if (ctx.session.user.email) {
      // Get the user
      const { data: user } = await supabase
        .from("users")
        .select()
        .eq("email", ctx.session.user.email)
        .limit(1)
        .single();
      if (user) {
        // Create a workout using the users id
        const { data: workout } = await supabase
          .from("workout")
          .insert({ user_id: user.id, name: "" })
          .select()
          .single();
        if (workout) {
          // Create one workout week using the workouts id
          const { data: workoutWeek, error } = await supabase
            .from("workout_week")
            .insert({ workout_id: workout.id, number: 0 })
            .select()
            .single();
          if (workoutWeek) {
            // Return data with the workout id
            return { data: { workoutId: workout.id } };
          } else if (error) {
            // If the workout week insertion failed, then delete the created workout above
            await supabase.from("workout").delete().eq("id", workout.id);
            return { error: errorMsg };
          }
        } else {
          return { error: errorMsg };
        }
      }
      return { error: errorMsg };
    }
    return { error: errorMsg };
  }),
  createWorkoutWeek: protectedProcedure
    .input(z.object({ workoutId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userHasAccess = await checkWorkoutAccess(ctx, input.workoutId);
      if (userHasAccess) {
        // Check for any existing weeks so we can give the week the correct number
        const { data: existingWeeks } = await supabase
          .from("workout_week")
          .select()
          .eq("workout_id", input.workoutId)
          .order("number", { ascending: true });
        const lastNumber =
          existingWeeks?.[existingWeeks.length - 1]?.number ?? 0;
        // Insert the week with the correct number
        const { data: weekToReturn, error } = await supabase
          .from("workout_week")
          .insert({ workout_id: input.workoutId, number: lastNumber + 1 })
          .select()
          .single();

        if (error) {
          return {
            data: null,
            error: "Something went wrong creating a new week",
          };
        }
        if (weekToReturn) {
          return { data: weekToReturn, error: null };
        } else {
          return {
            data: null,
            error: "Something went wrong creating a new week",
          };
        }
      }
      return {
        data: null,
        error: "This user does not have access to edit this workout",
      };
    }),
  createWorkoutDay: protectedProcedure
    .input(z.object({ weekId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userHasAccess = await checkWeekAccess(ctx, input.weekId);
      if (userHasAccess) {
        // Check for any existing days so we can give the day the correct number
        const { data: existingDays, error: existingDaysError } = await supabase
          .from("workout_day")
          .select()
          .eq("workout_week_id", input.weekId)
          .order("number", { ascending: true });
        if (existingDaysError) {
          return { data: null, error: "Error retrieving existing days" };
        }
        const lastNumber = existingDays?.[existingDays.length - 1]?.number ?? 0;

        // Insert the day with the correct number
        const { data: dayToReturn, error } = await supabase
          .from("workout_day")
          .insert({ workout_week_id: input.weekId, number: lastNumber + 1 })
          .select()
          .single();

        if (error) {
          return {
            data: null,
            error: "Something went wrong creating a new day",
          };
        }
        if (dayToReturn) {
          return { data: dayToReturn, error: null };
        } else {
          return {
            data: null,
            error: "Something went wrong creating a new day",
          };
        }
      }
      return {
        data: null,
        error: "This user does not have access to edit this workout",
      };
    }),
  createWorkoutExercise: protectedProcedure
    .input(
      z.object({
        dayId: z.number(),
        choices: z.array(
          z.object({ workoutExerciseId: z.number(), exerciseId: z.number() })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userHasAccess = await checkDayAccess(ctx, input.dayId);
      if (userHasAccess) {
        const { data: existingExercises, error: existingExercisesError } =
          await supabase
            .from("workout_exercise")
            .select()
            .eq("workout_day_id", input.dayId)
            .order("number", { ascending: true });

        if (existingExercisesError) {
          return { data: null, error: "Error retrieving existing exercises" };
        }

        const lastNumber =
          existingExercises?.[existingExercises.length - 1]?.number ?? 0;
        const { data: exerciseToReturn, error: exerciseToReturnError } =
          await supabase
            .from("workout_exercise")
            .insert({ workout_day_id: input.dayId, number: lastNumber + 1 })
            .select()
            .single();

        if (exerciseToReturnError) {
          return {
            data: null,
            error: "Something went wrong creating a new exercise",
          };
        }

        const { data: choicesToReturn, error: choicesToReturnError } =
          await supabase
            .from("workout_exercise_choice")
            .insert(
              input.choices.map((choice) => ({
                exercise_id: choice.exerciseId,
                workout_exercise_id: choice.workoutExerciseId,
              }))
            )
            .select(`
              *,
              exercise:exercises (
                *
              )
            `);
        return {
          data: { choices: choicesToReturn, exercise: exerciseToReturn },
          error: null,
        };
      }

      return {
        data: null,
        error: "This user does not have access to edit this workout",
      };
    }),
});
