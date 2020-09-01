import React, { useState } from 'react';

import { TextInput } from 'react-native-paper';

import { ContainerCentered } from '../../styles/components';
import Button from '../../components/Button';

const AddPropertyScreen = () => {
  const [name, setName] = useState();
  const [acre, setAcre] = useState();

  return (
    <ContainerCentered>
      <TextInput
        mode="outlined"
        label="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        mode="outlined"
        keyboardType="number-pad"
        label="Tamanho (Hectares)"
        value={acre}
        onChangeText={(text) => setAcre(text)}
        style={{ marginVertical: 20 }}
      />

      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Salvar"
        onPress={() => console.log('Botao Salvar Propriedade')}
      ></Button>
    </ContainerCentered>
  );
};

export default AddPropertyScreen;
