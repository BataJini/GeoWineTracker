import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TranslationProvider } from './src/context/TranslationContext';
import AppNavigator from './src/navigation/AppNavigator';

// Wrap the main app with the translation provider
export default function App() {
  return (
    <TranslationProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </TranslationProvider>
  );
}
