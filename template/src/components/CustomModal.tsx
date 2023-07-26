import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useContext,
} from 'react';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Keyboard} from 'react-native';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {ModalsContext} from '../context/modals';
import {useTheme} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {ThemeContext} from '../context/theme';
import {ThemeProvider as ElementsProvider} from '@rneui/themed';

type Props = {
  children: React.ReactNode;
  name: string;
  height: string;
  modalProps?: any;
  snapOnKeybaoard?: boolean;
};

export const CustomModal: React.FC<Props> = ({
  children,
  name,
  height,
  modalProps,
  snapOnKeybaoard = false,
}) => {
  const {PaperTheme, ElementsTheme} = useContext(ThemeContext);
  const {colors} = useTheme();
  const {isOpenModal, setOpenModal} = useContext(ModalsContext);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      if (snapOnKeybaoard) {
        bottomSheetModalRef.current?.snapToIndex(1);
      }
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      bottomSheetModalRef.current?.snapToIndex(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [snapOnKeybaoard]);

  const open = useMemo(() => isOpenModal(name), [isOpenModal, name]);

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [open]);

  const snapPoints = useMemo(() => [height, '100%'], [height]);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={index => {
        if (index === -1) {
          setOpenModal(name, false);
        }
      }}
      backdropComponent={renderBackdrop}
      backgroundStyle={{backgroundColor: colors.background}}
      handleIndicatorStyle={{backgroundColor: colors.border}}
      {...modalProps}>
      <ElementsProvider theme={ElementsTheme}>
        <PaperProvider theme={PaperTheme}>{children}</PaperProvider>
      </ElementsProvider>
    </BottomSheetModal>
  );
};
