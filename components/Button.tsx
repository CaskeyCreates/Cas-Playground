import { StyleSheet, Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';

import { colors, fonts, radius } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'accent-outline';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const Button = ({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
    >
      <Text
        style={[
          styles.label,
          variant === 'primary' && styles.labelDark,
          variant === 'ghost' && styles.labelGhost,
          variant === 'accent-outline' && styles.labelAccent,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.accent },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borderHover,
  },
  'accent-outline': {
    backgroundColor: colors.accentBg,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  disabled: { opacity: 0.4 },
  label: {
    fontSize: 13,
    fontFamily: fonts.displayBlack,
  },
  labelDark: { color: colors.bg },
  labelGhost: { color: colors.textDim },
  labelAccent: { color: colors.accent },
});
