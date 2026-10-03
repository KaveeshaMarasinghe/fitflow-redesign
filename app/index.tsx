import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../constants/theme';
import { EnergyArtwork } from '../components/EnergyArtwork';
import { Body, Button, Icon, Screen, s } from '../components/ui';

export default function Welcome() {
  return (
    <Screen>
      <View style={styles.brand}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.brandName}>
          FitFlow<Text style={{ color: colors.primary }}>.</Text>
        </Text>
      </View>
      <View style={styles.visual}>
        <View style={styles.label}>
          <Icon name="leaf-outline" color={colors.primary} size={16} />
          <Text style={styles.labelText}>YOUR EVERYDAY, ELEVATED</Text>
        </View>
        <EnergyArtwork />
        <View style={styles.visualFooter}>
          <Text style={s.heading}>Find your rhythm.</Text>
          <Text style={s.label}>Movement · Mindset · Momentum</Text>
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={styles.headline}>
          Train smarter.{'\n'}
          <Text style={{ color: colors.primary }}>Live healthier.</Text>
        </Text>
        <Body muted>
          Make room for a stronger you. Personalized movement, mindful nutrition, and a community
          that moves with you.
        </Body>
      </View>
      <View style={styles.features}>
        {[
          ['sparkles', 'Your workout'],
          ['trending-up', 'Your progress'],
          ['people-outline', 'Your people'],
        ].map(([icon, label]) => (
          <View key={label} style={styles.feature}>
            <Icon name={icon as 'sparkles'} color={colors.primary} size={21} />
            <Text style={styles.featureText}>{label}</Text>
          </View>
        ))}
      </View>
      <Button title="Get Started" icon="arrow-forward" onPress={() => router.replace('/(tabs)')} />
      <Text style={styles.note}>Explore a sample day. No account needed.</Text>
      <Pressable
        accessibilityRole="link"
        onPress={() => router.push('/privacy')}
        style={{ minHeight: 44, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={s.link}>Privacy & your information</Text>
      </Pressable>
    </Screen>
  );
}
const styles = StyleSheet.create({
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 4 },
  logo: { width: 38, height: 38, borderRadius: 12 },
  brandName: { fontFamily: fonts.heavy, color: colors.ink, fontSize: 27, letterSpacing: -1 },
  visual: { backgroundColor: colors.primarySoft, borderRadius: 16, padding: 12, marginTop: 0 },
  label: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  labelText: { fontFamily: fonts.bold, fontSize: 9, color: colors.primary, letterSpacing: 1 },
  visualFooter: { alignItems: 'center', gap: 5 },
  headline: {
    fontFamily: fonts.heavy,
    color: colors.ink,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -1.4,
  },
  features: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  feature: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 4 },
  featureText: { fontFamily: fonts.medium, color: colors.muted, fontSize: 11 },
  note: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 0,
  },
});
