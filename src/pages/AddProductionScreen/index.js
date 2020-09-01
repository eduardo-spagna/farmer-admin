import React, { useState } from 'react';

import { TextInput } from 'react-native-paper';

import { ContainerCentered } from '../../styles/components';
import Button from '../../components/Button';

const AddProductionScreen = () => {
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();

  return (
    <ContainerCentered>
      <TextInput
        mode="outlined"
        label="Descrição"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        mode="outlined"
        keyboardType="number-pad"
        label="Quantidade"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        style={{ marginVertical: 20 }}
      />

      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Salvar"
        onPress={() => console.log('Botao Salvar Produção')}
      ></Button>
    </ContainerCentered>
  );
};

export default AddProductionScreen;
