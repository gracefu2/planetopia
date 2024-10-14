import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../theme/colors'
import sizing from '../../../theme/sizing'

const Button = ({onPress, text, white=false}) => {
  return (
    <TouchableOpacity style={[styles.button, white && {backgroundColor: colors.white}]} onPress={onPress}>
      <Text style={[styles.text, white && {color: colors.black}]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    paddingHorizontal: sizing.md,
    paddingVertical: sizing.mds,
    borderRadius: sizing.mds*2
  },
  text: {
    fontWeight: '500',
    color: 'white',
    fontSize: sizing.md
  }
})