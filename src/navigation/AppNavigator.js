import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import WineListScreen from '../screens/WineListScreen';
import WineDetailScreen from '../screens/WineDetailScreen';
import MapScreen from '../screens/MapScreen';
import RegionsScreen from '../screens/RegionsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import JournalScreen from '../screens/JournalScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddJournalEntryScreen from '../screens/AddJournalEntryScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { useTranslation } from '../context/TranslationContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Explore tab
const ExploreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#722F37',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ExploreMain" 
        component={ExploreScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="WineList" 
        component={WineListScreen} 
        options={({ route }) => ({ 
          title: route.params?.title || 'Georgian Wines',
        })}
      />
      <Stack.Screen 
        name="WineDetail" 
        component={WineDetailScreen} 
        options={{ title: 'Wine Details' }}
      />
      <Stack.Screen 
        name="AddJournalEntry" 
        component={AddJournalEntryScreen} 
        options={{ title: 'Add Journal Entry' }}
      />
    </Stack.Navigator>
  );
};

// Stack navigator for Home tab
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen 
        name="WineDetail" 
        component={WineDetailScreen} 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: 'Wine Details'
        }}
      />
      <Stack.Screen 
        name="AddJournalEntry" 
        component={AddJournalEntryScreen} 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: 'Add Journal Entry'
        }}
      />
    </Stack.Navigator>
  );
};

// Stack navigator for Journal tab
const JournalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="JournalMain" component={JournalScreen} />
      <Stack.Screen 
        name="WineDetail" 
        component={WineDetailScreen} 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: 'Wine Details'
        }}
      />
      <Stack.Screen 
        name="AddJournalEntry" 
        component={AddJournalEntryScreen} 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: 'Add Journal Entry'
        }}
      />
    </Stack.Navigator>
  );
};

// Stack navigator for Favorites tab
const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
      <Stack.Screen 
        name="WineDetail" 
        component={WineDetailScreen} 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: 'Wine Details'
        }}
      />
      <Stack.Screen 
        name="AddJournalEntry" 
        component={AddJournalEntryScreen} 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: 'Add Journal Entry'
        }}
      />
    </Stack.Navigator>
  );
};

// Stack navigator for Map tab (now Regions tab)
const RegionsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RegionsMain" component={RegionsScreen} />
      <Stack.Screen 
        name="MapView" 
        component={MapScreen} 
        options={({ route }) => ({ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: route.params?.title || 'Wine Regions Map',
        })}
      />
      <Stack.Screen 
        name="WineList" 
        component={WineListScreen} 
        options={({ route }) => ({ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: route.params?.title || 'Region Wines',
        })}
      />
      <Stack.Screen 
        name="WineDetail" 
        component={WineDetailScreen} 
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#722F37',
          },
          headerTintColor: '#fff',
          title: 'Wine Details'
        }}
      />
    </Stack.Navigator>
  );
};

// Main app navigator
const AppNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ExploreTab') {
              iconName = focused ? 'wine' : 'wine-outline';
            } else if (route.name === 'RegionsTab') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'JournalTab') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#722F37',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ title: t('home') }} 
        />
        <Tab.Screen 
          name="ExploreTab" 
          component={ExploreStack} 
          options={{ title: t('explore') }} 
        />
        <Tab.Screen 
          name="RegionsTab" 
          component={RegionsStack} 
          options={{ title: t('regions') }} 
        />
        <Tab.Screen 
          name="JournalTab" 
          component={JournalStack} 
          options={{ title: t('journal') }} 
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesStack} 
          options={{ title: t('favorites') }} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: t('settings') }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 