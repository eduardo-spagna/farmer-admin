import React from 'react';
import Button from '../../components/Button';
import { logout } from '../../services/user';
import { Container } from './styles';

const HomeScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const onLogout = async () => {
    logout();
  };

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
      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Sobre"
        onPress={() => navigate('about')}
      />
      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Sair"
        onPress={onLogout}
      />
    </Container>
  );
};

export default HomeScreen;
