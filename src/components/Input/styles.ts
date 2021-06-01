import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TextInput`

    width: ${RFValue(310)}px;
    background-color: ${({theme}) => theme.colors.shape};
    height: ${RFValue(56)}px;
    padding: 16px;
    border-radius: 5px;

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 14px;

    margin-bottom: 8px;

`;

