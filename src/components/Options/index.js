import React from 'react';
import { Dialog as DialogPaper, Menu, Portal } from 'react-native-paper';

const Options = ({ visible, setVisible, onDelete, onEdit }) => {
  return (
    <Portal>
      <DialogPaper visible={visible} onDismiss={() => setVisible(false)}>
        <DialogPaper.Content>
          <Menu.Item
            icon="circle-edit-outline"
            onPress={onEdit}
            title="Editar"
          />
          <Menu.Item icon="delete" onPress={onDelete} title="Remover" />
        </DialogPaper.Content>
      </DialogPaper>
    </Portal>
  );
};

export default Options;
