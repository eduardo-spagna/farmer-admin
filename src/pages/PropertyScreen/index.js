import React from 'react';
import { FlatList } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { MOCK_PROPERTY } from '../../constants/mock';
import { Container, Fab } from '../../styles/components';

const PropertyScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const renderCard = ({ item }) => (
    <Card.Title
      title={item.name}
      left={(props) => <Avatar.Icon {...props} icon="home" />}
      right={(props) => <IconButton icon="dots-vertical" onPress={() => { }} />}
    />
  );

  return (
    <Container>
      <FlatList
        data={MOCK_PROPERTY}
        renderItem={renderCard}
        keyExtractor={({ id }) => id.toString()}
      />

      <Fab
        icon="plus"
        label="Add Propriedade"
        onPress={() => navigate('AddProperty')}
      />
    </Container>
  );
};

export default PropertyScreen;
