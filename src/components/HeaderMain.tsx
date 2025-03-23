import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {navigationRef} from '../navigation/NavigationService';
import colors from '../assets/colors';
import {FONTS} from '../assets/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IMAGES from '../assets/images';

const HeaderMain = ({title}: {title: string}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigationRef.goBack()}>
        <Image source={IMAGES.backImage} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.backText}>{title}</Text>
      <View style={styles.backIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },

  backText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: colors.black,
  },
});

export default HeaderMain;
