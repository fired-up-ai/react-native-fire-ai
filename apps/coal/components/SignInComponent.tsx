import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { UserCredential } from 'firebase/auth';
import AuthService from "web-firebase-core/src/services/AuthService";
import { setIdToken, setUser } from '@/store/features/auth/authSlice';

interface SignInComponentProps {
  mode: 'login' | 'signup';
}

const SignInComponent: React.FC<SignInComponentProps> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const authService = new AuthService();
  const dispatch = useDispatch();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        let userCredentials: UserCredential;
        if (mode === 'login') {
            userCredentials = await authService.signInWithEmail(email, password);
        } else {
            userCredentials = await authService.signUpWithEmail(email, password);
        }
        // Handle successful login/signup (e.g., navigate to home screen)
        if (!userCredentials) {
            throw new Error('User credentials not found');
        }
        const user = userCredentials.user;
        const idToken = await user.getIdToken();

        dispatch(setUser(user));
        dispatch(setIdToken(idToken));
      } catch (error) {
        console.error('Authentication error:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      let userCredentials = await authService.signInWithGoogle();
        if (!userCredentials) {
          throw new Error('User credentials not found');
        }
        const user = userCredentials.user;
        const idToken = await authService.getUserToken();
        dispatch(setUser(user));
        dispatch(setIdToken(idToken!));

    } catch (error) {
      console.error('Google sign-in error:', error);
      // Handle error
    }
  };

  const handleGithubSignIn = async () => {
    try {
        let userCredentials = await authService.signInWithGithub();
        if (!userCredentials) {
            throw new Error('User credentials not found');
        }
        const user = userCredentials.user;
        const idToken = await authService.getUserToken();
        dispatch(setUser(user));
        dispatch(setIdToken(idToken!));
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {mode === 'signup' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        </>
      )}

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Button>

      <View style={styles.socialButtonsContainer}>
        <GoogleLoginButton onClick={handleGoogleSignIn} />
        <GithubLoginButton onClick={handleGithubSignIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  socialButtonsContainer: {
    marginTop: 20,
  },
});

export default SignInComponent;
