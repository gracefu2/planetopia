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
      <Text style={styles.title}>Quests</Text>
      <Text style={styles.sectionTitle}>Weekly Goals</Text>
      <FlatList
        data={weeklyProgress}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalContainer}>
            <View style={styles.goalItem}>
              <Text>{item.title}</Text>
              <Text>{item.progress} / {item.total}</Text>
            </View>
            <ProgressBar progress={item.progress / item.total} color="#4caf50" style={styles.progressBar} />
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Monthly Goals</Text>
      <FlatList
        data={monthlyProgress}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalContainer}>
            <Text style={styles.goalItem}>{item.title}</Text>
            <ProgressBar progress={item.progress / item.total} color="#4caf50" style={styles.progressBar} />
          </View>
        )}
      />

      <Button
        text="+ Track points"
        onPress={() => navigation.navigate('PointsCalculator')}
        style={styles.button}
      />
    </LinearGradient>
  );
};

export default QuestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    paddingVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
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
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  goalText: {
    color: '#ffffff',
  },
  button: {
    marginTop: 20,
  },
  goalContainer: {
    marginVertical: 10,
  },
  progressBar: {
    borderRadius: 10,
    height: 10,
  },
});
