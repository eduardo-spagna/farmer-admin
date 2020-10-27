import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const TitleButton = styled(Text)`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
`;

export const ButtonContainer = styled(TouchableOpacity)`
  align-items: center;
  border-radius: 6px;
  padding: 15px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
`;
