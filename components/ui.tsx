import type { ReactNode } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ColorValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../constants/theme';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];
export function Icon({
  name,
  size = 22,
  color = colors.ink,
}: {
  name: IconName;
  size?: number;
  color?: ColorValue;
}) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      accessible={false}
      aria-hidden={true}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
export function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.safe}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={s.screen}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[s.card, style]}>{children}</View>;
}
export function Title({ children }: { children: ReactNode }) {
  return <Text style={s.title}>{children}</Text>;
}
export function Body({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return <Text style={[s.body, muted && { color: colors.muted }]}>{children}</Text>;
}
export function Section({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      {action && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={action}
          onPress={onPress}
          hitSlop={10}
          style={s.sectionAction}
        >
          <Text style={s.link}>{action}</Text>
          <Icon name="arrow-forward" size={16} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}
export function AppHeader({
  title,
  subtitle,
  back = false,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
}) {
  return (
    <View style={s.header}>
      {back && (
        <IconButton
          name="arrow-back"
          label="Go back"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)'))}
        />
      )}
      <View style={s.flex}>
        <Title>{title}</Title>
        {subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
      </View>
      {right}
    </View>
  );
}
export function Avatar({
  initials = 'AM',
  size = 46,
  background = colors.primarySoft,
}: {
  initials?: string;
  size?: number;
  background?: string;
}) {
  return (
    <View
      style={[
        s.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: background },
      ]}
    >
      <Text style={[s.avatarText, { fontSize: size * 0.3 }]}>{initials}</Text>
    </View>
  );
}
export function IconButton({
  name,
  label,
  onPress,
}: {
  name: IconName;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [s.iconButton, pressed && s.pressed]}
    >
      <Icon name={name} />
    </Pressable>
  );
}
export function Button({
  title,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  icon?: IconName;
  variant?: 'primary' | 'secondary' | 'light';
  disabled?: boolean;
}) {
  const dark = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        variant === 'secondary' && s.secondary,
        variant === 'light' && s.light,
        pressed && s.pressed,
        disabled && { opacity: 0.45 },
      ]}
    >
      {icon && <Icon name={icon} size={20} color={dark ? colors.surface : colors.ink} />}
      <Text style={[s.buttonText, !dark && { color: colors.ink }]}>{title}</Text>
    </Pressable>
  );
}
export function Pill({
  text,
  icon,
  tone = 'green',
}: {
  text: string;
  icon?: IconName;
  tone?: 'green' | 'orange' | 'blue';
}) {
  const backgroundColor =
    tone === 'orange' ? colors.peach : tone === 'blue' ? colors.sky : colors.primarySoft;
  const color = tone === 'orange' ? colors.orange : tone === 'blue' ? colors.blue : colors.primary;
  return (
    <View style={[s.pill, { backgroundColor }]}>
      {icon && <Icon name={icon} size={14} color={color} />}
      <Text style={[s.pillText, { color }]}>{text}</Text>
    </View>
  );
}
export function ProgressBar({
  value,
  color = colors.primary,
  label,
}: {
  value: number;
  color?: string;
  label: string;
}) {
  const fraction = Math.max(0, Math.min(1, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(fraction * 100) }}
      style={s.track}
    >
      <View style={[s.fill, { width: `${fraction * 100}%`, backgroundColor: color }]} />
    </View>
  );
}
export function StatCard({
  icon,
  value,
  label,
  suffix,
  tone = 'green',
}: {
  icon: IconName;
  value: string | number;
  label: string;
  suffix?: string;
  tone?: 'green' | 'orange' | 'blue';
}) {
  const toneColor =
    tone === 'orange' ? colors.orange : tone === 'blue' ? colors.blue : colors.primary;
  return (
    <Card style={s.stat}>
      <Icon name={icon} color={toneColor} />
      <Text style={s.statValue}>
        {value}
        <Text style={s.statSuffix}>{suffix ? ` ${suffix}` : ''}</Text>
      </Text>
      <Text style={s.statLabel}>{label}</Text>
    </Card>
  );
}
export const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  screen: {
    padding: 8,
    paddingBottom: 12,
    gap: 8,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  flex: { flex: 1, minWidth: 0 },
  title: {
    fontFamily: fonts.heavy,
    fontSize: 22,
    lineHeight: 28,
    color: colors.ink,
    letterSpacing: -0.7,
  },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.ink },
  subtitle: {
    fontFamily: fonts.regular,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  heading: { fontFamily: fonts.bold, color: colors.ink, fontSize: 16, lineHeight: 22 },
  label: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted, lineHeight: 17 },
  section: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.ink, flexShrink: 1 },
  sectionAction: { flexDirection: 'row', alignItems: 'center', gap: 5, minHeight: 44 },
  link: { color: colors.primary, fontFamily: fonts.bold, fontSize: 12 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 0 },
  avatar: { alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.bold, color: colors.ink },
  iconButton: {
    minWidth: 46,
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
  button: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  buttonText: { fontFamily: fonts.bold, fontSize: 14, color: colors.surface, flexShrink: 1 },
  secondary: { backgroundColor: colors.primarySoft },
  light: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pillText: { fontFamily: fonts.bold, fontSize: 11 },
  track: { height: 8, backgroundColor: colors.line, borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
  stat: { flex: 1, minWidth: 0, padding: 10, gap: 4 },
  statValue: { fontFamily: fonts.heavy, color: colors.ink, fontSize: 22, letterSpacing: -0.8 },
  statSuffix: { fontFamily: fonts.medium, fontSize: 11, color: colors.muted },
  statLabel: { fontFamily: fonts.medium, color: colors.muted, fontSize: 11, lineHeight: 17 },
});
