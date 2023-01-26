import { Button, ButtonProps, Card, CardBody, Text } from "@chakra-ui/react";
import { FC } from "react";

export interface NoItemsCardProps {
  text: string;
  button: ButtonProps & { href?: string };
}

export const NoItemsCard: FC<NoItemsCardProps> = ({ text, button }) => {
  return (
    <Card>
      <CardBody>
        <Text>
          {text}
          <Button {...button}></Button>
        </Text>
      </CardBody>
    </Card>
  );
};
