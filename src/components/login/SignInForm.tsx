import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { LogoIcon } from "../Logo";
import { GoogleIcon } from "./ProviderIcons";

export const SignInForm = (props: StackProps) => {
  const { data: sessionData } = useSession();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  console.log(sessionData?.user);

  return (
    <Stack spacing="8" {...props}>
      {sessionData?.user ? (
        <>
          <Stack spacing="6">
            {isMobile && <LogoIcon />}
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
                Already logged in
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Click below to log out</Text>
              </HStack>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <Stack spacing="4">
              <Button
                variant={"primary"}
                onClick={() => {
                  signOut({ redirect: false });
                }}
              >
                Log out
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
        <>
          <Stack spacing="6">
            {isMobile && <LogoIcon />}
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
                Log in to your account
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">No registration required</Text>
              </HStack>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Stack spacing="4">
              <Button
                variant={"primary"}
                onClick={() => {
                  signIn("email", { email });
                  setEmailSent(true);
                }}
                disabled={emailSent}
              >
                {emailSent ? "Check your email to log in" : "Log in"}
              </Button>
              <Button
                variant="secondary"
                leftIcon={<GoogleIcon boxSize="5" />}
                iconSpacing="3"
                onClick={() => signIn("google")}
              >
                Log in with Google
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};
