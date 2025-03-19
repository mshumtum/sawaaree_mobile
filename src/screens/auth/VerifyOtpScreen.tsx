import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {verifyPhoneOtp} from '../../store/slices/authSlice';
import NavigationService from '../../navigation/NavigationService';

interface VerifyOtpScreenProps {
  route: {
    params: {
      phone: string;
    };
  };
}

const VerifyOtpScreen: React.FC<VerifyOtpScreenProps> = ({route}) => {
  const {phone} = route.params;
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(
    (state: {auth: {loading: boolean}}) => state.auth,
  );

  // Create refs for each OTP input
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // State for OTP digits
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      // If pasting multiple digits, split them
      const digits = value.split('').slice(0, 4);
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx + index < 4) {
          newOtp[idx + index] = digit;
        }
      });
      setOtp(newOtp);
      // Focus next available empty input or last input
      const nextIndex = Math.min(index + digits.length, 3);
      inputRefs[nextIndex]?.current?.focus();
    } else {
      // Single digit input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < 3) {
        // Move to next input
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      // Move to previous input on backspace
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    const result = await dispatch(
      verifyPhoneOtp({
        phone,
        otp: otpValue,
      }),
    );

    if (verifyPhoneOtp.fulfilled.match(result)) {
      NavigationService.reset('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Please enter the OTP sent to {phone}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.otpInput}
              value={digit}
              onChangeText={value => handleOtpChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={4}
              selectTextOnFocus
              editable={!loading}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleVerifyOtp}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
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
});

export default VerifyOtpScreen;
