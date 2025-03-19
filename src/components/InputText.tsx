import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import {FONTS} from '../assets/fonts';

const InputText = ({...props}: TextInputProps) => {
  return (
    <View style={[styles.input, props.viewStyle]}>
      <TextInput style={[styles.inputText]} {...props} />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  inputText: {
    padding: 10,
    fontSize: 16,
    color: colors.textColor,
    fontFamily: FONTS.REGULAR,
  },
});

export default InputText;
