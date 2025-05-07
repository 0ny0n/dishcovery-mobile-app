import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

const { width } = Dimensions.get('window');

const featuredData = [
  {
    id: '1',
    title: 'Asian white noodle with extra seafood',
    author: 'James Spader',
    time: '20 Min',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  },
  {
    id: '2',
    title: 'Healthy Taco Salad with fresh veg',
    author: 'Olivia Rizka',
    time: '20 Min',
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
  },
];

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const popularRecipes = [
  {
    id: '1',
    title: 'Healthy Taco Salad with fresh vegetable',
    kcal: 120,
    time: '20 Min',
    image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
  },
  {
    id: '2',
    title: 'Japanese-style Pancakes Recipe',
    kcal: 64,
    time: '12 Min',
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' },
  },
];

export default function HomePage() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const username = typeof params.username === 'string' ? params.username : 'Guest';
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerRow}>
        <IconButton icon="magnify" size={28} style={styles.heartIcon} onPress={() => router.push('./Search')} />
        <View>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.username}>{username}</Text>
        </View>
        <IconButton icon="heart-outline" size={28} style={styles.heartIcon} />
      </View>

      {/* Featured */}
      <Text style={styles.sectionTitle}>Featured</Text>
      <FlatList
        data={featuredData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.featuredCard}>
            <Image source={item.image} style={styles.featuredImage} resizeMode="cover" />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <View style={styles.featuredInfoRow}>
                <Text style={styles.featuredAuthor}>{item.author}</Text>
                <Text style={styles.featuredTime}>{item.time}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingRight: 16 }}
      />

      {/* Category */}
      <View style={styles.categoryRow}>
        <Text style={styles.sectionTitle}>Category</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === item && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Popular Recipes */}
      <View style={styles.categoryRow}>
        <Text style={styles.sectionTitle}>Popular Recipes</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.popularList}>
        {popularRecipes.map((item) => (
          <View key={item.id} style={styles.recipeCard}>
            <Image source={item.image} style={styles.recipeImage} resizeMode="cover" />
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.id)}
            >
              <IconButton
                icon={favorites[item.id] ? 'heart' : 'heart-outline'}
                iconColor={favorites[item.id] ? '#e74c3c' : '#20515a'}
                size={20}
                style={{ margin: 0 }}
              />
            </TouchableOpacity>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <View style={styles.recipeInfoRow}>
              <Text style={styles.recipeInfo}>🍽 {item.kcal} Kcal</Text>
              <Text style={styles.recipeInfo}>⏱ {item.time}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* Add bottom padding for nav bar */}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faf7',
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  greeting: {
    color: '#20515a',
    fontSize: 16,
    fontWeight: '500',
  },
  username: {
    color: '#20515a',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  heartIcon: {
    backgroundColor: 'white',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a2b3b',
    marginTop: 16,
    marginBottom: 8,
  },
  seeAll: {
    color: '#7ec8c9',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 8,
  },
  featuredCard: {
    width: width * 0.8,
    height: 160,
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#abe1e5',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 18,
  },
  featuredOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(171, 225, 229, 0.7)',
  },
  featuredTitle: {
    color: '#20515a',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  featuredInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredAuthor: {
    color: '#20515a',
    fontSize: 13,
  },
  featuredTime: {
    color: '#20515a',
    fontSize: 13,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 4,
  },
  categoryList: {
    paddingVertical: 8,
  },
  categoryButton: {
    backgroundColor: '#f3f7f8',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#abe1e5',
  },
  categoryText: {
    color: '#20515a',
    fontWeight: '500',
    fontSize: 15,
  },
  categoryTextActive: {
    color: '#20515a',
    fontWeight: 'bold',
  },
  popularList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    width: width * 0.42,
    marginBottom: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 8,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 2,
    elevation: 2,
  },
  recipeTitle: {
    color: '#1a2b3b',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8,
    marginHorizontal: 8,
  },
  recipeInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 4,
  },
  recipeInfo: {
    color: '#20515a',
    fontSize: 13,
  },
}); 