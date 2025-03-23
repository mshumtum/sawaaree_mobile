import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  SplashScreen,
  HomeScreen,
  StartRideScreen,
  HistoryScreen,
  ProfileScreen,
  LoginScreen,
  SignupScreen,
  VerifyOtpScreen,
  ForgotPasswordScreen,
  SearchLocForBook,
} from '../screens';
import {navigationRef, RootStackParamList} from './NavigationService';
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{title: 'Home', headerShown: false}}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{title: 'History', headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Profile', headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtpScreen}
          options={{title: 'Verify OTP'}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{title: 'Forgot Password'}}
        />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StartRide"
          component={StartRideScreen}
          options={{title: 'Start Ride'}}
        />
        <Stack.Screen
          name="SearchLocForBook"
          component={SearchLocForBook}
          options={{title: 'Start Ride'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
