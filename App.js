import React from 'react';

import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';

import Router from './src/routes';
import { theme } from './src/styles/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Router />
    </PaperProvider>
  );
}
