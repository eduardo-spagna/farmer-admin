import React, { useEffect, useState } from 'react';
import { Text, Picker, View, TouchableOpacity } from 'react-native';

import { showMessage } from 'react-native-flash-message';
import { TextInput, RadioButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

import { ContainerCentered } from '../../styles/components';
import { createFinance, editFinance } from '../../services/finance';
import Button from '../../components/Button';
import { Row, Label } from './styles';

const AddBalanceScreen = ({ route }) => {
  const [type, setType] = useState('r');
  const [value, setValue] = useState();
  const [isPaid, setIsPaid] = useState('false');
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);

  const { goBack } = useNavigation();

  useEffect(() => {
    if (route && route.params) {
      const { data } = route.params.selectedItem;
      setType(data.type);
      setValue(data.value);
      setIsPaid(String(data.isPaid));
      setDate(data.date);
    }
  }, [route]);

  const onCreateBalance = async () => {
    if (!value) {
      showMessage({
        type: 'danger',
        message: 'Valor é obrigatório',
      });

      return;
    }

    setLoading(true);
    try {
      if (route.params.selectedItem) {
        await editFinance({
          type,
          value,
          isPaid,
          date,
          id: route.params.selectedItem.id,
        });

        showMessage({
          type: 'success',
          message: 'Lançamento editado com sucesso',
        });
      } else {
        await createFinance({ type, value, isPaid, date });

        showMessage({
          type: 'success',
          message: 'Lançamento salva com sucesso',
        });
      }

      goBack();
    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Não foi possível salvar o lançamento',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerCentered>
      <TextInput
        mode="outlined"
        label="Tipo"
        value={type}
        onChangeText={(text) => setType(text)}
        render={(props) => (
          <Picker
            {...props}
            selectedValue={type}
            onValueChange={(hand) => setType(hand)}
            mode="dialog"
          >
            <Picker.Item label="Receita" value="r" />
            <Picker.Item label="Despesa" value="d" />
          </Picker>
        )}
      />

      <TextInput
        mode="outlined"
        keyboardType="number-pad"
        label="Valor"
        value={value}
        onChangeText={(text) => setValue(text)}
        style={{ marginVertical: 20 }}
        render={(props) => <TextInputMask {...props} type={'money'} />}
      />

      <View style={{ marginBottom: 10 }}>
        <RadioButton.Group
          onValueChange={(value) => setIsPaid(value)}
          value={isPaid}
        >
          <Label>Pago?</Label>
          <Row>
            <Row>
              <RadioButton value="true" />
              <Text>Sim</Text>
            </Row>
            <Row>
              <RadioButton value="false" />
              <Text>Não</Text>
            </Row>
          </Row>
        </RadioButton.Group>

        {isPaid == 'true' && (
          <TouchableOpacity onPress={() => setShow(true)}>
            <TextInput
              mode="outlined"
              value={date}
              label="Data de Pagamento"
              style={{ marginVertical: 10 }}
              onChangeText={(text) => setDate(text)}
              render={(props) => (
                <TextInputMask
                  {...props}
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                />
              )}
            />
          </TouchableOpacity>
        )}
      </View>

      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Salvar"
        onPress={onCreateBalance}
        loading={loading}
      ></Button>
    </ContainerCentered>
  );
};

export default AddBalanceScreen;
