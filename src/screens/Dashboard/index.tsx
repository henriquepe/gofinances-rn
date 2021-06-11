import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";

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

interface TransactionsProps {
  name: string;
  amount: string;
  transactionType: "Income" | "Outcome";
  category: "Carro" | "Casa" | "Alimentacao" | "Vendas";
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  const getTransactions = async () => {
    const data = await AsyncStorage.getItem("@gofinances:transactions");

    if (data !== null) {
      let formatedData = JSON.parse(data);

      console.log("formatedDAta", formatedData);

      setTransactions(formatedData);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/62850277?v=4.png",
              }}
            />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Henrique</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>

        <HighLightCards horizontal showsHorizontalScrollIndicator={false}>
          <HighlightCard
            title="Entrada"
            type="up"
            amount="17.000"
            lastTransaction="Última entrada dia 13 de abril"
          />

          <HighlightCard
            title="Saída"
            type="down"
            amount="5.000"
            lastTransaction="Última entrada dia 15 de abril"
          />

          <HighlightCard
            title="Total"
            type="total"
            amount="12.000"
            lastTransaction="01 à 16 de abril"
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
              amount={transaction.amount}
              date={new Date()}
              type={transaction.category}
              transactionType={transaction.transactionType}
            />
          ))}
        </TransactionCards>
      </Transactions>
    </Container>
  );
}

export default Dashboard;
