import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Button from '../../components/general/Button';
import colors from '../../../theme/colors';
import sizing from '../../../theme/sizing';
import generateUsername from '../../../utils/generateUsername';

const CreateAccountScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  const handleCreateAccount = async () => {
    if (name === '' || email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        dateJoined: new Date().toISOString(),
        lastDateLoggedIn: new Date().toISOString(),
        todayDateLoggedIn: new Date().toISOString(),
        uid: uid,
        username: generateUsername(),
        profilePic: 'whale',
        friends: 0, streak: 0, points: 0,
        
      })

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('BottomTab'); // Navigate to the home screen or another screen after successful account creation
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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

      <Button onPress={handleCreateAccount} text="Create account" />

      <View style={styles.bottomText}>
        <Text style={{color: colors.darkGray}}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{fontFamily: 'Poppins_500Medium'}}>Login</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: sizing.defaultContainerPadding,
    gap: sizing.defaultContainerPadding
  },
  title: {
    fontSize: sizing.lg,
    fontFamily: 'Poppins_600SemiBold',
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