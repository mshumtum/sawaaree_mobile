import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
  DrawerActions,
} from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  VerifyOtp: { phone: string };
  ForgotPassword: undefined;
  ResetPassword: {email: string};
  Home: undefined;
  StartRide: undefined;
  History: undefined;
  Profile: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (
  name: keyof RootStackParamList,
  params?: RootStackParamList[typeof name]
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const reset = (routeName: keyof RootStackParamList) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
  }
};

export const openDrawer = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.openDrawer());
  }
};

export const closeDrawer = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.closeDrawer());
  }
};

export const replace = (routeName: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
};

export const push = (routeName: keyof RootStackParamList, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
};

export const pop = (count: number = 1) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
};

export const popToTop = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
};

const NavigationService = {
  navigate,
  goBack,
  reset,
  replace,
  push,
  pop,
  popToTop,
  navigationRef,
};

export default NavigationService; 