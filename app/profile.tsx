import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader, Avatar, Body, Button, Card, Icon, Pill, Screen, s } from '../components/ui';
import { Field, Sheet } from '../components/Sheet';
import { colors, fonts } from '../constants/theme';
import { useApp } from '../data/AppProvider';

export default function Profile() {
  const app = useApp();
  const [editing, setEditing] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [name, setName] = useState(app.profile.name);
  const [height, setHeight] = useState(String(app.profile.height));
  const [weight, setWeight] = useState(String(app.profile.weight));
  const [duration, setDuration] = useState(String(app.profile.duration));
  const [goal, setGoal] = useState(app.profile.goal);
  const [level, setLevel] = useState(app.profile.level);
  const valid =
    name.trim().length > 0 &&
    Number.isFinite(Number(height)) &&
    Number(height) >= 100 &&
    Number(height) <= 250 &&
    Number.isFinite(Number(weight)) &&
    Number(weight) >= 30 &&
    Number(weight) <= 300 &&
    Number.isInteger(Number(duration)) &&
    Number(duration) >= 10 &&
    Number(duration) <= 120;
  const startEditing = () => {
    setName(app.profile.name);
    setHeight(String(app.profile.height));
    setWeight(String(app.profile.weight));
    setDuration(String(app.profile.duration));
    setGoal(app.profile.goal);
    setLevel(app.profile.level);
    setEditing(true);
  };
  return (
    <Screen>
      <AppHeader title="Your own kind of strong" subtitle="A little about you." back />
      <Card style={styles.profile}>
        <Avatar
          initials={app.profile.name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')}
          size={90}
        />
        <Text style={styles.name}>{app.profile.name}</Text>
        <Pill text={`${app.profile.level} · ${app.profile.goal}`} icon="fitness-outline" />
        <Body muted>Your journey, at your pace.</Body>
        <Button
          title="Edit Profile"
          icon="create-outline"
          variant="secondary"
          onPress={startEditing}
        />
      </Card>
      <Card>
        <Text style={s.heading}>Your fitness snapshot</Text>
        {[
          ['Fitness goal', app.profile.goal],
          ['Fitness level', app.profile.level],
          ['Height', `${app.profile.height} cm`],
          ['Weight', `${app.profile.weight} kg`],
          ['Preferred workout', `${app.profile.duration} minutes`],
        ].map(([label, value]) => (
          <View key={label} style={styles.detail}>
            <Text style={s.label}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))}
      </Card>
      <Card style={{ padding: 6 }}>
        {[
          ['Settings', 'settings-outline', '/settings'],
          ['Privacy Policy', 'shield-checkmark-outline', '/privacy'],
          ['Terms', 'document-text-outline', '/terms'],
        ].map(([label, icon, path]) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={() => router.push(path as '/settings')}
            style={styles.menu}
          >
            <Icon name={icon as 'settings-outline'} color={colors.primary} />
            <Text style={[s.heading, s.flex, { fontSize: 15 }]}>{label}</Text>
            <Icon name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        ))}
      </Card>
      <Button
        title="Sign Out"
        icon="log-out-outline"
        variant="light"
        onPress={() => setSigningOut(true)}
      />
      <Text style={s.label}>
        You’re exploring a sample profile. Sign Out clears this session’s changes.
      </Text>
      <Sheet visible={editing} title="Make this profile yours" onClose={() => setEditing(false)}>
        <Field label="Name" value={name} onChangeText={setName} maxLength={40} />
        <Field label="Height (cm) · 100–250" value={height} onChangeText={setHeight} numeric />
        <Field label="Weight (kg) · 30–300" value={weight} onChangeText={setWeight} numeric />
        <Field
          label="Workout duration (minutes) · 10–120"
          value={duration}
          onChangeText={setDuration}
          numeric
        />
        <Text style={s.heading}>Fitness goal</Text>
        <View style={styles.choices}>
          {['Build strength', 'Stay active', 'Improve endurance'].map((value) => (
            <Button
              key={value}
              title={value}
              variant={goal === value ? 'primary' : 'light'}
              onPress={() => setGoal(value)}
            />
          ))}
        </View>
        <Text style={s.heading}>Fitness level</Text>
        {['Beginner', 'Intermediate', 'Advanced'].map((value) => (
          <Button
            key={value}
            title={value}
            variant={level === value ? 'primary' : 'light'}
            onPress={() => setLevel(value)}
          />
        ))}
        {!valid && (
          <Text style={[s.label, { color: colors.red }]}>
            Enter a name and values within the shown ranges. Duration must be a whole number.
          </Text>
        )}
        <Button
          title="Save profile"
          disabled={!valid}
          onPress={() => {
            app.setProfile({
              name: name.trim(),
              height: Number(height),
              weight: Number(weight),
              duration: Number(duration),
              goal,
              level,
            });
            setEditing(false);
          }}
        />
      </Sheet>
      <Sheet
        visible={signingOut}
        title="Reset this sample session?"
        onClose={() => setSigningOut(false)}
      >
        <Body>
          Profile changes, posts, comments, meal entries, and workout completions will reset. There
          is no real account to sign out of.
        </Body>
        <Button
          title="Sign Out & reset"
          onPress={() => {
            setSigningOut(false);
            app.reset();
            router.dismissAll();
            router.replace('/');
          }}
        />
        <Button title="Keep exploring" variant="light" onPress={() => setSigningOut(false)} />
      </Sheet>
    </Screen>
  );
}
const styles = StyleSheet.create({
  profile: { alignItems: 'center', paddingVertical: 16, gap: 8 },
  name: { fontFamily: fonts.heavy, fontSize: 25, color: colors.ink },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  detailValue: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
    flexShrink: 1,
    textAlign: 'right',
  },
  menu: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, minHeight: 48 },
  choices: { gap: 8 },
});
