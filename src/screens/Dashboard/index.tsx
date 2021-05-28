import React from 'react';
import HighlightCard from '../../componentes/HighlightCard';



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
  HighLightCards
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

          
                    
        </Header>

        <HighLightCards horizontal showsHorizontalScrollIndicator={false}>

            <HighlightCard title="Entrada" icon="arrow-up-circle" amount="17.000" lastTransaction="Última entrada dia 13 de abril"/>

            <HighlightCard title="Saída" icon="arrow-down-circle" amount="5.000" lastTransaction="Última entrada dia 15 de abril"/>

            <HighlightCard title="Entrada" icon="arrow-up-circle" amount="17.000" lastTransaction="Última entrada dia 13 de abril"/>

        </HighLightCards>

        
    </Container>
  );
}

export default Dashboard;
