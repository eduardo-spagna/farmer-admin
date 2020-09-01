import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Button from '../../components/Button';
import {
  Container,
  Error,
  Input,
  InputsContainer,
  Title,
  TitleContainer,
} from './styles';

const LoginScreen = ({ navigation }) => {
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Campo obrigatório!')
      .email('Digite um email válido!'),
    password: Yup.string().required('Campo obrigatório!'),
  });

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={() => navigation.navigate('Home')}
    >
      {({ values, handleChange, handleSubmit, errors, isValid }) => (
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
          </InputsContainer>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
