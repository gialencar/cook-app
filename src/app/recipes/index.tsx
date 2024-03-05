import { View, Text, FlatList } from 'react-native';
import React from 'react';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Recipe } from '@/components/Recipe';

export default function Recipes() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={32} color="black" onPress={() => router.back()} />
        <Text style={styles.title}>Ingredientes</Text>

        <FlatList
          data={['1']}
          keyExtractor={(item) => item}
          renderItem={() => <Recipe recipe={{ name: 'omelete', image: '', minutes: 12 }} />}
        />
      </View>
    </View>
  );
}
