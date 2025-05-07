import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, IconButton, TextInput } from 'react-native-paper';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
    confirmPassword: '',
    agree: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUp = () => {
    let valid = true;
    const newErrors: any = {
      fullName: '',
      email: '',
      mobile: '',
      dob: '',
      password: '',
      confirmPassword: '',
      agree: '',
    };
    if (!fullName) {
      newErrors.fullName = 'Full name is required';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
      valid = false;
    }
    if (!dob) {
      newErrors.dob = 'Date of birth is required';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    if (!agree) {
      newErrors.agree = 'You must agree to the Terms of Use and Privacy Policy';
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return;
    // TODO: Implement sign up logic
    router.push({ pathname: '/HomePage', params: { username: fullName } });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formatted = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      setDob(formatted);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          mode="flat"
          style={[styles.input, { backgroundColor: '#abe1e5' }]}
          placeholder="Ucup"
          value={fullName}
          onChangeText={setFullName}
        />
        {!!errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
        <Text style={styles.label}>Email</Text>
        <TextInput
          mode="flat"
          style={[styles.input, { backgroundColor: '#abe1e5' }]}
          placeholder="example@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          mode="flat"
          style={[styles.input, { backgroundColor: '#abe1e5' }]}
          placeholder="+ 123 456 789"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />
        {!!errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
        <Text style={styles.label}>Date Of Birth</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View pointerEvents="none">
            <TextInput
              mode="flat"
              style={[styles.input, { backgroundColor: '#abe1e5' }]}
              placeholder="DD / MM / YYYY"
              value={dob}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob ? new Date(dob.split('/').reverse().join('-')) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
        {!!errors.dob && <Text style={styles.error}>{errors.dob}</Text>}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            mode="flat"
            style={[styles.passwordInput, { backgroundColor: '#abe1e5' }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <IconButton
            icon={showPassword ? 'eye-off' : 'eye'}
            size={20}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          />
        </View>
        {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            mode="flat"
            style={[styles.passwordInput, { backgroundColor: '#abe1e5' }]}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <IconButton
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            size={20}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          />
        </View>
        {!!errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
        <View style={styles.checkboxRow}>
          <View style={{ transform: [{ scale: 0.5 }], borderWidth: 0.5, borderColor: '#000', borderRadius: 4, marginRight: 8 }}>
            <Checkbox
              status={agree ? 'checked' : 'unchecked'}
              onPress={() => setAgree(!agree)}
              color="#20515a"
              uncheckedColor="#000"
            />
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.link}>Terms of Use</Text> and <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
        {!!errors.agree && <Text style={styles.error}>{errors.agree}</Text>}
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSignUp}
          buttonColor="#abe1e5"
          textColor="#20515a"
        >
          Sign Up
        </Button>
        <View style={styles.bottomRow}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#20515a',
    alignSelf: 'center',
    marginBottom: 32,
  },
  label: {
    marginLeft: 8,
    marginBottom: 4,
    color: '#222',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#abe1e5',
    borderRadius: 20,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  error: {
    color: 'red',
    marginLeft: 8,
    marginBottom: 8,
    fontSize: 13,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#abe1e5',
    borderRadius: 20,
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
  },
  eyeIcon: {
    marginRight: 4,
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: 20,
    marginVertical: 8,
    paddingVertical: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  termsText: {
    flex: 1,
    color: '#222',
    fontSize: 13,
  },
  link: {
    color: '#20515a',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginLink: {
    color: '#20515a',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
}); 