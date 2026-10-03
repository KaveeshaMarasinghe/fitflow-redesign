import { router } from 'expo-router';
import Constants from 'expo-constants';
import { Pressable, Switch, Text, View } from 'react-native';
import { AppHeader, Body, Card, Icon, Pill, Screen, s } from '../components/ui';
import { colors } from '../constants/theme';
import { useApp } from '../data/AppProvider';

export default function Settings() {
  const { notifications, setNotifications } = useApp();
  return (
    <Screen>
      <AppHeader title="Make yourself at home" subtitle="Settings & preferences" back />
      <Card>
        <View style={s.between}>
          <View style={s.flex}>
            <Text style={s.heading}>Notifications</Text>
            <Text style={s.subtitle}>Sample reminder preference</Text>
          </View>
          <Switch
            accessibilityLabel="Notifications preference"
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.outline, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>
        <Body muted>
          {notifications
            ? 'Sample reminders are enabled for this session.'
            : 'Sample reminders are turned off.'}{' '}
          This prototype does not request notification access or send reminders.
        </Body>
      </Card>
      <Card>
        <View style={s.between}>
          <View style={s.row}>
            <Icon name="moon-outline" />
            <Text style={s.heading}>Dark mode</Text>
          </View>
          <Pill text="Coming soon" tone="blue" />
        </View>
        <Body muted>
          A darker look is planned for a future version. This prototype uses a light theme.
        </Body>
        <Switch
          accessibilityLabel="Dark mode, coming soon"
          disabled
          value={false}
          trackColor={{ false: colors.outline }}
        />
      </Card>
      <Card>
        <Text style={s.heading}>Good to know</Text>
        {[
          ['Privacy Policy', '/privacy', 'shield-checkmark-outline'],
          ['Terms', '/terms', 'document-text-outline'],
        ].map(([label, path, icon]) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={() => router.push(path as '/privacy')}
            style={[s.between, { paddingVertical: 12, minHeight: 48 }]}
          >
            <View style={s.row}>
              <Icon name={icon as 'shield-checkmark-outline'} color={colors.primary} />
              <Text style={s.body}>{label}</Text>
            </View>
            <Icon name="chevron-forward" color={colors.muted} size={18} />
          </Pressable>
        ))}
      </Card>
      <Card>
        <View style={s.between}>
          <Text style={s.heading}>FitFlow</Text>
          <Pill text={`v${Constants.expoConfig?.version ?? '1.0.0'}`} />
        </View>
        <Body muted>Train smarter. Live healthier.</Body>
        <Text style={s.label}>IT3060 · Student academic prototype</Text>
      </Card>
    </Screen>
  );
}
