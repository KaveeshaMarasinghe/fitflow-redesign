import { Text, View } from 'react-native';
import { colors } from '../constants/theme';
import type { Meal } from '../types';
import { Card, Icon, s } from './ui';
import { AppPhoto } from './AppPhoto';
import { mealPhotos } from '../data/photos';

export function MealCard({ meal }: { meal: Meal }) {
  const photo = mealPhotos[meal.name];
  return (
    <Card style={{ padding: 10 }}>
      <View style={s.row}>
        {photo ? (
          <AppPhoto
            photo={photo}
            label={meal.name}
            style={{ width: 60, height: 60, borderRadius: 16 }}
          />
        ) : (
          <View
            style={{
              backgroundColor: colors.peach,
              width: 42,
              height: 42,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="restaurant-outline" color={colors.orange} />
          </View>
        )}
        <View style={s.flex}>
          <Text style={[s.heading, { fontSize: 15 }]}>{meal.name}</Text>
          <Text style={s.label}>{meal.portion}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={s.heading}>{meal.calories}</Text>
          <Text style={s.label}>kcal</Text>
        </View>
      </View>
    </Card>
  );
}
