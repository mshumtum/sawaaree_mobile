import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import IMAGES from '../assets/images';

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <ImageBackground source={IMAGES.containImage} style={styles.container}>
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
