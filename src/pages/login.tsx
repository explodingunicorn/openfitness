"use client";
import {
  Avatar,
  AvatarGroup,
  Box,
  Center,
  DarkMode,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Logo } from "../components/Logo";
import { SignInForm } from "../components/login/SignInForm";

export default () => {
  return (
    <Flex
      minH={{ base: "auto", md: "100vh" }}
      bgGradient={useBreakpointValue({
        md: mode(
          "linear(to-r, green.600 50%, white 50%)",
          "linear(to-r, green.600 50%, gray.900 50%)"
        ),
      })}
    >
      <Flex maxW="8xl" mx="auto" width="full">
        <Box flex="1" display={{ base: "none", md: "block" }}>
          <DarkMode>
            <Flex
              direction="column"
              px={{ base: "4", md: "8" }}
              height="full"
              color="on-accent"
            >
              <Flex align="center" h="24">
                <Logo />
              </Flex>
              <Flex flex="1" align="center">
                <Stack spacing="8">
                  <Stack spacing="6">
                    <Heading size={useBreakpointValue({ md: "lg", xl: "xl" })}>
                      Let's gooooo
                    </Heading>
                    <Text fontSize="lg" maxW="md" fontWeight="medium">
                      Login and start creating your workout today.
                    </Text>
                  </Stack>
                  <HStack spacing="4">
                    <AvatarGroup
                      size="md"
                      max={useBreakpointValue({ base: 2, lg: 5 })}
                      borderColor="on-accent"
                    >
                      <Avatar
                        name="Ryan Florence"
                        src="https://bit.ly/ryan-florence"
                      />
                      <Avatar
                        name="Segun Adebayo"
                        src="https://bit.ly/sage-adebayo"
                      />
                      <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                      />
                      <Avatar
                        name="Prosper Otemuyiwa"
                        src="https://bit.ly/prosper-baba"
                      />
                      <Avatar
                        name="Christian Nwamba"
                        src="https://bit.ly/code-beast"
                      />
                    </AvatarGroup>
                    <Text fontWeight="medium">Join 10.000+ users</Text>
                  </HStack>
                </Stack>
              </Flex>
              <Flex align="center" h="24">
                <Text color="on-accent-subtle" fontSize="sm">
                  ?? 2022 EZ Fitness. All rights reserved.
                </Text>
              </Flex>
            </Flex>
          </DarkMode>
        </Box>
        <Center flex="1">
          <SignInForm
            px={{ base: "4", md: "8" }}
            py={{ base: "12", md: "48" }}
            width="full"
            maxW="md"
          />
        </Center>
      </Flex>
    </Flex>
  );
};
