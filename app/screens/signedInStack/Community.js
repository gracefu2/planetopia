import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient'; // Import for gradient background

const getColorFromRank = (rank, totalUsers) => {
  const percentage = rank / totalUsers;
  const startColor = { r: 15, g: 83, b: 129 };
  const endColor = { r: 102, g: 198, b: 217 };

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

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.userCard,
        {
          backgroundColor: getColorFromRank(index + 1, users.length),
          transform: [{ translateY: index * 5 }], // Add slight animation based on index
        },
      ]}
    >
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{index + 1}</Text>
      </View>
      <Text style={styles.username}>{item.name} <Text style={styles.usernameSubtitle}>({item.username})</Text></Text>
      <Text style={styles.points}>{item.points} points</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#e0f7fa', '#ffffff']} style={styles.gradient}>
        <FlatList
          data={users.sort((a, b) => b.points - a.points)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No users found.</Text>}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  userCard: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    backgroundColor: '#ffcc00',
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
  emptyMessage: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default LeaderboardScreen;
