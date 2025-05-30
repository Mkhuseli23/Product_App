import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../firebaseConfig';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('You are registered ✅');
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Failed to register');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/depositphotos.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.formBox}>
          <FontAwesome name="user-plus" size={50} color="#007b8a" style={styles.registerIcon} />
          <Text style={styles.title}>Register</Text>

          {successMessage ? (
            <Text style={styles.successMessage}>{successMessage}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  formBox: {
    width: 320,
    padding: 20,
    backgroundColor: '#dff1ff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  registerIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#007b8a',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  registerButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#007b8a',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007b8a',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});
