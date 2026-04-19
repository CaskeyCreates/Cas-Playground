import { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextStyle,
  TextProps as RNTextProps,
} from 'react-native';

import { colors, fonts, type } from '../../theme';

type Variant =
  | 'hero'
  | 'display'
  | 'title'
  | 'heading'
  | 'body'
  | 'bodySm'
  | 'eyebrow'
  | 'micro'
  | 'nano';

type Tone = 'default' | 'muted' | 'dim' | 'faint' | 'ghost' | 'accent' | 'gold';

type Family = 'serif' | 'sans' | 'mono';

type Weight = 'regular' | 'bold' | 'black';

type Props = RNTextProps & {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  family?: Family;
  weight?: Weight;
  uppercase?: boolean;
  italic?: boolean;
  style?: StyleProp<TextStyle>;
};

const toneMap: Record<Tone, string> = {
  default: colors.text,
  muted: colors.textMuted,
  dim: colors.textDim,
  faint: colors.textFaint,
  ghost: colors.textGhost,
  accent: colors.accent,
  gold: colors.gold,
};

const getFont = (family: Family, weight: Weight): string => {
  if (family === 'serif') {
    return weight === 'regular' ? fonts.serif : fonts.serifBold;
  }
  if (family === 'mono') {
    return weight === 'regular' ? fonts.mono : fonts.monoBold;
  }
  // sans
  if (weight === 'black') return fonts.sansBlack;
  if (weight === 'bold') return fonts.sansBold;
  return fonts.sans;
};

export const Text = ({
  children,
  variant = 'body',
  tone = 'default',
  family = 'sans',
  weight = 'regular',
  uppercase,
  italic,
  style,
  ...rest
}: Props) => {
  return (
    <RNText
      style={[
        type[variant],
        {
          color: toneMap[tone],
          fontFamily: getFont(family, weight),
        },
        uppercase && styles.upper,
        italic && styles.italic,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  upper: { textTransform: 'uppercase' },
  italic: { fontStyle: 'italic' },
});
