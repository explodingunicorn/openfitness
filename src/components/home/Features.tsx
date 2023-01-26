import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Image,
  Square,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FiArrowRight } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { FaAccessibleIcon } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";

export const features = [
  {
    name: "210+ Components",
    description:
      "Chakra UI Pro has 210+ componentsto help you develop your project faster.",
    icon: BsStars,
  },
  {
    name: "Production Ready",
    description:
      "Effortlessly create your next production-ready experience with Chakra UI Pro components.",
    icon: IoRocketSharp,
  },
  {
    name: "Accessible",
    description:
      "Accessibility first. That's why we pay attention to accessibility right from the start.",
    icon: FaAccessibleIcon,
  },
];

export const Features = () => (
  <Box as="section" bg="bg-surface">
    <Container py={{ base: "16", md: "24" }}>
      <Stack spacing={{ base: "12", md: "16" }}>
        <Stack spacing={{ base: "4", md: "5" }} maxW="3xl">
          <Stack spacing="3">
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="semibold"
              color="accent"
            >
              Features
            </Text>
            <Heading size={useBreakpointValue({ base: "sm", md: "md" })}>
              What can you expect?
            </Heading>
          </Stack>
          <Text color="muted" fontSize={{ base: "lg", md: "xl" }}>
            A bundle of 210+ ready-to-use, responsive and accessible components
            with clever structured sourcode files.
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "12", lg: "16" }}
        >
          <Stack
            spacing={{ base: "10", md: "12" }}
            maxW="xl"
            justify="center"
            width="full"
          >
            {features.map((feature) => (
              <Stack key={feature.name} spacing="4" direction="row">
                <Square
                  size={{ base: "10", md: "12" }}
                  bg="accent"
                  color="inverted"
                  borderRadius="lg"
                >
                  <Icon as={feature.icon} boxSize={{ base: "5", md: "6" }} />
                </Square>
                <Stack
                  spacing={{ base: "4", md: "5" }}
                  pt={{ base: "1.5", md: "2.5" }}
                >
                  <Stack spacing={{ base: "1", md: "2" }}>
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontWeight="medium"
                    >
                      {feature.name}
                    </Text>
                    <Text color="muted">{feature.description}</Text>
                  </Stack>
                  <Button
                    variant="link"
                    colorScheme="blue"
                    rightIcon={<FiArrowRight fontSize="1.25rem" />}
                    alignSelf="start"
                  >
                    Read more
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Box width="full" overflow="hidden">
            <Image
              maxW="100%"
              minH={{ base: "100%", lg: "560px" }}
              objectFit="cover"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt="Developer"
            />
          </Box>
        </Stack>
      </Stack>
    </Container>
  </Box>
);
