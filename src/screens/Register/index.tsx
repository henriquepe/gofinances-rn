import React, { useState } from "react";
import Input from "../../components/Input";
import TransactionTypeButton from "../../components/TransactionTypeButton";
import RNPickerSelect from "react-native-picker-select";

import { Alert, Keyboard, Text } from "react-native";

import {
  Container,
  FormContainer,
  Header,
  Title,
  ButtonsWrapper,
  CategoryPickerWrapper,
  Picker,
  PickerContent,
  Icon,
  SubmitButton,
  SubmitButtonText,
} from "./styles";
import theme from "../../global/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { categories } from "../../utils/categories";
import { useRef } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface FormData {
  name: string;
  amount: string;
  type: string;
  category: string;
}

export const Register: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("Categoria");
  const [itemsOpened, setItemsOpened] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const navigation = useNavigation();

  async function handleRegister() {
    // const dataKey = "@gofinances:transactions";
    // await AsyncStorage.removeItem(dataKey);

    if (selectedValue === "Categoria") {
      return Alert.alert("Selecione a categoria");
    }

    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (!name) {
      return Alert.alert("Selecione nome");
    }

    if (!amount) {
      return Alert.alert("Selecione valor");
    }

    const data = {
      name,
      amount: Number(amount.replace(",", ".")),
      transactionType,
      category: selectedValue,
      date: new Date(),
    };

    try {
      const dataKey = "@gofinances:transactions";

      const dataInAsyncStorage = await AsyncStorage.getItem(dataKey);

      const currentData = dataInAsyncStorage
        ? JSON.parse(dataInAsyncStorage)
        : [];

      const dataFormated = [...currentData, data];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

      const dataAlreadyInAsyncStorage = await AsyncStorage.getItem(dataKey);

      setSelectedValue("Categoria");
      setName("");
      setAmount("");
      setTransactionType("");
      dataAlreadyInAsyncStorage && navigation.navigate("Listagem");
    } catch (err) {
      Alert.alert("Não foi possível salvar a transação");
    }
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <FormContainer>
        <Input
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="sentences"
          clearTextOnFocus
        />
        <Input
          placeholder="Preço"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <ButtonsWrapper>
          <TransactionTypeButton
            isActive={transactionType === "Income"}
            onPress={() => setTransactionType("Income")}
            title="Income"
          />
          <TransactionTypeButton
            isActive={transactionType === "Outcome"}
            onPress={() => setTransactionType("Outcome")}
            title="Outcome"
          />
        </ButtonsWrapper>
        <>
          <RNPickerSelect
            modalProps={{
              focusable: true,
            }}
            style={{
              viewContainer: {
                width: RFValue(310),
                padding: 16,
                backgroundColor: theme.colors.shape,
                borderRadius: 5,
                justifyContent: "center",
                marginLeft: 20,
              },
            }}
            onOpen={() => setItemsOpened(true)}
            onClose={() => setItemsOpened(false)}
            placeholder={{ label: "Categoria", value: "Categoria" }}
            items={categories}
            onValueChange={setSelectedValue}
          >
            <PickerContent>
              <Text style={{ color: theme.colors.text }}>{selectedValue}</Text>
              <Icon
                name={
                  !itemsOpened ? "keyboard-arrow-down" : "keyboard-arrow-up"
                }
              />
            </PickerContent>
          </RNPickerSelect>
        </>

        <SubmitButton onPress={handleRegister}>
          <SubmitButtonText>Enviar</SubmitButtonText>
        </SubmitButton>
      </FormContainer>
    </Container>
  );
};
