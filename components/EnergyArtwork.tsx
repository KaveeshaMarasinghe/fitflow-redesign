import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';
import { Icon } from './ui';

export function EnergyArtwork({ small = false }: { small?: boolean }) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.art, small && { height: 120 }]}
    >
      <View style={styles.orbit} />
      <View style={styles.orbitInner} />
      <View style={styles.center}>
        <Icon name="barbell" size={small ? 50 : 80} color={colors.ink} />
      </View>
      <View style={[styles.bubble, { top: 10, left: 25 }]}>
        <Icon name="flash" color={colors.primary} size={24} />
      </View>
      <View style={[styles.bubble, { bottom: 18, right: 22, backgroundColor: colors.primary }]}>
        <Icon name="heart" color={colors.accent} size={21} />
      </View>
      <View style={styles.dot} />
    </View>
  );
}
const styles = StyleSheet.create({
  art: { height: 168, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  orbit: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 1,
    borderColor: colors.outline,
    transform: [{ rotate: '25deg' }, { scaleY: 0.74 }],
  },
  orbitInner: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  center: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-25deg' }],
  },
  bubble: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    right: 45,
    top: 30,
    backgroundColor: colors.primary,
  },
});
