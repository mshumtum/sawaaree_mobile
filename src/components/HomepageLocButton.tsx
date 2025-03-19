import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import colors from '../assets/colors';

interface HomepageLocButtonProps {
  value: string;
  onPress?: () => void;
  isLiveLocation?: boolean;
  dynamicIcon?: any;
}

const HomepageLocButton: React.FC<HomepageLocButtonProps> = ({
  value,
  onPress,
  isLiveLocation,
  dynamicIcon,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isLiveLocation
            ? colors.white
            : colors.extraLightGray,
        },
      ]}>
      {isLiveLocation && <View style={styles.liveLocation} />}
      {dynamicIcon && <Image source={dynamicIcon} style={styles.icon} />}
      <Text style={styles.input}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 12,
    // elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingVertical: 12,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchIcon: {
    marginRight: 8,
  },
  liveLocation: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textColor,
    marginLeft: 10,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.textColor,
  },
  clearButton: {
    padding: 4,
  },
});

export default HomepageLocButton;
