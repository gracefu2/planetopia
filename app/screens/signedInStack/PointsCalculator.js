import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Back from "../../components/general/Back"

const PointsCalculatorScreen = () => {
  const [dailyPoints, setDailyPoints] = useState(0);

  const categories = [
    {
      id: '1',
      title: 'Transportation (1 mile)',
      items: [
        { id: '1', title: 'Bike', emoji: '🚲', points: 5 },
        { id: '2', title: 'Carpool', emoji: '🚗', points: 5 },
        { id: '3', title: 'Public transit', emoji: '🚌', points: 4 },
        { id: '4', title: 'Walk', emoji: '🚶‍♂️', points: 6 },
        { id: '5', title: 'Electric scooter', emoji: '🛴', points: 4 },
        { id: '6', title: 'Electric car', emoji: '⚡️🚗', points: 3 },
      ],
    },
    {
      id: '2',
      title: 'Utilities',
      items: [
        { id: '1', title: 'Turn off lights', emoji: '💡', points: 2 },
        { id: '2', title: 'Shorter shower', emoji: '🚿', points: 3 },
        { id: '3', title: 'Unplug devices', emoji: '🔌', points: 2 },
        { id: '4', title: 'Cold water wash', emoji: '🧺', points: 4 },
        { id: '5', title: 'Use LED bulbs', emoji: '💡', points: 3 },
        { id: '6', title: 'Open windows for cooling', emoji: '🌬️', points: 3 },
      ],
    },
    {
      id: '3',
      title: 'Food & Drink',
      items: [
        { id: '1', title: 'Plant-based meal', emoji: '🥗', points: 5 },
        { id: '2', title: 'Reusable bottle', emoji: '🥤', points: 3 },
        { id: '3', title: 'Local produce', emoji: '🍎', points: 4 },
        { id: '4', title: 'Compost food', emoji: '🌱', points: 2 },
        { id: '5', title: 'Bulk shopping', emoji: '🛒', points: 3 },
        { id: '6', title: 'Reusable coffee cup', emoji: '☕️', points: 3 },
      ],
    },
    {
      id: '4',
      title: 'Home & Garden',
      items: [
        { id: '1', title: 'Plant a tree', emoji: '🌳', points: 7 },
        { id: '2', title: 'Start composting', emoji: '🌱', points: 5 },
        { id: '3', title: 'Water plants with rainwater', emoji: '🌧️', points: 4 },
        { id: '4', title: 'Use eco-friendly cleaners', emoji: '🧴', points: 3 },
        { id: '5', title: 'Create a pollinator garden', emoji: '🌼', points: 6 },
        { id: '6', title: 'Switch to solar energy', emoji: '☀️', points: 10 },
      ],
    },
  ];
  

  const handleAddPoints = (points) => {
    setDailyPoints(dailyPoints + points);
  };

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <FlatList
        data={item.items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleAddPoints(item.points)}
          >
            <Text style={styles.itemEmoji}>{item.emoji}</Text>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemPoints}>+{item.points} pts</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Back />
      <Text style={styles.dailyPoints}>Daily Points: {dailyPoints}</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
      />
    </View>
  );
};

export default PointsCalculatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    paddingTop: 50,
    marginVertical: 20
  },
  dailyPoints: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  itemEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  itemPoints: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: 'bold',
  },
});
