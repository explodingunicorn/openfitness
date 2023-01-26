import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  ChakraProvider,
  extendTheme,
  theme as baseTheme,
} from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";

import { api } from "../utils/api";
import { Navbar } from "../components/Navbar";

export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.green },
  },
  proTheme
);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
