import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppRoutes} from '../../constants/routes';
import {ModalsContext} from '../../context/modals';
import {LocaleContext} from '../../context/locales';
import {AppModals} from '../../constants/modals';
import {EnvironmentContext} from '../../context/environment';

type Props = {
  navigation: StackNavigationProp<any, AppRoutes.Settings>;
};

export const SettingsScreen: React.FC<Props> = ({}) => {
  const {t} = useTranslation();
  const {locale} = React.useContext(LocaleContext);
  const {setOpenModal} = React.useContext(ModalsContext);
  const {environment} = React.useContext(EnvironmentContext);

  return (
    <View style={styles.container}>
      <View>
        <Button
          onPress={() => {
            setOpenModal(AppModals.Locales, true);
          }}
          title={t('settings.change_language')}
          color="black"
        />
        <Text>{`${t('settings.current_language')}: ${locale}`}</Text>
      </View>
      <View>
        <Button
          onPress={() => {
            setOpenModal(AppModals.EnvironmentPin, true);
          }}
          title={t('settings.change_environment')}
          color="black"
        />
        <Text>{`${t('settings.current_environment')}: ${
          environment?.label
        }`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
