import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Button from '../../components/general/Button';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const QuestsScreen = () => {
  const navigation = useNavigation()
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

  return (
    <View style={styles.container}>
      {/* Gradient Header Section */}
      <LinearGradient colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.headerContainer}>
        <Text style={styles.dateBox}>{today}</Text>
        <Text style={styles.headerTitle}>My Quests</Text>

        {/* Track Points Section */}
        <View style={styles.trackPointsContainer}>
          <Text style={styles.trackPointsText}>Track Your Daily Points</Text>
          <ProgressBar progress={0.75} color="#FF6F61" style={styles.customProgressBarHeader} />
          <Button
            text="+ Track points"
            onPress={() => navigation.navigate('PointsCalculator')}
            style={styles.trackPointsButton}
          />
        </View>
      </LinearGradient>

      {/* Divider */}
      <View style={styles.divider} />

        {/* Weekly Goals Section */}
        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>Weekly Goals</Text>
          {weeklyProgress.length > 0 ? (
            <FlatList
              data={weeklyProgress}
              renderItem={({ item }) => (
                <LinearGradient key={item.id} colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.goalItem}>
                {/* Display goal title and numeric progress */}
                    <View style={styles.goalTextContainer}>
                      <Text style={styles.goalTitle}>{item.title}</Text>
                      <Text style={styles.goalProgressText}>{item.progress} / {item.total}</Text>
                    </View>
                  <ProgressBar progress={item.total > 0 ? item.progress / item.total : 0} color="#FF6F61" style={styles.customProgressBar} />
                </LinearGradient>
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.noGoalsContainer}>
              <Text style={styles.noGoalsText}>Oh no! It looks like you have no weekly goals!</Text>
              <Button
                text="Add Weekly Goal"
                onPress={() => navigation.navigate('AddGoalScreen')}
                style={styles.trackPointsButton}
              />
            </View>
          )}
        </View>
        
        {/* Monthly Goals Section */}
        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>Monthly Goals</Text>
          {monthlyProgress.length > 0 ? (
            <FlatList
              data={monthlyProgress}
              renderItem={({ item }) => (
                <LinearGradient key={item.id} colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.goalItem}>
                    {/* Display goal title and numeric progress */}
                    <View style={styles.goalTextContainer}>
                      <Text style={styles.goalTitle}>{item.title}</Text>
                      <Text style={styles.goalProgressText}>{item.progress} / {item.total}</Text>
                    </View>
                  <ProgressBar progress={item.total > 0 ? item.progress / item.total : 0} color="#FF6F61" style={styles.customProgressBar} />
                </LinearGradient>
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.noGoalsContainer}>
              <Text style={styles.noGoalsText}>Yikes! No monthly goals yet!</Text>
              <Button
                text="Add Monthly Goal"
                onPress={() => navigation.navigate('AddGoalScreen')}
                style={styles.trackPointsButton}
              />
            </View>
          )}
        </View>
    </View>
  );
};

export default QuestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffefd5',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  dateBox: {
    backgroundColor: '#ffefd5',
    padding: 10,
    borderRadius: 8,
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'center', 
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },
  trackPointsContainer: {
    backgroundColor: '#ffefd5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  trackPointsText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  trackPointsButton: {
    backgroundColor: '#a73d3f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 20,
    color: '#ffffff',
    alignItems: 'center',
  },
  goalItem: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  goalContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
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
