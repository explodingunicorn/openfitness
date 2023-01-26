import { Session } from "next-auth";
import { supabase } from "./supabaseClient";

export const checkUser = async (ctx: { session: Session | null }) => {
  if (ctx.session?.user?.email) {
    const { data: user } = await supabase
      .from("users")
      .select()
      .eq("email", ctx.session.user.email)
      .single();
    console.log(user);
    if (user) return user;
    return null;
  }
  return null;
};

export const checkWorkoutAccess = async (
  ctx: { session: Session | null },
  workoutId: number
) => {
  const user = await checkUser(ctx);
  if (user) {
    const { data: workout } = await supabase
      .from("workout")
      .select()
      .eq("id", workoutId)
      .single();
    if (workout && workout.user_id === user.id) {
      return true;
    }
  }
  return false;
};

export const checkWeekAccess = async (
  ctx: { session: Session | null },
  weekId: number
) => {
  const user = await checkUser(ctx);
  if (user) {
    const { data: week } = await supabase
      .from("workout_week")
      .select(
        `
      *,
      workout (
        *
      )
    `
      )
      .eq("id", weekId)
      .single();

    if (
      week &&
      week.workout &&
      !Array.isArray(week.workout) &&
      week.workout.user_id === user.id
    ) {
      return true;
    }
  }
  return false;
};

export const checkDayAccess = async (
  ctx: { session: Session | null },
  dayId: number
) => {
  const user = await checkUser(ctx);
  if (user) {
    const { data: day } = await supabase
      .from("workout_day")
      .select(
        `
      *,
      workout_week (
        *,
        workout (
          *
        )
      )
    `
      )
      .eq("id", dayId)
      .single();
    if (
      day &&
      day.workout_week &&
      !Array.isArray(day.workout_week) &&
      day.workout_week.workout &&
      !Array.isArray(day.workout_week.workout) &&
      day.workout_week.workout.user_id === user.id
    ) {
      return true;
    }
    return false;
  }
};
