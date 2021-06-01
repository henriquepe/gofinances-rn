import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Controller } from 'react-hook-form';

import { Container } from './styles';

interface InputProps extends TextInputProps {
    placeholder: string;
    
};

const Input: React.FC<InputProps> = ({ placeholder, onChangeText, keyboardType, autoCapitalize }) => {
  return (
    
        <Container onChangeText={onChangeText} keyboardType={keyboardType} autoCapitalize={autoCapitalize} placeholder={placeholder}/>

     
  )
}

export default Input;