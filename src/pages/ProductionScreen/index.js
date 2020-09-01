import React from 'react';
import { FlatList } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { MOCK_PRODUCTION } from '../../constants/mock';
import { Container, Fab } from '../../styles/components';

const ProductionScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const renderCard = ({ item }) => (
    <Card.Title
      title={item.description}
      left={(props) => <Avatar.Icon {...props} icon="barley" />}
      right={(props) => <IconButton icon="dots-vertical" onPress={() => { }} />}
    />
  );

  return (
    <Container>
      <FlatList
        data={MOCK_PRODUCTION}
        renderItem={renderCard}
        keyExtractor={({ id }) => id.toString()}
      />

      <Fab
        icon="plus"
        label="Add Produção"
        onPress={() => navigate('AddProduction')}
      />
    </Container>
  );
};

export default ProductionScreen;
