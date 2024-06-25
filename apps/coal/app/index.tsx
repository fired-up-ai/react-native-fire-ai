// app/index.tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import WelcomeMessage from '../components/WelcomeMessage';
import AppCard from '../components/AppCard';
import AuthButtons from '../components/AuthButtons';

const apps = [
  {
    title: 'AI Assistant',
    description: 'Your personal AI-powered assistant for everyday tasks.',
    image: 'https://example.com/ai-assistant.jpg',
  },
  {
    title: 'Smart Analytics',
    description: 'Advanced analytics powered by machine learning algorithms.',
    image: 'https://example.com/smart-analytics.jpg',
  },
  // Add more apps as needed
];

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.surface}>
          <WelcomeMessage />
          {apps.map((app, index) => (
            <AppCard key={index} {...app} />
          ))}
        </Surface>
      </ScrollView>
      <View style={styles.authButtonsContainer}>
        <AuthButtons />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100, // Ensure there's space for the buttons
  },
  surface: {
    padding: 16,
    elevation: 4,
  },
  authButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
