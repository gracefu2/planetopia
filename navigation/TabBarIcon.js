import { Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import colors from '../theme/colors'
import * as Haptics from 'expo-haptics';

const TabBarIcon = ({iconName, iconOutlineName, focused, navRoute, color=colors.darkBlue, outlineColor=colors.darkBlue}) => {
  const iconScale = useSharedValue(1);
  const iconStyle = useAnimatedStyle(() => ({transform: [{scale: iconScale.value}]}))
  const navigation = useNavigation()

  const onIconPress = () => {
    navigation.navigate(navRoute, {merge: true})
    iconScale.value = withTiming(1, {duration: 500, easing: Easing.out(Easing.back(5.5)), reduceMotion: ReduceMotion.System});
  }

  const onPressIn = () => {
    iconScale.value = 0.9
    Haptics.impactAsync('light')
  }

  return (
    <Pressable onPressIn={onPressIn}
      onPressOut={onIconPress}
    >
        <Animated.View style={iconStyle}>
          {
            focused ?
            <Ionicons name={iconName} size={33} color={color} /> :
            <Ionicons name={iconOutlineName} size={33} color={outlineColor} />
          }
        </Animated.View>
    </Pressable>
  )
}

export default TabBarIcon