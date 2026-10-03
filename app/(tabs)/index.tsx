import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Avatar,
  Body,
  Card,
  Icon,
  Pill,
  ProgressBar,
  Screen,
  Section,
  StatCard,
  s,
  type IconName,
} from '../../components/ui';
import { WorkoutCard } from '../../components/WorkoutCard';
import { colors, fonts } from '../../constants/theme';
import { useApp } from '../../data/AppProvider';
import { progress } from '../../data/mock';

const quickActions: {
  title: string;
  path: '/(tabs)/workout' | '/(tabs)/progress' | '/(tabs)/nutrition' | '/(tabs)/community';
  icon: IconName;
  background: string;
}[] = [
  {
    title: 'AI Workout',
    path: '/(tabs)/workout',
    icon: 'sparkles-outline',
    background: '#DBEAFE',
  },
  { title: 'Progress', path: '/(tabs)/progress', icon: 'trending-up', background: '#EDE9FE' },
  { title: 'Nutrition', path: '/(tabs)/nutrition', icon: 'leaf-outline', background: '#DCFCE7' },
  {
    title: 'Community',
    path: '/(tabs)/community',
    icon: 'people-outline',
    background: '#FFE4E6',
  },
];
export default function Home() {
  const { profile, workouts, water } = useApp();
  const minutes = workouts.reduce((sum, item) => sum + item.minutes, 0);
  const calories = workouts.reduce((sum, item) => sum + item.calories, 0);
  return (
    <Screen>
      <View style={[s.between, { marginTop: 0 }]}>
        <View style={s.flex}>
          <Text style={s.label}>LET’S MAKE TODAY COUNT</Text>
          <Text style={styles.greeting}>
            Hey, {profile.name.split(' ')[0]} <Text style={{ fontSize: 22 }}>✦</Text>
          </Text>
          <Text style={s.subtitle}>Your next good day starts here.</Text>
        </View>
        <Pressable
          accessibilityLabel="Open profile"
          accessibilityRole="button"
          onPress={() => router.push('/profile')}
          style={{ padding: 3 }}
        >
          <Avatar
            initials={profile.name
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')}
            size={50}
            photo="alex"
          />
        </Pressable>
      </View>
      <View style={styles.streak}>
        <View style={s.row}>
          <Icon name="flame" color={colors.orange} />
          <Text style={styles.streakText}>{progress.streak}-day streak. Keep the flow going!</Text>
        </View>
      </View>
      <Section title="Today’s workout" />
      <WorkoutCard />
      <View style={[s.row, { gap: 6, alignItems: 'stretch' }]}>
        <StatCard
          icon="flame-outline"
          value={calories}
          label="Calories burned"
          suffix="kcal"
          tone="orange"
        />
        <StatCard
          icon="time-outline"
          value={minutes}
          label="Workout time"
          suffix="min"
          tone="blue"
        />
        <StatCard icon="checkmark-circle-outline" value={workouts.length} label="Sessions today" />
      </View>
      <Card>
        <View style={s.between}>
          <View>
            <Text style={s.heading}>Your daily rhythm</Text>
            <Text style={s.subtitle}>A few small steps go a long way.</Text>
          </View>
          <Pill text={`${Math.round(Math.min(1, minutes / 30) * 100)}%`} />
        </View>
        <ProgressBar value={minutes / 30} label="Daily workout goal" />
        <View style={s.between}>
          <Text style={s.label}>{minutes} of 30 active minutes</Text>
          <Icon name="walk-outline" color={colors.primary} />
        </View>
      </Card>
      <Section title="Make your next move" />
      <View style={styles.quickGrid}>
        {quickActions.map((action) => (
          <Pressable
            key={action.title}
            accessibilityRole="button"
            onPress={() => router.push(action.path)}
            style={({ pressed }) => [styles.quickAction, pressed && s.pressed]}
          >
            <View style={[styles.quickIcon, { backgroundColor: action.background }]}>
              <Icon name={action.icon} color={colors.primary} />
            </View>
            <Text style={styles.quickText}>{action.title}</Text>
          </Pressable>
        ))}
      </View>
      <Card style={{ backgroundColor: colors.primarySoft, borderColor: colors.primarySoft }}>
        <View style={s.row}>
          <View style={styles.quickIcon}>
            <Icon name="water-outline" color={colors.primary} />
          </View>
          <View style={s.flex}>
            <Text style={s.heading}>A little hydration break?</Text>
            <Body muted>{(water * 0.25).toFixed(2)} L down. Your goal is 2 L today.</Body>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/(tabs)/nutrition')}
          style={{ minHeight: 44, justifyContent: 'center' }}
        >
          <Text style={s.link}>Track your water →</Text>
        </Pressable>
      </Card>
    </Screen>
  );
}
const styles = StyleSheet.create({
  greeting: {
    fontFamily: fonts.heavy,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -1,
    color: colors.ink,
  },
  streak: { backgroundColor: colors.peach, padding: 8, borderRadius: 10 },
  streakText: { fontFamily: fonts.medium, fontSize: 12, color: colors.orange, flexShrink: 1 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  quickAction: {
    flexGrow: 1,
    flexBasis: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  quickIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickText: { fontFamily: fonts.bold, fontSize: 12, color: colors.ink, flexShrink: 1 },
});
