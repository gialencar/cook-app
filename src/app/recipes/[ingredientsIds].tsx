import { Recipe } from '@/components/Recipe';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './styles';
import { services } from '@/services';
import { Ingredients } from '@/components/Ingredients';

export default function Recipes() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

  const params = useLocalSearchParams<{ ingredientsIds: string }>();

  const ingredientsIds = params.ingredientsIds.split(',');

  useEffect(() => {
    services.ingredients.findByIds(ingredientsIds).then(setIngredients);
  }, []);

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes);
  }, []);

  console.log(recipes);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={32} color="black" onPress={() => router.back()} />
        <Text style={styles.title}>Ingredientes</Text>
      </View>

      <Ingredients ingredients={ingredients} />

      <FlatList
        data={recipes}
        keyExtractor={(recipe) => String(recipe.id)}
        renderItem={({ item }) => <Recipe recipe={item} />}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
      />
    </View>
  );
}
