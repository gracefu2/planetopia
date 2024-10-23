import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

const habitats = {
  Mercury: {
    count: 2,
    name: 'Ron',
  },
  Venus: {
    count: 3,
    name: 'Vre',
  },
  Earth: {
    count: 4,
    name: 'Teauna',
  },
  Mars: {
    count: 5,
    name: 'Martrface',
  },
  Jupiter: {
    count: 6,
    name: 'Jpiter',
  },
  Saturn: {
    count: 7,
    name: 'Swith Solar Winds',
  },
  Uranus: {
    count: 8,
    name: 'Uranus',
  },
  Neptune: {
    count: 9,
    name: 'Neptune',
  },
};

const PlanetHabitatsScreen = () => {
  const handleHabitatRestore = (planetName) => {
    Alert.alert(`You have restored a habitat in ${planetName}!`, `Informative blurb about the habitat in ${planetName}.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planet Habitants</Text>
      <ScrollView>
        {Object.keys(habitats).map((planet) => (
          <View key={planet} style={styles.planetContainer}>
            <Text style={styles.planetName}>{planet}</Text>
            <Text style={styles.habitatCount}>{habitats[planet].count} Habitats</Text>
            <Text style={styles.habitatName}>Habitat Name: {habitats[planet].name}</Text>
            <TouchableOpacity 
              style={styles.restoreButton} 
              onPress={() => handleHabitatRestore(planet)}
            >
              <Text style={styles.buttonText}>Restore Habitat</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PlanetHabitatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa', // Light blue background for the screen
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796b', // Dark teal for title
  },
  planetContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff', // White background for planet containers
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3, // For Android shadow
  },
  planetName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d32f2f', // Red for planet names
  },
  habitatCount: {
    fontSize: 16,
    color: '#555555', // Grey for habitat counts
  },
  habitatName: {
    fontSize: 16,
    color: '#7b1fa2', // Purple for habitat names
  },
  restoreButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#388e3c', // Green for restore button
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // White text for button
    fontWeight: 'bold',
  },
});
