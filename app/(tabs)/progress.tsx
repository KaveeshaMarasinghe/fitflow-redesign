import { StyleSheet, Text, View } from 'react-native';
import {
  AppHeader,
  Body,
  Card,
  Icon,
  Pill,
  ProgressBar,
  Screen,
  Section,
  StatCard,
  s,
} from '../../components/ui';
import { colors, fonts } from '../../constants/theme';
import { useApp } from '../../data/AppProvider';
import { achievements, progress, weeklyActivity } from '../../data/mock';

export default function Progress() {
  const { workouts, profile } = useApp();
  const completed = progress.completed + workouts.length;
  const minutes = progress.minutes + workouts.reduce((sum, item) => sum + item.minutes, 0);
  const calories = progress.calories + workouts.reduce((sum, item) => sum + item.calories, 0);
  const percent = Math.round(Math.min(1, completed / progress.weeklyGoal) * 100);
  const activity = weeklyActivity.map((day, index) => ({
    ...day,
    minutes: day.minutes + (index === 5 ? minutes - progress.minutes : 0),
  }));
  const maximum = Math.max(60, ...activity.map((day) => day.minutes));
  return (
    <Screen>
      <AppHeader title="Look how far you’ve come" subtitle="Every little effort adds up." />
      <Pill text="This week · sample history" icon="calendar-outline" />
      <Card style={{ backgroundColor: colors.primarySoft, borderColor: colors.primarySoft }}>
        <View style={s.between}>
          <View style={s.flex}>
            <Text style={styles.lightLabel}>WEEKLY WORKOUT GOAL</Text>
            <Text style={styles.large}>
              {completed}
              <Text style={styles.denominator}> / {progress.weeklyGoal} sessions</Text>
            </Text>
          </View>
          <View style={styles.percent}>
            <Text style={styles.percentText}>{percent}%</Text>
          </View>
        </View>
        <ProgressBar
          value={completed / progress.weeklyGoal}
          label="Weekly workout completion"
          color={colors.primary}
        />
        <Text style={styles.encouragement}>
          {completed >= progress.weeklyGoal
            ? 'Goal reached. You showed up for yourself!'
            : 'One more good session. You’ve got this.'}
        </Text>
      </Card>
      <View style={[s.row, { gap: 6, alignItems: 'stretch' }]}>
        <StatCard
          icon="flame"
          value={progress.streak}
          suffix="days"
          label="Current streak"
          tone="orange"
        />
        <StatCard
          icon="flash-outline"
          value={calories.toLocaleString()}
          label="Calories burned"
          tone="orange"
        />
        <StatCard icon="time-outline" value={minutes} suffix="min" label="Total time" tone="blue" />
      </View>
      <Section title="Your week in motion" />
      <Card>
        <View style={s.between}>
          <Text style={s.heading}>Active minutes</Text>
          <Pill text={`${minutes} min`} />
        </View>
        <View style={styles.chart}>
          {activity.map((day, index) => (
            <View
              key={index}
              accessibilityLabel={`${day.full}, ${day.minutes} active minutes`}
              style={styles.barColumn}
            >
              <Text style={styles.barValue}>{day.minutes || '–'}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${(day.minutes / maximum) * 100}%`,
                      backgroundColor: index === 5 ? colors.primary : colors.chart,
                      minHeight: day.minutes ? 5 : 0,
                    },
                  ]}
                />
              </View>
              <Text
                style={[s.label, index === 5 && { color: colors.primary, fontFamily: fonts.bold }]}
              >
                {day.day}
              </Text>
            </View>
          ))}
        </View>
        <View style={s.row}>
          <View style={styles.legendDot} />
          <Text style={s.label}>This week’s activity · today highlighted</Text>
        </View>
      </Card>
      <Section title="A healthier direction" />
      <Card>
        <View style={s.between}>
          <View>
            <Text style={s.label}>CURRENT WEIGHT</Text>
            <Text style={styles.weight}>
              {profile.weight} <Text style={{ fontSize: 14, color: colors.muted }}>kg</Text>
            </Text>
          </View>
          <View style={styles.weightIcon}>
            <Icon name="trending-down" color={colors.primary} size={32} />
          </View>
        </View>
        <Body muted>
          Sample starting weight: {progress.previousWeight} kg. Focus on how you feel and what you
          can do.
        </Body>
        <ProgressBar label="Sample strength milestone" value={0.7} />
        <Text style={s.label}>Strength milestone · 7 of 10 sessions</Text>
      </Card>
      <Section title="Little wins, big energy" />
      <View style={{ gap: 6 }}>
        {achievements.map((achievement) => (
          <Card key={achievement.name} style={styles.achievement}>
            <View style={[styles.badge, !achievement.earned && { backgroundColor: colors.line }]}>
              <Icon
                name={achievement.icon}
                color={achievement.earned ? colors.primary : colors.muted}
              />
            </View>
            <View style={s.flex}>
              <Text style={s.heading}>{achievement.name}</Text>
              <Text style={s.subtitle}>{achievement.detail}</Text>
            </View>
            <Icon
              name={achievement.earned ? 'checkmark-circle' : 'lock-closed-outline'}
              color={achievement.earned ? colors.primary : colors.muted}
              size={20}
            />
          </Card>
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  lightLabel: { color: colors.muted, fontFamily: fonts.bold, fontSize: 10, letterSpacing: 1 },
  large: { color: colors.ink, fontFamily: fonts.heavy, fontSize: 36, marginTop: 2 },
  denominator: { color: colors.muted, fontFamily: fonts.medium, fontSize: 14 },
  percent: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: { color: colors.primary, fontFamily: fonts.bold, fontSize: 17 },
  encouragement: { color: colors.muted, fontFamily: fonts.regular, fontSize: 12, lineHeight: 20 },
  chart: { flexDirection: 'row', gap: 8, height: 146, paddingVertical: 2 },
  barColumn: { flex: 1, gap: 4, alignItems: 'center' },
  barValue: { fontFamily: fonts.medium, fontSize: 10, color: colors.muted },
  barTrack: {
    height: 100,
    width: '100%',
    maxWidth: 30,
    backgroundColor: colors.background,
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: { width: '100%', borderRadius: 8 },
  legendDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.primary },
  weight: { fontFamily: fonts.heavy, color: colors.ink, fontSize: 30, marginTop: 2 },
  weightIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievement: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
