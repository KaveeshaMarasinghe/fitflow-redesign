import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  AppHeader,
  Body,
  Button,
  Card,
  Icon,
  IconButton,
  Pill,
  ProgressBar,
  Screen,
  Section,
  s,
} from '../../components/ui';
import { MealCard } from '../../components/MealCard';
import { Sheet } from '../../components/Sheet';
import { colors, fonts } from '../../constants/theme';
import { useApp } from '../../data/AppProvider';
import { foodOptions, mealGroups } from '../../data/mock';
import type { MealGroup } from '../../types';

export default function Nutrition() {
  const { meals, setMeals, water, setWater } = useApp();
  const [adding, setAdding] = useState(false);
  const [group, setGroup] = useState<MealGroup>('Dinner');
  const consumed = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const goal = 2100;
  const macros = [
    {
      name: 'Protein',
      value: meals.reduce((sum, meal) => sum + meal.protein, 0),
      goal: 120,
      color: colors.primary,
    },
    {
      name: 'Carbs',
      value: meals.reduce((sum, meal) => sum + meal.carbs, 0),
      goal: 260,
      color: colors.orange,
    },
    {
      name: 'Fat',
      value: meals.reduce((sum, meal) => sum + meal.fat, 0),
      goal: 70,
      color: colors.blue,
    },
  ];
  return (
    <Screen>
      <AppHeader title="Fuel your feel-good" subtitle="A balanced day, one bite at a time." />
      <Pill text="Today’s nutrition" icon="sunny-outline" />
      <Card style={{ backgroundColor: colors.primarySoft, borderColor: colors.primarySoft }}>
        <View style={s.between}>
          <View>
            <Text style={s.label}>CALORIES CONSUMED</Text>
            <Text style={styles.calories}>
              {consumed.toLocaleString()}
              <Text style={styles.unit}> kcal</Text>
            </Text>
          </View>
          <View style={styles.leaf}>
            <Icon name="leaf" color={colors.primary} size={34} />
          </View>
        </View>
        <ProgressBar value={consumed / goal} label="Daily calorie goal" />
        <View style={s.between}>
          <Text style={s.label}>Daily goal: {goal.toLocaleString()} kcal</Text>
          <Text style={styles.remaining}>
            {consumed <= goal ? `${goal - consumed} left` : `${consumed - goal} over goal`}
          </Text>
        </View>
      </Card>
      <View style={[s.row, { gap: 6, alignItems: 'stretch' }]}>
        {macros.map((macro) => (
          <Card key={macro.name} style={styles.macro}>
            <Text style={[s.label, { color: macro.color }]}>{macro.name}</Text>
            <Text style={styles.macroValue}>
              {macro.value}
              <Text style={styles.unit}> g</Text>
            </Text>
            <ProgressBar
              value={macro.value / macro.goal}
              label={`${macro.name} goal`}
              color={macro.color}
            />
            <Text style={s.label}>of {macro.goal} g</Text>
          </Card>
        ))}
      </View>
      <Card>
        <View style={s.between}>
          <View style={s.row}>
            <Icon name="water" color={colors.blue} />
            <View>
              <Text style={s.heading}>Stay in your flow</Text>
              <Text style={s.label}>{(water * 0.25).toFixed(2)} L of 2 L · 250 mL per glass</Text>
            </View>
          </View>
        </View>
        <View style={styles.waterGlasses}>
          {Array.from({ length: 8 }, (_, index) => (
            <Icon
              key={index}
              name={index < water ? 'water' : 'water-outline'}
              color={index < water ? colors.blue : colors.outline}
              size={23}
            />
          ))}
        </View>
        <View style={s.between}>
          <IconButton
            name="remove"
            label="Remove one glass of water"
            onPress={() => setWater(Math.max(0, water - 1))}
          />
          <Text style={s.label}>{water} glasses logged</Text>
          <IconButton
            name="add"
            label="Add one glass of water"
            onPress={() => setWater(Math.min(16, water + 1))}
          />
        </View>
      </Card>
      <Section
        title="On the menu"
        action="Add Meal"
        onPress={() => {
          setGroup('Dinner');
          setAdding(true);
        }}
      />
      {mealGroups.map((category) => (
        <View key={category} style={{ gap: 6 }}>
          <View style={s.between}>
            <Text style={s.heading}>{category}</Text>
            <Text style={s.label}>
              {meals
                .filter((meal) => meal.group === category)
                .reduce((sum, meal) => sum + meal.calories, 0)}{' '}
              kcal
            </Text>
          </View>
          {meals
            .filter((meal) => meal.group === category)
            .map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          {!meals.some((meal) => meal.group === category) && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Add ${category.toLowerCase()}`}
              onPress={() => {
                setGroup(category);
                setAdding(true);
              }}
              style={styles.emptyMeal}
            >
              <Icon name="add-circle-outline" color={colors.primary} />
              <Text style={s.link}>Plan a nourishing {category.toLowerCase()}</Text>
            </Pressable>
          )}
        </View>
      ))}
      <Text style={s.label}>Sample nutrition values are estimates, not dietary advice.</Text>
      <Sheet visible={adding} title="Add something nourishing" onClose={() => setAdding(false)}>
        <Body muted>Choose a sample meal to add to your day.</Body>
        <View style={styles.categories}>
          {mealGroups.map((category) => (
            <Pressable
              key={category}
              accessibilityRole="button"
              accessibilityState={{ selected: group === category }}
              onPress={() => setGroup(category)}
              style={[styles.category, group === category && { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.categoryText, group === category && { color: colors.surface }]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
        {foodOptions.map((food) => (
          <Card key={food.name}>
            <Text style={s.heading}>{food.name}</Text>
            <Body muted>
              {food.calories} kcal · {food.protein} g protein · {food.portion}
            </Body>
            <Button
              title={`Add to ${group}`}
              variant="secondary"
              icon="add"
              onPress={() => {
                setMeals((current) => [...current, { ...food, id: `meal-${Date.now()}`, group }]);
                setAdding(false);
              }}
            />
          </Card>
        ))}
      </Sheet>
    </Screen>
  );
}
const styles = StyleSheet.create({
  calories: {
    fontFamily: fonts.heavy,
    color: colors.ink,
    fontSize: 32,
    letterSpacing: -1,
    marginVertical: 2,
  },
  unit: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted },
  leaf: {
    width: 48,
    height: 48,
    backgroundColor: colors.accent,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  remaining: { fontFamily: fonts.bold, color: colors.primary, fontSize: 12 },
  macro: { flex: 1, padding: 10, gap: 6 },
  macroValue: { fontFamily: fonts.heavy, color: colors.ink, fontSize: 23 },
  waterGlasses: { flexDirection: 'row', justifyContent: 'space-between', gap: 4 },
  emptyMeal: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.outline,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  category: {
    padding: 8,
    minHeight: 44,
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  categoryText: { color: colors.ink, fontFamily: fonts.medium, fontSize: 12 },
});
