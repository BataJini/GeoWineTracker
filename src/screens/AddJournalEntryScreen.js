import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from '../context/TranslationContext';
import { wines } from '../data/wineData';

const AddJournalEntryScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { wineId } = route.params;
  const wine = wines.find(w => w.id === wineId);

  // State for form fields
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');
  const [occasion, setOccasion] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(getCurrentDate());

  // Make sure we have a valid wine
  useEffect(() => {
    if (!wine) {
      navigation.goBack();
    } else {
      // Set screen title
      navigation.setOptions({
        title: wine.name,
        headerStyle: {
          backgroundColor: '#722F37',
        },
        headerTintColor: '#fff',
      });
    }
  }, [wine, navigation]);

  // Get current date in YYYY-MM-DD format
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const saveEntry = () => {
    // In a real app, this would save to storage or a database
    // For our demo, we'll just navigate back to the previous screen
    console.log('Saving entry:', {
      wineId,
      rating,
      notes,
      occasion,
      location,
      date,
    });
    
    navigation.goBack();
  };

  if (!wine) return null;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.wineInfo}>
            <Text style={styles.wineName}>{wine.name}</Text>
            <Text style={styles.wineDetails}>
              {wine.winery} • {wine.region} • {wine.type}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('date')}</Text>
            <TextInput
              style={styles.dateInput}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('rating')}</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleRatingChange(star)}
                >
                  <Text style={styles.ratingStar}>
                    {star <= rating ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('occasion')}</Text>
            <TextInput
              style={styles.textInput}
              value={occasion}
              onChangeText={setOccasion}
              placeholder={t('occasion')}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('location')}</Text>
            <TextInput
              style={styles.textInput}
              value={location}
              onChangeText={setLocation}
              placeholder={t('location')}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('notes')}</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder={t('notes')}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveEntry}
            >
              <Text style={styles.saveButtonText}>{t('save')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  wineInfo: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  wineName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 8,
  },
  wineDetails: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 32,
    color: '#FFD700',
    marginRight: 8,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#722F37',
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddJournalEntryScreen; 