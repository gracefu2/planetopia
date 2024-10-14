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

  console.log(userData)
  
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
      {/* Section 1: Streak, Following, Followers, Avatar */}
      <View style={styles.section}>
        <View style={styles.profileInfo}>
          <Avatar type={userData.profilePic} />
          <View style={styles.infoText}>
            <Text style={styles.streak}>{userData.name}</Text>
            <Text style={styles.uname}>{userData.username}</Text>
            <Text style={styles.follow}>Joined {new Date(userData.dateJoined).toLocaleDateString("en-US", {month: 'long', year: 'numeric'})}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '100%', alignItems: 'center', flexShrink: 1}}>
            <Text>Streak</Text>
            <Text style={{fontSize: 24}}>15</Text>
          </View>
          <View style={{width: '100%', alignItems: 'center', flexShrink: 1}}>
            <Text>Friends</Text>
            <Text style={{fontSize: 24}}>105</Text>
          </View>
          <View style={{width: '100%', alignItems: 'center', flexShrink: 1}}>
            <Text>Points</Text>
            <Text style={{fontSize: 24}}>155</Text>
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
        {/* <Text style={styles.badge}>Credibility Badge for Discussion Board</Text> */}
      </View>

      {/* Section 5: Total and Monthly Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total and Monthly Reports</Text>
        <Text>Summarize your activities, achievements, and overall impact.</Text>
        {/* <LineChart
          style={{ height: 200 }}
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
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    paddingVertical: 50
  },
  section: {
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoText: {
    marginLeft: 16,
  },
  streak: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  uname: {
    fontSize: 14,
    marginTop: 4,
    color: '#999'
  },
  follow: {
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  achievement: {
    fontSize: 16,
    marginBottom: 4,
  },
  badge: {
    fontSize: 16,
    color: 'green',
    marginTop: 8,
  },
  graphLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
})
