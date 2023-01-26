import { Box, Button, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react';
import { WorkoutExercise } from './editor/types'

export interface ExerciseCard {
  id: number;
  exercise: WorkoutExercise;
  onEdit: (exerciseNumber: number) => void;
}

export const ExerciseCard: FC<ExerciseCard> = ({ id, exercise, onEdit }) => (
  <Box as="section" py={{ base: '4', md: '8' }}>
    <Container maxW="3xl">
      <Box
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        borderRadius="lg"
        p={{ base: '4', md: '6' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '5', md: '6' }}
          justify="space-between"
        >
          <Stack spacing="1">
            <Text fontSize="lg" fontWeight="medium">
              { exercise.choices?.[0]?.exercise.name }
            </Text>
            <Text fontSize="sm" color="muted">
              { exercise.choices?.[0]?.exercise.description }
            </Text>
          </Stack>
          <Box>
            <Button variant="primary" onClick={() => onEdit(id)}>Edit</Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  </Box>
)