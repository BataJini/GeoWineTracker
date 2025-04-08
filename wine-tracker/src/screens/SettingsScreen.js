import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from '../context/TranslationContext';

const SettingsScreen = ({ navigation }) => {
  const { currentLanguage, changeLanguage, t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('settings')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('language')}</Text>
          <Text style={styles.sectionSubtitle}>{t('chooseLanguage')}</Text>
          
          <TouchableOpacity 
            style={[
              styles.optionButton, 
              currentLanguage === 'en' ? styles.selectedOption : {}
            ]}
            onPress={() => changeLanguage('en')}
          >
            <Text 
              style={[
                styles.optionText, 
                currentLanguage === 'en' ? styles.selectedOptionText : {}
              ]}
            >
              🇬🇧 {t('english')}
            </Text>
            {currentLanguage === 'en' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.optionButton, 
              currentLanguage === 'ka' ? styles.selectedOption : {}
            ]}
            onPress={() => changeLanguage('ka')}
          >
            <Text 
              style={[
                styles.optionText, 
                currentLanguage === 'ka' ? styles.selectedOptionText : {}
              ]}
            >
              🇬🇪 {t('georgian')}
            </Text>
            {currentLanguage === 'ka' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.optionButton, 
              currentLanguage === 'ru' ? styles.selectedOption : {}
            ]}
            onPress={() => changeLanguage('ru')}
          >
            <Text 
              style={[
                styles.optionText, 
                currentLanguage === 'ru' ? styles.selectedOptionText : {}
              ]}
            >
              🇷🇺 {t('russian')}
            </Text>
            {currentLanguage === 'ru' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('aboutApp')}</Text>
          <Text style={styles.aboutText}>
            {t('appVersion')}
          </Text>
          <Text style={styles.aboutText}>
            {t('qvevriDescription')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#722F37',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f1f2',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#722F37',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: '#fff',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 10,
  },
});

export default SettingsScreen; 