import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import {
  AppHeader,
  Body,
  Button,
  Card,
  Icon,
  Pill,
  ProgressBar,
  Screen,
  s,
} from '../components/ui';
import { Sheet } from '../components/Sheet';
import { colors, fonts } from '../constants/theme';
import { useApp } from '../data/AppProvider';

export default function WorkoutSession() {
  const app = useApp();
  // Keep this session's lineup stable even if the plan is edited on another route.
  const [plan] = useState(app.plan);
  const [plannedDuration] = useState(app.duration);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [complete, setComplete] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const recorded = useRef(false);
  const [recordedMinutes, setRecordedMinutes] = useState(0);
  useEffect(() => {
    if (!running || complete) return;
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [running, complete]);
  const finish = () => {
    if (recorded.current) return;
    recorded.current = true;
    // Explicitly simulate the planned session rather than claiming measured exercise.
    app.completeWorkout(plannedDuration);
    setRecordedMinutes(plannedDuration);
    setComplete(true);
    setRunning(false);
    setConfirmFinish(false);
  };
  if (!plan.length)
    return (
      <Screen>
        <AppHeader title="Build your workout first" back />
        <Body>No exercises are selected.</Body>
        <Button title="Back to your plan" onPress={() => router.replace('/(tabs)/workout')} />
      </Screen>
    );
  const exercise = plan[index];
  return (
    <Screen>
      <AppHeader
        title={complete ? 'That’s a good kind of done.' : 'Find your strong'}
        subtitle="Guided sample workout"
        back
      />
      <Pill
        text={complete ? 'Sample session completed' : `Exercise ${index + 1} of ${plan.length}`}
        icon={complete ? 'checkmark-circle' : 'barbell-outline'}
      />
      {complete ? (
        <>
          <Card style={styles.center}>
            <View style={styles.symbol}>
              <Icon name="checkmark" color={colors.primary} size={48} />
            </View>
            <Text style={styles.title}>You showed up.</Text>
            <Body muted>
              Your sample {recordedMinutes}-minute session has been added to your daily and weekly
              progress.
            </Body>
          </Card>
          <Button
            title="See your progress"
            icon="trending-up"
            onPress={() => router.replace('/(tabs)/progress')}
          />
          <Button title="Back to Home" variant="light" onPress={() => router.replace('/(tabs)')} />
        </>
      ) : (
        <>
          <Card style={styles.center}>
            <View style={styles.symbol}>
              <Icon name="barbell" color={colors.primary} size={48} />
            </View>
            <Text style={styles.title}>{exercise.name}</Text>
            <Body muted>{exercise.focus}</Body>
            <Text style={styles.reps}>
              {app.shortened ? 2 : exercise.sets} sets × {exercise.reps}
            </Text>
            <Text style={styles.timer}>
              {String(Math.floor(seconds / 60)).padStart(2, '0')}:
              {String(seconds % 60).padStart(2, '0')}
            </Text>
            <Text style={s.label}>Session timer · take breaks when you need them</Text>
          </Card>
          <ProgressBar value={index / plan.length} label="Workout exercise progress" />
          <Button
            title={running ? 'Pause timer' : 'Resume timer'}
            icon={running ? 'pause' : 'play'}
            variant="secondary"
            onPress={() => setRunning(!running)}
          />
          <Button
            title={index < plan.length - 1 ? 'Next exercise' : 'Complete sample session'}
            icon="checkmark"
            onPress={() => (index < plan.length - 1 ? setIndex(index + 1) : setConfirmFinish(true))}
          />
          <Button title="Finish early" variant="light" onPress={() => setConfirmFinish(true)} />
          <Body muted>
            Move safely and stop if you feel unwell. The timer does not measure effort or calories.
          </Body>
          <Sheet
            visible={confirmFinish}
            title="Complete this sample workout?"
            onClose={() => setConfirmFinish(false)}
          >
            <Body>
              This demonstration will add the planned {plannedDuration} minutes and{' '}
              {plannedDuration * 8} estimated calories to your sample progress. It does not record
              real exercise or sensor measurements.
            </Body>
            <Button title="Complete sample workout" onPress={finish} />
            <Button title="Keep going" variant="light" onPress={() => setConfirmFinish(false)} />
          </Sheet>
        </>
      )}
    </Screen>
  );
}
const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderColor: colors.primarySoft,
    paddingVertical: 20,
    gap: 10,
  },
  symbol: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.heavy,
    color: colors.ink,
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 36,
  },
  reps: { fontFamily: fonts.bold, fontSize: 17, color: colors.primary },
  timer: {
    fontFamily: fonts.heavy,
    fontSize: 50,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },
});
