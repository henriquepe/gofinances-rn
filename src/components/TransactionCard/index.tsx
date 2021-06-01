import React from 'react';

import moment from 'moment';

import { 
    Amount,
    Container, 
    Footer, 
    Header, 
    Icon, 
    Title, 
    DetailsWrapper,
    DetailsTitle,
    DetailsDate
} from './styles';

interface TransactionCardProps {
    title?: string;
    type: "Carro" | "Casa" | "Alimentacao" | "Vendas";
    amount: string;
    date: Date;
}

const TransactionCard: React.FC<TransactionCardProps> = ({title, type, amount, date}) => {
  return (
      <Container type={type}>
          <Header>
            <Title type={type}>{title ? title : type}</Title>
            <Amount type={type}>{type !== 'Vendas' && '- '}R$ {amount || '0'},00</Amount>
          </Header>

          <Footer>
            <Icon type={type} name={type === "Alimentacao" ? "coffee" : type === "Casa" ? "home" : "dollar-sign"}/>
            <DetailsWrapper>
              <DetailsTitle>{type}</DetailsTitle>
              <DetailsDate>{moment(date).format('DD/MM/YYYY')}</DetailsDate>
            </DetailsWrapper>
          </Footer>
      </Container>
  )
}

export default TransactionCard;