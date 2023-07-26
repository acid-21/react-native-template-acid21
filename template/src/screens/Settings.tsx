/* eslint-disable react/no-unstable-nested-components */
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppRoutes} from '../constants/routes';
import {ModalsContext} from '../context/modals';
import {LocaleContext} from '../context/locales';
import {AppModals} from '../constants/modals';
import {EnvironmentContext} from '../context/environment';
import {List} from 'react-native-paper';
import {Icon} from '@rneui/themed';
import {Switch} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '../context/theme';
import {UpdateContext} from '../context/update';

type Props = {
  navigation: StackNavigationProp<any, AppRoutes.Settings>;
};

export const SettingsScreen: React.FC<Props> = ({}) => {
  const {t} = useTranslation();
  const {locale} = useContext(LocaleContext);
  const {setOpenModal} = useContext(ModalsContext);
  const {environment} = useContext(EnvironmentContext);
  const {colors} = useTheme();
  const {isDarkMode, setDarkMode} = useContext(ThemeContext);
  const {checkForUpdate, changeCheckForUpdate} = useContext(UpdateContext);

  return (
    <View style={styles.container}>
      <View>
        <List.Item
          onPress={() => {
            setOpenModal(AppModals.Locales, true);
          }}
          title={t('settings.language')}
          description={locale}
          left={() => (
            <Icon
              type="font-awesome"
              name="globe"
              size={30}
              color={colors.primary}
            />
          )}
        />
        <List.Item
          onPress={() => {
            setOpenModal(AppModals.EnvironmentPin, true);
          }}
          title={t('settings.environment')}
          description={environment?.label}
          left={() => (
            <Icon
              type="foundation"
              name="info"
              size={30}
              color={colors.primary}
            />
          )}
        />
        <List.Item
          title={t('settings.dark_mode')}
          right={() => (
            <Switch
              value={isDarkMode}
              onChange={() => {
                setDarkMode(!isDarkMode);
              }}
            />
          )}
          left={() => (
            <Icon
              type="material-icons"
              name="nightlight-round"
              size={30}
              color={colors.primary}
            />
          )}
        />
        <List.Item
          title={t('settings.check_update')}
          right={() => (
            <Switch
              value={checkForUpdate}
              onChange={() => {
                changeCheckForUpdate(!checkForUpdate);
              }}
            />
          )}
          left={() => (
            <Icon
              type="material-icons"
              name="security-update"
              size={30}
              color={colors.primary}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
