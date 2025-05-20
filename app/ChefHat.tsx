import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import BottomTabBar from '../components/BottomTabBar'; // Assuming you want the BottomTabBar here
import { useRouter } from 'expo-router'; // Import useRouter if using expo-router

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
// Replace with your actual Spoonacular API Key
const SPOONACULAR_API_KEY = 'e045138faac64dbf9e8393eab2804a24'; // Use your key!

type Ingredient = { name: string; quantity: string };

export default function ChefHat() {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', quantity: '' },
  ]);
  const [cookTime, setCookTime] = useState(''); // Cook time in minutes
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize router if using expo-router

  const handleIngredientChange = (index: number, field: 'name' | 'quantity', value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleFindRecipe = async () => {
    setLoading(true);
    setError('');
    setRecipes([]); // Clear previous results
    try {
      const ingredientList = ingredients
        .filter(ing => ing.name.trim()) // Only include non-empty ingredient names
        .map(ing => ing.name.trim())
        .join(',');

      if (!ingredientList) {
        setError('Please enter at least one ingredient.');
        setLoading(false);
        return;
      }

      const params: any = {
        apiKey: SPOONACULAR_API_KEY,
        includeIngredients: ingredientList,
        type: selectedCategory.toLowerCase(), // Use selected category
        number: 5, // Get up to 5 recipes
      };

      if (cookTime && !isNaN(parseInt(cookTime))) {
          params.maxReadyTime = parseInt(cookTime); // Add cook time if valid
      }


      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: params,
      });

      if (response.data.results.length === 0) {
          setError('No recipes found with the given ingredients and criteria.');
      } else {
          setRecipes(response.data.results);
      }

    } catch (err) {
      console.error("API Error:", err); // Log the full error for debugging
      setError('Failed to fetch recipes. Please check your API key and internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // New function to navigate to recipe detail
  const navigateToRecipeDetail = (recipeId: number) => {
    router.push({ pathname: '/recipe', params: { id: recipeId } });
    // If using React Navigation, it might be:
    // navigation.navigate('RecipeDetail', { id: recipeId });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#eaf4f4' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.headerContainer}>
           {/* Add back arrow if needed, similar to other pages */}
           {/* <MaterialCommunityIcons name="arrow-left" size={24} color="#22313F" style={{marginRight: 10}} /> */}
           <Text style={styles.header}>Dishcovery</Text>
           {/* Add settings/other icon if needed */}
        </View>

        {/* Category */}
        <View style={styles.categoryRow}>
          <Text style={styles.sectionTitle}>Category</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryButtonContainer}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryButton, selectedCategory === cat && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Ingredients */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Ingredients</Text>
        {ingredients.map((ing, idx) => (
          <View key={idx} style={styles.ingredientRow}>
            <TextInput
              style={[styles.input, styles.ingredientNameInput]}
              placeholder="Item name"
              placeholderTextColor="#b0b0b0"
              value={ing.name}
              onChangeText={text => handleIngredientChange(idx, 'name', text)}
            />
            <TextInput
              style={[styles.input, styles.ingredientQuantityInput]}
              placeholder="Quantity"
              placeholderTextColor="#b0b0b0"
              value={ing.quantity}
              onChangeText={text => handleIngredientChange(idx, 'quantity', text)}
              keyboardType="default" // Use numeric if only numbers are allowed
            />
            {ingredients.length > 1 ? (
              <TouchableOpacity onPress={() => removeIngredient(idx)} style={styles.iconButton}>
                 <MaterialCommunityIcons name="minus-circle-outline" size={26} color="#b0b0b0" />
              </TouchableOpacity>
            ) : (
               // Optional: Add a plus icon on the last row if only one exists
               <TouchableOpacity onPress={addIngredient} style={styles.iconButton}>
                  <MaterialCommunityIcons name="plus-circle-outline" size={26} color="#b0b0b0" />
               </TouchableOpacity>
            )}
          </View>
        ))}
         {/* "Add new Ingredient" row if there's more than one input initially */}
         {ingredients.length > 0 && (
             <TouchableOpacity style={styles.addIngredientRow} onPress={addIngredient}>
                 <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#20515a" />
                 <Text style={styles.addIngredientText}>Add new Ingredient</Text>
             </TouchableOpacity>
         )}


        {/* Cook Time */}
        {/* Removed Serves based on request */}
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="clock-outline" size={24} color="#20515a" style={{ marginRight: 8 }} />
          <Text style={styles.detailLabel}>Cook time</Text>
           <TextInput
              style={styles.detailInput}
              placeholder="45 min"
              placeholderTextColor="#b0b0b0"
              value={cookTime}
              onChangeText={setCookTime}
              keyboardType="numeric" // Use numeric keyboard for time
            />
           <MaterialCommunityIcons name="arrow-right" size={24} color="#b0b0b0" />
        </View>


        {/* Find Recipe Button */}
        <TouchableOpacity style={styles.findBtn} onPress={handleFindRecipe} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.findBtnText}>Find Food Recipe</Text>
          )}
        </TouchableOpacity>

        {/* Results */}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {recipes.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Recipes Found:</Text>
            <FlatList
              data={recipes}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                // Wrap recipe card content in TouchableOpacity
                <TouchableOpacity
                  style={styles.recipeCard}
                  onPress={() => navigateToRecipeDetail(item.id)} // Add onPress handler
                >
                  {item.image && (
                    <Image source={{ uri: item.image }} style={styles.recipeImage} resizeMode="cover" />
                  )}
                  <View style={styles.recipeInfo}>
                     <Text style={styles.recipeTitle}>{item.title}</Text>
                     {/* You can add more recipe details here if available in API response */}
                     {/* <Text>{item.readyInMinutes} min</Text> */}
                  </View>
                </TouchableOpacity>
              )}
              scrollEnabled={false} // Important when nesting FlatList in ScrollView
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        )}
      </ScrollView>
       {/* Add Bottom Tab Bar here */}
       {/* Ensure your BottomTabBar component is correctly implemented */}
       <BottomTabBar />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
      padding: 20,
      paddingBottom: 100, // Make sure paddingBottom is sufficient to prevent content from being hidden by the fixed tab bar
      backgroundColor: '#eaf4f4',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', // Center the title
      marginBottom: 20,
      marginTop: 8,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#20515a',
      alignSelf: 'center', // Keep this to center the text within its container
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#22313F',
    },
     categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
         marginTop: 8,
    },
    seeAll: {
      color: '#7ec8c9',
      fontWeight: 'bold',
      fontSize: 14,
    },
    categoryButtonContainer: {
        paddingRight: 20, // Add some padding at the end for horizontal scroll
        marginBottom: 20,
    },
    categoryButton: {
      backgroundColor: '#f3f7f8',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginRight: 10, // Space between buttons
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
    ingredientsLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#22313F',
        marginBottom: 8,
         marginTop: 20,
    },
    ingredientRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      fontSize: 15,
       color: '#22313F',
    },
    ingredientNameInput: {
      flex: 1,
      marginRight: 8,
    },
    ingredientQuantityInput: {
      width: 90, // Adjusted width to fit content and icon
      marginRight: 8,
    },
     iconButton: {
         padding: 2, // Make touchable area larger
     },
    addIngredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 16,
    },
    addIngredientText: {
        color: '#20515a',
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 15,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f7f8',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 18,
         marginTop: 10,
    },
     detailLabel: {
        color: '#20515a',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
     },
    detailInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        fontSize: 15,
        marginRight: 12, // Space before the arrow icon
        color: '#22313F',
    },
    findBtn: {
      backgroundColor: '#22313F',
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 10, // Space above the button
      marginBottom: 20, // Space below the button
    },
    findBtnText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    error: {
      color: 'red',
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
    },
    resultsHeader: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#22313F',
      marginBottom: 10,
    },
    recipeCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 0, // FlatList handles spacing with ItemSeparatorComponent
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1,
         shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    recipeImage: {
        width: 80,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    recipeInfo: {
        flex: 1,
    },
    recipeTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#22313F',
    },
}); 