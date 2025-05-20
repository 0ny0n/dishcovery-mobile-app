import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import BottomTabBar from '../components/BottomTabBar'; // Adjust the path if needed
import { useLocalSearchParams, useRouter } from 'expo-router'; // If using expo-router
// import { useRoute, useNavigation } from '@react-navigation/native'; // If using React Navigation

// Replace with your actual Spoonacular API Key
const SPOONACULAR_API_KEY = 'e045138faac64dbf9e8393eab2804a24'; // Use your key!


export default function RecipeDetailScreen() {
  // If using expo-router:
  const params = useLocalSearchParams();
  const recipeId = params.id;
  const router = useRouter();

  // If using React Navigation:
  // const route = useRoute();
  // const navigation = useNavigation();
  // const recipeId = route.params?.id;


  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('ingredients'); // 'ingredients' or 'instructions'


  useEffect(() => {
    if (!recipeId) {
      setError('Recipe ID not provided.');
      setLoading(false);
      return;
    }

    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
          params: {
            apiKey: SPOONACULAR_API_KEY,
            includeNutrition: true, // Get nutrition info
          },
        });
        setRecipe(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setError('Failed to fetch recipe details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]); // Refetch if recipeId changes


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#20515a" />
        <Text style={{marginTop: 10}}>Loading recipe...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        {/* Optional: Add a back button */}
         {/* <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
             <Text style={{color: '#20515a', fontWeight: 'bold'}}>Go Back</Text>
         </TouchableOpacity> */}
      </View>
    );
  }

  if (!recipe) {
       return (
         <View style={styles.centered}>
           <Text>Recipe not found.</Text>
            {/* Optional: Add a back button */}
             {/* <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
                 <Text style={{color: '#20515a', fontWeight: 'bold'}}>Go Back</Text>
             </TouchableOpacity> */}
         </View>
       );
  }

  // Helper to format nutrition data
  const getNutrient = (name: string) => {
      const nutrient = recipe?.nutrition?.nutrients?.find((n: any) => n.name === name);
      return nutrient ? `${Math.round(nutrient.amount)}${nutrient.unit}` : 'N/A';
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Recipe Image */}
        {recipe.image ? (
          <Image source={{ uri: recipe.image }} style={styles.recipeImage} resizeMode="cover" />
        ) : (
            <View style={styles.noImageIcon}>
                 <MaterialCommunityIcons name="food-off" size={80} color="#b0b0b0" />
                 <Text style={{marginTop: 10, color: '#b0b0b0'}}>No Image Available</Text>
            </View>
        )}


        {/* Header Overlay */}
        <View style={styles.headerOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <MaterialCommunityIcons name="close" size={24} color="#22313F" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <MaterialCommunityIcons name="heart-outline" size={24} color="#22313F" />
          </TouchableOpacity>
        </View>

        {/* Content Below Image */}
        <View style={styles.content}>
          {/* Title and Cook Time */}
          <View style={styles.titleRow}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <View style={styles.cookTime}>
              <MaterialCommunityIcons name="clock-outline" size={16} color="#888" />
              <Text style={styles.cookTimeText}>{recipe.readyInMinutes} Min</Text>
            </View>
          </View>

          {/* Description */}
          {recipe.summary ? (
              <Text style={styles.summaryText}>
                  {/* The API summary might contain HTML tags, simple regex to remove them */}
                  {recipe.summary.replace(/<\/?[^>]+(>|$)/g, '')}
              </Text>
          ) : null}


          {/* Nutrition Info */}
          {/* Check if nutrition data exists before rendering */}
          {recipe.nutrition?.nutrients && (
              <View style={styles.nutritionRow}>
                  <View style={styles.nutritionItem}>
                      <MaterialCommunityIcons name="barley" size={24} color="#20515a" />
                      <Text style={styles.nutritionText}>{getNutrient('Carbohydrates')}</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                       <MaterialCommunityIcons name="egg-outline" size={24} color="#20515a" />
                       <Text style={styles.nutritionText}>{getNutrient('Protein')}</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                      <MaterialCommunityIcons name="fire" size={24} color="#20515a" />
                      <Text style={styles.nutritionText}>{getNutrient('Calories')}</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                       <MaterialCommunityIcons name="food-drumstick-outline" size={24} color="#20515a" />
                       <Text style={styles.nutritionText}>{getNutrient('Fat')}</Text>
                  </View>
              </View>
          )}


          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'ingredients' && styles.activeTab]}
              onPress={() => setActiveTab('ingredients')}
            >
              <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'instructions' && styles.activeTab]}
              onPress={() => setActiveTab('instructions')}
            >
              <Text style={[styles.tabText, activeTab === 'instructions' && styles.activeTabText]}>Instructions</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'ingredients' ? (
              <View>
                <Text style={styles.ingredientsCount}>{recipe.extendedIngredients.length} Item</Text>
                {recipe.extendedIngredients.map((ingredient: any, index: number) => (
                  <View key={ingredient.id || index} style={styles.ingredientItem}>
                    {/* You might need to fetch ingredient images separately if not in extendedIngredients */}
                    {/* <Image source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` }} style={styles.ingredientImage} /> */}
                     <MaterialCommunityIcons name="food-outline" size={24} color="#20515a" style={{marginRight: 12}} />
                    <Text style={styles.ingredientText}>
                        {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                    </Text>
                     {/* Add + and - buttons if needed, mirroring the input section */}
                  </View>
                ))}
              </View>
            ) : (
              <View>
                 {/* Check if instructions exist */}
                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                    recipe.analyzedInstructions[0].steps.map((step: any, index: number) => (
                      <View key={step.number} style={styles.instructionItem}>
                        <Text style={styles.stepNumber}>{step.number}.</Text>
                        <Text style={styles.instructionText}>{step.step}</Text>
                      </View>
                    ))
                ) : (
                    <Text style={styles.noInstructionsText}>No detailed instructions available.</Text>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {/* Add Bottom Tab Bar */}
      {/* Ensure your BottomTabBar component is correctly implemented */}
      {/* <BottomTabBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4f4', // Background color matching the image
  },
  centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eaf4f4',
  },
  errorText: {
      color: 'red',
      textAlign: 'center',
      padding: 20,
  },
  recipeImage: {
    width: '100%',
    height: 250, // Adjust height as needed
  },
  noImageIcon: {
      width: '100%',
      height: 250,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
  },
  headerOverlay: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1, // Ensure icons are above the image
  },
  closeButton: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 8,
      elevation: 4, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
  },
  favoriteButton: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 8,
       elevation: 4, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, // Pull content up over the image
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22313F',
    flex: 1, // Allow title to take up available space
    marginRight: 10,
  },
  cookTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cookTimeText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  summaryText: {
      fontSize: 14,
      color: '#555',
      marginBottom: 15,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute items evenly
    alignItems: 'center',
    backgroundColor: '#f3f7f8',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionText: {
    fontSize: 12,
    color: '#22313F',
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1, // Make tabs take equal width
    alignItems: 'center',
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#20515a', // Active tab indicator color
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#20515a',
    fontWeight: 'bold',
  },
  tabContent: {
      paddingTop: 10, // Space below tabs
  },
  ingredientsCount: {
      fontSize: 15,
      color: '#555',
      marginBottom: 10,
      fontWeight: 'bold',
  },
  ingredientItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f9faf7', // Light background for each item
      borderRadius: 8,
      padding: 10,
      marginBottom: 8, // Space between items
  },
  ingredientText: {
      fontSize: 14,
      color: '#22313F',
      flex: 1, // Allow text to wrap
  },
  instructionItem: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'flex-start', // Align step number and text at the top
  },
  stepNumber: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#20515a',
      marginRight: 8,
  },
  instructionText: {
      fontSize: 14,
      color: '#22313F',
      flex: 1, // Allow text to wrap
  },
   noInstructionsText: {
       fontSize: 14,
       color: '#888',
       textAlign: 'center',
       paddingVertical: 20,
   }
});
