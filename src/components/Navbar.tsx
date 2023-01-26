import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FiHelpCircle, FiMenu, FiSearch, FiSettings } from "react-icons/fi";
import { Logo } from "./Logo";

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const router = useRouter();
  const { data } = useSession();

  return (
    <Box as="section">
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container py={{ base: "3", lg: "4" }}>
          <Flex justify="space-between">
            <HStack spacing="4">
              <Logo />
              {isDesktop && (
                <ButtonGroup variant="ghost" spacing="1">
                  <Link href="/">
                    <Button
                      as="span"
                      aria-current={
                        router.pathname === "/" ? "page" : undefined
                      }
                    >
                      Home
                    </Button>
                  </Link>
                  {data?.user && (
                    <>
                      <Link href="/workouts">
                        <Button
                          as="span"
                          aria-current={
                            router.pathname === "/workouts" ? "page" : undefined
                          }
                        >
                          Workouts
                        </Button>
                      </Link>
                    </>
                  )}
                </ButtonGroup>
              )}
            </HStack>
            {isDesktop && data?.user ? (
              <HStack spacing="4">
                <ButtonGroup variant="ghost" spacing="1">
                  <IconButton
                    icon={<FiSearch fontSize="1.25rem" />}
                    aria-label="Search"
                  />
                  <IconButton
                    icon={<FiSettings fontSize="1.25rem" />}
                    aria-label="Settings"
                  />
                  <IconButton
                    icon={<FiHelpCircle fontSize="1.25rem" />}
                    aria-label="Help Center"
                  />
                </ButtonGroup>
                <Avatar
                  boxSize="10"
                  name="Christoph Winston"
                  src="https://tinyurl.com/yhkm2ek8"
                />
              </HStack>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
