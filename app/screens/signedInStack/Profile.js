import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/general/Button';
import { LineChart } from 'react-native-svg-charts';
import { useUser } from '../../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const achievements = [
    'Recycled 100 items',
    'Saved 50 gallons of water',
    'Reduced carbon footprint by 10%',
  ];

  const data = [50, 10, 40, 95, 4, 24, 0, 85, 91, 35, 53, 53];
  const userData = useUser();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
      {/* Section 1: Streak, Following, Followers, Avatar */}
      <View style={styles.section}>
        <View style={styles.profileInfo}>
          <Avatar type={userData.profilePic} />
          <View style={styles.infoText}>
            <Text style={styles.streak}>{userData.name}</Text>
            <Text style={styles.uname}>{userData.username}</Text>
            <Text style={styles.follow}>
              Joined {new Date(userData.dateJoined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>15</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Friends</Text>
            <Text style={styles.statValue}>105</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Points</Text>
            <Text style={styles.statValue}>155</Text>
          </View>
        </View>
      </View>

      {/* Section 2: Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <Button text="Navigate to Planet Zones" onPress={() => navigation.navigate('habitat')} />
      </View>

      {/* Section 3: Achievements and Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements and Badges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesContainer}>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{achievement}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Section 5: Total and Monthly Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total and Monthly Reports</Text>
        <Text style={styles.reportText}>Summarize your activities, achievements, and overall impact.</Text>
        {/* <LineChart
          style={{ height: 200 }}
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        /> */}
        <Text style={styles.graphLabel}>Your Progress Over Time</Text>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE', // Light blue background for vibrance
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF', // White background for sections
    borderRadius: 12,
    padding: 20, // Increased padding for a slightly longer container
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, // For Android shadow
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 16,
  },
  streak: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6F61', // Primary color for name
  },
  uname: {
    fontSize: 16,
    marginTop: 4,
    color: '#b3d99e', // Secondary color for username
  },
  follow: {
    fontSize: 14,
    marginTop: 4,
    color: '#71cabb', // Accent color for joined date
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF6F61', // Primary color for section titles
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 16,
    color: '#8E24AA', // Purple for stat labels
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF9800', // Bright orange for stat values
  },
  badgesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 10,
  },
  badge: {
    backgroundColor: '#b3d99e', // Secondary color for badges
    borderRadius: 50, // Circle shape
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff', // White text for badges
    fontSize: 16,
    fontWeight: 'bold',
  },
  achievement: {
    fontSize: 18,
    marginBottom: 4,
    color: '#4CAF50', // Green for achievements
  },
  reportText: {
    fontSize: 18,
    color: '#333', // Dark grey for report text
  },
  graphLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18,
    color: '#795548', // Brown for graph label
  },
});
