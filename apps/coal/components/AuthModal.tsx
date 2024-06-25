// app/components/AuthModal.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import SignInComponent from './SignInComponent';

interface AuthModalProps {
  isVisible: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isVisible, onClose, mode }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <SignInComponent mode={mode} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
});

export default AuthModal;
