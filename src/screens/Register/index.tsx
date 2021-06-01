import React, { useState } from 'react';
import Input from '../../components/Input';
import TransactionTypeButton from '../../components/TransactionTypeButton';





import { Text } from 'react-native'

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
  SubmitButtonText
} from './styles';
import theme from '../../global/styles/theme';

interface FormData {
  name: string;
  amount: string;
  type: string;
  category: string;
}

const Register = () => {


  const [selectedValue, setSelectedValue] = useState('Categoria');
  const [itemsOpened, setItemsOpened] = useState(false);
  const [transactionType, setTransactionType] = useState('');


  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  function handleRegister(){

    console.log('name', name);
    console.log('amount', amount);
    console.log('selectedValue', selectedValue);
    console.log('transactionType', transactionType);

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
            <TransactionTypeButton isActive={transactionType === 'Income'} onPress={() => setTransactionType('Income')} title="Income"/>
            <TransactionTypeButton isActive={transactionType === 'Outcome'} onPress={() => setTransactionType('Outcome')} title="Outcome"/>
          </ButtonsWrapper> 

          <CategoryPickerWrapper>
            <Picker
              onOpen={() => setItemsOpened(true)}
              onClose={() => setItemsOpened(false)}
              placeholder={{label: 'Categoria', value: 'Categoria'}}
              style={{}}
              items={[
                {label: 'Casa', value: 'Casa', key: "home" },
                {label: "Carro", value: 'Carro', key: "car"},
                {label: 'Vendas', value: 'Vendas', key: "sells"},
                {label: 'Alimentação', value: 'Alimentacao', key: 'food'}
              ]} 

              onValueChange={setSelectedValue}
            >
              <PickerContent>
                <Text style={{color: theme.colors.text}} >{selectedValue}</Text>
                <Icon name={!itemsOpened ? 'keyboard-arrow-down' :  'keyboard-arrow-up'}/>
              </PickerContent>
            </Picker>
            
          </CategoryPickerWrapper>

          <SubmitButton onPress={handleRegister}>
              <SubmitButtonText>Enviar</SubmitButtonText>
          </SubmitButton>

        </FormContainer>

        

    </Container>
  )
}

export default Register;