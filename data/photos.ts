import type { ImageSourcePropType } from 'react-native';

// Static sources keep every photo bundled for Expo Go and offline builds.
export const photos = {
  welcome: require('../assets/photos/welcome.jpg'),
  strength: require('../assets/photos/strength.jpg'),
  running: require('../assets/photos/running.jpg'),
  oats: require('../assets/photos/oats.jpg'),
  chicken: require('../assets/photos/chicken.jpg'),
  yogurt: require('../assets/photos/yogurt.jpg'),
  salmon: require('../assets/photos/salmon.jpg'),
  alex: require('../assets/photos/alex.jpg'),
} satisfies Record<string, ImageSourcePropType>;

export type PhotoName = keyof typeof photos;

export const mealPhotos: Partial<Record<string, PhotoName>> = {
  'Berry overnight oats': 'oats',
  'Grilled chicken & rice': 'chicken',
  'Greek yogurt & almonds': 'yogurt',
  'Salmon & roasted vegetables': 'salmon',
};
