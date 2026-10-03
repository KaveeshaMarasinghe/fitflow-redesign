import { Image, StyleSheet, type ImageStyle, type StyleProp } from 'react-native';
import { colors } from '../constants/theme';
import { photos, type PhotoName } from '../data/photos';

export function AppPhoto({
  photo,
  label,
  style,
  contain = false,
}: {
  photo: PhotoName;
  label: string;
  style?: StyleProp<ImageStyle>;
  contain?: boolean;
}) {
  return (
    <Image
      source={photos[photo]}
      accessibilityLabel={label}
      resizeMode={contain ? 'contain' : 'cover'}
      style={[styles.photo, style]}
    />
  );
}

const styles = StyleSheet.create({
  photo: { width: '100%', backgroundColor: colors.primarySoft },
});
