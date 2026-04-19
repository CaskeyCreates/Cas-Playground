import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, space } from '../../theme';
import { Text } from './Text';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

type Props = {
  // 0 = Sun, 6 = Sat
  activeDayOfWeek: number;
  onSelect?: (dayOfWeek: number) => void;
};

// The "S M T W T F S" strip with an underline on today.
// Used for quick day navigation, matches Open's pattern.
export const DateStrip = ({ activeDayOfWeek, onSelect }: Props) => (
  <View style={styles.row}>
    {DAYS.map((label, i) => {
      const active = i === activeDayOfWeek;
      return (
        <TouchableOpacity
          key={i}
          onPress={() => onSelect?.(i)}
          activeOpacity={onSelect ? 0.7 : 1}
          style={styles.cell}
        >
          <Text
            variant="bodySm"
            tone={active ? 'accent' : 'faint'}
            weight={active ? 'bold' : 'regular'}
            style={styles.label}
          >
            {label}
          </Text>
          {active ? <View style={styles.underline} /> : null}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: space.sm,
  },
  cell: {
    alignItems: 'center',
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
  },
  label: {
    letterSpacing: 2,
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: 10,
    borderRadius: 1,
    backgroundColor: colors.accent,
  },
});
