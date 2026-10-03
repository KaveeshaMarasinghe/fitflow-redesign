import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../constants/theme';
import { useApp } from '../data/AppProvider';
import { recommendation } from '../data/mock';
import { Button, Icon, s } from './ui';

export function WorkoutCard() {
  const { duration, workoutCalories, schedule } = useApp();
  return (
    <View style={styles.card}>
      <View style={s.between}>
        <View style={styles.tag}>
          <Icon name="sparkles" size={14} color={colors.primary} />
          <Text style={styles.tagText}>PICKED FOR YOU</Text>
        </View>
        <Text style={styles.date}>{schedule}</Text>
      </View>
      <View style={s.between}>
        <View style={s.flex}>
          <Text style={styles.title}>{recommendation.title}</Text>
          <Text style={styles.caption}>A little stronger, every day.</Text>
        </View>
        <View style={styles.symbol}>
          <Icon name="barbell" size={32} color={colors.primary} />
        </View>
      </View>
      <View style={styles.metadata}>
        <View style={s.row}>
          <Icon name="time-outline" color={colors.muted} size={17} />
          <Text style={styles.metaText}>{duration} min</Text>
        </View>
        <View style={s.row}>
          <Icon name="flame-outline" color={colors.muted} size={17} />
          <Text style={styles.metaText}>{workoutCalories} kcal</Text>
        </View>
        <Text style={styles.metaText}>{recommendation.difficulty}</Text>
      </View>
      <Button
        title="Explore your workout"
        icon="arrow-forward"
        variant="primary"
        onPress={() => router.push('/(tabs)/workout')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: { borderRadius: 12, backgroundColor: colors.primarySoft, padding: 12, gap: 10 },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  tagText: { fontFamily: fonts.bold, fontSize: 10, letterSpacing: 0.6, color: colors.primary },
  date: { fontFamily: fonts.medium, color: colors.muted, fontSize: 12 },
  title: {
    fontFamily: fonts.heavy,
    color: colors.ink,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.6,
  },
  caption: { fontFamily: fonts.regular, color: colors.muted, fontSize: 12, marginTop: 2 },
  symbol: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metadata: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  metaText: { fontFamily: fonts.medium, color: colors.muted, fontSize: 11 },
});
