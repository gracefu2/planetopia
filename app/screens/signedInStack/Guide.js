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

  const navigation = useNavigation();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      const guidesCollection = collection(firestoreDb, 'guides');
      const guidesSnapshot = await getDocs(guidesCollection);
      const guidesList = guidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGuides(guidesList);
    };

    fetchGuides();
  }, []);

  const renderPinnedGuide = ({ item }) => (
    <TouchableOpacity 
      style={styles.pinnedGuideItem}
      onPress={() => navigation.navigate('ViewGuide', { guide: item })}
    >
      <Text style={styles.title}>{item.emoji} {item.title}</Text>
      <Text style={styles.text}>{item.content[0]?.text}</Text>
    </TouchableOpacity>
  );

  const renderGuideItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.guideItem}
      onPress={() => navigation.navigate('ViewGuide', { guide: item })}
    >
      <Text style={styles.title}>{item.emoji} {item.title}</Text>
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
      <Text style={styles.sectionTitle}>Pinned</Text>
      <FlatList
        data={filteredGuides}
        renderItem={renderPinnedGuide}
        keyExtractor={item => item.id}
      />
      <Text style={styles.sectionTitle}>Just Posted</Text>
      <FlatList
        numColumns={2}
        data={guides}
        renderItem={renderGuideItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4'
  },
  searchBar: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333'
  },
  pinnedGuideItem: {
    padding: 16,
    marginBottom: 12,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "100%",
    elevation: 2
  },
  guideItem: {
    padding: 16,
    marginBottom: 12,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "48%",
    elevation: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  text: {
    fontSize: 14,
    marginTop: 5,
    color: '#666'
  }
});
