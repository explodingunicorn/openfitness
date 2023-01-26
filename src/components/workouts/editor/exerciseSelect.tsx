import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { FC } from "react";
import { Exercise } from "./types";

export interface ExerciseSelectProps {
  value?: string;
  onChange: (value: string) => void;
  exercises: Exercise[];
}

export const ExerciseSelect: FC<ExerciseSelectProps> = ({
  value,
  exercises,
  onChange
}) => {
  return (
    <FormControl>
      <FormLabel>Exercise</FormLabel>
      <Select placeholder="Select an exercise" value={value} onChange={e => onChange(e.target.value)}>
        {exercises.map((exercise) => (
          <option value={exercise.id}>{exercise.name}</option>
        ))}
      </Select>
    </FormControl>
  );
};
