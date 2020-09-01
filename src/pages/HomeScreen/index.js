import React from 'react';
import Button from '../../components/Button';
import { Container } from './styles';

const HomeScreen = ({ navigation }) => {
  const { navigate } = navigation;

  return (
    <Container>
      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Gerenciar Propriedades"
        onPress={() => navigate('Property')}
      ></Button>
      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Gerenciar Produções"
        onPress={() => navigate('Production')}
      ></Button>
      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Gerenciar Financeiro"
        onPress={() => navigate('Finance')}
      ></Button>
    </Container>
  );
};

export default HomeScreen;
