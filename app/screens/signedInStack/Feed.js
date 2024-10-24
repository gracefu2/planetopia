import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import sizing from '../../../theme/sizing';
import colors from '../../../theme/colors'; // Ensure your colors are updated here
import getNewsData from '../../../utils/getNewsData';
import getGreeting from '../../../utils/getGreeting';
import { useUser } from '../../../context/UserContext';
import { Linking } from 'react-native';

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
        <Text style={{ fontFamily: 'Poppins_400Regular' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })}</Text>
      </View>
      <ActivityIndicator />
    </View>
  );

  const openLink = async (url) => {
    await Linking.openURL(url)
  } 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{message}</Text>
        <Text style={{ fontFamily: 'Poppins_400Regular' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })}</Text>
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
            <TouchableOpacity onPress={() => openLink(article.url)} style={styles.articleContainer} key={article.url}>
              {
                article.image && 
                <Image style={styles.articleImage} source={{ uri: article.image }} />
              }
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={[styles.articleDescription, { color: colors.midGray }]}>
                  {article["source"]["title"] && article["source"]["title"] + " · "}{new Date(article.dateTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Text style={styles.articleDescription}>{article.body.slice(0, 100)}...</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: '#8BE3F5',
    flex: 1,
  },
  title: {
    fontSize: sizing.lg,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: sizing.sm,
    color: colors.primary, // Use primary color for title
    fontFamily: 'Poppins_600SemiBold'
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
    fontFamily: 'Poppins_600SemiBold'
  },
  articleContainer: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: sizing.sm,
    borderWidth: 1,
    borderColor: colors.midGray,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // For Android
    marginBottom: sizing.sm, // Space between articles
  },
  articleImage: {
    objectFit: 'cover',
    borderTopLeftRadius: sizing.sm,
    borderTopRightRadius: sizing.sm,
    height: 150,
    width: "100%",
  },
  articleContent: {
    width: '100%',
    flexShrink: 1,
    padding: sizing.md,
  },
  articleTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#78b900', // Use blue for article title
    fontFamily: 'Poppins_700Bold'
  },
  articleDescription: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'Poppins_400Regular'
  },
});
