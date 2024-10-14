import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Back from '../../components/general/Back';

const ViewGuideScreen = ({ route }) => {
  const { guide } = route.params;

  return (
    <View style={styles.container}>
      <Back />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{guide.emoji} {guide.title}</Text>
        {guide.content.map((section, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            {section.type==="list-item" &&<Text style={{fontSize: 20}}>  •</Text>}
            <Text style={styles[section.type]}>{section.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 50
  },
  scrollContainer: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
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
  'list-item': {
    fontSize: 16,
    marginVertical: 0,
    paddingLeft: 8,
    paddingRight: 10
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default ViewGuideScreen;
