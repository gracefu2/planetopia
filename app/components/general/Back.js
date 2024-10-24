import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../theme/colors';

const Back = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.buttonText}>◀ Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
    alignSelf: 'flex-start',
    margin: 10,
    fontFamily: 'Poppins_400Regular'
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default Back;