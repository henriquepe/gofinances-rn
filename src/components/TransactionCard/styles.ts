import styled from 'styled-components/native';

import { css } from 'styled-components';

import { Text } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize'

import { Feather } from '@expo/vector-icons';

interface Props {
    type: "Carro" | "Casa" | "Alimentacao" | "Vendas";
}



export const Container = styled.View<Props>`

    background-color: ${({theme}) => theme.colors.shape};

    width: ${RFValue(310)}px;
    border-radius: 5px;

    padding: 18px 29px;


    margin: 16px 0;



`;

export const Header = styled.View`



`; 


export const Title = styled.Text<Props>`


    color: ${({theme}) => theme.colors.title};

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    
    


`;

export const Amount = styled(Text)<Props>`


    ${({type}) => type === 'Vendas' ? css`
        
        color: ${({theme}) => theme.colors.success};


    `
    : css`
        color: ${({theme}) => theme.colors.attention};
    
    `
    }

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;

    

    margin-top: 8px;
    margin-bottom: ${RFValue(32)}px;
    

`; 




export const Footer = styled.View`
    flex-direction: row;
    align-items: center;

`;


export const Icon = styled(Feather)<Props>`

    font-size: ${RFValue(20)}px;

    color: ${({ theme }) => theme.colors.text};
    
    

`; 


export const DetailsWrapper = styled.View`

    margin-left: ${RFValue(17)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;

`;



export const DetailsTitle = styled.Text`

    color: ${({ theme }) => theme.colors.text};

`;


export const DetailsDate = styled.Text`

    color: ${({ theme }) => theme.colors.text};

`;






