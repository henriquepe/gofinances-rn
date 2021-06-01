import React from 'react';
import HighlightCard from '../../components/HighlightCard';

import TransactionCard from '../../components/TransactionCard';

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
  TransactionCards
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
        <Header>
          <UserWrapper>
            <UserInfo>

              <Photo source={{uri: 'https://avatars.githubusercontent.com/u/62850277?v=4.png'}}/>

              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>Henrique</UserName>
              </User>

            </UserInfo>
            <Icon name="power"/>
          </UserWrapper>

          <HighLightCards horizontal showsHorizontalScrollIndicator={false}>

            <HighlightCard title="Entrada" type="up" amount="17.000" lastTransaction="Última entrada dia 13 de abril"/>

            <HighlightCard title="Saída" type="down" amount="5.000" lastTransaction="Última entrada dia 15 de abril"/>

            <HighlightCard title="Total" type="total" amount="12.000" lastTransaction="01 à 16 de abril"/>

          </HighLightCards>
                   
        </Header>

        <Transactions>

            <Title>Resumo</Title>

            <TransactionCards contentContainerStyle={{paddingBottom: 20}} showsVerticalScrollIndicator={false}>

            

              <TransactionCard title="Desenvolvimento Omint" amount="12.000" type="Vendas" date={new Date()}/>
              <TransactionCard title="Outback" amount="2.000" type="Alimentacao" date={new Date()}/>
              <TransactionCard amount="3.000" type="Casa" date={new Date()}/>
              <TransactionCard title="Desenvolvimento Mobly" amount="12.000" type="Vendas" date={new Date()}/>

            </TransactionCards>

        </Transactions>

            

        
    </Container>
  );
}

export default Dashboard;
