import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Button, ImageContainer, Text } from "./styles";

import { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton: React.FC<Props> = ({
  title,
  svg: Svg,
  ...rest
}) => {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Text>{title}</Text>
    </Button>
  );
};
