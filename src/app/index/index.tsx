import { Alert, ScrollView, Text, View } from 'react-native';

import { styles } from './styles';
import { useState } from 'react';
import { Ingredient } from '@/components/Ingredient';
import { Selected } from '@/components/Selected';
import { router } from 'expo-router';

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);

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
    router.navigate('/recipes');
  };

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
        {/* {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          name={ingredient.name}
          image={`${services.storage.imagePath}/${ingredient.image}`}
        />
      ))} */}
        {Array.from({ length: 100 }).map((item, index) => (
          <Ingredient
            key={index}
            image=""
            name="tomate"
            selected={selected.includes(String(index))}
            onPress={() => handleToggleSelected(String(index))}
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
