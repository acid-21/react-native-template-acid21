/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {CustomModal} from '../components/CustomModal';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {Text} from '@rneui/base';
import moment from 'moment';

type Props = {};

export const EnvironmentPinModal: React.FC<Props> = ({}) => {
  const {setOpenModal} = useContext(ModalsContext);

  return (
    <CustomModal name={AppModals.EnvironmentPin} height="25%">
      <View style={{height: 20}} />
      <View style={{alignItems: 'center'}}>
        <Text>Enter PIN</Text>
        <BottomSheetTextInput
          style={styles.input}
          onChange={c => {
            const text = c.nativeEvent.text;
            if (text === moment().format('mmHH')) {
              setOpenModal(AppModals.EnvironmentPin, false);
              setOpenModal(AppModals.Environments, true);
            }
          }}
        />
      </View>

      <View style={{height: 35}} />
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    width: 150,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});
