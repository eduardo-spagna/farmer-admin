import { Formik } from 'formik';
import React from 'react';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';

import Button from '../../components/Button';
import { login } from '../../services/user';
import {
  Container,
  Error,
  Input,
  InputsContainer,
  Title,
  TitleContainer,
} from './styles';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Campo obrigatório!')
    .email('Digite um email válido!'),
  password: Yup.string().required('Campo obrigatório!'),
});

const LoginScreen = ({ navigation }) => {
  const onLogin = async ({ email, password }) => {
    try {
      await login(email, password);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        showMessage({
          message: 'Erro ao realizar o login',
          description: 'Senha inválida',
          type: 'danger',
        });
      } else if (error.code === 'auth/user-not-found') {
        showMessage({
          message: 'Erro ao realizar o login',
          description: 'Usuário não encontrado',
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Erro ao realizar o login',
          description: error.message,
          type: 'danger',
        });
      }
    }
  };

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={onLogin}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <Container>
          <TitleContainer>
            <Title>Farmer Admin</Title>
          </TitleContainer>
          <InputsContainer>
            <Input
              keyboardType="email-address"
              mode="outlined"
              label="E-mail"
              placeholderTextColor="#004445"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {errors.email && <Error>{errors.email}</Error>}
            <Input
              mode="outlined"
              secureTextEntry
              label="Senha"
              placeholderTextColor="#004445"
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {errors.password && <Error>{errors.password}</Error>}
            <Button
              textColor="white"
              backgroundColor="#004445"
              text="Entrar"
              onPress={() => {
                handleSubmit();
              }}
            />

            <Button
              textColor="white"
              backgroundColor="#004445"
              text="Cadastre-se"
              onPress={() => {
                navigation.navigate('Register');
              }}
            />
          </InputsContainer>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
