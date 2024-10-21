import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Button from '../../components/general/Button';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { Circle } from 'react-native-svg';

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

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' });

  const totalPoints = 20; // Change this based on your total points
  const trackedPoints = 15; // Replace with the actual tracked points
  const progressPercentage = trackedPoints / totalPoints;

  const renderGoals = (data, title) => (
    <View style={styles.goalsContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <LinearGradient key={item.id} colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.goalItem}>
              <View style={styles.goalTextContainer}>
                <Text style={styles.goalTitle}>{item.title}</Text>
                <Text style={styles.goalProgressText}>{item.progress} / {item.total}</Text>
              </View>
              <ProgressBar progress={item.total > 0 ? item.progress / item.total : 0} color="#FF6F61" style={styles.customProgressBar} />
            </LinearGradient>
          )}
          keyExtractor={item => item.id}
          scrollEnabled={false}
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

  const renderProgressCircle = () => {
    return (
      <View style={styles.circleContainer}>
        <Text style={styles.progressPercentage}>{Math.round(progressPercentage * 100)}%</Text>
        <Circle
          cx="50%"
          cy="50%"
          r="40%"
          stroke={colors.accent}
          strokeWidth="20"
          fill="none"
          strokeDasharray={`${progressPercentage * 100} ${100 - progressPercentage * 100}`}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Gradient Header Section */}
      <LinearGradient colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.headerContainer}>
        <Text style={styles.dateBox}>{today}</Text>
        <Text style={styles.headerTitle}>My Quests</Text>

        {/* Track Points Section */}
        <View style={styles.trackPointsContainer}>
          <Text style={styles.trackPointsText}>Track Your Daily Points</Text>
          {renderProgressCircle()}
          <Text style={styles.motivationText}>
            {trackedPoints < totalPoints ? 'Keep going!' : 'Great job! You reached your goal!'}
          </Text>
          <ProgressBar progress={progressPercentage} color="#FF6F61" style={styles.customProgressBarHeader} />
          <Button
            text="+ Track points"
            onPress={() => navigation.navigate('PointsCalculator')}
            style={styles.trackPointsButton}
          />
        </View>
      </LinearGradient>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Goals Sections */}
      {renderGoals(weeklyProgress, 'Weekly Goals')}
      {renderGoals(monthlyProgress, 'Monthly Goals')}
    </ScrollView>
  );
};

export default QuestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  dateBox: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 8,
    color: colors.text,
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'center',
  },
  trackPointsContainer: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  trackPointsText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: colors.text,
  },
  motivationText: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 10,
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
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
  },
  goalItem: {
    marginVertical: 8,
    padding: 15,
    backgroundColor: colors.secondary,
    borderRadius: 12,
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
  circleContainer: {
    position: 'relative',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  progressPercentage: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  noGoalsText: {
    color: '#fff',
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
  },
});
