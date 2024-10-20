import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import Button from '../../components/general/Button';

const Tab = createMaterialTopTabNavigator();

// New color gradient logic using hex colors
const getColorFromRank = (rank, totalUsers) => {
  const percentage = rank / totalUsers;

  // Calculate the color based on the rank
  const startColor = { r: 15, g: 83, b: 129 }; // #0f5381
  const endColor = { r: 102, g: 198, b: 217 }; // #66c6d9

  const r = Math.floor(startColor.r + (endColor.r - startColor.r) * percentage);
  const g = Math.floor(startColor.g + (endColor.g - startColor.g) * percentage);
  const b = Math.floor(startColor.b + (endColor.b - startColor.b) * percentage);

  return `rgb(${r}, ${g}, ${b})`;
};

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
        renderItem={({ item, index }) => (
          <View style={[styles.userCard, { backgroundColor: getColorFromRank(index + 1, users.length) }]}>
            <Text style={styles.username}>{item.name} <Text style={styles.usernameSubtitle}>({item.username})</Text></Text>
            <Text style={styles.points}>{item.points} points</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No users found.</Text>} // Empty state message
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
        autoCapitalize="none"
      />
      <Button text="Search" onPress={handleSearch} />

      <Text style={styles.sectionTitle}>Friends:</Text>
      {friends.length > 0 ? (
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userCard}>
              <Text style={styles.username}>{item.username}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>No friends found.</Text>
      )}

      <Text style={styles.sectionTitle}>Friend Requests:</Text>
      {incomingFriendRequests.length > 0 ? (
        <FlatList
          data={incomingFriendRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.username}>{item.username}</Text>
              <TouchableOpacity style={styles.requestButton}>
                <Text style={styles.requestButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>No incoming friend requests.</Text>
      )}

      {outgoingFriendRequests.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Outgoing Friend Requests:</Text>
          <FlatList
            data={outgoingFriendRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.userCard}>
                <Text style={styles.username}>{item.username}</Text>
                <TouchableOpacity style={styles.requestButton}>
                  <Text style={styles.requestButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const CommunityScreen = () => {
  return (
    <Tab.Navigator style={{ paddingTop: 50 }}>
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
    </Tab.Navigator>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9', // Light background for contrast
  },
  searchInput: {
    borderColor: '#0f5381',
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  userCard: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  usernameSubtitle: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
  points: {
    fontSize: 16,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#0f5381',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  requestButton: {
    backgroundColor: '#aa60d1', // Request button color
    borderRadius: 5,
    padding: 8,
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
