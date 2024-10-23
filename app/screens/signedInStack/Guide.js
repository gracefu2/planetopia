import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import Button from '../../components/general/Button';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../firebase';

const GuideScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pinnedGuides, setPinnedGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const navigation = useNavigation();
  const firestoreDb = getFirestore();

  useEffect(() => {
    const fetchGuides = async () => {
      const guidesRef = collection(firestoreDb, "guides");
      const q = query(guidesRef, where("pinned", "==", true));
      const querySnapshot = await getDocs(q);
      const guides = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPinnedGuides(guides);
      setFilteredGuides(guides);
    };
    fetchGuides();
  }, [firestoreDb]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredGuides(
      pinnedGuides.filter(guide =>
        guide.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const renderPinnedGuide = ({ item }) => (
    <TouchableOpacity 
      style={styles.pinnedGuideItem}
      onPress={() => navigation.navigate('ViewGuide', { guide: item })}
    >
      <Text style={styles.guideTitle}>{item.emoji} {item.title}</Text>
      <Text style={styles.guideText}>{item.content[0].text}</Text>
    </TouchableOpacity>
  );

  const renderGuideItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.guideItem}
      onPress={() => navigation.navigate('ViewGuide', { guide: item })}
    >
      <Text style={styles.guideTitle}>{item.emoji} {item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar}
        placeholder="Search guides..." 
        value={searchTerm} 
        onChangeText={handleSearch} 
      />
      <Button text="Create a new Guide" onPress={() => navigation.navigate("EditGuides")} />
      <Text style={styles.sectionTitle}>Pinned Guides</Text>
      <FlatList
        data={filteredGuides}
        renderItem={renderPinnedGuide}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
      <Text style={styles.sectionTitle}>Just Posted</Text>
      <FlatList
        numColumns={2}
        data={pinnedGuides}
        renderItem={renderGuideItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#ffefd5' // Soft background color
  },
  searchBar: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#2cbbd9', // A contrasting color for headings
  },
  flatList: {
    marginBottom: 20,
  },
  pinnedGuideItem: {
    padding: 16,
    marginBottom: 12,
    marginRight: 12,
    backgroundColor: '#ffffff', // White background for the guide item
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  guideItem: {
    padding: 16,
    marginBottom: 12,
    marginRight: 12,
    backgroundColor: '#ffffff', // White background for the guide item
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    width: "48%", // Ensures two items fit in a row
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  guideText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
