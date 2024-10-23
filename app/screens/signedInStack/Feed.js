import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import sizing from '../../../theme/sizing';
import colors from '../../../theme/colors'; // Ensure your colors are updated here
import getNewsData from '../../../utils/getNewsData';
import getGreeting from '../../../utils/getGreeting';
import { useUser } from '../../../context/UserContext';

const colors = {
  white: '#FFFFFF',
  offWhite: '#F9F9F9',
  black: '#000000',
  midGray: '#A0A0A0',
  blue: '#2cbbd9', // Using the blue from ProfileScreen
  extraLightBlue: '#b3d99e', // Using the light green from ProfileScreen
  primary: '#FF6F61', // Primary color used in ProfileScreen
  secondary: '#71cabb', // Secondary color used in ProfileScreen
};

const FeedScreen = () => {
  const userData = useUser();
  const message = getGreeting(userData?.name);

  const categories = [
    "All", "Climate Change", "Renewable", "Environmental Compliance", "Engineering", "Sustainability"
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [categorizedArticles, setCategorizedArticles] = useState({
    "All": [], 
    "Climate Change": [],
    "Renewable": [],
    "Environmental Compliance": [],
    "Engineering": [],
    "Sustainability": []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      getNewsData().then(response => {
        let newCategorizedArticles = {
          "All": response.data.articles.results, 
          "Climate Change": [],
          "Renewable": [],
          "Environmental Compliance": [],
          "Engineering": [],
          "Sustainability": []
        };
        response.data.articles.results.forEach(data => {
          const cats = data.categories.map(cat => {
            const splits = cat.label.split("/");
            return splits[splits.length-1];
          });

          const catsFiltered = cats.filter((item, pos) => cats.indexOf(item) === pos);

          catsFiltered.forEach(cat => {
            if (newCategorizedArticles[cat]) {
              newCategorizedArticles[cat].push(data);
            }
          });
        });

        setCategorizedArticles(newCategorizedArticles);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    };

    fetchNews();
  }, []);

  if (loading) return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{message}</Text>
        <Text>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })}</Text>
      </View>
      <ActivityIndicator />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{message}</Text>
        <Text>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })}</Text>
      </View>
      <ScrollView horizontal={true} contentContainerStyle={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
        <View style={{ width: sizing.defaultContainerPadding - sizing.sm }} />
        {
          categories.map(text => (
            <TouchableOpacity
              key={text}
              onPress={() => setSelectedCategory(text)}
              style={[styles.categoryButton, selectedCategory === text && { backgroundColor: colors.extraLightBlue }]}
            >
              <Text style={[styles.categoryText, selectedCategory === text && { color: colors.blue }]}>{text}</Text>
            </TouchableOpacity>
          ))
        }
        <View style={{ width: sizing.defaultContainerPadding - sizing.sm }} />
      </ScrollView>

      <View style={[styles.section, { gap: sizing.lg }]}>
        {
          categorizedArticles[selectedCategory]?.map(article => (
            <View style={{ flexDirection: 'column', backgroundColor: colors.white, borderRadius: sizing.sm }} key={article.url}>
              {
                article.image && 
                <Image style={{ objectFit: 'cover', borderTopLeftRadius: sizing.sm, borderTopRightRadius: sizing.sm, height: 150, width: "100%" }} source={{ uri: article.image }} />
              }
              <View style={{ width: '100%', flexShrink: 1, padding: sizing.md }}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={[styles.articleDescription, { color: colors.midGray }]}>
                  {article["source"]["title"] && article["source"]["title"] + " · "}{new Date(article.dateTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Text style={styles.articleDescription}>{article.body.slice(0, 100)}...</Text>
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizing.xxxl,
    backgroundColor: colors.offWhite,
    flex: 1,
  },
  title: {
    fontSize: sizing.lg,
    fontWeight: 'bold',
    marginBottom: sizing.sm,
    color: colors.primary, // Use primary color for title
  },
  section: {
    paddingHorizontal: sizing.defaultContainerPadding,
    marginBottom: sizing.lg,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: sizing.sm,
    marginBottom: sizing.lg,
  },
  categoryButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.white, // Maintain white for buttons
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.midGray, // Add border for better visibility
  },
  categoryText: {
    color: colors.black,
    fontWeight: '500',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blue, // Use blue for article title
  },
  articleDescription: {
    fontSize: 14,
    marginTop: 8,
  },
});
