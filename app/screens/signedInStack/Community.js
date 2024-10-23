import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

const getColorFromRank = (rank, totalUsers) => {
  const percentage = rank / totalUsers;
  const startColor = { r: 15, g: 83, b: 129 }; // #0f5381
  const endColor = { r: 102, g: 198, b: 217 }; // #66c6d9

  const r = Math.floor(startColor.r + (endColor.r - startColor.r) * percentage);
  const g = Math.floor(startColor.g + (endColor.g - startColor.g) * percentage);
  const b = Math.floor(startColor.b + (endColor.b - startColor.b) * percentage);

  return `rgb(${r}, ${g}, ${b})`;
};

const LeaderboardScreen = ({ navigation }) => {
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
      <TouchableOpacity style={styles.friendButton} onPress={() => navigation.navigate('FriendsScreen')}>
        <Text style={styles.friendButtonText}>👥 Friends</Text>
      </TouchableOpacity>
      <Text style={styles.title}>🏆 Leaderboard 🏆</Text>
      <FlatList
        data={users.sort((a, b) => b.points - a.points)} // Sort by points
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
        ListEmptyComponent={<Text style={styles.emptyMessage}>No users found.</Text>} // Empty state message
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginTop: 20, // Added margin to push down the leaderboard
  },
  friendButton: {
    backgroundColor: '#0f5381',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  friendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0f5381',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
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
});

export default LeaderboardScreen;
