import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import HomepageLocButton from '../../../components/HomepageLocButton';
import IMAGES from '../../../assets/images';
import {navigate} from '../../../navigation/NavigationService';
import {FONTS} from '../../../assets/fonts';
import colors from '../../../assets/colors';
import LocationItem from './LocationItem';
import {useAppSelector} from '../../../store/hooks';
import {useAppDispatch} from '../../../store/hooks';

const NearbySheets = () => {
  const {myLocation} = useAppSelector(state => state.booking);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%', '90%'], []);
  const {nearbyLocations} = useAppSelector(state => state.booking);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      index={1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}>
      <BottomSheetScrollView style={styles.contentContainer}>
        <HomepageLocButton
          dynamicIcon={IMAGES.searchIcon}
          value="Enter destination address"
          onPress={() => {
            navigate('SearchLocForBook', {
              fromLocationData: myLocation,
            });
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.MEDIUM,
            color: colors.black,
            marginTop: 10,
          }}>
          Nearby location
        </Text>
        {nearbyLocations?.map((item, index) => (
          <LocationItem
            key={index}
            item={item}
            onPress={() => {
              navigate('SearchLocForBook', {
                fromLocationData: myLocation,
                toLocationData: item,
              });
            }}
          />
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default NearbySheets;
