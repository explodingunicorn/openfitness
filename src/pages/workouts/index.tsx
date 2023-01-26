import { RequestContext } from "next/dist/server/base-server";
import { useRouter } from "next/router";
import { useState } from "react";
import { AppContainer } from "../../components/AppContainer";
import { WorkoutGrid } from "../../components/workouts/WorkoutGrid";
import { WorkoutHeader } from "../../components/workouts/WorkoutHeader";
import { api } from "../../utils/api";

export default function () {
  const [loading, setLoading] = useState(false);
  const workoutQuery = api.workouts.getUserWorkouts.useQuery();
  const router = useRouter();
  const createWorkoutMutation = api.workouts.createWorkout.useMutation();

  const createWorkout = async () => {
    setLoading(true);
    const { data } = await createWorkoutMutation.mutateAsync();
    if (data) {
      router.push(`/workouts/create/${data.workoutId}`);
    }
    setLoading(false);
  }

  return (
    <AppContainer>
      <WorkoutHeader
        title="Created workouts"
        subText="Workouts you've created on EZ Fitness"
        buttons={[{ children: "Create", variant: "primary", isLoading: loading, loadingText: 'Creating new workout', onClick: () => createWorkout() }]}
        content={<WorkoutGrid workouts={workoutQuery.data?.workouts ? workoutQuery.data.workouts : []} isLoading={workoutQuery.isLoading} />}
      />
      <WorkoutHeader
        title="Followed workouts"
        subText="Workouts you've followed from other athletes"
        buttons={[{ children: "Search the collection", variant: "secondary" }]}
        content={<WorkoutGrid workouts={[]} type="followed" />}
      />
    </AppContainer>
  );
}

export async function getServerSideProps(context: RequestContext) {
  return { props: {} };
}
