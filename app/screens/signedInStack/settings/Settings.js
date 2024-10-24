import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfilePictureEditor from './ProfilePictureEditor'
import Back from '../../../components/general/Back'
import Button from '../../../components/general/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../../../../firebase'
import { useNavigation } from '@react-navigation/native'

const SettingsScreen = () => {
  const navigation = useNavigation()
  const handleLogout = () => {
    signOut(auth)
    navigation.navigate('Welcome')
  }
  return (
    <View style={styles.container}>
      <Back />
      <Text style={{ fontFamily: 'Poppins_400Regular' }}>Settings</Text>
      <Button white={true} text={"Logout"} onPress={handleLogout}/>
      <ProfilePictureEditor/>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
    gap: sizing.md,
    paddingHorizontal: sizing.xl,
    paddingVertical: sizing.xxxl
  }
})