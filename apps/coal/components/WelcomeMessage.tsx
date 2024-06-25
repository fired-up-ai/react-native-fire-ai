// app/components/WelcomeMessage.tsx
import React from 'react';
import { View } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

const WelcomeMessage = () => (
  <View>
    <Title>Welcome to Fired-Up AI</Title>
    <Paragraph>
      Discover our suite of innovative AI-powered applications designed to revolutionize your workflow and boost productivity.
    </Paragraph>
  </View>
);

export default WelcomeMessage;