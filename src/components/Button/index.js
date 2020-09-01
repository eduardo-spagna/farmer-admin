import React from 'react';
import { ButtonContainer, TitleButton } from './styles';

const Button = ({ backgroundColor, text, onPress, textColor }) => {
  return (
    <ButtonContainer
      onPress={onPress}
      style={{ backgroundColor: backgroundColor }}
    >
      <TitleButton style={{ color: textColor }}>{text}</TitleButton>
    </ButtonContainer>
  );
};

export default Button;
