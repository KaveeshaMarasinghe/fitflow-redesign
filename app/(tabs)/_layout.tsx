import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from '../../components/ui';
import { colors, fonts } from '../../constants/theme';

const tabs: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Home', icon: 'home-outline' },
  { name: 'workout', title: 'AI Workout', icon: 'barbell-outline' },
  { name: 'progress', title: 'Progress', icon: 'stats-chart-outline' },
  { name: 'community', title: 'Community', icon: 'people-outline' },
  { name: 'nutrition', title: 'Nutrition', icon: 'leaf-outline' },
];
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 68 + insets.bottom,
          paddingTop: 4,
          paddingBottom: insets.bottom + 8,
          borderTopColor: colors.line,
          backgroundColor: colors.surface,
        },
        tabBarLabelStyle: { fontFamily: fonts.bold, fontSize: 10, lineHeight: 14, marginTop: 1 },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <Icon name={tab.icon} color={color} size={22} />,
          }}
        />
      ))}
    </Tabs>
  );
}
