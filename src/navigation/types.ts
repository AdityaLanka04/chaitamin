// navigation/types.ts
export type RootStackParamList = {
    PreferencesScreen: undefined; // No parameters for PreferencesScreen
    HomeScreen: { calorieIntake: number; calorieBurn: number; waterIntake: number }; // Parameters for HomeScreen
    // Add other screens as needed
  };