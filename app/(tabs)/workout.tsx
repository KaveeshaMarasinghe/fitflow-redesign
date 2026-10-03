import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, Body, Button, Card, Icon, Pill, Screen, Section, s } from '../../components/ui';
import { Sheet } from '../../components/Sheet';
import { colors, fonts } from '../../constants/theme';
import { useApp } from '../../data/AppProvider';
import { recommendation } from '../../data/mock';
import { AppPhoto } from '../../components/AppPhoto';

export default function Workout() {
  const app = useApp();
  const [dialog, setDialog] = useState<'why' | 'schedule' | null>(null);
  return (
    <Screen>
      <AppHeader
        title="Made for your momentum"
        subtitle="Your AI workout · a personalized sample"
      />
      <Card style={styles.hero}>
        <Pill text="AI RECOMMENDATION" icon="sparkles" />
        <AppPhoto
          photo="strength"
          label="Dumbbell strength training in a bright gym"
          style={styles.heroPhoto}
          contain
        />
        <Text style={styles.title}>{recommendation.title}</Text>
        <Body muted>{recommendation.subtitle}</Body>
        <View style={styles.metrics}>
          {[
            ['time-outline', `${app.duration} min`, 'Duration'],
            ['flame-outline', `${app.workoutCalories}`, 'Est. kcal'],
            ['fitness-outline', recommendation.difficulty, 'Level'],
          ].map(([icon, value, label]) => (
            <View key={label} style={styles.metric}>
              <Icon name={icon as 'time-outline'} color={colors.primary} />
              <Text style={styles.metricValue}>{value}</Text>
              <Text style={s.label}>{label}</Text>
            </View>
          ))}
        </View>
        <Button
          title="Why this workout?"
          variant="light"
          icon="information-circle-outline"
          onPress={() => setDialog('why')}
        />
      </Card>
      <View style={s.between}>
        <Section title="Your exercise lineup" />
        <Pill text={`${app.plan.length} exercises`} />
      </View>
      {app.plan.length === 0 && (
        <Card>
          <Body>All exercises skipped. Restore the original plan to start a session.</Body>
          <Button
            title="Restore workout"
            onPress={() => {
              app.restorePlan();
            }}
          />
        </Card>
      )}
      {app.plan.map((exercise, index) => (
        <Card key={exercise.id} style={{ padding: 10 }}>
          <View style={s.row}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
            </View>
            <View style={s.flex}>
              <Text style={s.heading}>{exercise.name}</Text>
              <Text style={s.subtitle}>{exercise.focus}</Text>
            </View>
          </View>
          <View style={s.between}>
            <Text style={styles.reps}>
              {app.shortened ? 2 : exercise.sets} sets × {exercise.reps}
            </Text>
            <View style={s.row}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Replace ${exercise.name}`}
                onPress={() => app.replaceExercise(exercise.id)}
                style={styles.exerciseAction}
              >
                <Icon name="swap-horizontal" size={17} color={colors.primary} />
                <Text style={s.link}>Replace</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Skip ${exercise.name}`}
                onPress={() => app.skipExercise(exercise.id)}
                style={styles.exerciseAction}
              >
                <Text style={s.label}>Skip</Text>
              </Pressable>
            </View>
          </View>
        </Card>
      ))}
      <Card>
        <Text style={s.heading}>Make it fit your day</Text>
        <Body muted>Your plan can flex with you.</Body>
        <View style={{ gap: 6 }}>
          <Button
            title={app.shortened ? 'Restore full duration' : 'Shorten workout'}
            variant="light"
            icon="timer-outline"
            onPress={() => app.setShortened(!app.shortened)}
          />
          <Button
            title={`Reschedule · ${app.schedule}`}
            variant="light"
            icon="calendar-outline"
            onPress={() => setDialog('schedule')}
          />
        </View>
      </Card>
      <Button
        title="Start Workout"
        icon="play"
        disabled={app.plan.length === 0}
        onPress={() => router.push('/workout-session')}
      />
      <Text style={s.label}>Warm up first, go at your own pace, and stop if you feel unwell.</Text>
      <Sheet visible={dialog === 'why'} title="A plan with purpose" onClose={() => setDialog(null)}>
        <Pill text="Personalized sample" icon="sparkles" />
        <Body>
          This balanced session illustrates a recommendation for your “
          {app.profile.goal.toLowerCase()}” goal, {app.profile.level.toLowerCase()} fitness level,
          and preference for {app.profile.duration}-minute workouts.
        </Body>
        <Body muted>
          The exercises cover legs, upper body, and core. These are scripted sample recommendations,
          not medical advice or the output of a live AI service.
        </Body>
        <Button title="Got it" onPress={() => setDialog(null)} />
      </Sheet>
      <Sheet
        visible={dialog === 'schedule'}
        title="Choose your next session"
        onClose={() => setDialog(null)}
      >
        {['Today', 'Tomorrow', 'Next Monday'].map((day) => (
          <Button
            key={day}
            title={day}
            variant={app.schedule === day ? 'primary' : 'light'}
            onPress={() => {
              app.setSchedule(day);
              setDialog(null);
            }}
          />
        ))}
        <Body muted>This updates your sample plan. No calendar event or reminder is sent.</Body>
      </Sheet>
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { backgroundColor: colors.primarySoft, borderColor: colors.primarySoft, gap: 10 },
  heroPhoto: { height: 200, borderRadius: 14 },
  title: {
    fontFamily: fonts.heavy,
    color: colors.ink,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -1,
  },
  metrics: { flexDirection: 'row', gap: 8, justifyContent: 'space-between', paddingVertical: 4 },
  metric: { flex: 1, gap: 4 },
  metricValue: { fontFamily: fonts.bold, color: colors.ink, fontSize: 14 },
  exerciseNumber: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: { fontFamily: fonts.bold, fontSize: 16, color: colors.primary },
  reps: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted, flex: 1 },
  exerciseAction: { minHeight: 44, flexDirection: 'row', gap: 5, alignItems: 'center' },
});
