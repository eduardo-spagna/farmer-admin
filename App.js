import React from 'react';

import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';

import Router from './src/routes';
import { theme } from './src/styles/theme';
import './src/config/firebase';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Router />
        <FlashMessage position="top" />
      </PaperProvider>
    </Provider>
  );
}
