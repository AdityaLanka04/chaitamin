// src/app/(tabs)/profile.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons'; import { Colors } from '@/src/constants/Colors';

interface Profile {
  name: string;
  email: string;
  profileImage: string;
  weight: number;
  height: number;
  goal: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    profileImage: '',
    weight: 0,
    height: 0,
    goal: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // Implement API call or storage logic here
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      profileImage: 'path_to_image',
      weight: 70,
      height: 175,
      goal: 'lose weight',
    };
    setProfile(data);
  };

  const renderProfileCard = () => (
    <View style={styles.profileCard}>
      <Image
        source={{ uri: profile.profileImage }}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <View style={styles.profileContent}>
        <ThemedText style={styles.profileName}>{profile.name}</ThemedText>
        <ThemedText style={styles.profileEmail}>{profile.email}</ThemedText>
        <View style={styles.profileMetadata}>
          <View style={styles.metadataItem}>
            <Ionicons name="barbell" size={16} color={Colors.primary} />
            <ThemedText style={styles.metadataText}>
              {profile.weight} kg
            </ThemedText>
          </View>
          <View style={styles.metadataItem}>
            <Ionicons name="resize" size={16} color={Colors.primary} />
            <ThemedText style={styles.metadataText}>
              {profile.height} cm
            </ThemedText>
          </View>
          <View style={styles.metadataItem}>
            <Ionicons name="link" size={16} color={Colors.primary} />
            <ThemedText style={styles.metadataText}>{profile.goal}</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Profile</ThemedText>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderProfileCard()}
        <TouchableOpacity style={styles.editButton}>
          <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
        </TouchableOpacity>
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
  scrollView: {
    padding: 16,
  },
  profileCard: {
    marginBottom: 24,
    backgroundColor: Colors.background,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  profileImage: {
    width: '100%',
    height: 200,
  },
  profileContent: {
    padding: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: Colors.textGrey,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  profileMetadata: {
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
  editButton: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 0,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textLight,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
});