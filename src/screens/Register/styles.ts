import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

import RNPickerSelect from "react-native-picker-select";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const FormContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 24px;
`;

export const ButtonsWrapper = styled.View`
  margin: 16px 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
`;

export const CategoryPickerWrapper = styled.View`
  width: ${RFValue(310)}px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
`;

export const Picker = styled(RNPickerSelect)`
  font-size: 14px;
`;

export const PickerContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const SubmitButton = styled(RectButton)`
  width: ${RFValue(310)}px;
  padding: 20px 0;
  border-radius: 5px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.secondary};

  position: absolute;

  bottom: ${RFValue(100)}px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`;
