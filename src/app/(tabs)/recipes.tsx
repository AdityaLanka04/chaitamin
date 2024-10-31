
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the Recipe interface
interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
}

// Sample recipe data
const recipesData: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Water',
    image: 'https://example.com/lemon-water.jpg', // Replace with actual image URLs
    description: 'A refreshing drink to keep you hydrated.',
  },
  {
    id: '2',
    title: 'Cucumber Mint Water',
    image: 'https://example.com/cucumber-mint-water.jpg',
    description: 'A cool drink perfect for summer.',
  },
  {
    id: '3',
    title: 'Berry Infused Water',
    image: 'https://example.com/berry-infused-water.jpg',
    description: 'A sweet and fruity hydration option.',
  },
  // Add more recipes as needed
];

interface RecipeCardProps {
  recipe: Recipe; // Use the Recipe interface to type the recipe prop
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.cardTitle}>{recipe.title}</Text>
      <Text style={styles.cardDescription}>{recipe.description}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const Recipes: React.FC = () => {
  const renderItem = ({ item }: { item: Recipe }) => <RecipeCard recipe={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <TouchableOpacity style={styles.shareButton}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.shareButtonText}>Share a Recipe</Text>
      </TouchableOpacity>
      <FlatList
        data={recipesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A9D8F',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  shareButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2A9D8F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Recipes;