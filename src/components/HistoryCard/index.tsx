import React from "react";

import { View } from "react-native";

import { Container, Title, Amount } from "./styles";

type Props = {
  title: string;
  amount: string;
  color: string;
};

export const HistoryCard: React.FC<Props> = ({ title, amount, color }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
