import React, { useEffect, useState } from 'react';

import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';

import Button from '../../components/Button';
import { ContainerCentered } from '../../styles/components';
import { createProduction, editProduction } from '../../services/production';

const AddProductionScreen = () => {
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const { selectedItem } = useSelector((state) => state.production);

  const { goBack } = useNavigation();

  useEffect(() => {
    if (selectedItem) {
      const { data } = selectedItem;
      setDescription(data.description);
      setAmount(data.amount.toString());
    }
  }, [selectedItem]);

  const onCreateProperty = async () => {
    if (!amount || !description) {
      showMessage({
        type: 'danger',
        message: 'Descrição e quantidade são obrigatórios',
      });

      return;
    }

    setLoading(true);
    try {
      if (selectedItem) {
        await editProduction({
          amount,
          description,
          id: selectedItem.id,
        });

        showMessage({
          type: 'success',
          message: 'Produção editada com sucesso',
        });
      } else {
        await createProduction({ amount, description });

        showMessage({
          type: 'success',
          message: 'Produção salva com sucesso',
        });
      }

      goBack();
    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Não foi possível salvar a produção',
      });
    } finally {
      setLoading(false);
    }
  };

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
        onPress={onCreateProperty}
        loading={loading}
      />
    </ContainerCentered>
  );
};

export default AddProductionScreen;
