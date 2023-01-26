import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Children, FC } from "react";
import { NoItemsCard } from "../noItemsCard";

import { Workout } from "./editor/types";

export interface WorkoutGridProps {
  workouts: Workout[];
  type?: "mine" | "followed";
  isLoading?: boolean;
}

export const WorkoutGrid: FC<WorkoutGridProps> = ({
  workouts,
  type = "mine",
  isLoading,
}) => {
  return (
    <Grid
      templateColumns={
        isLoading || !workouts.length ? undefined : "repeat(3, 1fr)"
      }
      gap={3}
    >
      {isLoading ? (
        <Container centerContent>
          <CircularProgress isIndeterminate color="green" />
        </Container>
      ) : (
        <>
          {workouts.length ? (
            workouts.map((workout) => {
              return (
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading size="sm">
                        {workout.name ? workout.name : "Unnamed workout"}
                      </Heading>
                    </CardHeader>
                    <CardFooter>
                      <Button as="a" href={`/workouts/create/${workout.id}`}>
                        Edit
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              );
            })
          ) : (
            <GridItem>
              <NoItemsCard
                text={`It looks like you haven't ${
                  type === "mine" ? "created" : "followed"
                } a workout yet, `}
                button={{
                  variant: "link",
                  color: "green",
                  as: "a",
                  href:
                    type === "mine" ? "/workouts/create" : "/workouts/search",
                  children:
                    type === "mine"
                      ? "get started by clicking here."
                      : "find one by clicking here.",
                }}
              />
            </GridItem>
          )}
        </>
      )}
    </Grid>
  );
};
