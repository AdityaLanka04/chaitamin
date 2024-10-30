// water.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';

interface WaterLog {
  amount: number;
  timestamp: Date;
}

export default function WaterCounterScreen() {
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);
  const [animation] = useState(new Animated.Value(0));
  const [celebrateAnimation, setCelebrateAnimation] = useState(false);
  const dailyGoal = 2000; // Daily goal in milliliters

  const bounceAnimation = new Animated.Value(1);

  useEffect(() => {
    // Load saved water intake from storage
    loadWaterIntake();
    
    // Start entrance animation
    Animated.spring(animation, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (waterIntake >= dailyGoal) {
      setCelebrateAnimation(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [waterIntake]);

  const loadWaterIntake = async () => {
    // Implement AsyncStorage logic here
  };

  const addWater = (amount: number) => {
    Animated.sequence([
      Animated.timing(bounceAnimation, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnimation, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newIntake = Math.min(waterIntake + amount, dailyGoal);
    setWaterIntake(newIntake);
    setWaterLogs([...waterLogs, { amount, timestamp: new Date() }]);
  };

  const getProgressColor = () => {
    const progress = waterIntake / dailyGoal;
    if (progress < 0.3) return '#FF6B6B';
    if (progress < 0.7) return '#4ECDC4';
    return '#2A9D8F';
  };

  const renderWaterLogs = () => {
    return waterLogs.slice(-5).map((log, index) => (
      <View key={index} style={styles.logItem}>
        <Ionicons name="water" size={20} color="#2A9D8F" />
        <ThemedText style={styles.logText}>
          {log.amount}ml at {log.timestamp.toLocaleTimeString()}
        </ThemedText>
      </View>
    ));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Animated.View
          style={[
            styles.headerImageContainer,
            { transform: [{ scale: bounceAnimation }] },
          ]}
        >
          <Ionicons size={310} name="water" style={styles.headerImage} />
        </Animated.View>
      }
    >
      <LinearGradient
        colors={['rgba(42, 157, 143, 0.1)', 'rgba(42, 157, 143, 0.05)']}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.content,
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
          ]}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Water Intake Tracker</ThemedText>
          </ThemedView>

          <View style={styles.statsContainer}>
            <ThemedText style={styles.intakeText}>
              {waterIntake} / {dailyGoal} ml
            </ThemedText>
            <ThemedText style={styles.percentageText}>
              {Math.round((waterIntake / dailyGoal) * 100)}%
            </ThemedText>
          </View>

          <View style={styles.progressContainer}>
            <ProgressBar
              progress={waterIntake / dailyGoal}
              color={getProgressColor()}
              style={styles.progressBar}
            />
          </View>

          <View style={styles.buttonContainer}>
            {[250, 500, 1000].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[styles.addButton, { backgroundColor: '#2A9D8F' }]}
                onPress={() => addWater(amount)}
              >
                <Ionicons name="add" size={24} color="white" />
                <ThemedText style={styles.buttonText}>{amount}ml</ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.logsContainer}>
            <ThemedText style={styles.logsTitle}>Recent Activity</ThemedText>
            {renderWaterLogs()}
          </View>

          <View style={styles.tipsContainer}>
            <ThemedText style={styles.tipsTitle}>Hydration Tips</ThemedText>
            <View style={styles.tipCard}>
              <Ionicons name="information-circle" size={24} color="#2A9D8F" />
              <ThemedText style={styles.tipText}>
                Drink water before, during, and after physical activity
              </ThemedText>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="time" size={24} color="#2A9D8F" />
              <ThemedText style={styles.tipText}>
                Set regular reminders throughout the day
              </ThemedText>
            </View>
          </View>

          {celebrateAnimation && (
            <LottieView
              source={require('@/assets/animations/celebration.json')}
              autoPlay
              loop={false}
              style={styles.celebration}
              onAnimationFinish={() => setCelebrateAnimation(false)}
            />
          )}
        </Animated.View>
      </LinearGradient>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  headerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    color: '#2A9D8F',
    opacity: 0.8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  intakeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color : '#2A9D8F',
  },
  percentageText: {
    fontSize: 24,
    color: '#666',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  logsContainer: {
    marginBottom: 20,
  },
  logsTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logText: {
    fontSize: 16,
    color: '#666',
  },
  tipsContainer: {
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#666',
  },
  celebration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});