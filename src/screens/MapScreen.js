import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useTranslation } from '../context/TranslationContext';
import { regions } from '../data/wineData';

const { width } = Dimensions.get('window');

// Map data with coordinates for Georgia's wine regions
const regionCoordinates = {
  'Kakheti': { 
    center: { lat: 41.6481, lng: 45.7217 }, 
    zoom: 9, 
    description: 'Eastern Georgia. Known for red wines from Saperavi and white wines from Rkatsiteli grapes.',
  },
  'Kartli': { 
    center: { lat: 41.9197, lng: 44.5991 }, 
    zoom: 9, 
    description: 'Central Georgia. Famous for sparkling wines and traditional method production.',
  },
  'Imereti': { 
    center: { lat: 42.1597, lng: 42.8015 }, 
    zoom: 9, 
    description: 'Western Georgia. Known for semi-sweet whites and light, fresh wines.',
  },
  'Racha-Lechkhumi': { 
    center: { lat: 42.6473, lng: 43.3870 }, 
    zoom: 9, 
    description: 'North-western Georgia. Famous for naturally semi-sweet Khvanchkara wine.',
  },
  'Adjara': { 
    center: { lat: 41.6003, lng: 42.0027 }, 
    zoom: 9, 
    description: 'South-western Georgia on the Black Sea. Subtropical climate with unique wine varieties.',
  },
  'Guria': { 
    center: { lat: 41.9495, lng: 42.0262 }, 
    zoom: 9, 
    description: 'Western Georgia. Known for Chkhaveri grapes producing light rosé wines.',
  },
  'Samegrelo': { 
    center: { lat: 42.3896, lng: 42.1110 }, 
    zoom: 9, 
    description: 'North-western coastal region. Known for Ojaleshi grape varieties.',
  }
};

const MapScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { regionName } = route.params || {};
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 41.9927, 
    longitude: 43.3980, 
    latitudeDelta: 3.5, 
    longitudeDelta: 3.5
  });
  
  // Set the selected region and zoom to it if regionName is passed
  useEffect(() => {
    if (regionName) {
      const region = regions.find(r => r.name === regionName);
      if (region) {
        handleRegionSelect(region);
      }
    }
  }, [regionName]);
  
  // Navigate to wines from this region
  const viewRegionWines = (region) => {
    navigation.navigate('WineList', {
      category: region.name,
      type: 'region',
      regionData: region
    });
  };

  // Open Google Maps for a region
  const openMap = (region) => {
    const coords = regionCoordinates[region.name]?.center;
    if (!coords) {
      Alert.alert(
        t('locationError'),
        t('noCoordinatesAvailable')
      );
      return;
    }

    // Use the region name and zoom level for maps to show the area, not just a point
    const regionName = encodeURIComponent(`${region.name} Wine Region Georgia`);
    const zoomLevel = regionCoordinates[region.name].zoom || 8;
    
    // Create Google Maps URL with region name as search query
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${regionName}&center=${coords.lat},${coords.lng}&zoom=${zoomLevel}`;
    
    // For native apps on mobile, use search by name to get region area
    const scheme = Platform.select({ 
      ios: `maps://0,0?q=${regionName}&ll=${coords.lat},${coords.lng}&z=${zoomLevel}`, 
      android: `geo:0,0?q=${regionName}&center=${coords.lat},${coords.lng}&zoom=${zoomLevel}` 
    });
    
    Alert.alert(
      t('openMaps'),
      t('viewRegionOnMap', { region: region.name }),
      [
        {
          text: t('cancel'),
          style: 'cancel'
        },
        {
          text: 'Google Maps',
          onPress: () => Linking.openURL(googleMapsUrl)
        },
        {
          text: t('nativeMaps'),
          onPress: () => Linking.canOpenURL(scheme)
            .then(supported => {
              if (supported) {
                return Linking.openURL(scheme);
              } else {
                return Linking.openURL(googleMapsUrl);
              }
            })
            .catch(() => Linking.openURL(googleMapsUrl))
        }
      ]
    );
  };
  
  // Handle region selection and fly to it
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    
    // Animate map to the selected region
    const coords = regionCoordinates[region.name]?.center;
    if (coords && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: coords.lat,
        longitude: coords.lng,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8
      }, 1000);
    }
  };
  
  // Handle map ready event
  const onMapReady = () => {
    setIsMapReady(true);
    
    // If a region was selected before the map was ready, zoom to it now
    if (selectedRegion) {
      const coords = regionCoordinates[selectedRegion.name]?.center;
      if (coords && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: coords.lat,
          longitude: coords.lng,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8
        }, 1000);
      }
    }
  };

  // Get a color for each wine region
  const getRegionColor = (regionName) => {
    const colors = {
      'Kakheti': '#8C3130',     // Dark red
      'Kartli': '#D4A017',      // Golden
      'Imereti': '#254117',     // Forest green
      'Racha-Lechkhumi': '#8D38C9', // Purple
      'Adjara': '#4863A0',      // Steel blue
      'Guria': '#C35817',       // Rust
      'Samegrelo': '#6CC417'    // Green
    };
    
    // Return the color or default red if not found
    return colors[regionName] || 'red';
  };

  // Render the map section
  const renderMap = () => {
    return (
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={mapRegion}
          onMapReady={onMapReady}
        >
          {Object.keys(regionCoordinates).map(regionName => {
            const region = regions.find(r => r.name === regionName);
            const regionData = regionCoordinates[regionName];
            
            if (!region || !regionData) return null;
            
            const isSelected = selectedRegion && selectedRegion.name === regionName;
            
            return (
              <Marker
                key={region.id}
                coordinate={{
                  latitude: regionData.center.lat,
                  longitude: regionData.center.lng
                }}
                title={region.name}
                description={regionData.description}
                pinColor={isSelected ? getRegionColor(regionName) : '#999999'}
                onPress={() => handleRegionSelect(region)}
              />
            );
          })}
        </MapView>
        
        {!isMapReady && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#722F37" />
            <Text style={styles.loadingText}>{t('loadingMap')}</Text>
          </View>
        )}
      </View>
    );
  };

  // Fallback to a simple view if map errors occur
  const renderFallbackMap = () => {
    return (
      <View style={styles.fallbackMapContainer}>
        <Text style={styles.fallbackTitle}>{t('wineRegions')}</Text>
        <Text style={styles.fallbackSubtitle}>{t('clickRegionBelow')}</Text>
        
        <View style={styles.fallbackRegionsContainer}>
          {Object.keys(regionCoordinates).map(regionName => {
            const region = regions.find(r => r.name === regionName);
            if (!region) return null;
            
            const isSelected = selectedRegion?.name === regionName;
            
            return (
              <TouchableOpacity
                key={region.id}
                style={[
                  styles.fallbackRegionButton,
                  { backgroundColor: getRegionColor(regionName) + (isSelected ? 'FF' : '66') }
                ]}
                onPress={() => handleRegionSelect(region)}
              >
                <Text style={styles.fallbackRegionText}>{region.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('wineRegions')}</Text>
        <Text style={styles.subtitle}>{t('appSubtitle')}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Try to render map, fallback to simple view if errors occur */}
        {renderMap()}
        
        <Text style={styles.sectionTitle}>{t('exploreRegions')}</Text>
        
        <View style={styles.regionsContainer}>
          {regions.map(region => (
            <TouchableOpacity
              key={region.id}
              style={[
                styles.regionButton,
                selectedRegion?.id === region.id ? styles.selectedRegion : {}
              ]}
              onPress={() => {
                handleRegionSelect(region);
              }}
            >
              <Text 
                style={[
                  styles.regionButtonText,
                  selectedRegion?.id === region.id ? styles.selectedRegionText : {}
                ]}
              >
                {region.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {selectedRegion && (
          <View style={[styles.regionDetail, { borderLeftColor: getRegionColor(selectedRegion.name) }]}>
            <View style={styles.regionHeader}>
              <Text style={styles.regionName}>{selectedRegion.name}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.mapButton}
                  onPress={() => openMap(selectedRegion)}
                >
                  <Text style={styles.mapButtonText}>{t('directions')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.viewWinesButton, { backgroundColor: getRegionColor(selectedRegion.name) }]}
                  onPress={() => viewRegionWines(selectedRegion)}
                >
                  <Text style={styles.viewWinesText}>{t('viewWines')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.regionInfo}>
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>{t('famousFor')}</Text>
                <Text style={styles.infoText}>
                  {selectedRegion.grapes.slice(0, 3).join(', ')}
                  {selectedRegion.grapes.length > 3 ? ` ${t('and')} ${t('more')}` : ''}
                </Text>
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>{t('climate')}</Text>
                <Text style={styles.infoText}>{selectedRegion.climate || t('noInfo')}</Text>
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>{t('soilType')}</Text>
                <Text style={styles.infoText}>{selectedRegion.soil || t('noInfo')}</Text>
              </View>
              
              <Text style={styles.regionDescription}>
                {selectedRegion.description || regionCoordinates[selectedRegion.name]?.description || t('noRegionDescription')}
              </Text>
            </View>
          </View>
        )}
        
        <Text style={styles.footerText}>{t('mapDisclaimer')}</Text>
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
    padding: 20,
    backgroundColor: '#f9f1f2',
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
  content: {
    padding: 20,
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 241, 242, 0.7)',
    zIndex: 5,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  // Fallback map styles for when interactive map fails
  fallbackMapContainer: {
    height: 300,
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 8,
  },
  fallbackSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  fallbackRegionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  fallbackRegionButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 8,
    minWidth: '40%',
    alignItems: 'center',
  },
  fallbackRegionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  regionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  regionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedRegion: {
    backgroundColor: '#722F37',
  },
  regionButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedRegionText: {
    color: '#fff',
  },
  regionDetail: {
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 6,
  },
  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  regionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#722F37',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  viewWinesButton: {
    backgroundColor: '#722F37',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  viewWinesText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  mapButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  regionInfo: {
    padding: 4,
  },
  infoSection: {
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  regionDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default MapScreen; 