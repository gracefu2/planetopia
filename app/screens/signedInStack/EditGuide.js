import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useUser } from '../../../context/UserContext';
import { db } from '../../../firebase';
import Back from '../../components/general/Back';
import Button from '../../components/general/Button';
import colors from '../../../theme/colors';

const SCREEN_HEIGHT = Dimensions.get('screen').height

const EditGuideScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('📘');
  const [content, setContent] = useState([{ type: 'paragraph', text: '' }]);
  const emojis = ['📘', '📗', '📙', '📒', '📕'];

  const handleAddContent = (type) => {
    setContent([...content, { type, text: '' }]);
  };

  const handleContentChange = (index, text) => {
    const updatedContent = [...content];
    updatedContent[index].text = text;
    setContent(updatedContent);
  };

  const userData = useUser()

  const saveGuide = async () => {
    try {
      const newID = uuid.v4()
      await setDoc(doc(db, 'guides', newID), {
        title: title, emoji: emoji, id: newID, uid: userData.uid,
        content: content, createdAt: Timestamp.now()
      })
      navigation.goBack();
    } catch (error) {
      console.error("Error saving guide: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Back />

        <TextInput
          style={styles.input}
          placeholder="Guide Title"
          value={title}
          onChangeText={setTitle}
        />

        <Text>Select Icon:</Text>
        <FlatList
          data={emojis}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setEmoji(item)}>
              <Text style={[styles.emoji, emoji === item && styles.selectedEmoji]}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <ScrollView style={{height: SCREEN_HEIGHT-375}}>
          {content.map((section, index) => (
            <TextInput
              key={index}
              style={styles[section.type]}
              placeholder={`Enter ${section.type}`}
              value={section.text}
              onChangeText={(text) => handleContentChange(index, text)}
              multiline
              scrollEnabled={false}
            />
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddContent('heading')}>
            <Text style={styles.buttonText}>+ H1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddContent('subheading')}>
            <Text style={styles.buttonText}>+ H2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddContent('list-item')}>
            <Text style={styles.buttonText}>+ LI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddContent('paragraph')}>
            <Text style={styles.buttonText}>+ P</Text>
          </TouchableOpacity>
        </View>

        <Button text="Save Guide" onPress={saveGuide}/>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
    paddingTop: 50,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
    marginBottom: 20,
    paddingVertical: 8,
    height: 32
  },
  emoji: {
    fontSize: 28,
    margin: 5,
    borderColor: "transparent",
    borderWidth: 4,
    padding: 2
  },
  selectedEmoji: {
    borderColor: colors.lightBlue,
    borderWidth: 4,
    borderRadius: 22,
    padding: 2
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  list: {
    fontSize: 16,
    marginVertical: 0,
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: colors.lightBlue,
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800'
  },
});

export default EditGuideScreen;
