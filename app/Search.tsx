import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

type RecipeResult = { id: number; title: string };

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const popularRecipes = [
  { id: '1', title: 'Egg & Avocado', image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' } },
  { id: '2', title: 'Bowl of ramen', image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' } },
  { id: '3', title: 'Chicken Stew', image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' } },
];
const yourChoice = [
  { id: '1', title: 'Easy homemade beef burger', author: 'James Spader', authorImg: 'https://randomuser.me/api/portraits/men/1.jpg', image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' } },
  { id: '2', title: 'Blueberry with egg for breakfast', author: 'Alice Fala', authorImg: 'https://randomuser.me/api/portraits/women/2.jpg', image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' } },
  { id: '3', title: 'Toast with egg for breakfast', author: 'Agnes', authorImg: 'https://randomuser.me/api/portraits/women/3.jpg', image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' } },
];

const SPOONACULAR_API_KEY = 'e045138faac64dbf9e8393eab2804a24';

export default function Search() {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<RecipeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchRecipes = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          query,
          number: 10,
        },
      });
      setResults(response.data.results);
    } catch (err) {
      setError('Failed to fetch recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    fetchRecipes(search);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerRow}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 40 }} />
      </View>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
      </View>
      {/* Categories */}
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, selectedCategory === cat && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Popular Recipes or Search Results */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Popular Recipes</Text>
        <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#20515a" style={{ marginVertical: 20 }} />
      ) : error ? (
        <Text style={{ color: 'red', marginVertical: 20 }}>{error}</Text>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.popularCard}>
              <Image source={{ uri: `https://spoonacular.com/recipeImages/${item.id}-312x231.jpg` }} style={styles.popularImage} />
              <Text style={styles.popularCardTitle}>{item.title}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}
        />
      ) : (
        <FlatList
          data={[] as RecipeResult[]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={null}
          contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}
        />
      )}
      {/* Your Choice */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Your Choice</Text>
        <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
      </View>
      {yourChoice.map(item => (
        <View key={item.id} style={styles.choiceCard}>
          <Image source={item.image} style={styles.choiceImage} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.choiceTitle}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Image source={{ uri: item.authorImg }} style={styles.authorImg} />
              <Text style={styles.authorName}>{item.author}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.arrowBtn}>
            <IconButton icon="arrow-right" size={20} style={{ margin: 0 }} />
          </TouchableOpacity>
        </View>
      ))}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#20515a',
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#f3f7f8',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#f3f7f8',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 8,
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
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a2b3b',
  },
  viewAll: {
    color: '#7ec8c9',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 8,
  },
  popularCard: {
    width: 90,
    height: 110,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    padding: 4,
  },
  popularImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginBottom: 6,
  },
  popularCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a2b3b',
    textAlign: 'center',
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9faf7',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  choiceImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  choiceTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a2b3b',
  },
  authorImg: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  authorName: {
    color: '#20515a',
    fontSize: 13,
    fontWeight: '500',
  },
  arrowBtn: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginLeft: 8,
    elevation: 2,
  },
}); 