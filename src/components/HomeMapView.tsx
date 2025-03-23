import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const HomeMapView = () => {
  const {myLocation} = useSelector((state: RootState) => state.booking);
  return (
    <MapView
      provider={'google'}
      style={styles.map}
      showsUserLocation={true}
      initialRegion={{
        latitude: myLocation.latitude,
        longitude: myLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default HomeMapView;
