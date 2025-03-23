import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {FONTS} from '../../../assets/fonts';
import colors from '../../../assets/colors';
import IMAGES from '../../../assets/images';
import {navigate} from '../../../navigation/NavigationService';

const LocationItem = ({item, onPress}: {item: any; onPress: () => void}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.extraLightGray,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
      }}>
      <Image source={IMAGES.gpsIcon} style={{width: 20, height: 20}} />
      <View style={{flex: 1, paddingRight: 10}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: FONTS.MEDIUM,
            color: colors.black,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: FONTS.REGULAR,
            color: colors.darkGray,
          }}>
          {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LocationItem;
