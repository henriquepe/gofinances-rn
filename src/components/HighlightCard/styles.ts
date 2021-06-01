import styled from 'styled-components/native';

import { css } from 'styled-components';

import { Text } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize'

import { Feather } from '@expo/vector-icons';

interface Props {
    type: "up" | "down" | "total";
}



export const Container = styled.View<Props>`

    background-color: ${({theme}) => theme.colors.shape};

    ${({type}) => type === 'total' && css`
    

        background-color: ${({theme}) => theme.colors.secondary};
    
    `}

    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;

    margin-right: 16px;

`;

export const Header = styled.View`

    flex-direction: row;
    justify-content: space-between;


`; 


export const Title = styled.Text<Props>`


    ${({type}) => type === 'total' ? css`
        
        color: ${({theme}) => theme.colors.shape};


    `
    : css`
        color: ${({theme}) => theme.colors.text_dark};
    
    `
    }

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;


`;



export const Icon = styled(Feather)<Props>`

    font-size: ${RFValue(40)}px;

    ${({type}) => type === 'up'
    ? css`
    
        color: ${({theme}) => theme.colors.success};
    
    `
    : type === 'down' ? css`
    
        color: ${({theme}) => theme.colors.attention};
    `
    : css`

        
        color: ${({theme}) => theme.colors.shape};
    `
    }

`; 


export const Footer = styled.View``;


export const Amount = styled(Text)<Props>`


    ${({type}) => type === 'total' ? css`
        
        color: ${({theme}) => theme.colors.shape};


    `
    : css`
        color: ${({theme}) => theme.colors.text_dark};
    
    `
    }

    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;

    

    margin-top: 38px;

`; 


export const LastTransaction = styled(Text)<Props>`

    ${({type}) => type === 'total' ? css`
        
        color: ${({theme}) => theme.colors.shape};


    `
    : css`
        color: ${({theme}) => theme.colors.text};
    
    `
    }

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;

    

`;