/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {Text, useTheme} from 'react-native-paper';
import {Button} from 'react-native-paper';

type Props = {
  name: string;
  title: string;
  message: string;
  yesButton: string;
  noButton: string;
  heigh?: string;
  onYes: () => void;
  onNo: () => void;
};

export const QuestionModal: React.FC<Props> = ({
  name = '',
  title = '',
  message = '',
  yesButton = '',
  noButton = '',
  heigh = '35%',
  onYes = () => {},
  onNo = () => {},
}) => {
  const theme = useTheme();

  return (
    <CustomModal name={name} height={heigh}>
      <View style={{height: 20}} />
      <View style={{alignItems: 'center'}}>
        <Text variant="headlineMedium" style={{color: theme.colors.onSurface}}>
          {title}
        </Text>
        <Text variant="bodyLarge" style={{color: theme.colors.onSurface}}>
          {message}
        </Text>
        <View style={{height: 20}} />

        <Button
          mode="contained"
          buttonColor={theme.colors.onSurfaceDisabled}
          onPress={onNo}>
          {noButton}
        </Button>
        <View style={{height: 15}} />
        <Button
          mode="contained"
          onPress={onYes}
          buttonColor={theme.colors.primary}>
          {yesButton}
        </Button>
        <View style={{height: 10}} />
      </View>

      <View style={{height: 35}} />
    </CustomModal>
  );
};
