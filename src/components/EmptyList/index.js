import React from 'react';
import { View } from 'react-native';
import { Subheading } from 'react-native-paper';

const EmptyList = () => {
  return (
    <View style={{ alignItems: 'center', paddingTop: 20 }}>
      <Subheading>Nenhum item encontrado</Subheading>
    </View>
  );
};

export default EmptyList;
