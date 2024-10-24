import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../theme/colors';

const Back = ({posAbsolute=false}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={[posAbsolute && styles.posAbsolute, styles.button]} onPress={() => navigation.goBack()}>
      <Text style={styles.buttonText}>{"<"} Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  posAbsolute: {
    position: 'absolute',
    zIndex: 100,
    top: 50
  },
  button: {
    padding: 10,
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
    alignSelf: 'flex-start',
    margin: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular'
  },
});

export default Back;