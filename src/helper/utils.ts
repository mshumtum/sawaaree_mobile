import GetLocation from "react-native-get-location";
import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const getCurrentLocation = async () => {
  if (await checkAndRequestLocationPermission()) {
    return GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });
  }
  throw new Error('Location permission denied');
};

const checkAndRequestLocationPermission = async () => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  });

  if (!permission) return false;

  try {
    const status = await check(permission);
    
    
    if (status === RESULTS.DENIED) {
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    }

    return status === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking location permission:', error);
    return false;
  }
};

export const locationPermission = () => {
  return checkAndRequestLocationPermission();
};

