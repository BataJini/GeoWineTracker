import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTranslation } from '../context/TranslationContext';
import { wines } from '../data/wineData';

const WineDetailScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { wineId } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [wine, setWine] = useState(null);

  // Find the wine based on ID
  useEffect(() => {
    const foundWine = wines.find(w => w.id === wineId);
    setWine(foundWine);
  }, [wineId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const addToJournal = () => {
    // Navigate to the AddJournalEntryScreen
    navigation.navigate('AddJournalEntry', { wineId: wine.id });
  };

  if (!wine) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>Wine not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{wine.name}</Text>
          <Text style={styles.subtitle}>{wine.winery}</Text>
        </View>

        <View style={styles.detailsRow}>
          <DetailBox title={t('type')} value={wine.type} />
          <DetailBox title={t('region')} value={wine.region} />
          <DetailBox title={t('grape')} value={wine.grape} />
        </View>

        <View style={styles.detailsRow}>
          <DetailBox title={t('vintage')} value={wine.vintage} />
          <DetailBox title={t('alcohol')} value={wine.alcohol} />
          <DetailBox title={t('method')} value={wine.fermentation} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('description')}</Text>
          <Text style={styles.description}>{wine.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('priceRange')}</Text>
          <Text style={styles.priceText}>{wine.price}</Text>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>{t('rating')}</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <Text 
                key={star} 
                style={[styles.star, star <= Math.round(wine.rating) ? styles.filledStar : {}]}
              >
                ★
              </Text>
            ))}
            <Text style={styles.ratingValue}>{wine.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, isFavorite ? styles.activeFavorite : {}]} 
            onPress={toggleFavorite}
          >
            <Text style={styles.buttonText}>
              {isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={addToJournal}
          >
            <Text style={styles.buttonText}>{t('addToJournal')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailBox = ({ title, value }) => (
  <View style={styles.detailBox}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailBox: {
    backgroundColor: '#f9f1f2',
    borderRadius: 10,
    padding: 15,
    width: '31%',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  priceText: {
    fontSize: 16,
    color: '#333',
  },
  ratingSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 24,
    color: '#ddd',
    marginRight: 3,
  },
  filledStar: {
    color: '#FFD700',
  },
  ratingValue: {
    marginLeft: 8,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#722F37',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  activeFavorite: {
    backgroundColor: '#8B4513',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default WineDetailScreen; 