import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { useTranslation } from '../context/TranslationContext';
import { wines, regions } from '../data/wineData';

const WineListScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { category, type, regionData, searchQuery, title } = route.params || { category: t('allWines'), type: 'all' };
  const [searchText, setSearchText] = useState(searchQuery || '');
  
  // Set the navigation header title when viewing a region or search results
  useEffect(() => {
    if (title) {
      navigation.setOptions({ title });
    } else if (type === 'region' && regionData) {
      navigation.setOptions({
        title: `${regionData.name} ${t('wines')}`
      });
    }
  }, [navigation, regionData, type, t, title]);

  // Filter wines based on category type and search text
  const filteredWines = wines
    .filter(wine => {
      if (searchQuery) return true; // If coming from search, show all wines and filter by search text
      if (type === 'all') return true;
      switch(type) {
        case 'region':
          return wine.region === category;
        case 'grape':
          return wine.grape === category || wine.grape.includes(category);
        case 'type':
          return wine.type === category;
        case 'method':
          return wine.fermentation === category;
        default:
          return true;
      }
    })
    .filter(wine => {
      if (!searchText) return true;
      const searchLower = searchText.toLowerCase();
      return (
        wine.name.toLowerCase().includes(searchLower) ||
        wine.winery.toLowerCase().includes(searchLower) ||
        wine.grape.toLowerCase().includes(searchLower) ||
        wine.region.toLowerCase().includes(searchLower) ||
        wine.description.toLowerCase().includes(searchLower)
      );
    });

  // Generate region color
  const getRegionColor = (regionName) => {
    const colors = {
      'Kakheti': '#8C3130',      // Dark red
      'Kartli': '#D4A017',       // Golden
      'Imereti': '#254117',      // Forest green
      'Racha-Lechkhumi': '#8D38C9', // Purple
      'Adjara': '#4863A0',       // Steel blue
      'Guria': '#C35817',        // Rust
      'Samegrelo': '#6CC417',    // Green
    };
    
    return colors[regionName] || '#722F37'; // Default wine color
  };

  const renderWineItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.wineItem}
      onPress={() => navigation.navigate('WineDetail', { wineId: item.id })}
    >
      <View style={styles.wineInfo}>
        <Text style={styles.wineName}>{item.name}</Text>
        <Text style={styles.wineWinery}>{item.winery}</Text>
        <View style={styles.wineDetailsRow}>
          <Text style={styles.wineDetailBadge}>{item.type}</Text>
          <Text style={styles.wineDetailBadge}>{item.grape}</Text>
          <Text style={styles.vintageText}>{item.vintage}</Text>
        </View>
      </View>
      <View style={styles.wineRating}>
        <Text style={styles.ratingText}>★ {item.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render region info header if viewing a specific region
  const renderRegionHeader = () => {
    if (type !== 'region' || !regionData) return null;
    
    return (
      <View style={[styles.regionHeader, { borderColor: getRegionColor(regionData.name) }]}>
        <View style={styles.regionInfo}>
          <Text style={styles.regionName}>{regionData.name}</Text>
          {regionData.climate && (
            <View style={styles.regionDetail}>
              <Text style={styles.regionDetailLabel}>{t('climate')}:</Text>
              <Text style={styles.regionDetailText}>{regionData.climate}</Text>
            </View>
          )}
          {regionData.soil && (
            <View style={styles.regionDetail}>
              <Text style={styles.regionDetailLabel}>{t('soil')}:</Text>
              <Text style={styles.regionDetailText}>{regionData.soil}</Text>
            </View>
          )}
          {regionData.grapes && regionData.grapes.length > 0 && (
            <View style={styles.regionDetail}>
              <Text style={styles.regionDetailLabel}>{t('keyGrapes')}:</Text>
              <Text style={styles.regionDetailText}>
                {regionData.grapes.join(', ')}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity 
          style={[styles.mapButton, { backgroundColor: getRegionColor(regionData.name) }]}
          onPress={() => navigation.navigate('MapView', { 
            regionName: regionData.name,
            title: `${regionData.name} ${t('onMap')}`
          })}
        >
          <Text style={styles.mapButtonText}>{t('viewOnMap')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderRegionHeader()}
      
      <View style={styles.header}>
        <Text style={styles.title}>
          {searchQuery 
            ? t('searchResults') 
            : type === 'region' 
              ? t('winesFrom', { region: category }) 
              : category}
        </Text>
        <Text style={styles.count}>{t('winesCount', { count: filteredWines.length })}</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('searchPlaceholder')}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
      </View>
      
      <FlatList
        data={filteredWines}
        renderItem={renderWineItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{searchText ? t('noSearchResults') : t('noWinesFound')}</Text>
          </View>
        }
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  listContent: {
    padding: 15,
  },
  wineItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f1f2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wineInfo: {
    flex: 1,
  },
  wineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  wineWinery: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  wineDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  wineDetailBadge: {
    fontSize: 12,
    backgroundColor: 'rgba(114, 47, 55, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    color: '#722F37',
  },
  vintageText: {
    fontSize: 12,
    color: '#777',
  },
  wineRating: {
    backgroundColor: '#722F37',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  regionHeader: {
    margin: 15,
    marginTop: 10,
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  regionDetail: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  regionDetailLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginRight: 4,
  },
  regionDetailText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
  },
  mapButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  mapButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  }
});

export default WineListScreen; 