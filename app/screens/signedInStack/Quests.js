import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Button from '../../components/general/Button';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../../../context/UserContext';

// Define colors
const colors = {
  primary: '#FF6F61',
  secondary: '#b3d99e',
  accent: '#71cabb',
  background: '#ffefd5',
  text: '#333',
  white: '#fff',
};

const QuestsScreen = () => {
  const navigation = useNavigation();
  const [weeklyProgress] = useState([
    { id: '1', title: 'Bike 5 times', progress: 3, total: 5 },
    { id: '2', title: 'Drink out of a reusable water bottle 8 times', progress: 2, total: 8 },
    { id: '3', title: 'Eat veggies 10 times', progress: 5, total: 10 },
  ]);

  const [monthlyProgress] = useState([
    { id: '1', title: 'Plant 2 trees', progress: 0, total: 2 },
    { id: '2', title: 'Walk 20 miles total', progress: 10, total: 20 },
  ]);

  const dailyPointsGoal = 25;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' });

  const renderGoals = (data, title) => (
    <View style={styles.goalsContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <LinearGradient key={item.id} colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.goalItem}>
              <View>
                <Text style={{ fontFamily: 'Poppins_400Regular' }}>{item.title}</Text>
                <Text style={{ fontFamily: 'Poppins_400Regular' }}>{item.progress} / {item.total}</Text>
              </View>
              <ProgressBar progress={item.total > 0 ? item.progress / item.total : 0} color="#FF6F61" style={styles.customProgressBar} />
            </LinearGradient>
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false} // Disable scrolling for FlatList to allow the ScrollView to handle it
        />
      ) : (
        <View style={styles.noGoalsContainer}>
          <Text style={styles.noGoalsText}>Oh no! It looks like you have no {title.toLowerCase()}!</Text>
          <Button
            text={`Add ${title}`}
            onPress={() => navigation.navigate('AddGoalScreen')}
            style={styles.trackPointsButton}
          />
        </View>
      )}
    </View>
  );

  const userData = useUser()

  return (
    <ScrollView style={styles.container}>
      {/* Gradient Header Section */}
      <LinearGradient colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.headerContainer}>
        <Text style={styles.dateBox}>{today}</Text>
        <Text style={styles.headerTitle}>My Quests</Text>



        {/* Track Points Section */}
        <ProgressBar progress={userData.dailyPoints / dailyPointsGoal} color="#FF6F61" style={styles.customFatProgressBar} />
        <View style={styles.trackPointsContainer}>
          <Text style={styles.trackPointsText}>Track Your Daily Points</Text>
          <Text style={styles.goalText}>Goal: {userData.dailyPoints} / {dailyPointsGoal} Points</Text>

          <Button
            text="+ Track points"
            onPress={() => navigation.navigate('PointsCalculator')}
            style={styles.trackPointsButton}
          />
        </View>
      </LinearGradient>
      
      <View style={styles.divider} />

      {/* Goals Sections */}
      {renderGoals(weeklyProgress, 'Weekly Goals')}
      {renderGoals(monthlyProgress, 'Monthly Goals')}
      <View style={styles.divider} />
    </ScrollView>
  );
};

export default QuestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  divider: {
    height: 20
  },
  headerContainer: {
    padding: 20,
    paddingTop: 70,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  headerTitle: {
    fontSize: 34,
    fontFamily: 'Poppins_700Bold',
    color: colors.white,
    textAlign: 'center',
  },
  dateBox: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 8,
    color: colors.text,
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
  },
  trackPointsContainer: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  trackPointsText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 10,
    color: colors.text,
  },
  goalText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: colors.text,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: colors.primary,
    marginVertical: 10,
  },
  goalsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 20
  },
  goalItem: {
    marginVertical: 8,
    padding: 15,
    backgroundColor: colors.secondary,
    borderRadius: 12,
  },
  customFatProgressBar: {
    borderRadius: 20,
    height: 20, 
    marginTop: 10,
    backgroundColor: '#FFD9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  customProgressBar: {
    borderRadius: 20,
    height: 12,
    marginTop: 10,
    backgroundColor: '#FFD9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  noGoalsText: {
    color: '#fff',
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
  },
});
