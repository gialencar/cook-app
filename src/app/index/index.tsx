import { ScrollView, Text, View } from 'react-native';

import { Ingredient } from '../../components/Ingredient';
import { styles } from './styles';
import { useState } from 'react';

export default function Index() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggleSelected = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }

    console.log(selected);
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
    </View>
  );
}
