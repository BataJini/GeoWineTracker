import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput
} from 'react-native';
import { useTranslation } from '../context/TranslationContext';
import { regions, grapeVarieties, wineTypes, fermentationMethods } from '../data/wineData';

const { width } = Dimensions.get('window');

const ExploreScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  
  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate('WineList', {
        searchQuery: searchText,
        title: `${t('searchResults')}: ${searchText}`
      });
    }
  };
  
  const handleRegionsExplore = () => {
    navigation.navigate('RegionsTab', { screen: 'RegionsMain' });
  };
  
  const handleGrapesExplore = (grape) => {
    navigation.navigate('WineList', {
      category: grape.name,
      type: 'grape',
      title: grape.name
    });
  };
  
  const handleTypeExplore = (type) => {
    navigation.navigate('WineList', {
      category: type.name,
      type: 'type',
      title: type.name
    });
  };
  
  const handleMethodExplore = (method) => {
    navigation.navigate('WineList', {
      category: method.name,
      type: 'method',
      title: method.name
    });
  };
  
  // Function to generate color for categories
  const getCategoryColor = (index) => {
    const colors = [
      '#8C3130', // Dark red
      '#D4A017', // Golden
      '#254117', // Forest green
      '#8D38C9', // Purple
      '#4863A0', // Steel blue
      '#C35817', // Rust
      '#6CC417', // Green
    ];
    
    return colors[index % colors.length];
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('explore')}</Text>
        <Text style={styles.subtitle}>{t('exploreGeorgianTerroir')}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchWines')}
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>{t('exploreBy')}</Text>
        
        {/* Explore by Region */}
        <TouchableOpacity 
          style={styles.categoryCard}
          onPress={handleRegionsExplore}
        >
          <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(0) }]}>
            <Text style={styles.categoryIconText}>🌍</Text>
          </View>
          
          <View style={styles.categoryContent}>
            <Text style={styles.categoryTitle}>{t('region')}</Text>
            <Text style={styles.categoryDescription}>
              {t('exploreRegionDesc')}
            </Text>
          </View>
        </TouchableOpacity>
        
        {/* Explore by Grape */}
        <Text style={styles.subSectionTitle}>{t('popularGrapes')}</Text>
        <View style={styles.itemsGrid}>
          {grapeVarieties.slice(0, 6).map((grape, index) => (
            <TouchableOpacity 
              key={grape.id}
              style={[styles.gridItem, { backgroundColor: `${getCategoryColor(index)}22` }]}
              onPress={() => handleGrapesExplore(grape)}
            >
              <Text style={styles.gridItemName}>{grape.name}</Text>
              <Text style={styles.gridItemDetail}>{grape.color}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Explore by Wine Type */}
        <Text style={styles.subSectionTitle}>{t('wineTypes')}</Text>
        <View style={styles.itemsGrid}>
          {wineTypes.map((type, index) => (
            <TouchableOpacity 
              key={type.id}
              style={[styles.gridItem, { backgroundColor: `${getCategoryColor(index + 2)}22` }]}
              onPress={() => handleTypeExplore(type)}
            >
              <Text style={styles.gridItemName}>{type.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Explore by Fermentation Method */}
        <Text style={styles.subSectionTitle}>{t('fermentationMethods')}</Text>
        <View style={styles.itemsList}>
          {fermentationMethods.map((method, index) => (
            <TouchableOpacity 
              key={method.id}
              style={[styles.listItem, { backgroundColor: `${getCategoryColor(index + 4)}11` }]}
              onPress={() => handleMethodExplore(method)}
            >
              <View style={styles.listItemContent}>
                <Text style={styles.listItemName}>{method.name}</Text>
                <Text style={styles.listItemDescription} numberOfLines={2}>
                  {method.description}
                </Text>
              </View>
              {method.UNESCO && (
                <View style={styles.unescoTag}>
                  <Text style={styles.unescoText}>UNESCO</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
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
  header: {
    padding: 16,
    backgroundColor: '#f9f1f2',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  gridItem: {
    width: (width - 48) / 2,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  gridItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
  },
  gridItemDetail: {
    fontSize: 12,
    color: '#666',
  },
  itemsList: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f1f2',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemContent: {
    flex: 1,
    paddingRight: 10,
  },
  listItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
  },
  listItemDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  unescoTag: {
    backgroundColor: '#722F37',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  unescoText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    paddingVertical: 8,
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#722F37',
    marginLeft: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ExploreScreen; 