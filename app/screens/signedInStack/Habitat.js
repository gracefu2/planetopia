import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import Back from '../../components/general/Back';
import colors from '../../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const imageWidth = 1792; // Replace with the actual width of your image

const HabitatScreen = () => {
  const [scrollPos, setScrollPos] = useState(imageWidth/2);

  const scrollLeft = () => {
    setScrollPos((prev) => Math.max(prev - 50, 0)); // Scroll 5 pixels left
  };
  
  const scrollRight = () => {
    setScrollPos((prev) => Math.min(prev + 50, imageWidth - SCREEN_WIDTH)); // Scroll 5 pixels right
  };

  const progress = 30
  

  return (
    <View style={styles.container}>
      <Back posAbsolute={true} />
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
      <ScrollView
        horizontal
        contentOffset={{ x: scrollPos, y: 0 }}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable manual scroll, only arrows control scrolling
        style={styles.scrollView}
      >
        <MaskedView
          style={{ flex: 1 }}
          maskElement={
            <View style={styles.maskContainer}>
              <View style={[styles.grayOverlay, {width: `${100-progress}%`}]} />
              <View style={styles.rest} />
            </View>
          }
        >
          <Image
            source={require("../../../assets/planets/habitats/red/mountain.jpeg")}
            style={styles.image}
            resizeMode="cover"
          />
        </MaskedView>
        <Image
          source={require("../../../assets/planets/habitats/red/mountain.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />
      </ScrollView>



      {/* Left arrow */}
      <TouchableOpacity style={[styles.arrowContainer, styles.leftArrow]} onPress={scrollLeft}>
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>

      {/* Right arrow */}
      <TouchableOpacity style={[styles.arrowContainer, styles.rightArrow]} onPress={scrollRight}>
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  arrowContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  leftArrow: {
    left: 20,
  },
  rightArrow: {
    right: 20,
  },
  arrowText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Poppins_400Regular'
  },
  maskContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  grayOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  rest: {
    height: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  progressText: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    color: colors.lightGreen,
  },
  progressContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 60,
    width: 60,
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    right: 20
  }
});

export default HabitatScreen;