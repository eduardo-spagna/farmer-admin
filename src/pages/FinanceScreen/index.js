import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Loading from 'react-native-loading-spinner-overlay';

import EmptyList from '../../components/EmptyList';
import Options from '../../components/Options';
import { BALANCE_TYPE } from '../../constants/finance';
import { deleteFinance, listFinances } from '../../services/finance';
import { Container, Fab } from '../../styles/components';

const FinanceScreen = ({ navigation }) => {
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const { navigate } = navigation;

  useEffect(() => {
    const unSubscribe = listFinances().onSnapshot((snap) => {
      let lis = [];

      snap.forEach((item) => lis.push({ id: item.id, data: item.data() }));

      setFinances(lis);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const onDelete = async () => {
    setVisibleOptions(false);
    setLoading(true);

    try {
      await deleteFinance(selectedItem.id);

      showMessage({
        type: 'success',
        message: 'Balanço deletado com sucesso',
      });
    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Não foi possível deletar o balanço',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCard = ({ item }) => (
    <Card.Title
      title={item.data.value}
      left={(props) => (
        <Avatar.Text
          {...props}
          style={{
            backgroundColor:
              item.data.type === BALANCE_TYPE.spent ? '#cd0a0a' : '#004445',
          }}
          label={item.data.type === BALANCE_TYPE.spent ? 'D' : 'R'}
        />
      )}
      right={() => (
        <IconButton
          icon="dots-vertical"
          onPress={() => {
            setVisibleOptions(true);
            setSelectedItem(item);
          }}
        />
      )}
    />
  );

  return (
    <>
      <Container>
        <FlatList
          data={finances}
          keyExtractor={({ id }) => id.toString()}
          renderItem={renderCard}
          ListEmptyComponent={() => <EmptyList />}
        />

        <Fab
          icon="plus"
          label="Add Lançamento"
          onPress={() => navigate('AddBalance')}
        />
      </Container>

      <Options
        visible={visibleOptions}
        setVisible={setVisibleOptions}
        onDelete={onDelete}
        onEdit={() => (
          setVisibleOptions(false), navigate('AddBalance', { selectedItem })
        )}
      />
      <Loading animation="fade" visible={loading} />
    </>
  );
};

export default FinanceScreen;
