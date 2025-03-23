import {View, Image, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import IMAGES from '../../assets/images';
import colors from '../../assets/colors';
import StorageService from '../../services/StorageService';
import {navigate} from '../../navigation/NavigationService';
import {getCurrentLocation} from '../../helper/utils';
import {setMyLatLong, setMyLocation} from '../../store/slices/bookingSlice';
import {useAppDispatch} from '../../store/hooks';

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    StorageService.getItem('isLoggedIn').then(isLoggedIn => {
      console.log('IS>>>>>>.');

      if (!isLoggedIn) {
        getCurrentLocationFun();
        setTimeout(() => {
          console.log('getCurrentLocationFun>>>>>>CALLED');
          navigate('Home');
        }, 4000);
      } else {
        setTimeout(() => {
          navigate('Login');
        }, 3000);
      }
    });
  }, []);
  const getCurrentLocationFun = () => {
    getCurrentLocation()
      .then(location => {
        console.log('location>>', location);
        let tempLocation = {
          latitude: 30.707671813405632,
          longitude: 76.71784222126007,
        };
        dispatch(setMyLatLong(tempLocation));
      })
      .catch(error => {
        console.log('error>>>>>', error);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={IMAGES.splashScreen}
        style={{width: '100%', height: '100%'}}
      />
      <ActivityIndicator
        style={StyleSheet.absoluteFillObject}
        size="large"
        color={colors.white}
      />
    </View>
  );
};

export default SplashScreen;
