import React from "react";

import moment from "moment";

import {
  Amount,
  Container,
  Footer,
  Header,
  Icon,
  Title,
  DetailsWrapper,
  DetailsTitle,
  DetailsDate,
} from "./styles";

interface TransactionCardProps {
  title?: string;
  type: "Carro" | "Casa" | "Alimentacao" | "Vendas";
  amount: string;
  date: Date;
  transactionType: "Income" | "Outcome";
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  type,
  amount,
  date,
  transactionType,
}) => {
  return (
    <Container transactionType={transactionType} type={type}>
      <Header>
        <Title transactionType={transactionType} type={type}>
          {title ? title : type}
        </Title>
        <Amount transactionType={transactionType} type={type}>
          {transactionType !== "Income" && "- "}R$ {amount || "0"},00
        </Amount>
      </Header>

      <Footer>
        <Icon
          type={type}
          name={
            type === "Alimentacao"
              ? "coffee"
              : type === "Casa"
              ? "home"
              : "dollar-sign"
          }
        />
        <DetailsWrapper>
          <DetailsTitle>{type}</DetailsTitle>
          <DetailsDate>{moment(date).format("DD/MM/YYYY")}</DetailsDate>
        </DetailsWrapper>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
