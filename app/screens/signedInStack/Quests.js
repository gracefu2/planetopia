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

  return (
    <LinearGradient colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.container}>
      
    {/* Heading Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.dateBox}>October 20, 2024</Text>
        <Text style={styles.headerTitle}>My Quests</Text>
      </View>

      {/* Track Points Section */}
      <View style={styles.trackPointsContainer}>
        <Text style={styles.trackPointsText}>Track Your Daily Points</Text>
        <Button
          text="+ Track points"
          onPress={() => navigation.navigate('PointsCalculator')}
          style={styles.trackPointsButton}
        />
      </View>

      {/* Progress Section */}
      <Text style={styles.sectionTitle}>Weekly Goals</Text>
      {weeklyProgress.length > 0 ? (
        <FlatList
          data={weeklyProgress}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.goalContainer}>
              <View style={styles.goalItem}>
                <Text>{item.title}</Text>
                <Text>{item.progress} / {item.total}</Text>
              </View>
              <ProgressBar progress={item.progress / item.total} color="#FF6F61" style={styles.customProgressBar} />
            </View>
          )}
        />
      ) : (
        <Text style={styles.noGoalsText}>Oh no! It looks like you have no weekly goals!</Text>
      )}

      <Text style={styles.sectionTitle}>Monthly Goals</Text>
      {monthlyProgress.length > 0 ? (
        <FlatList
          data={monthlyProgress}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.goalContainer}>
              <View style={styles.goalItem}>
                <Text>{item.title}</Text>
                <Text>{item.progress} / {item.total}</Text>
              </View>
              <ProgressBar 
                progress={item.total > 0 ? item.progress / item.total : 0} // Prevent division by zero
                color="#FF6F61" 
                style={styles.customProgressBar}  
              />
            </View>
          )}
        />
        ) : (
        <Text style={styles.noGoalsText}>Yikes! No monthly goals yet!</Text>
      )}
    </LinearGradient>
  );
};

export default QuestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  headerContainer: {
    backgroundColor: '#a73d3f',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateBox: {
    backgroundColor: '#f7f3e9',
    padding: 10,
    borderRadius: 8,
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  trackPointsContainer: {
    backgroundColor: '#ffefd5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: '#ffffff',
  },
  goalItem: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#ef8332',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalContainer: {
    marginVertical: 10,
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
