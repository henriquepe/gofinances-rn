import React from 'react';

import { 
    Container, 
    Header, 
    Title, 
    Icon, 
    Footer,
    Amount, 
    LastTransaction 
} from './styles';

interface HighlightCardProps {
    title: string;
    type: "up" | "down" | "total";
    amount: string;
    lastTransaction: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({title, type, amount, lastTransaction}) => {
  return (
      <Container type={type}>
          <Header>
              <Title type={type}>{title || '-'}</Title>
              <Icon type={type} name={type === "up" ? "arrow-up-circle" : type === "down" ? "arrow-down-circle" : "dollar-sign"}/>
          </Header>

          <Footer>
              <Amount type={type}>R$ {amount || '0'},00</Amount>
              <LastTransaction type={type}>{lastTransaction}</LastTransaction>
          </Footer>
      </Container>
  )
}

export default HighlightCard;