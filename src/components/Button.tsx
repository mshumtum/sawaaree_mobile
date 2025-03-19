import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import {FONTS} from '../assets/fonts';

const Button = ({
  title,
  onPress,
  disabled,
  loading,
  style,
  textStyle,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={loading}>
      <Text style={styles.buttonText}>{loading ? 'Processing...' : title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default Button;
