import React from 'react';
import {Image} from 'react-native';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IMAGES from '../assets/images';
import {Text} from 'react-native';
import {FONTS} from '../assets/fonts';
import colors from '../assets/colors';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  onSubmit?: () => void;
  onFocus?: () => void;
  ref?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search location...',
  label,
  onSubmit,
  onFocus,
  ref,
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{fontSize: 13, fontFamily: FONTS.MEDIUM, color: colors.black}}>
        {label}
      </Text>
      <View style={styles.searchContainer}>
        <Image source={IMAGES.searchIcon} style={styles.searchIcon} />
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          placeholderTextColor="#666"
          onFocus={onFocus}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Image
              source={IMAGES.closeIcon}
              style={{width: 13, height: 13, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 4,
  },
  searchIcon: {
    marginRight: 4,
    width: 15,
    height: 15,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchInput;
