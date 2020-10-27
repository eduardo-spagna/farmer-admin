import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Loading from 'react-native-loading-spinner-overlay';
import { showMessage } from 'react-native-flash-message';

import EmptyList from '../../components/EmptyList';
import { deleteProperty, listProperties } from '../../services/property';
import { Container, Fab } from '../../styles/components';
import Options from '../../components/Options';

const PropertyScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const { navigate } = navigation;

  useEffect(() => {
    const unSubscribe = listProperties().onSnapshot((snap) => {
      let properties = [];

      snap.forEach((property) =>
        properties.push({ id: property.id, data: property.data() })
      );

      setProperties(properties);
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
      await deleteProperty(selectedItem.id);

      showMessage({
        type: 'success',
        message: 'Propriedade deletada com sucesso',
      });
    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Não foi possível deletar a propriedade',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCard = ({ item }) => (
    <Card.Title
      title={item.data.name}
      left={(props) => <Avatar.Icon {...props} icon="home" />}
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
          data={properties}
          renderItem={renderCard}
          keyExtractor={({ id }) => id.toString()}
          ListEmptyComponent={() => <EmptyList />}
        />

        <Fab
          icon="plus"
          label="Add Propriedade"
          onPress={() => navigate('AddProperty')}
        />
      </Container>

      <Options
        visible={visibleOptions}
        setVisible={setVisibleOptions}
        onDelete={onDelete}
        onEdit={() => (
          setVisibleOptions(false), navigate('AddProperty', { selectedItem })
        )}
      />
      <Loading animation="fade" visible={loading} />
    </>
  );
};

export default PropertyScreen;
