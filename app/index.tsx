import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    
    // Email validation
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }
    
    if (!valid) return;
    
    // Extract username from email (everything before @)
    const username = email.split('@')[0].trim();
    if (!username) {
      setEmailError('Invalid email format');
      return;
    }
    
    // Navigate to HomePage with username
    router.push({ 
      pathname: '/HomePage', 
      params: { username: username.charAt(0).toUpperCase() + username.slice(1) } 
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
        {!!emailError && <Text style={styles.error}>{emailError}</Text>}
        <Text style={styles.label}>Password</Text>
        <View style={[styles.passwordContainer, { backgroundColor: '#abe1e5' }]}>
          <TextInput
            mode="flat"
            style={[styles.passwordInput, { backgroundColor: 'transparent' }]}
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
        {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleLogin}
          buttonColor="#abe1e5"
          textColor="#20515a"
        >
          Log In
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => router.push('/SignUp')}
          buttonColor="#abe1e5"
          textColor="#20515a"
        >
          Sign Up
        </Button>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.orSignUpWith}>or sign up with</Text>
        <View style={styles.socialRow}>
          <IconButton icon="instagram" size={24} />
          <IconButton icon="google" size={24} />
          <IconButton icon="facebook" size={24} />
          <IconButton icon="whatsapp" size={24} />
        </View>
        <View style={styles.bottomRow}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
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
  forgot: {
    alignSelf: 'center',
    marginVertical: 8,
    fontWeight: 'bold',
    color: '#222',
  },
  orSignUpWith: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#888',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signUpLink: {
    color: '#20515a',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
}); 