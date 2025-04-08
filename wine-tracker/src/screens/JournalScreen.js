import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Modal,
  ScrollView
} from 'react-native';
import { useTranslation } from '../context/TranslationContext';
import { wines } from '../data/wineData';

// Placeholder data for journal entries
const SAMPLE_JOURNAL_ENTRIES = [
  {
    id: '1',
    wineId: '3',
    date: '2023-05-15',
    rating: 4.5,
    notes: 'Excellent structure with rich tannins. Paired well with khachapuri.',
    occasion: 'Dinner with friends',
    location: 'Home'
  },
  {
    id: '2',
    wineId: '7',
    date: '2023-06-02',
    rating: 3.8,
    notes: 'Pleasant aroma, slightly bitter finish. Would try again.',
    occasion: 'Weekend tasting',
    location: 'Tbilisi Wine Bar'
  },
  {
    id: '3',
    wineId: '12',
    date: '2023-06-20',
    rating: 5.0,
    notes: 'Absolutely stunning complexity. One of the best Georgian wines I\'ve tried.',
    occasion: 'Anniversary',
    location: 'Kakheti vineyard tour'
  }
];

const JournalScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [journalEntries, setJournalEntries] = useState(SAMPLE_JOURNAL_ENTRIES);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter entries based on search query
  const filteredEntries = journalEntries.filter(entry => {
    const wine = wines.find(w => w.id === entry.wineId);
    if (!wine) return false;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      wine.name.toLowerCase().includes(searchLower) ||
      entry.notes.toLowerCase().includes(searchLower) ||
      entry.occasion.toLowerCase().includes(searchLower) ||
      entry.location.toLowerCase().includes(searchLower)
    );
  });

  const viewEntryDetails = (entry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const deleteEntry = (id) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
    setModalVisible(false);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (halfStar) {
      stars += '½';
    }
    
    return stars;
  };

  const renderJournalItem = ({ item }) => {
    const wine = wines.find(w => w.id === item.wineId);
    if (!wine) return null;
    
    return (
      <TouchableOpacity 
        style={styles.journalItem}
        onPress={() => viewEntryDetails(item)}
      >
        <View style={styles.journalHeader}>
          <Text style={styles.wineName}>{wine.name}</Text>
          <Text style={styles.journalDate}>{item.date}</Text>
        </View>
        
        <View style={styles.journalContent}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('region')}:</Text>
            <Text style={styles.detailValue}>{wine.region}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{t('rating')}:</Text>
            <Text style={styles.starRating}>{renderStars(item.rating)}</Text>
          </View>
          
          <View style={styles.notesPreview}>
            <Text numberOfLines={2} style={styles.notesText}>{item.notes}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('journal')}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('WineList')}
        >
          <Text style={styles.addButtonText}>+ {t('addNew')}</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.searchInput}
        placeholder={t('searchJournal')}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <FlatList
        data={filteredEntries}
        keyExtractor={item => item.id}
        renderItem={renderJournalItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t('noJournalEntries')}</Text>
          </View>
        }
      />
      
      {/* Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEntry && (
              <ScrollView>
                <Text style={styles.modalTitle}>
                  {wines.find(w => w.id === selectedEntry.wineId)?.name}
                </Text>
                
                <View style={styles.modalSection}>
                  <Text style={styles.modalDate}>{selectedEntry.date}</Text>
                  <Text style={styles.modalRating}>
                    {t('rating')}: {renderStars(selectedEntry.rating)} ({selectedEntry.rating.toFixed(1)})
                  </Text>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>{t('details')}</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{t('occasion')}:</Text>
                    <Text style={styles.detailValue}>{selectedEntry.occasion}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{t('location')}:</Text>
                    <Text style={styles.detailValue}>{selectedEntry.location}</Text>
                  </View>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>{t('notes')}</Text>
                  <Text style={styles.notesText}>{selectedEntry.notes}</Text>
                </View>
                
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.editButton]}
                    onPress={() => {
                      // Close this modal and navigate to edit screen (not implemented yet)
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.buttonText}>{t('edit')}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.deleteButton]}
                    onPress={() => deleteEntry(selectedEntry.id)}
                  >
                    <Text style={styles.buttonText}>{t('delete')}</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>{t('close')}</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#722F37',
  },
  addButton: {
    backgroundColor: '#722F37',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  listContent: {
    padding: 20,
    paddingTop: 10,
  },
  journalItem: {
    backgroundColor: '#f9f1f2',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  wineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#722F37',
    flex: 1,
  },
  journalDate: {
    color: '#666',
    fontSize: 14,
  },
  journalContent: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: '600',
    marginRight: 5,
    color: '#444',
    width: 70,
  },
  detailValue: {
    color: '#333',
    flex: 1,
  },
  starRating: {
    color: '#722F37',
    fontWeight: 'bold',
  },
  notesPreview: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  notesText: {
    color: '#444',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#722F37',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 16,
    color: '#666',
  },
  modalRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#722F37',
  },
  modalSection: {
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4a6fa5',
  },
  deleteButton: {
    backgroundColor: '#C53A32',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default JournalScreen; 