import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Loading from 'react-native-loading-spinner-overlay';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';

import Options from '../../components/Options';
import { Container, Fab } from '../../styles/components';
import { deleteProduction, listProductions } from '../../services/production';
import EmptyList from '../../components/EmptyList';
import {
  removeSelectedProduction,
  selectProduction,
} from '../../store/reduces/production';

const ProductionScreen = ({ navigation }) => {
  const [productionList, setProductionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const { navigate } = navigation;
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = listProductions().onSnapshot((snap) => {
      let productions = [];

      snap.forEach((item) =>
        productions.push({ id: item.id, data: item.data() })
      );

      setProductionList(productions);
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
      await deleteProduction(selectedItem.id);

      showMessage({
        type: 'success',
        message: 'Produção deletada com sucesso',
      });
    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Não foi possível deletar a produção',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCard = ({ item }) => (
    <Card.Title
      title={item.data.description}
      left={(props) => <Avatar.Icon {...props} icon="barley" />}
      right={(props) => (
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
          data={productionList}
          renderItem={renderCard}
          keyExtractor={({ id }) => id.toString()}
          ListEmptyComponent={() => <EmptyList />}
        />

        <Fab
          icon="plus"
          label="Add Produção"
          onPress={() => (
            dispatch(removeSelectedProduction()), navigate('AddProduction')
          )}
        />
      </Container>
      <Options
        visible={visibleOptions}
        setVisible={setVisibleOptions}
        onDelete={onDelete}
        onEdit={() => (
          setVisibleOptions(false),
          navigate('AddProduction'),
          dispatch(selectProduction(selectedItem))
        )}
      />
      <Loading animation="fade" visible={loading} />
    </>
  );
};

export default ProductionScreen;
