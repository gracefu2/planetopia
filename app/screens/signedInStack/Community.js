import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import Button from '../../components/general/Button';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

const Tab = createMaterialTopTabNavigator();

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <Text style={styles.loadingMessage}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users.sort((a, b) => b.points - a.points)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.userCard, { backgroundColor: getColorFromRank(index + 1, users.length) }]}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
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

const [originalFriendsList, setOriginalFriendsList] = useState([]); // Store original list

useEffect(() => {
  // Fetch and set friends here
  // setOriginalFriendsList(fetchedFriends); // After fetching
}, []);

const handleSearch = () => {
  const filteredFriends = originalFriendsList.filter(friend =>
    friend.username.toLowerCase().includes(search.toLowerCase())
  );
  setFriends(filteredFriends);
};


const AnimatedCard = ({ item }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity style={styles.userCard}>
        <Icon name="person-circle" size={24} color="#0f5381" />
        <Text style={styles.username}>{item.username}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
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
          renderItem={({ item }) => <AnimatedCard item={item} />}
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
            <View style={styles.requestCard}>
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
              <View style={styles.requestCard}>
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

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
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
    shadowOffset: { width: 0, height: 4 }, // Increased shadow for depth
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5, // Increased elevation for Android
    flexDirection: 'row',
    alignItems: 'center',
  },
    requestCard: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#aa60d1',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10, // Add some space between icon and text
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
    backgroundColor: '#aa60d1',
    borderRadius: 5,
    padding: 8,
    marginLeft: 'auto', // Align button to the right
  },
  requestButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  rankBadge: {
    backgroundColor: '#ffcc00', // Gold color for badge
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
