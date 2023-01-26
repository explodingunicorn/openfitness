import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { NoItemsCard } from "../../noItemsCard";
import { ExerciseCard } from "../exerciseCard";
import { useEditor } from "./editor.context";
import { WorkoutDay } from "./types";

export interface DayEditorProps {
  weekId: number;
  day: WorkoutDay;
}

export const DayEditor: FC<DayEditorProps> = ({ weekId, day }) => {
  const { openExerciseEditor } = useEditor();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="sm">Day {(day.number ?? 0) + 1}</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6}>
            {day.exercises?.length ? (
              day.exercises?.map((exercise, i) => {
                return exercise.choices?.length ? (
                  <ExerciseCard exercise={exercise} id={i} onEdit={() => {}} key={exercise.id} />
                ) : null;
              })
            ) : (
              <NoItemsCard
                text="It looks like you haven't added an exercise yet, "
                button={{
                  variant: "link",
                  color: "green",
                  children: "click here to add one.",
                }}
              />
            )}
            <Button
              variant="outline"
              onClick={() => {
                openExerciseEditor({ returnButton: btnRef, dayId: day.id, weekId });
              }}
              color="green"
              ref={btnRef}
            >
              Add {day.exercises?.length ? "another" : "an"} exercise
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};
