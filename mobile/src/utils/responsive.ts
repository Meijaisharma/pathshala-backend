// src/utils/responsive.ts
import { Dimensions, PixelRatio } from 'react-native';

// Aapke phone ki screen width aur height nikaalta hai
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Standard design width (iPhone 11/12 size reference)
const BASE_WIDTH = 375;

// Ye function size ko screen ke hisaab se adjust karega
const scale = (size: number) => {
  const newSize = (SCREEN_WIDTH / BASE_WIDTH) * size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { scale, SCREEN_WIDTH, SCREEN_HEIGHT };

