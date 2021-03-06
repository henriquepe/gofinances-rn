import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { Alert } from "react-native";

import AppleSvg from "../../assets/apple.svg";

import GoogleSvg from "../../assets/google.svg";

import LogoSvg from "../../assets/logo.svg";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Platform } from "react-native";

export default function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("error", error);
      Alert.alert("Não foi possível conectar à conta Google");
    }
  };

  const handleSignInWithApple = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      console.log("error", error);
      Alert.alert("Não foi possível conectar à conta Apple");
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={() => handleSignInWithGoogle()}
            svg={GoogleSvg}
            title="Entrar com Google"
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={() => handleSignInWithApple()}
              svg={AppleSvg}
              title="Entrar com Apple"
            />
          )}
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
