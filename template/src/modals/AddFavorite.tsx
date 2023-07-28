/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {CustomModal} from '../components/CustomModal';
import {ModalsContext} from '../context/modals';
import {AppModals} from '../constants/modals';
import {Button, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Title} from '../components/Title';
import {APIFavoritesContext} from '../context/api/favorites';

type Props = {};

export const AddFavoriteModal: React.FC<Props> = ({}) => {
  const [name, setName] = useState('');

  const {setOpenModal} = useContext(ModalsContext);
  const {addFavorite, loading} = useContext(APIFavoritesContext);
  const {t} = useTranslation();

  return (
    <CustomModal name={AppModals.AddFavorit} height="50%">
      <View style={{paddingHorizontal: 16, alignItems: 'center'}}>
        <Title title={t('general.add_favorite_title')} />

        <TextInput
          style={{width: '50%'}}
          maxLength={20}
          mode="outlined"
          autoFocus
          value={name}
          onChangeText={setName}
        />
        <View style={{height: 32}} />
        <Button
          loading={loading}
          onPress={async () => {
            await addFavorite(name);
            setName('');
            setOpenModal(AppModals.AddFavorit, false);
          }}
          mode="contained">
          {t('general.add_favorite')}
        </Button>
      </View>

      <View style={{height: 35}} />
    </CustomModal>
  );
};
