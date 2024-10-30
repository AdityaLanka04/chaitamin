// home.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { ProgressBar } from 'react-native-paper';

interface DailyStats {
  calories: { consumed: number; goal: number };
  water: { consumed: number; goal: number };
  steps: { count: number; goal: number };
}

export default function HomeScreen() {
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    calories: { consumed: 0, goal: 2000 },
    water: { consumed: 0, goal: 2000 },
    steps: { count: 0, goal: 10000 },
  });
  const [userName, setUserName] = useState('');
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fetch user data and daily stats
    fetchUserData();
    fetchDailyStats();

    // Start entrance animation
    Animated.spring(animation, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchUserData = async () => {
    // Implement API call or storage logic here
    setUserName('John');
  };

  const fetchDailyStats = async () => {
    // Implement API call or storage logic here
    setDailyStats({
      calories: { consumed: 1500, goal: 2000 },
      water: { consumed: 1500, goal: 2000 },
      steps: { count: 7500, goal: 10000 },
    });
  };

  const renderProgressBar = (consumed: number, goal: number, color: string) => (
    <ProgressBar
      progress={consumed / goal}
      color={color}
      style={styles.progressBar}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#2A9D8F', '#264653']}
        style={styles.header}
      >
        <Animated.View style={[
          styles.headerContent,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
            opacity: animation,
          },
        ]}>
          <ThemedText style={styles.greeting}>Welcome back, {userName}!</ThemedText>
          <LottieView
            source={require('@/assets/animations/wave.json')}
            autoPlay
            loop
            style={styles.waveAnimation}
          />
        </Animated.View>
      </LinearGradient>

      <ThemedView style={styles.content}>
        <View style={styles.statsContainer}>
          <ThemedText style={styles.sectionTitle}>Today's Progress</ThemedText>
          
          <View style={styles.statItem}>
            <View style={styles.statHeader}>
              <Ionicons name="flame" size={24} color="#FF6B6B" />
              <ThemedText style={styles.statTitle}>Calories</ThemedText>
            </View>
            {renderProgressBar(dailyStats.calories.consumed, dailyStats.calories.goal, '#FF6B6B')}
            <ThemedText style={styles.statText}>
              {dailyStats.calories.consumed} / {dailyStats.calories.goal} kcal
            </ThemedText>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statHeader}>
              <Ionicons name="water" size={24} color="#4ECDC4" />
              <ThemedText style={styles.statTitle}>Water</ThemedText>
            </View>
            {renderProgressBar(dailyStats.water.consumed, dailyStats.water.goal, '#4ECDC4')}
            <ThemedText style={styles.statText}>
              {dailyStats.water.consumed} / {dailyStats.water.goal} ml
            </ThemedText>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statHeader}>
              <Ionicons name="footsteps" size={24} color="#FFD93D" />
              <ThemedText style={styles.statTitle}>Steps</ThemedText>
            </View>
            {renderProgressBar(dailyStats.steps.count, dailyStats.steps.goal, '#FFD93D')}
            <ThemedText style={styles.statText}>
              {dailyStats.steps.count} / {dailyStats.steps.goal} steps
            </ThemedText>
          </View>
        </View>

        <View style={styles.quickActionsContainer}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActionButtons}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="add-circle" size={24} color="#2A9D8F" />
              <ThemedText style={styles.quickActionText}>Log Meal</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="fitness" size={24} color="#2A9D8F" />
              <ThemedText style={styles.quickActionText}>Log Exercise</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="water" size={24} color="#2A9D8F" />
              <ThemedText style={styles.quickActionText}>Log Water</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  waveAnimation: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statItem: {
    marginBottom: 15,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  statText: {
    fontSize: 14,
    marginTop: 5,
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  quickActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    width: '30%',
  },
  quickActionText: { fontSize: 14, color: '#666' },
});