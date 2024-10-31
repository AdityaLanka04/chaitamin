import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Button } from 'react-native-elements';
import { ProgressBar } from 'react-native-paper';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const consumedCalories = 1686;
  const burntCalories = 843;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#1D3D47' }}
      headerImage={
        <LinearGradient colors={['#ffffff', '#f0f4f8']} style={styles.gradientHeader}>
          <Image
            source={require('@/assets/images/chai.png')}
            style={styles.headerImage}
          />
        </LinearGradient>
      }
    >
      {/* Title Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>Chaitamin</ThemedText>
      </ThemedView>

      {/* Daily Goal Section */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.subtitleText}>Today's Goal</ThemedText>
        <ThemedText type="title" style={styles.caloriesText}>2000 Calories</ThemedText>
        <ThemedText type="default" style={styles.remainingText}>
          Remaining: {2000 - consumedCalories} Calories
        </ThemedText>
        <ProgressBar 
          progress={consumedCalories / 2000} 
          color="#2A9D8F" 
          style={styles.progressBar} 
        />
      </ThemedView>

      {/* Nutrition Summary Section */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.subtitleText}>Nutrition Goals</ThemedText>
        <View style={styles.nutritionContainer}>
          {['Carbs', 'Protein', 'Fat'].map((item, index) => (
            <View style={styles.nutritionItem} key={index}>
              {/* Select an icon based on the nutrient type */}
              {item === 'Carbs' ? (
                <MaterialIcons name="fastfood" size={24} color="#2A9D8F" />
              ) : item === 'Protein' ? (
                <FontAwesome5 name="drumstick-bite" size={24} color="#2A9D8F" />
              ) : (
                <Ionicons name="pizza" size={24} color="#2A9D8F" />
              )}
              <ThemedText type="default" style={styles.nutritionText}>{item}</ThemedText>
              <ProgressBar progress={0.0} color="#2A9D8F" style={styles.progressBar} />
              <ThemedText type="default" style={styles.nutritionAmount}>
                0 / {item === 'Carbs' ? '206g' : item === 'Protein' ? '82g' : '54g'}
              </ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Motivational Message Section */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.subtitleText}>Motivational Quote</ThemedText>
        <ThemedText type="default" style={styles.quoteText}>
          "Every meal is an opportunity to nourish your body."
        </ThemedText>
      </ThemedView>

      {/* Button Section */}
      <ThemedView style={styles.buttonContainer}>
        <Button
          title="Add Food"
          buttonStyle={styles.button}
          onPress={() => console.log('Navigate to add food screen')}
          icon={<MaterialIcons name="add" size={ 20} color="white" />}
        />
        <Button
          title="View Food Log"
          buttonStyle={styles.button}
          onPress={() => console.log('Navigate to food log screen')}
          icon={<MaterialIcons name="list" size={20} color="white" />}
        />
        <Button
          title="Reset Log"
          buttonStyle={[styles.button, styles.resetButton]}
          icon={<MaterialIcons name="delete" size={20} color="white" />}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 24,
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    width: '100%',
  },
  progressBarContainer: {
    width: '80%',
    marginVertical: 10,
  },
  nutritionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  nutritionAmount: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 15,
  },
  button: {
    backgroundColor: '#2A9D8F',
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  resetButton: {
    backgroundColor: '#E76F51',
  },
  headerImage: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
  },
  gradientHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleText: {
    fontSize: 18,
    color: '#555',
  },
  caloriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  remainingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quoteText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});