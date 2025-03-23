import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import SearchInput from '../../components/SeachInput';
import IMAGES from '../../assets/images';
import HomepageLocButton from '../../components/HomepageLocButton';
import {navigate, openDrawer} from '../../navigation/NavigationService';
import HomeMapView from '../../components/HomeMapView';
import NearbySheets from './sheets/NearbySheets';
import {
  getAddressFromLatLng,
  getNearbyLocations,
} from '../../store/slices/bookingSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {myLocation} = useAppSelector(state => state.booking);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  useEffect(() => {
    dispatch(getNearbyLocations());
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
          onPress={() => {
            console.log('myLocation>>>', myLocation);

            navigate('SearchLocForBook', {
              fromLocationData: myLocation,
            });
          }}
        />
      </View>
      <View style={styles.mapContainer}>
        <HomeMapView />
      </View>
      <NearbySheets />
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
