import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionCards,
  LogoutButton,
} from "./styles";

export interface TransactionsProps {
  name: string;
  amount: string;
  transactionType: "Income" | "Outcome";
  category: "Carro" | "Casa" | "Alimentacao" | "Vendas";
  date: Date;
}

export const Dashboard: React.FC = () => {
  function handleMonth(month: string) {
    switch (month) {
      case "1":
        return "Janeiro";
      case "2":
        return "Fevereiro";
      case "3":
        return "Março";
      case "4":
        return "Abril";
      case "5":
        return "Maio";
      case "6":
        return "Junho";
      case "7":
        return "Julho";
      case "8":
        return "Agosto";
      case "9":
        return "Setembro";
      case "10":
        return "Outubro";
      case "11":
        return "Novembro";
      case "12":
        return "Dezembro";
      default:
        return "Mês inválido";
    }
  }

  const { signOut, user } = useAuth();

  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  const [incomeTransactionsValue, setIncomeTransactionsValue] = useState("");

  const [outcomeTransactionsValue, setOutcomeTransactionsValue] = useState("");

  const [lastIncomeTransaction, setLastIncomeTransaction] = useState<Date>();

  const [lastOutcomeTransaction, setLastOutcomeTransaction] = useState<Date>();

  const removeTransaction = async () =>
    await AsyncStorage.removeItem("@gofinances:transactions");

  const getTransactions = async () => {
    const data = await AsyncStorage.getItem("@gofinances:transactions");

    if (data !== null) {
      let formatedData: TransactionsProps[] = JSON.parse(data);

      setTransactions(formatedData);

      const incomeTransactions = formatedData.filter(
        (transaction) => transaction.transactionType === "Income"
      );

      const lastIncomeTransactionInStore = incomeTransactions.find(
        (transaction, index) => index === incomeTransactions.length - 1
      );

      if (lastIncomeTransactionInStore) {
        setLastIncomeTransaction(lastIncomeTransactionInStore.date);
      }

      const incomeTransactionsAmountsFromStorage = formatedData
        .filter((transaction) => transaction.transactionType === "Income")
        .map((tr) => tr.amount);

      const incomeTransactionsValueFromStorage =
        incomeTransactionsAmountsFromStorage.reduce(
          (accumulator, amount) => accumulator + amount
        );

      setIncomeTransactionsValue(incomeTransactionsValueFromStorage);

      const outcomeTransactionsAmountsFromStorage = formatedData
        .filter((transaction) => transaction.transactionType === "Outcome")
        .map((tr) => tr.amount);

      const outcomeTransactions = formatedData.filter(
        (transaction) => transaction.transactionType === "Outcome"
      );

      const lastOutcomeTransactionInStore = outcomeTransactions.find(
        (transaction, index) => index === outcomeTransactions.length - 1
      );

      if (lastOutcomeTransactionInStore) {
        setLastOutcomeTransaction(lastOutcomeTransactionInStore.date);
      }

      const outcomeTransactionsValueFromStorage =
        outcomeTransactionsAmountsFromStorage.reduce(
          (accumulator, amount) => accumulator + amount
        );

      setOutcomeTransactionsValue(outcomeTransactionsValueFromStorage);
    }
  };

  useFocusEffect(() => {
    getTransactions();
  });
  // useEffect(() => {
  //   // removeTransaction();

  // }, []);

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: `${user.photo}`,
              }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>

        <HighLightCards horizontal showsHorizontalScrollIndicator={false}>
          <HighlightCard
            title="Entrada"
            type="up"
            amount={Number(incomeTransactionsValue).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            lastTransaction={
              lastIncomeTransaction
                ? `Última entrada dia ${moment(lastIncomeTransaction).get(
                    "date"
                  )} de ${handleMonth(
                    moment(lastIncomeTransaction)
                      .get("month")
                      .toLocaleString("pt-BR")
                  )}`
                : ""
            }
          />

          <HighlightCard
            title="Saída"
            type="down"
            amount={Number(outcomeTransactionsValue).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            lastTransaction={
              lastOutcomeTransaction
                ? `Última entrada dia ${moment(lastOutcomeTransaction).get(
                    "date"
                  )} de ${handleMonth(
                    moment(lastOutcomeTransaction)
                      .get("month")
                      .toLocaleString("pt-BR")
                  )}`
                : ""
            }
          />

          <HighlightCard
            title="Total"
            type="total"
            amount={Number(
              String(
                Number(incomeTransactionsValue) -
                  Number(outcomeTransactionsValue)
              )
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          />
        </HighLightCards>
      </Header>

      <Transactions>
        <Title>Resumo</Title>

        <TransactionCards
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {transactions.map((transaction, index) => (
            <TransactionCard
              key={index}
              title={transaction.name}
              amount={Number(transaction.amount).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              date={transaction.date || "Data não registrada"}
              type={transaction.category}
              transactionType={transaction.transactionType}
            />
          ))}
        </TransactionCards>
      </Transactions>
    </Container>
  );
};
