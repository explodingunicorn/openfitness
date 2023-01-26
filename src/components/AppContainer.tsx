import { Container } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const AppContainer: FC<PropsWithChildren> = ({ children }) => {
  return <Container padding="16px">{children}</Container>;
};
