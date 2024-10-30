// src/app/(tabs)/recipes.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/src/constants/Colors';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  calories: number;
}

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    // Implement API call or storage logic here
    const data = [
      {
        id: 1,
        title: 'Quinoa Bowl',
        description: 'Healthy quinoa bowl with roasted vegetables',
        image: 'path_to_image',
        ingredients: ['quinoa', 'vegetables', 'olive oil'],
        instructions: ['Cook quinoa', 'Roast vegetables', 'Combine'],
        duration: '25 mins',
        difficulty: 'easy' as 'easy',
        calories: 350,
      },
      // Add more recipes
    ];
    setRecipes(data);
  };

  const renderFilter = () => (
    <View style={styles.filterContainer}>
      {['all', 'vegetarian', 'vegan', 'quick'].map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter(filter)}
        >
          <ThemedText
            style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextActive,
            ]}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.recipeContent}>
        <ThemedText style={styles.recipeTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.recipeDescription}>
          {item.description}
        </ThemedText>
        <View style={styles.recipeMetadata}>
          <View style={styles.metadataItem}>
            <Ionicons name="time" size={16} color={Colors.primary} />
            <ThemedText style={styles.metadataText}>{item.duration}</ThemedText>
          </View>
          <View style={styles.metadataItem}>
            <Ionicons name="flame" size={16} color={Colors.primary} />
            <ThemedText style={styles.metadataText}>
              {item.calories} cal
            </ThemedText>
          </View>
          <View style={styles.metadataItem}>
            <Ionicons 
              name={item.difficulty === 'easy' ? 'star' : item.difficulty === 'medium' ? 'star-half' : 'star-outline'} 
              size={16} 
              color={Colors.primary} 
            />
            <ThemedText style={styles.metadataText}>
              {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Recipes</ThemedText>
      </LinearGradient>
      
      {renderFilter()}
      
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.recipeList}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textLight,
    fontFamily: 'Helvetica',
    letterSpacing: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
  filterTextActive: {
    color: Colors.textLight,
  },
  recipeList: {
    padding: 16,
  },
  recipeCard: {
    marginBottom: 24,
    backgroundColor: Colors.background,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeContent: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 16,
    color: Colors.textGrey,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  recipeMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 14,
    color: Colors.textGrey,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
});