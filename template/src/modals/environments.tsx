/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useContext} from 'react';
import {View} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {CustomModal} from '../components/CustomModal';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {EnvironmentContext, IEnvironment} from '../context/environment';
import {List, Text} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {AuthContext} from '../context/auth';

type Props = {};

export const EnvironmentsModal: React.FC<Props> = ({}) => {
  const {setOpenModal} = useContext(ModalsContext);
  const {setAuth} = useContext(AuthContext);
  const {environments, changeEnvironment} = useContext(EnvironmentContext);
  const {colors} = useTheme();

  // render
  const renderItem = useCallback(
    ({item}: {item: IEnvironment}): React.JSX.Element => (
      <View style={{width: '100%'}}>
        <List.Item
          onPress={() => {
            setAuth({
              isSignedIn: false,
              user: null,
              params: {},
            });
            changeEnvironment(item);
            setOpenModal(AppModals.Environments, false);
          }}
          title={
            <Text variant="titleLarge" style={{color: colors.text}}>
              {item.label}
            </Text>
          }
        />
      </View>
    ),
    [colors.text, changeEnvironment, setOpenModal, setAuth],
  );

  return (
    <CustomModal name={AppModals.Environments} height="30%">
      <View style={{height: 20}} />
      <BottomSheetFlatList
        data={environments}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{
          flex: 1,
        }}
      />
      <View style={{height: 35}} />
    </CustomModal>
  );
};
