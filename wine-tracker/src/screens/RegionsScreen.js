import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { useTranslation } from '../context/TranslationContext';
import { regions } from '../data/wineData';

const { width } = Dimensions.get('window');

const RegionsScreen = ({ navigation }) => {
  const { t } = useTranslation();

  // Get a color for each wine region
  const getRegionColor = (regionName) => {
    const colors = {
      'Kakheti': '#8C3130',      // Dark red
      'Kartli': '#D4A017',       // Golden
      'Imereti': '#254117',      // Forest green
      'Racha-Lechkhumi': '#8D38C9', // Purple
      'Adjara': '#4863A0',       // Steel blue
      'Guria': '#C35817',        // Rust
      'Samegrelo': '#6CC417',    // Green
      'Samtskhe-Javakheti': '#52595D' // Grey
    };
    
    return colors[regionName] || '#722F37'; // Default wine color
  };

  // Handle region selection
  const handleRegionSelect = (region) => {
    // Navigate directly to the WineList screen within the same navigator
    navigation.navigate('WineList', { 
      category: region.name, 
      type: 'region',
      regionData: region, 
      title: `${region.name} ${t('wines')}`
    });
  };

  // Generate a placeholder image gradient for regions without actual images
  const getRegionPlaceholder = (regionName) => {
    const color = getRegionColor(regionName);
    return { backgroundColor: color };
  };

  // Get the appropriate icon for the region climate
  const getClimateIcon = (climate) => {
    if (climate?.toLowerCase().includes('continental')) {
      return '🌤️';
    } else if (climate?.toLowerCase().includes('subtropical')) {
      return '🌴';
    } else if (climate?.toLowerCase().includes('alpine')) {
      return '⛰️';
    } else {
      return '🍷';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('wineRegions')}</Text>
        <Text style={styles.subtitle}>{t('exploreGeorgianTerroir')}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {regions.map(region => (
          <TouchableOpacity
            key={region.id}
            style={styles.regionCard}
            onPress={() => handleRegionSelect(region)}
          >
            <View style={styles.regionContent}>
              <Text style={styles.regionName}>{region.name}</Text>
              
              <View style={styles.regionDetailRow}>
                <Text style={styles.regionDetailLabel}>{t('keyGrapes')}:</Text>
                <Text style={styles.regionDetailText}>
                  {region.grapes?.slice(0, 2).join(', ')}
                  {region.grapes?.length > 2 ? ` ${t('andMore')}` : ''}
                </Text>
              </View>
              
              {region.climate && (
                <View style={styles.regionDetailRow}>
                  <Text style={styles.regionDetailLabel}>{t('climate')}:</Text>
                  <Text style={styles.regionDetailText}>{region.climate}</Text>
                </View>
              )}
              
              <Text 
                style={styles.regionDescription} 
                numberOfLines={2}
              >
                {region.description}
              </Text>
              
              <View style={styles.regionFooter}>
                <View style={[styles.regionTag, { backgroundColor: getRegionColor(region.name) }]}>
                  <Text style={styles.regionTagText}>{t('exploreWines')}</Text>
                </View>
                <Text style={styles.regionClimateIcon}>{getClimateIcon(region.climate)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  },
  regionCard: {
    marginBottom: 20,
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  regionContent: {
    padding: 16,
  },
  regionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 8,
  },
  regionDetailRow: {
    flexDirection: 'row',
    marginBottom: 4,
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
  regionDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    marginBottom: 8,
    lineHeight: 16,
  },
  regionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  regionTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  regionTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  regionClimateIcon: {
    fontSize: 20,
    color: '#666',
    marginLeft: 8,
  },
});

export default RegionsScreen; 