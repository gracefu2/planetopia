import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import Back from '../../components/general/Back';

const habitats = {
  Mars: {
    count: 2,
    name: 'Mars',
    imagePath: require("../../../assets/planets/red.jpeg"),
    isRestoring: true
  },
  Uranus: {
    count: 8,
    name: 'Uranus',
    imagePath: require("../../../assets/planets/bluegreen.jpeg"),
    isRestoring: false
  },
  Neptune: {
    count: 9,
    name: 'Neptune',
    imagePath: require("../../../assets/planets/blue.jpeg"),
    isRestoring: false
  },
};

const PlanetHabitatsScreen = ({ navigation }) => {
  const handleHabitatRestore = (planetName) => {
    navigation.navigate('Habitat')
    // Alert.alert(`You have restored a habitat in ${planetName}!`, `Informative blurb about the habitat in ${planetName}.`);
  };

  return (
    <View style={styles.container}>
      <Back />
      <Text style={styles.title}>Planet Habitats</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {Object.keys(habitats).map((planet) => (
          <View key={planet} style={styles.planetContainer}>
            <Image
              source={habitats[planet].imagePath}
              style={styles.circle}
            />
            <Text style={styles.planetName}>{habitats[planet].name}</Text>
            <Text style={styles.habitatCount}>{habitats[planet].count} Habitats</Text>
            <TouchableOpacity 
              disabled={!habitats[planet].isRestoring}
              style={[habitats[planet].isRestoring ? styles.restoreButton : styles.notRestoreButton]} 
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
    paddingTop: 50,
    backgroundColor: '#e0f7fa', // Light blue background for the screen
  },
  goBackButton: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f44336', // Red for Go Back button
    alignItems: 'center',
    marginTop: 20,
  },
  goBackText: {
    color: '#ffffff', // White text for button
    fontFamily: 'Poppins_600SemiBold',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796b', // Dark teal for title
  },
  scrollView: {
    paddingTop: 20, // More padding at the top of the scroll view
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
    alignItems: 'center', // Center content horizontally
  },
  circle: {
    width: 80, // Adjust size for the circle
    height: 80,
    borderRadius: 40, // Make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Space between circle and text
  },
  planetName: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
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
  notRestoreButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#999', // Green for restore button
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // White text for button
    fontFamily: 'Poppins_600SemiBold',
  },
});
