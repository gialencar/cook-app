import { Alert, ScrollView, Text, View } from 'react-native';

import { styles } from './styles';
import { useEffect, useState } from 'react';
import { Ingredient } from '@/components/Ingredient';
import { Selected } from '@/components/Selected';
import { router } from 'expo-router';
import { services } from '@/services';

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  const handleToggleSelected = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleClearSelected = () => {
    Alert.alert('Limpar', 'Deseja limpar os ingredientes selecionados?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', onPress: () => setSelected([]) },
    ]);
  };

  const handleSearch = () => {
    router.navigate('/recipes/' + selected);
  };

  useEffect(() => {
    services.ingredients.findAll().then((data) => setIngredients(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {'\n'}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>

      <Text style={styles.message}>
        Descubra receitas baseadas nos{'\n'}produtos que você escolheu.
      </Text>

      <ScrollView contentContainerStyle={styles.ingredients} showsHorizontalScrollIndicator={false}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.name}
            name={ingredient.name}
            image={ingredient.image}
            selected={selected.includes(ingredient.id)}
            onPress={() => handleToggleSelected(String(ingredient.id))}
            // image={`${services.storage.imagePath}/${ingredient.image}`}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </View>
  );
}
