import { View, Text, Pressable, PressableProps, Image } from 'react-native';
import React from 'react';
import { styles } from './styles';

export type IngredientProps = {
  name: string;
  image: string;
  selected?: boolean;
} & PressableProps;

export function Ingredient({ name, image, selected = false, ...rest }: IngredientProps) {
  return (
    <Pressable style={[styles.container, selected && styles.selected]} {...rest}>
      <Image style={styles.image} source={require('@/assets/tomato.png')} />
      <Text style={styles.text}>Maçã</Text>
    </Pressable>
  );
}
