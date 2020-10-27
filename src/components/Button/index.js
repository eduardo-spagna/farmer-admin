import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ButtonContainer, TitleButton } from './styles';

const Button = ({ backgroundColor, text, onPress, textColor, loading }) => {
  return (
    <ButtonContainer
      disabled={loading}
      onPress={onPress}
      style={{ backgroundColor: backgroundColor }}
    >
      <TitleButton style={{ color: textColor }}>{text}</TitleButton>
      {loading && (
        <ActivityIndicator
          size="small"
          color="#fff"
          style={{ marginLeft: 10 }}
        />
      )}
    </ButtonContainer>
  );
};

export default Button;
