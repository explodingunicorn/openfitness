import {
  Box,
  Button,
  ButtonProps,
  Container,
  Divider,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface WorkoutButton extends ButtonProps {
  children: string;
}

export type WorkoutHeaderProps = {
  title: string;
  subText: string;
  buttons: WorkoutButton[];
  content: ReactNode;
};

export const WorkoutHeader: FC<WorkoutHeaderProps> = ({
  title,
  subText,
  buttons,
  content,
}) => (
  <Box
    as="section"
    bg="bg-surface"
    pt={{ base: "4", md: "8" }}
    pb={{ base: "12" }}
  >
    <Container>
      <Stack spacing="5" mb={{ base: 12 }}>
        <Stack
          spacing="4"
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
        >
          <Box>
            <Text fontSize="lg" fontWeight="medium">
              {title}
            </Text>
            <Text color="muted" fontSize="sm">
              {subText}
            </Text>
          </Box>
          <Stack direction="row" spacing="3">
            {buttons.map((props) => (
              <Button {...props} key={props.children} />
            ))}
          </Stack>
        </Stack>
        <Divider />
      </Stack>
      {content}
    </Container>
  </Box>
);
