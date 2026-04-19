import { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius, space } from '../../theme';
import { Text } from './Text';

type Props = {
  label: string;
  subtitle?: string;
  right?: ReactNode;
  left?: ReactNode;
  onPress?: () => void;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
};

// Horizontal chip — the "Life Score / Offline MODE" pattern from Open.
// Wider than tall, subtle border, minimal fill.
export const Pill = ({ label, subtitle, right, left, onPress, active, style }: Props) => {
  const content = (
    <View style={[styles.pill, active && styles.pillActive, style]}>
      {left ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.info}>
        <Text variant="bodySm" tone="muted" weight="regular">
          {label}
        </Text>
        {subtitle ? (
          <Text variant="nano" tone="faint" uppercase>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    backgroundColor: colors.bg,
    minHeight: 44,
  },
  pillActive: {
    backgroundColor: colors.bgLift,
  },
  left: {},
  info: { flex: 1 },
  right: {},
});
