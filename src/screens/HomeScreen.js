import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from '../context/TranslationContext';
import { wines, regions, grapeVarieties } from '../data/wineData';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  
  // Get top-rated wines for featured section
  const featuredWines = [...wines]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Get a sample of regions to showcase
  const featuredRegions = regions.slice(0, 4);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('appTitle')}</Text>
          <Text style={styles.subtitle}>{t('appSubtitle')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('featuredWines')}</Text>
          {featuredWines.map(wine => (
            <TouchableOpacity 
              key={wine.id}
              style={styles.wineCard}
              onPress={() => navigation.navigate('WineDetail', { wineId: wine.id })}
            >
              <View style={styles.wineCardHeader}>
                <View>
                  <Text style={styles.wineTitle}>{wine.name}</Text>
                  <Text style={styles.wineSubtitle}>{wine.region} • {wine.type}</Text>
                </View>
                <View style={styles.wineRating}>
                  <Text style={styles.wineRatingText}>★ {wine.rating.toFixed(1)}</Text>
                </View>
              </View>
              <Text style={styles.wineDescription}>
                {wine.description.length > 120 
                  ? wine.description.substring(0, 120) + '...' 
                  : wine.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('wineRegions')}</Text>
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.regionsContainer}
          >
            {featuredRegions.map(region => (
              <TouchableOpacity 
                key={region.id}
                style={styles.regionCard}
                onPress={() => {
                  navigation.navigate('RegionsTab', {
                    screen: 'WineList',
                    params: { 
                      category: region.name, 
                      type: 'region', 
                      regionData: region,
                      title: `${region.name} ${t('wines')}`
                    }
                  });
                }}
              >
                <Text style={styles.regionName}>{region.name}</Text>
                <Text style={styles.regionGrapes}>
                  {region.grapes.slice(0, 2).join(', ')}
                  {region.grapes.length > 2 ? ` ${t('and')} ${t('more')}` : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('unescoHeritage')}</Text>
          <TouchableOpacity 
            style={styles.heritageCard}
            onPress={() => navigation.navigate('ExploreTab', {
              screen: 'WineList',
              params: { category: 'Qvevri', type: 'method' }
            })}
          >
            <Text style={styles.heritageTitle}>{t('qvevriWinemaking')}</Text>
            <Text style={styles.heritageSubtitle}>{t('ancientGeorgianTradition')}</Text>
            <Text style={styles.heritageDescription}>{t('qvevriDescription')}</Text>
          </TouchableOpacity>
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
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#722F37', // Wine red color
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  wineCard: {
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  wineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  wineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 4,
  },
  wineSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  wineDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  wineRating: {
    backgroundColor: '#722F37',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  wineRatingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  regionsContainer: {
    paddingRight: 20,
  },
  regionCard: {
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 150,
    height: 100,
    justifyContent: 'center',
  },
  regionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 6,
  },
  regionGrapes: {
    fontSize: 12,
    color: '#666',
  },
  heritageCard: {
    backgroundColor: '#E0C2C6',
    borderRadius: 12,
    padding: 20,
  },
  heritageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 4,
  },
  heritageSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  heritageDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});

export default HomeScreen; 