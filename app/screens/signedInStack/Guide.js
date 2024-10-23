import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/general/Button';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../firebase';

const GuideScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pinnedGuides, setPinnedGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchGuides = async () => {
      const guidesRef = collection(db, "guides");
      const q = query(guidesRef, where("pinned", "==", true));
      const querySnapshot = await getDocs(q);
      const guides = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPinnedGuides(guides);
      setFilteredGuides(guides);
    };
    fetchGuides();
  }, [db]);

  console.log(pinnedGuides)

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredGuides(
      pinnedGuides.filter(guide =>
        guide.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const navigation = useNavigation()
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      const guidesCollection = collection(db, 'guides');
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
      <Text style={styles.text}>{item.content[0].text}</Text>
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
      {/* <TextInput 
        style={styles.searchBar}
        placeholder="Search guides..." 
        value={searchTerm} 
        onChangeText={handleSearch} 
      /> */}
      <Button text="Create a new Guide" onPress={() => navigation.navigate("EditGuides")} />
      <Text>Pinned</Text>
      <FlatList
        data={pinnedGuides}
        renderItem={renderPinnedGuide}
        keyExtractor={item => item.id}
      />
      <Text>Just Posted</Text>
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
  container: { flex: 1, padding: 20, paddingVertical: sizing.xxxl },
  searchBar: {
    borderColor: colors.gray,
    borderWidth: 1,
    paddingHorizontal: sizing.md,
    paddingVertical: sizing.mds,
    borderRadius: sizing.mds*2
  },
  guideCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    margin: 5,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  description: { color: '#666' },
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
    width: "100%"
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
    width: "48%"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginTop: 20
  }
});
