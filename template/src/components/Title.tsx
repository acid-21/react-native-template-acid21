import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

type Props = {
  title: string;
};

export const Title: React.FC<Props> = ({title}) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Text variant="headlineMedium">{title}</Text>
    </View>
  );
};
