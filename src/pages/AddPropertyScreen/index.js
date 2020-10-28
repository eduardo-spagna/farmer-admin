import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Subheading } from 'react-native-paper';

import { TextInput } from 'react-native-paper';

import { ContainerCentered } from '../../styles/components';
import Button from '../../components/Button';
import { showMessage } from 'react-native-flash-message';
import { createProperty, editProperty } from '../../services/property';
import { useNavigation } from '@react-navigation/native';

const AddPropertyScreen = ({ route }) => {
  const [name, setName] = useState();
  const [acre, setAcre] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const { goBack } = useNavigation();

  useEffect(() => {
    if (route && route.params) {
      const { data } = route.params.selectedItem;
      setAcre(data.acre.toString());
      setName(data.name);
      setImage(data.image);
    }
  }, [route]);

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      showMessage({
        type: 'danger',
        message: 'Precisamos da permissão da camera',
      });
    }
  };

  const pickImage = async () => {
    try {
      await getPermissionAsync();

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.cancelled) {
        throw Error('Cancel');
      }

      setImage(result.uri);
    } catch (E) {
      showMessage({
        type: 'danger',
        message: 'Não foi possível carregar a imagem',
      });
    }
  };

  const onCreateProperty = async () => {
    if (!name || !acre) {
      showMessage({
        type: 'danger',
        message: 'Nome e tamanho são obrigatórios',
      });

      return;
    }

    setLoading(true);
    try {
      if (route.params) {
        await editProperty({
          name,
          acre,
          image,
          id: route.params.selectedItem.id,
        });

        showMessage({
          type: 'success',
          message: 'Propriedade editada com sucesso',
        });
      } else {
        await createProperty({ name, acre, image });

        showMessage({
          type: 'success',
          message: 'Propriedade salva com sucesso',
        });
      }

      goBack();
    } catch (error) {
      showMessage({
        type: 'danger',
        message: 'Não foi possível salvar a propriedade',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerCentered>
      <TextInput
        mode="outlined"
        label="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        mode="outlined"
        keyboardType="number-pad"
        label="Tamanho (Hectares)"
        value={acre}
        onChangeText={(text) => setAcre(text)}
        style={{ marginVertical: 20 }}
      />

      <Subheading>Imagem da propriedade</Subheading>
      {!!image && (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            resizeMode="contain"
            source={{ uri: image }}
            style={{ width: '100%', height: 180 }}
          />
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          textColor="#004445"
          text={image ? 'Alterar imagem' : 'Adicionar imagem'}
          onPress={pickImage}
        />
        {!!image && (
          <Button
            textColor="#004445"
            text="Remover"
            onPress={() => setImage(undefined)}
          />
        )}
      </View>

      <Button
        textColor="white"
        backgroundColor="#004445"
        text="Salvar"
        onPress={onCreateProperty}
        loading={loading}
      />
    </ContainerCentered>
  );
};

export default AddPropertyScreen;
