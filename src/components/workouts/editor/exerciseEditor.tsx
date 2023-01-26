import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { clone } from "ramda";
import { FC, RefObject, useEffect, useMemo, useState } from "react";
import { CategorySelect } from "./categorySelect";
import { useEditor } from "./editor.context";
import { ExerciseSelect } from "./exerciseSelect";
import { Exercise, WorkoutChoice, WorkoutExercise, Category } from "./types";

export interface ExerciseEditorProps {
  dayId?: number;
  weekId?: number;
  exercise?: WorkoutExercise;
  returnBtnRef?: RefObject<HTMLButtonElement>;
  open: boolean;
  onOpenChange: (bool: boolean) => void;
}

export const ExerciseEditor: FC<ExerciseEditorProps> = ({
  dayId,
  weekId,
  exercise,
  returnBtnRef,
  open,
  onOpenChange,
}) => {
  const { exercises, categories, addExercise } = useEditor();
  const categoriesMap = useMemo(() => {
    return categories.reduce((prev, curr) => {
      prev[curr.id] = curr;
      return prev;
    }, {} as { [key: number]: Category });
  }, [categories]);

  const [categoryId, setCategoryId] = useState<string>(
    categories[0]?.id.toString() ?? ""
  );
  const [exerciseId, setExerciseId] = useState<string>(
    exercises[categories[0]?.id ?? 0]?.[0]?.id.toString() ?? ""
  );

  const [choices, setChoices] = useState<WorkoutChoice[]>([]);
  const [editingChoice, setEditingChoice] = useState<WorkoutChoice | null>(
    null
  );

  useEffect(() => {
    setChoices(exercise?.choices ?? []);
  }, [exercise]);

  const setChoiceCategory = (value: string, i: number) => {
    const categoryId = parseInt(value);
    const categoryExercises = exercises[categoryId] as Exercise[];
    const firstCategoryExercise = categoryExercises[0];
    setChoices((prev) => {
      const copy = [...prev];
      const copiedChoice = copy[i];
      if (copiedChoice && firstCategoryExercise) {
        copiedChoice.exercise = firstCategoryExercise;
        return copy;
      }
      return prev;
    });
  };

  const setChoiceExercise = (value: string, i: number) => {
    const choice = choices[i];
    if (choice) {
      const category_id = choice.exercise.category_id;
      const categoryExercises = exercises[category_id] as Exercise[];
      const exerciseId = parseInt(value);
      const newExercise = categoryExercises.find(
        (exercise) => exercise.id === exerciseId
      );
      if (newExercise) {
        setChoices((prev) => {
          const copy = [...prev];
          const copeiedChoice = copy[i];
          if (copeiedChoice) {
            copeiedChoice.exercise = newExercise;
            copeiedChoice.exercise_id = newExercise.id;
            return copy;
          }
          return prev;
        });
      }
    }
  };

  const addChoice = () => {
    const exerciseIdNumber = parseInt(exerciseId);
    const exercise = (exercises[parseInt(categoryId)] as Exercise[]).find(
      (exercise) => exercise.id === exerciseIdNumber
    );
    if (exercise) {
      setChoices((prev) => {
        return [
          ...prev,
          {
            id: 0,
            exercise_id: exerciseIdNumber,
            workout_exercise_id: 0,
            exercise,
          },
        ];
      });
    }
  };

  const onSave = () => {
    addExercise({ exercise: { id: 0, workout_day_id: dayId, choices }, dayId, weekId })
  };

  return (
    <Drawer
      isOpen={open}
      placement="right"
      onClose={() => onOpenChange(false)}
      finalFocusRef={returnBtnRef}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add an exercise</DrawerHeader>

        <DrawerBody>
          <Stack gap="6">
            {choices.map((choice, i) => (
              <>
                <Card variant="outline" key={choice.id}>
                  <CardBody>
                    <Stack gap="3">
                      <Text fontSize="md" fontWeight="medium">
                        Choice {i + 1}
                      </Text>
                      <Stack gap="3" align={"start"}>
                        {editingChoice?.id === choice.id ? (
                          <>
                            <CategorySelect
                              categories={categories}
                              value={choice.exercise?.category_id.toString()}
                              onChange={(value) => {
                                setChoiceCategory(value, i);
                              }}
                            />
                            <ExerciseSelect
                              exercises={
                                exercises[
                                  choice.exercise.category_id
                                ] as Exercise[]
                              }
                              value={choice.exercise.id.toString()}
                              onChange={(value) => {
                                setChoiceExercise(value, i);
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <Tag>
                              {categoriesMap[choice.exercise.category_id]?.name}
                            </Tag>
                            <Text fontSize="lg" fontWeight={"bold"}>
                              {choice.exercise.name}
                            </Text>
                            <Text>{choice.exercise.description}</Text>
                          </>
                        )}
                      </Stack>
                      <HStack gap="3" justifyContent="flex-end" width="100%">
                        {editingChoice?.id === choice.id ? (
                          <>
                            <Button
                              variant="secondary"
                              onClick={() =>
                                setChoices((prev) => {
                                  const choicesCopy = clone(prev);
                                  choicesCopy[i] = editingChoice;
                                  return choicesCopy;
                                })
                              }
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => {
                                setEditingChoice(null);
                              }}
                            >
                              Save
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => setEditingChoice(choice)}
                            disabled={editingChoice !== null}
                          >
                            Edit
                          </Button>
                        )}
                      </HStack>
                    </Stack>
                  </CardBody>
                </Card>
                <Divider />
              </>
            ))}
            <Stack gap="3">
              <Text fontSize="lg" fontWeight="medium" color="green">Add another choice</Text>
              <CategorySelect
                categories={categories}
                value={categoryId}
                onChange={(value) => {
                  setCategoryId(value);
                  const categoryExercises = exercises[
                    parseInt(value)
                  ] as Exercise[];
                  setExerciseId(categoryExercises[0]?.id.toString() ?? "");
                }}
              />
              <ExerciseSelect
                exercises={exercises[parseInt(categoryId)] as Exercise[]}
                value={exerciseId}
                onChange={(value) => {
                  setExerciseId(value);
                }}
              />
              <Button onClick={addChoice}>Add choice</Button>
            </Stack>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSave}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
