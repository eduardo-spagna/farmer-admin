import React from 'react';
import { Text } from 'react-native';

import { List } from 'react-native-paper';

const AboutScreen = () => {
  return (
    <List.Section>
      <List.Accordion
        title="Informações"
        left={(props) => <List.Icon {...props} icon="information" />}
      >
        <Text>
          O Aplicativo foi criado visando a otimização de tempo do produtor em
          suas propriedades. Levando automatização para o fluxo de caixa e o
          acompanhamento da produção em um único lugar
        </Text>
      </List.Accordion>
      <List.Accordion
        title="Versão"
        left={(props) => <List.Icon {...props} icon="settings" />}
      >
        <List.Item title="Versão 1.0.0" />
      </List.Accordion>
    </List.Section>
  );
};

export default AboutScreen;
