import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  Img,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

export const Hero = () => (
  <Box as="section" bg="bg-surface">
    <Box position="relative" height={{ lg: "720px" }}>
      <Container py={{ base: "16", md: "24" }} height="full">
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: "16" }}
          align={{ lg: "center" }}
          height="full"
        >
          <Stack spacing={{ base: "8", md: "12" }}>
            <Stack spacing="4">
              <Badge
                colorScheme="blue"
                alignSelf="start"
                size={useBreakpointValue({ base: "md", md: "lg" })}
              >
                Currently in Beta
              </Badge>
              <Stack
                spacing={{ base: "4", md: "6" }}
                maxW={{ md: "xl", lg: "md", xl: "xl" }}
              >
                <Heading size={useBreakpointValue({ base: "md", md: "xl" })}>
                  Share and track your workouts
                </Heading>
                <Text fontSize={{ base: "lg", md: "xl" }} color="muted">
                  EZ Fitness allows you to find the right workout for you.
                </Text>
              </Stack>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing="3">
              <Link href="/login">
                <Button
                  variant="primary"
                  size={useBreakpointValue({ base: "lg", md: "xl" })}
                  as="span"
                >
                  Login
                </Button>
              </Link>
              <Button
                variant="secondary"
                size={useBreakpointValue({ base: "lg", md: "xl" })}
              >
                Learn more
              </Button>
            </Stack>
          </Stack>
          <Box
            pos={{ lg: "absolute" }}
            right="0"
            bottom="0"
            w={{ base: "full", lg: "50%" }}
            height={{ base: "96", lg: "full" }}
            sx={{
              clipPath: { lg: "polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)" },
            }}
          >
            <Img
              boxSize="full"
              objectFit="cover"
              src="images/hero.jpg"
              alt="Lady at work"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  </Box>
);
