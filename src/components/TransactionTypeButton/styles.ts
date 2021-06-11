import styled, { css } from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface Props {
  type: "Income" | "Outcome";
}

interface ContainerProps {
  type: "Income" | "Outcome";
  isActive: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: ${RFValue(160)}px;
  flex: 1;
  border: 1.1px solid ${({ theme }) => theme.colors.text};

  flex-direction: row;

  align-items: center;
  justify-content: center;

  margin: 0 5px;

  padding: 18px;

  border-radius: 5px;

  ${(props) =>
    props.isActive &&
    props.type === "Income" &&
    css`
      background: ${({ theme }) => theme.colors.success_light};
      border: 0;
    `}

  ${(props) =>
    props.isActive &&
    props.type === "Outcome" &&
    css`
      background: ${({ theme }) => theme.colors.attention_light};
      border: 0;
    `}
`;

export const Icon = styled(Feather)<Props>`
  font-size: ${RFValue(24)}px;

  margin-right: 14px;

  ${({ type }) =>
    type === "Income"
      ? css`
          color: ${({ theme }) => theme.colors.success};
        `
      : css`
          color: ${({ theme }) => theme.colors.attention};
        `}
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
