/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Title} from '../components/Title';
import {useTranslation} from 'react-i18next';
import {AuthContext} from '../context/auth';
import {Avatar, Button, Text} from 'react-native-paper';
import {AppRoutes} from '../constants/routes';

type Props = {
  navigation: StackNavigationProp<any, AppRoutes.Home>;
};

export const ProfielScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {auth, setAuth} = useContext(AuthContext);
  const {user} = auth || {user: null};
  const {email = ''} = user || {email: null};
  return (
    <View>
      <Title title={t('general.profile')} />
      <View style={{alignItems: 'center'}}>
        <View style={{height: 32}} />
        <Avatar.Icon size={84} icon="head" />
        <View style={{height: 8}} />
        <Text>{email}</Text>
        <View style={{height: 24}} />
        <Button
          mode="contained-tonal"
          onPress={() => {
            navigation.navigate(AppRoutes.Home);
            setAuth({
              user: null,
              isSignedIn: false,
              params: {},
            });
          }}>
          {t('general.sign_out')}
        </Button>
      </View>
    </View>
  );
};
