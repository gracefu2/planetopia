import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { LinearGradient } from 'expo-linear-gradient'
import Back from '../../components/general/Back'
import Avatar from '../../components/Avatar'
import Button from '../../components/general/Button'
const ViewFriendScreen = ({navigation}) => {
  const {uid} = useRoute().params
  console.log(uid)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(doc(db, "users", uid));

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        navigation.goBack()
      }
    };

    fetchData();
  })

  const achievements = [
    'Recycled 50 items',
    'Saved 10 gallons of water',
    'Reduced carbon footprint by 10%',
  ];

  if (!userData) return
  <LinearGradient colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.container}>
    <Text style={styles.follow}>Loading...</Text>
  </LinearGradient>

  return (
    <LinearGradient colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.container}>
      <ScrollView>
        <Back />
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
              <Text style={styles.statValue}>{userData.streak}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Friends</Text>
              <Text style={styles.statValue}>{userData.friends}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Points</Text>
              <Text style={styles.statValue}>{userData.points}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{userData.name}'s Progress</Text>
          <Button text="Navigate to Planet Zones" onPress={() => navigation.navigate('PlanetHabitats')} />
        </View>

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

        <View style={{ height: 50 }} />
      </ScrollView>
    </LinearGradient>
  )
}

export default ViewFriendScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF', // White background for sections
    borderRadius: 12,
    padding: 20,
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
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6F61', // Primary color for name
  },
  uname: {
    fontSize: 14,
    marginTop: 4,
    color: '#b3d99e', // Secondary color for username
    fontFamily: 'Poppins_300Light',
  },
  follow: {
    fontSize: 14,
    marginTop: 4,
    color: '#71cabb', // Accent color for joined date
    fontFamily: 'Poppins_400Regular',
  },
  sectionTitle: {
    fontSize: 26,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
    color: '#FF6F61', // Primary color for section titles
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 16,
    color: '#8E24AA', // Purple for stat labels
    fontFamily: 'Poppins_400Regular',
  },
  statValue: {
    fontSize: 26,
    fontFamily: 'Poppins_600SemiBold',
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
    fontFamily: 'Poppins_600SemiBold',
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
