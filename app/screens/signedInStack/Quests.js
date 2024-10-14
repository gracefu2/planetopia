import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Button from '../../components/general/Button';
import { ProgressBar } from 'react-native-paper';

const QuestsScreen = () => {
  const navigation = useNavigation()
  const [weeklyProgress] = useState([
    { id: '1', title: 'Bike 5 times', progress: 60, total: 5 },
    { id: '2', title: 'Drink out of a reusable water bottle 8 times', progress: 2, total: 8 },
    { id: '3', title: 'Eat veggies 10 times', progress: 20, total: 10 },
  ]);

  const [monthlyProgress] = useState([
    { id: '1', title: 'Plant 2 trees', progress: 0, total: 2 },
    { id: '2', title: 'Walk 20 miles total', progress: 50, total: 20 },
  ]);

  return (
    <View style={styles.container}>
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
    </View>
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  goalItem: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 20,
  },
  goalContainer: {
    marginVertical: 10,
  },
});