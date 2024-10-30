// src/app/(tabs)/preferencesscreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Animated,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Button, Icon, Slider } from 'react-native-elements';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/constants/Colors';

interface PreferenceField {
  value: string;
  isValid: boolean;
  touched: boolean;
}

interface Preferences {
  calorieIntake: PreferenceField;
  calorieBurn: PreferenceField;
  waterIntake: PreferenceField;
  activityLevel: 'sedentary' | 'moderate' | 'active';
  dietaryRestrictions: string[];
  weightGoal: 'lose' | 'maintain' | 'gain';
  mealPreference: 'vegetarian' | 'vegan' | 'omnivore' | 'pescatarian';
}

interface Props {
  navigation: any; // Replace 'any' with the appropriate type if known
}

export default function PreferencesScreen({ navigation }: Props) {
  const [preferences, setPreferences] = useState<Preferences>({
    calorieIntake: { value: '', isValid: false, touched: false },
    calorieBurn: { value: '', isValid: false, touched: false },
    waterIntake: { value: '', isValid: false, touched: false },
    activityLevel: 'moderate',
    dietaryRestrictions : [],
    weightGoal: 'maintain',
    mealPreference: 'omnivore',
  });

  useEffect(() => {
    // Initialize preferences from storage or API
  }, []);

  const handleInputChange = (field: keyof Preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: { value, isValid: validateInput(value), touched: true },
    }));
  };

  const handleActivityLevelChange = (activityLevel: 'sedentary' | 'moderate' | 'active') => {
    setPreferences((prev) => ({ ...prev, activityLevel }));
  };

  const handleDietaryRestrictionsChange = (dietaryRestrictions: string[]) => {
    setPreferences((prev) => ({ ...prev, dietaryRestrictions }));
  };

  const handleWeightGoalChange = (weightGoal: 'lose' | 'maintain' | 'gain') => {
    setPreferences((prev) => ({ ...prev, weightGoal }));
  };

  const handleMealPreferenceChange = (mealPreference: 'vegetarian' | 'vegan' | 'omnivore' | 'pescatarian') => {
    setPreferences((prev) => ({ ...prev, mealPreference }));
  };

  const handleSubmit = async () => {
    // Save preferences to storage or API
    navigation.navigate('Home');
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={styles.header}
      >
        <ThemedText style={styles.headerText}>Preferences</ThemedText>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Calorie Intake</ThemedText>
          <TextInput
            value={preferences.calorieIntake.value}
            onChangeText={(value) => handleInputChange('calorieIntake', value)}
            style={styles.input}
            placeholder="Enter calorie intake"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Calorie Burn</ThemedText>
          <TextInput
            value={preferences.calorieBurn.value}
            onChangeText={(value) => handleInputChange('calorieBurn', value)}
            style={styles.input}
            placeholder="Enter calorie burn"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Water Intake</ThemedText>
          <TextInput
            value={preferences.waterIntake.value}
            onChangeText={(value) => handleInputChange('waterIntake', value)}
            style={styles.input}
            placeholder="Enter water intake"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.activityLevelContainer}>
          <ThemedText style={styles.label}>Activity Level</ThemedText>
          <View style={styles.activityLevelButtons}>
            <TouchableOpacity
              style={[
                styles.activityLevelButton,
                preferences.activityLevel === 'sedentary' ? styles.activeButton : {},
              ]}
              onPress={() => handleActivityLevelChange('sedentary')}
            >
              <ThemedText style={styles.activityLevelButtonText}>Sedentary</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.activityLevelButton,
                preferences.activityLevel === 'moderate' ? styles.activeButton : {},
              ]}
              onPress={() => handleActivityLevelChange('moderate')}
            >
              <ThemedText style={styles.activityLevelButtonText}>Moderate</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.activityLevelButton,
                preferences.activityLevel === 'active' ? styles.activeButton : {},
              ]}
              onPress={() => handleActivityLevelChange('active')}
            >
              <ThemedText style={styles.activityLevelButtonText}>Active</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dietaryRestrictionsContainer}>
          <ThemedText style={styles.label}>Dietary Restrictions</ThemedText>
          <View style={styles.dietaryRestrictionsButtons}>
            <TouchableOpacity
              style={[
                styles.dietaryRestrictionsButton,
                preferences.dietaryRestrictions.includes('vegetarian') ? styles.activeButton : {},
              ]}
              onPress={() => handleDietaryRestrictionsChange([...preferences.dietaryRestrictions, 'vegetarian'])}
            >
              <ThemedText style={styles.dietaryRestrictionsButtonText}>Vegetarian</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dietaryRestrictionsButton,
                preferences.dietaryRestrictions.includes('vegan') ? styles.activeButton : {},
              ]}
              onPress={() => handleDietaryRestrictionsChange([...preferences.dietaryRestrictions, 'vegan'])}
            >
              <ThemedText style={styles.dietaryRestrictionsButtonText}>Vegan</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dietaryRestrictionsButton,
                preferences.dietaryRestrictions.includes('gluten-free') ? styles.activeButton : {},
              ]}
              onPress={() => handleDietaryRestrictionsChange([...preferences.dietaryRestrictions, 'gluten-free'])}
            >
              <ThemedText style={styles.dietaryRestrictionsButtonText}>Gluten-free</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.weightGoalContainer}>
          <ThemedText style={styles.label}>Weight Goal</ThemedText>
          <View style={styles.weightGoalButtons}>
            <TouchableOpacity
              style={[
                styles.weightGoalButton,
                preferences.weightGoal === 'lose' ? styles.activeButton : {},
              ]}
              onPress={() => handleWeightGoalChange('lose')}
            >
              <ThemedText style={styles.weightGoalButtonText}>Lose</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.weightGoalButton,
                preferences.weightGoal === 'maintain' ? styles.activeButton : {},
              ]}
              onPress={() => handleWeightGoalChange('maintain')}
            >
              <ThemedText style={styles.weightGoalButtonText}>Maintain</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.weightGoalButton,
                preferences.weightGoal === 'gain' ? styles.activeButton : {},
              ]}
              onPress={() => handleWeightGoalChange('gain')}
            >
              <ThemedText style={styles.weightGoalButtonText}>Gain</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mealPreferenceContainer}>
          <ThemedText style={styles.label}>Meal Preference</ThemedText>
          <View style={styles.mealPreferenceButtons}>
            <TouchableOpacity
              style={[
                styles.mealPreferenceButton,
                preferences.mealPreference === 'vegetarian' ? styles.activeButton : {},
              ]}
              onPress={() => handleMealPreferenceChange('vegetarian')}
            >
              <ThemedText style={styles.mealPreferenceButtonText}>Vegetarian</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.mealPreferenceButton,
                preferences.mealPreference === 'vegan' ? styles.activeButton : {},
              ]}
              onPress={() => handleMealPreferenceChange('vegan')}
            >
              <ThemedText style={styles.mealPreferenceButtonText}>Vegan</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.mealPreferenceButton,
                preferences.mealPreference === 'omnivore' ? styles.activeButton : {},
              ]}
              onPress={() => handleMealPreferenceChange('omnivore')}
            >
              <ThemedText style={styles.mealPreferenceButtonText}>Omnivore</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.mealPreferenceButton,
                preferences.mealPreference === 'pescatarian' ? styles.activeButton : {},
              ]}
              onPress={() => handleMealPreferenceChange('pescatarian')}
            >
              <ThemedText style={styles.mealPreferenceButtonText}>Pescatarian</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Save Preferences"
          onPress={handleSubmit}
          buttonStyle={styles.saveButton}
        />
        </ScrollView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 200,
    backgroundColor: Colors.primary,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textLight,
    fontFamily: 'Helvetica',
    letterSpacing: 1,
  },
  scrollView: {
    padding: 24,
  },
  inputContainer: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
  input: {
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
  activityLevelContainer: {
    marginVertical: 16,
  },
  activityLevelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityLevelButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 0,
    backgroundColor: Colors.primary,
  },
  activeButton: {
    backgroundColor: Colors.primaryDark,
  },
  activityLevelButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textLight,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
  dietaryRestrictionsContainer: {
    marginVertical: 16,
  },
  dietaryRestrictionsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dietaryRestrictionsButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 0,
    backgroundColor: Colors.primary,
  },
  dietaryRestrictionsButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textLight,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
  weightGoalContainer: {
    marginVertical: 16,
  },
  weightGoalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weightGoalButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 0,
    backgroundColor: Colors.primary,
  },
  weightGoalButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textLight,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
  mealPreferenceContainer: {
    marginVertical: 16,
  },
  mealPreferenceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealPreferenceButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 0,
    backgroundColor: Colors.primary,
  },
  mealPreferenceButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textLight,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 0,
    alignItems: 'center',
  },
});
function validateInput(value: string) {
    // Basic validation: check if the input is a non-empty string and a valid number
    if (!value) {
        return false;
    }
    const numberValue = parseFloat(value);
    return !isNaN(numberValue) && numberValue > 0;
}
