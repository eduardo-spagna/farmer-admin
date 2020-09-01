import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { ContainerCentered } from '../../styles/components';

export const Container = styled(ContainerCentered)`
  flex: 1;
  justify-content: space-around;
`;

export const Title = styled(Text)`
  font-size: 50px;
  text-align: center;
  color: #004445;
  font-weight: bold;
`;

export const InputsContainer = styled(View)``;

export const TitleContainer = styled(View)``;

export const Error = styled(Text)`
  color: red;
  margin-bottom: 10px;
`;

export const Input = styled(TextInput)`
  margin-top: 10px;
`;
