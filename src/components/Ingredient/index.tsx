import { View, Text, Pressable, PressableProps, Image } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { services } from '@/services';

export type IngredientProps = {
  name: string;
  image: string;
  selected?: boolean;
} & PressableProps;

export function Ingredient({ name, image, selected = false, ...rest }: IngredientProps) {
  return (
    <Pressable style={[styles.container, selected && styles.selected]} {...rest}>
      <Image style={styles.image} source={{ uri: `${services.storage.imagePath}/${image}` }} />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}
