import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'
import { LineChart } from 'react-native-svg-charts'
import { useUser } from '../../../context/UserContext'
import { Ionicons } from '@expo/vector-icons'
import Avatar from '../../components/Avatar'

const ProfileScreen = () => {
  const navigation = useNavigation()
  const achievements = [
    'Recycled 100 items',
    'Saved 50 gallons of water',
    'Reduced carbon footprint by 10%',
  ]

  const data = [50, 10, 40, 95, 4, 24, 0, 85, 91, 35, 53, 53];
  const userData = useUser()

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color="#444" />
      </TouchableOpacity>

      {/* Section 1: Streak, Following, Followers, Avatar */}
      <View style={styles.section}>
        <View style={styles.profileInfo}>
          <Avatar type={userData.profilePic} />
          <View style={styles.infoText}>
            <Text style={styles.streak}>{userData.name}</Text>
            <Text style={styles.uname}>{userData.username}</Text>
            <Text style={styles.joined}>Joined {new Date(userData.dateJoined).toLocaleDateString("en-US", {month: 'long', year: 'numeric'})}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statTitle}>Streak</Text>
            <Text style={styles.statValue}>15</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statTitle}>Friends</Text>
            <Text style={styles.statValue}>105</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statTitle}>Points</Text>
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
          <Text key={index} style={styles.achievement}>{achievement}</Text>
        ))}
      </View>

      {/* Section 4: Total and Monthly Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total and Monthly Reports</Text>
        <Text style={styles.reportText}>Summarize your activities, achievements, and overall impact.</Text>
        {/* <LineChart
          style={styles.chart}
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        /> */}
        <Text style={styles.graphLabel}>Your Progress Over Time</Text>
      </View>

      <View style={{height: 50}} />
    </ScrollView>
  );
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2, // for Android
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 16,
    flex: 1,
  },
  streak: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  uname: {
    fontSize: 14,
    marginTop: 4,
    color: '#999',
  },
  joined: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: '#888',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  achievement: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  reportText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  graphLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  chart: {
    height: 200,
    marginTop: 16,
  },
});
