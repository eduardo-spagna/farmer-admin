import styled from 'styled-components/native';
import { FAB, Button as PaperButton } from 'react-native-paper';

export const Fab = styled(FAB)`
  position: absolute;
  margin: 16px;
  right: 0px;
  bottom: 0px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const ContainerCentered = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Button = styled(PaperButton)`
  padding: 8px 0;
  margin: 10px 0;
`;