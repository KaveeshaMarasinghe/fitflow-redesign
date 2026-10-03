import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../constants/theme';
import { useApp } from '../data/AppProvider';
import { recommendation } from '../data/mock';
import { Button, Icon, s } from './ui';
import { AppPhoto } from './AppPhoto';

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
      <View style={styles.photoFrame}>
        <AppPhoto
          photo="strength"
          label="Athlete training with dumbbells in a bright gym"
          style={styles.photo}
          contain
        />
        <View style={styles.photoBadge}>
          <Icon name="barbell" size={15} color={colors.primary} />
          <Text style={styles.tagText}>FULL BODY STRENGTH</Text>
        </View>
      </View>
      <View style={s.between}>
        <View style={s.flex}>
          <Text style={styles.title}>{recommendation.title}</Text>
          <Text style={styles.caption}>A little stronger, every day.</Text>
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
  card: { borderRadius: 22, backgroundColor: colors.primarySoft, padding: 12, gap: 12 },
  photoFrame: { borderRadius: 16, overflow: 'hidden' },
  photo: { height: 200 },
  photoBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
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
  metadata: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  metaText: { fontFamily: fonts.medium, color: colors.muted, fontSize: 11 },
});
