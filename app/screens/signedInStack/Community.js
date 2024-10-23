import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import Button from '../../components/general/Button';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

const Tab = createMaterialTopTabNavigator();

const getColorFromRank = (rank, totalUsers) => {
  const percentage = rank / totalUsers;
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
      <Text style={styles.title}>🏆 Leaderboard 🏆</Text>
      <FlatList
        data={users.sort((a, b) => b.points - a.points)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.userCard, { backgroundColor: getColorFromRank(index + 1, users.length) }]}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Image source={{ uri: item.profilePicture || 'https://via.placeholder.com/50' }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.name} <Text style={styles.usernameSubtitle}>({item.username})</Text></Text>
              <Text style={styles.points}>{item.points} points</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No users found.</Text>}
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
              <Icon name="person-circle" size={24} color="#0f5381" />
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
              <Icon name="person-add" size={24} color="#0f5381" />
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
                <Icon name="person-remove" size={24} color="#0f5381" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0f5381',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  usernameSubtitle: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
  },
  points: {
    fontSize: 16,
    color: '#fff',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#0f5381',
  },
  requestButton: {
    backgroundColor: '#0f5381',
    padding: 5,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  requestButtonText: {
    color: '#fff',
  },
});

export default CommunityScreen;
