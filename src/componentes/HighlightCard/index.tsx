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
    icon: "arrow-up-circle" | "arrow-down-circle";
    amount: string;
    lastTransaction: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({title, icon, amount, lastTransaction}) => {
  return (
      <Container>
          <Header>
              <Title>{title || '-'}</Title>
              <Icon name={icon}/>
          </Header>

          <Footer>
              <Amount>R$ {amount || '0'},00</Amount>
              <LastTransaction>{lastTransaction}</LastTransaction>
          </Footer>
      </Container>
  )
}

export default HighlightCard;