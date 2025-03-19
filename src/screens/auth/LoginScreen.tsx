import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  loginUser,
  loginWithPhone,
  verifyPhoneOtp,
  clearError,
  loginWithEmail,
} from '../../store/slices/authSlice';
import NavigationService from '../../navigation/NavigationService';
import Container from '../../components/Container';
import InputText from '../../components/InputText';
import Button from '../../components/Button';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.auth);

  // State for login method toggle
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);

  // States for email login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for phone login
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    dispatch(loginWithEmail({email, password}));
  };

  const handlePhoneLogin = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (!otpSent) {
      const result = await dispatch(loginWithPhone({phone}));
      if (loginWithPhone.fulfilled.match(result)) {
        setOtpSent(true);
        Alert.alert('Success', 'OTP has been sent to your phone');
      }
    } else {
      if (!otp) {
        Alert.alert('Error', 'Please enter OTP');
        return;
      }
      dispatch(verifyPhoneOtp({phone, otp}));
    }
  };

  const renderEmailLogin = () => (
    <>
      <InputText
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <InputText
        viewStyle={{marginTop: 20}}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <Button
        style={{marginTop: 20}}
        title={loading ? 'Logging in...' : 'Login with Email'}
        onPress={handleEmailLogin}
        disabled={loading}
        loading={loading}
      />
    </>
  );

  const renderPhoneLogin = () => (
    <>
      <InputText
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        maxLength={10}
        editable={!loading && !otpSent}
      />
      {otpSent && (
        <InputText
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          editable={!loading}
        />
      )}

      <Button
        style={{marginTop: 20}}
        title={otpSent ? 'Verify OTP' : 'Send OTP'}
        onPress={handlePhoneLogin}
        disabled={loading}
        loading={loading}
      />
    </>
  );

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Login with Email or Phone</Text>

            <View style={styles.formContainer}>
              {isPhoneLogin ? renderPhoneLogin() : renderEmailLogin()}
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isPhoneLogin ? 'Use Email Instead' : 'Use Phone Instead'}
              </Text>
              <Switch
                value={isPhoneLogin}
                onValueChange={value => {
                  setIsPhoneLogin(value);
                  setOtpSent(false);
                  setOtp('');
                }}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isPhoneLogin ? '#007AFF' : '#f4f3f4'}
              />
            </View>

            <TouchableOpacity
              onPress={() => NavigationService.navigate('ForgotPassword')}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => NavigationService.navigate('Signup')}>
              <Text style={styles.linkText}>
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 400, // Ensure content stays centered
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  bottomContainer: {
    marginTop: 'auto', // Push to bottom
    paddingVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Center the toggle
    paddingVertical: 15,
    marginVertical: 15,
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  toggleText: {
    marginRight: 10,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 5,
  },
});

export default LoginScreen;
