import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import colors from '../../../../theme/colors';
import { useUser } from '../../../../context/UserContext';
import Button from '../../../components/general/Button';
import { useNavigation } from '@react-navigation/native';

const ProfilePictureEditor = () => {
  const userData = useUser()
  const [selectedImage, setSelectedImage] = useState(userData.profilePic);
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation()
  const handleSave = async () => {
    if (!selectedImage) return;

    await setDoc(doc(db, 'users', userData.uid), {
      profilePic: selectedImage,
    }, { merge: true });
    
    console.log('Profile picture updated:', selectedImage);
    navigation.navigate('Profile')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Profile Picture:</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => setSelectedImage('bear')}>
          <Image source={require('../../../../assets/profile-pics/bear.png')}
            style={[styles.image, selectedImage==='bear' && styles.selectedImage]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage('octopus')}>
          <Image source={require('../../../../assets/profile-pics/octopus.png')}
            style={[styles.image, selectedImage==='octopus' && styles.selectedImage]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage('crab')}>
          <Image source={require('../../../../assets/profile-pics/crab.png')}
            style={[styles.image, selectedImage==='crab' && styles.selectedImage]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage('fish')}>
          <Image source={require('../../../../assets/profile-pics/fish.png')}
            style={[styles.image, selectedImage==='fish' && styles.selectedImage]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage('lion')}>
          <Image source={require('../../../../assets/profile-pics/lion.png')}
            style={[styles.image, selectedImage==='lion' && styles.selectedImage]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage('whale')}>
          <Image source={require('../../../../assets/profile-pics/whale.png')}
            style={[styles.image, selectedImage==='whale' && styles.selectedImage]} />
        </TouchableOpacity>
      </View>
      {
        userData.profilePic !== selectedImage &&
        <Button text="Save New Profile Picture" onPress={handleSave} />
      }
    </View>
  );
};

export default ProfilePictureEditor;

const styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 20
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: 50
  },
  selectedImage: {
    borderColor: colors.lightGreen,
    borderWidth: 5
  },
});
