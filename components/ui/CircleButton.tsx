import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { colors } from '../../theme';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'outline' | 'solid' | 'accent';

type Props = {
  children: ReactNode;
  onPress: () => void;
  size?: Size;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const SIZES: Record<Size, number> = {
  sm: 36,
  md: 48,
  lg: 64,
};

// Open's signature forward-arrow button — circle, subtle outline
export const CircleButton = ({
  children,
  onPress,
  size = 'md',
  variant = 'outline',
  style,
  disabled,
}: Props) => {
  const dim = SIZES[size];
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
        },
        variant === 'outline' && styles.outline,
        variant === 'solid' && styles.solid,
        variant === 'accent' && styles.accent,
        disabled && styles.disabled,
        styles.base,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  solid: {
    backgroundColor: colors.text,
  },
  accent: {
    backgroundColor: colors.accent,
  },
  disabled: {
    opacity: 0.35,
  },
});
