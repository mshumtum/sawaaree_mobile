import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import SearchInput from '../components/SeachInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IMAGES from '../assets/images';
import HomepageLocButton from '../components/HomepageLocButton';
import {openDrawer} from '../navigation/NavigationService';

const HomeScreen = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            openDrawer();
          }}
          style={{
            marginRight: 10,
          }}>
          <Image source={IMAGES.drawerLogo} style={styles.drawerLogo} />
        </TouchableOpacity>
        <HomepageLocButton
          isLiveLocation={true}
          value="Your current location"
        />
      </View>
      <View style={styles.mapContainer}>
        <MapView
          provider={'google'}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView style={styles.contentContainer}>
          <HomepageLocButton
            dynamicIcon={IMAGES.searchIcon}
            value="Your current location"
          />
          <Text>Nearby location</Text>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  locationContainer: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: 1,
  },
  drawerLogo: {
    width: 37,
    height: 37,
  },
});

export default HomeScreen;
