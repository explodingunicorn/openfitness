import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { FC } from "react";
import { Category } from "./types";

export interface CategorySelectProps {
  value?: string;
  onChange: (value: string) => void;
  categories: Category[];
}

export const CategorySelect: FC<CategorySelectProps> = ({
  value,
  categories,
  onChange
}) => {
  return (
    <FormControl>
      <FormLabel>Cateogry</FormLabel>
      <Select placeholder="Select a category" value={value} onChange={e => onChange(e.target.value)}>
        {categories.map((category) => (
          <option value={category.id}>{category.name}</option>
        ))}
      </Select>
      <FormHelperText>
        Select an exercise category to select an exercise
      </FormHelperText>
    </FormControl>
  );
};
