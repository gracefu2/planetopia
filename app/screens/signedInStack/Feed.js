import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import sizing from '../../../theme/sizing';
import colors from '../../../theme/colors';
import getNewsData from '../../../utils/getNewsData';
import getGreeting from '../../../utils/getGreeting';
import { useUser } from '../../../context/UserContext';
import { LinearGradient } from 'expo-linear-gradient'; // Ensure you have this package installed

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
            return splits[splits.length - 1];
          });
      
          const catsFiltered = cats.filter(function(item, pos) {
            return cats.indexOf(item) === pos;
          });

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

  console.log(categorizedArticles[selectedCategory][0]["source"]["title"]);
  return (
    <LinearGradient colors={['#b3d99e', '#71cabb', '#2cbbd9']} style={styles.container}> {/* Gradient Background */}
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.title}>{message}</Text>
          <Text>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })}</Text>
        </View>
        <ScrollView horizontal={true} contentContainerStyle={styles.categoriesContainer} showsHorizontalScrollIndicator={false}>
          <View style={{ width: sizing.defaultContainerPadding - sizing.sm }} />
          {
            categories.map(text => 
              <TouchableOpacity
                key={text}
                onPress={() => setSelectedCategory(text)}
                style={[styles.categoryButton, selectedCategory === text && { backgroundColor: colors.extraLightBlue }]}
              >
                <Text style={[styles.categoryText, selectedCategory === text && { color: colors.blue }]}>{text}</Text>
              </TouchableOpacity>
            )
          }
          <View style={{ width: sizing.defaultContainerPadding - sizing.sm }} />
        </ScrollView>

        <View style={[styles.section, { gap: sizing.lg }]}>
          {
            categorizedArticles[selectedCategory]?.map(article =>
              <View style={{ flexDirection: 'column', backgroundColor: colors.white, borderRadius: sizing.sm }} key={article.url}>
                
                {
                  article.image && 
                  <Image style={{ objectFit: 'cover', borderTopLeftRadius: sizing.sm, borderTopRightRadius: sizing.sm, height: 150, width: "100%" }} source={{ uri: article.image }} />
                }
                <View style={{ width: '100%', flexShrink: 1, padding: sizing.md }}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={[styles.articleSummary, { color: colors.grey }]}> {/* Assuming you want to add an article summary or similar text here */}</Text>
                </View>
              </View>
            )
          }
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'transparent', // Make background transparent to show gradient
    padding: 20,
    borderRadius: 12,
    elevation: 4, // For Android shadow
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F61', // Primary color for title
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    paddingVertical: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleSummary: {
    fontSize: 14,
  },
});
