// app/components/AuthButtons.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AuthModal from './AuthModal';

const AuthButtons = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login');
  
  const showModal = (mode: 'login' | 'signup') => {
    console.log('showModal', mode);
    setAuthMode(mode);
    setIsModalVisible(true);
  }

  const hideModal = () => {
    setIsModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => showModal('login')}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => showModal("signup")}>
        Sign Up
      </Button>
      <AuthModal isVisible={isModalVisible} onClose={hideModal} mode={authMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default AuthButtons;