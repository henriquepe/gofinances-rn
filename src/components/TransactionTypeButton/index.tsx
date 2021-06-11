import React from "react";

import { RectButtonProperties } from "react-native-gesture-handler";

import { Container, Icon, Title } from "./styles";

interface TransactionTypeButtonProps extends RectButtonProperties {
  title: "Income" | "Outcome";
  isActive: boolean;
}

const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  title,
  isActive,
  onPress,
}) => {
  return (
    <Container isActive={isActive} type={title} onPress={onPress}>
      <Icon
        type={title}
        name={title === "Income" ? "arrow-up-circle" : "arrow-down-circle"}
      />
      <Title>{title}</Title>
    </Container>
  );
};

export default TransactionTypeButton;
