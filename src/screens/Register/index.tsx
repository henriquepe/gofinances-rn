import React, { useState } from "react";
import Input from "../../components/Input";
import TransactionTypeButton from "../../components/TransactionTypeButton";
import RNPickerSelect from "react-native-picker-select";

import { Alert, Text } from "react-native";

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

interface FormData {
  name: string;
  amount: string;
  type: string;
  category: string;
}

const Register = () => {
  const [selectedValue, setSelectedValue] = useState("Categoria");
  const [itemsOpened, setItemsOpened] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

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

    const data = {
      name,
      amount,
      transactionType,
      category: selectedValue,
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

      dataAlreadyInAsyncStorage && navigation.navigate("Listagem");
    } catch (err) {
      console.log(err);
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
          onChangeText={setName}
          autoCapitalize="sentences"
        />
        <Input
          placeholder="Preço"
          onChangeText={(text) => setAmount(Number(text))}
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

        <CategoryPickerWrapper>
          <RNPickerSelect
            onOpen={() => setItemsOpened(true)}
            onClose={() => setItemsOpened(false)}
            placeholder={{ label: "Categoria", value: "Categoria" }}
            items={[
              { label: "Casa", value: "Casa", key: "home" },
              { label: "Carro", value: "Carro", key: "car" },
              { label: "Vendas", value: "Vendas", key: "sells" },
              { label: "Alimentação", value: "Alimentacao", key: "food" },
            ]}
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
        </CategoryPickerWrapper>

        <SubmitButton onPress={handleRegister}>
          <SubmitButtonText>Enviar</SubmitButtonText>
        </SubmitButton>
      </FormContainer>
    </Container>
  );
};

export default Register;
