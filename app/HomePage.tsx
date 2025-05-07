import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import BottomTabBar from '../components/BottomTabBar';

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
    <View style={{ flex: 1, backgroundColor: '#f9faf7' }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={true}>
        {/* Welcome Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Welcome to Dishcovery!</Text>
          <Text style={styles.bannerSubText}>Discover, cook, and enjoy delicious recipes every day.</Text>
        </View>
        {/* Header */}
        <View style={[styles.headerRow, { marginBottom: 18 }]}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
          <IconButton icon="heart-outline" size={28} style={styles.heartIcon} />
        </View>
        {/* Featured Chefs */}
        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Featured Chefs</Text>
        <FlatList
          data={[
            { id: '1', name: 'Chef Anna', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { id: '2', name: 'Chef Ben', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { id: '3', name: 'Chef Clara', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
            { id: '4', name: 'Chef David', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.chefCard}>
              <Image source={{ uri: item.avatar }} style={styles.chefAvatar} />
              <Text style={styles.chefName}>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 40 }}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          style={{ marginBottom: 24 }}
        />
        {/* Featured */}
        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Featured</Text>
        <FlatList
          data={featuredData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={[styles.featuredCard, index === featuredData.length - 1 && { marginBottom: 24 }]}>
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
          contentContainerStyle={{ paddingRight: 16, paddingBottom: 24 }}
        />

        {/* Category */}
        <View style={[styles.categoryRow, { marginBottom: 12, marginTop: 18 }]}>
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
          contentContainerStyle={[styles.categoryList, { paddingVertical: 8, paddingLeft: 16, paddingRight: 40 }]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryButton, selectedCategory === item && styles.categoryButtonActive, { marginRight: 16 }]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
          style={{ marginBottom: 24 }}
        />

        {/* Popular Recipes */}
        <View style={[styles.categoryRow, { marginBottom: 12, marginTop: 18 }]}>
          <Text style={styles.sectionTitle}>Popular Recipes</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.popularList, { marginBottom: 24 }]}>
          {popularRecipes.map((item, idx) => (
            <View key={item.id} style={[styles.recipeCard, idx !== 0 && { marginLeft: 16 }, idx === popularRecipes.length - 1 && { marginBottom: 32 }]}>
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
        {/* Tips & Tricks */}
        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Tips & Tricks</Text>
        <View style={[styles.tipsContainer, { marginBottom: 24 }]}>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>How to keep herbs fresh</Text>
            <Text style={styles.tipDesc}>Wrap them in a damp paper towel and store in a ziplock bag in the fridge.</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Perfect boiled eggs</Text>
            <Text style={styles.tipDesc}>Boil for 7 minutes for a creamy yolk, then cool in ice water.</Text>
          </View>
        </View>
      </ScrollView>
      <BottomTabBar />
    </View>
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
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
    minWidth: 140,
    maxWidth: 180,
    marginBottom: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 0,
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
  banner: {
    backgroundColor: '#abe1e5',
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    marginBottom: 10,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#20515a',
  },
  bannerSubText: {
    fontSize: 15,
    color: '#20515a',
    marginTop: 4,
  },
  chefCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    width: 90,
    height: 110,
    marginBottom: 0,
    justifyContent: 'center',
  },
  chefAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 6,
  },
  chefName: {
    fontSize: 13,
    color: '#20515a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  tipCard: {
    flex: 1,
    backgroundColor: '#f3f7f8',
    borderRadius: 14,
    padding: 12,
    marginRight: 8,
  },
  tipTitle: {
    fontWeight: 'bold',
    color: '#20515a',
    marginBottom: 4,
  },
  tipDesc: {
    color: '#1a2b3b',
    fontSize: 13,
  },
}); 