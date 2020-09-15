import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';

import Button from '../../components/Button';
import { Input, InputsContainer, Error } from '../LoginScreen/styles';
import { ContainerCentered } from '../../styles/components';
import { createUser, registerUser } from '../../services/user';

const loginSchema = Yup.object().shape({
  name: Yup
    .string()
    .required('Campo obrigatório!'),
  email: Yup
    .string()
    .email('Digite um email válido!')
    .required('Campo obrigatório!'),
  password: Yup
    .string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
    .required('Campo obrigatório!'),
  confirmPassword: Yup
    .string()
    .min(6, 'A confirmação da senha deve conter no mínimo 6 caracteres')
    .oneOf([Yup.ref('password'), null], 'As senhas não são iguais')
    .required('Campo obrigatório!'),
});

const RegisterScreen = () => {
  const onRegister = async (values) => {
    const { email, name, password } = values;

    try {
      const { user } = await registerUser(email, password);

      await createUser({ email, name }, user.uid);
      showMessage({
        message: 'Usuário criado com sucesso',
        type: 'success',
      });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage({
          message: 'Erro ao criar a conta',
          description: 'Já existe uma conta com esse email',
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Erro ao criar a conta',
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
        confirmPassword: '',
        name: '',
      }}
      onSubmit={onRegister}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <ContainerCentered>
          <InputsContainer>
            <Input
              mode="outlined"
              label="Nome"
              placeholderTextColor="#004445"
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {errors.name && <Error>{errors.name}</Error>}
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
            <Input
              mode="outlined"
              secureTextEntry
              label="Confirmar senha"
              placeholderTextColor="#004445"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
            />
            {errors.confirmPassword && <Error>{errors.password}</Error>}
            <Button
              textColor="white"
              backgroundColor="#004445"
              text="Cadastre-se"
              onPress={() => {
                handleSubmit();
              }}
            />
          </InputsContainer>
        </ContainerCentered>
      )}
    </Formik>
  );
};

export default RegisterScreen;
