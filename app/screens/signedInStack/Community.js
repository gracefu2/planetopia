import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import colors from '../../../theme/colors';
import sizing from '../../../theme/sizing';
import Button from '../../components/general/Button';

const Tab = createMaterialTopTabNavigator();

const LeaderboardScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users.sort((a, b) => b.points - a.points)} // Sort by points
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{item.name}  <Text style={styles.points}>{item.username}</Text></Text>
            <Text style={styles.points}>{item.points} points</Text>
          </View>
        )}
      />
    </View>
  );
};

const FriendsScreen = () => {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);
  const [incomingFriendRequests, setIncomingFriendRequests] = useState([]);
  const [outgoingFriendRequests, setOutgoingFriendRequests] = useState([]);

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', search);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for friends by username"
        value={search}
        onChangeText={setSearch}
        autoCapitalize={false}
      />
      <Button text="Search" onPress={handleSearch} />

      <Text style={styles.sectionTitle}>Friends:</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userContainer}>
            <Text style={styles.username}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Friend Requests:</Text>
      <FlatList
        data={incomingFriendRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <FlatList
        data={outgoingFriendRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const CommunityScreen = () => {
  return (
    <Tab.Navigator style={{paddingTop: 50}}>
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
    </Tab.Navigator>
  )
}

export default CommunityScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderColor: colors.gray,
    borderWidth: 1,
    paddingHorizontal: sizing.md,
    paddingVertical: sizing.mds,
    borderRadius: sizing.mds*2
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  username: {
    fontSize: 18,
  },
  points: {
    fontSize: 16,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});