import React, { useState } from 'react';
import { Text, Picker, View, TouchableOpacity } from 'react-native';

import { TextInput, RadioButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

import { ContainerCentered } from '../../styles/components';
import Button from '../../components/Button';
import { Row, Label } from './styles';

const AddBalanceScreen = () => {
  const [type, setType] = useState('r');
  const [value, setValue] = useState();
  const [isPaid, setIsPaid] = useState('false');
  const [date, setDate] = useState();

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
        onPress={() => console.log('Botao Salvar Saldos')}
      ></Button>
    </ContainerCentered>
  );
};

export default AddBalanceScreen;
