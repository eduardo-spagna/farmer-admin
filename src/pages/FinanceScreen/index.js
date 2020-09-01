import React from 'react';
import { FlatList } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { BALANCE_TYPE } from '../../constants/finance';
import { MOCK_FINANCE } from '../../constants/mock';
import { Container, Fab } from '../../styles/components';

const FinanceScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const renderCard = ({ item }) => (
    <Card.Title
      title={item.value}
      left={(props) => (
        <Avatar.Text
          {...props}
          style={{
            backgroundColor:
              item.type === BALANCE_TYPE.spent ? '#cd0a0a' : '#004445',
          }}
          label={item.type === BALANCE_TYPE.spent ? 'D' : 'R'}
        />
      )}
      right={() => <IconButton icon="dots-vertical" onPress={() => { }} />}
    />
  );

  return (
    <Container>
      <FlatList
        data={MOCK_FINANCE}
        keyExtractor={({ id }) => id.toString()}
        renderItem={renderCard}
      />

      <Fab
        icon="plus"
        label="Add Lançamento"
        onPress={() => navigate('AddBalance')}
      />
    </Container>
  );
};

export default FinanceScreen;
