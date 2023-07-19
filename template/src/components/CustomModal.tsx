import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Keyboard} from 'react-native';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {ModalsContext} from '../context/modals';
import {useTheme} from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
  name: string;
  height: string;
  modalProps?: any;
};

export const CustomModal: React.FC<Props> = ({
  children,
  name,
  height,
  modalProps,
}) => {
  const {colors} = useTheme();
  const {isOpenModal, setOpenModal} = React.useContext(ModalsContext);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      bottomSheetModalRef.current?.snapToIndex(0);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

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
      {children}
    </BottomSheetModal>
  );
};
