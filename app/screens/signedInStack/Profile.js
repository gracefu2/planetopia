import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/general/Button';
import { LineChart } from 'react-native-svg-charts';
import { useUser } from '../../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient colors={['#FF6F61', '#b3d99e']} style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="#FFFFFF" /> {/* Change color for visibility */}
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
          {achievements.map((achievement, index) => (
            <Text key={index} style={styles.achievement}>
              {achievement}
            </Text>
          ))}
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
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF', // White background for sections
    borderRadius: 12,
    padding: 16,
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
    color: '#FFFFFF', // Adjusted for better visibility against gradient
  },
  uname: {
    fontSize: 16,
    marginTop: 4,
    color: '#b3d99e', // Secondary Color
  },
  follow: {
    fontSize: 14,
    marginTop: 4,
    color: '#71cabb', // Accent Color
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF6F61', // Primary Color
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
    color: '#b3d99e', // Secondary Color
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF6F61', // Primary Color
  },
  achievement: {
    fontSize: 18,
    marginBottom: 4,
    color: '#71cabb', // Accent Color
  },
  reportText: {
    fontSize: 18,
    color: '#333', // Dark grey for report text
  },
  graphLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18,
    color: '#333', // Text Color
  },
});
