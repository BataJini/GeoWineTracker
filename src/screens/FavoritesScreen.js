import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import { useTranslation } from '../context/TranslationContext';
import { wines } from '../data/wineData';

// Placeholder favorite wines (in a real app, this would come from storage)
const initialFavorites = ['1', '7', '12', '15'];

const FavoritesScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState(initialFavorites);

  // Filter wines to get only favorites
  const favoriteWines = wines.filter(wine => favorites.includes(wine.id));

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(favId => favId !== id));
  };

  const renderWineItem = ({ item }) => (
    <TouchableOpacity
      style={styles.wineCard}
      onPress={() => navigation.navigate('WineDetail', { wineId: item.id })}
    >
      <View style={styles.wineCardContent}>
        <View style={styles.wineInfo}>
          <Text style={styles.wineName}>{item.name}</Text>
          <Text style={styles.wineSubtitle}>{item.winery}</Text>
          <Text style={styles.wineDetails}>
            {item.region} • {item.type} • {item.grape}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('favorites')}</Text>
      </View>
      
      {favoriteWines.length > 0 ? (
        <FlatList
          data={favoriteWines}
          keyExtractor={(item) => item.id}
          renderItem={renderWineItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>{t('noWinesFound')}</Text>
          <Text style={styles.emptyStateSubtitle}>
            {t('addToFavorites')} 
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('ExploreTab')}
          >
            <Text style={styles.exploreButtonText}>{t('explore')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#722F37',
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  wineCard: {
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    marginBottom: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  wineCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wineInfo: {
    flex: 1,
  },
  wineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 4,
  },
  wineSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  wineDetails: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  ratingContainer: {
    backgroundColor: '#722F37',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ratingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    fontSize: 20,
    color: '#777',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#722F37',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen; 