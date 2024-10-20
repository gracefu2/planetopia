import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/general/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import sizing from '../../../theme/sizing';
import colors from '../../../theme/colors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('BottomTab')
      })
      .catch(err => {
        console.log(err.code)
        if (err.code==="auth/invalid-credential") {
          Alert.alert("Error", "Wrong email/password", "Try Again")
        }
      })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email} autoCapitalize={false}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button onPress={handleLogin} text="Login" />

      <View style={styles.bottomText}>
        <Text style={{color: colors.darkGray}}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}><Text style={{fontWeight: '500'}}>Create an account</Text></TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5efff',
    justifyContent: 'center',
    padding: sizing.defaultContainerPadding,
    gap: sizing.defaultContainerPadding
  },
  title: {
    fontSize: sizing.lg,
    fontWeight: 'bold',
    marginBottom: sizing.defaultContainerPadding,
    textAlign: 'center',
  },
  input: {
    borderColor: colors.gray,
    borderWidth: 1,
    paddingHorizontal: sizing.md,
    paddingVertical: sizing.mds,
    borderRadius: sizing.mds*2
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  }
});
