import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SUPPS } from '../data/meals';
import { colors, radius } from '../theme';

type Props = {
  checked: Record<number, boolean>;
  onToggle: (idx: number) => void;
};

export const SupplementPills = ({ checked, onToggle }: Props) => (
  <View style={styles.row}>
    {SUPPS.map((s, i) => {
      const on = !!checked[i];
      return (
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          style={[styles.pill, on && styles.pillOn]}
          onPress={() => onToggle(i)}
        >
          <Text style={styles.emoji}>{s.icon}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pill: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.borderHi,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillOn: {
    backgroundColor: colors.accentBgHi,
    borderColor: colors.accentBorderHi,
  },
  emoji: { fontSize: 18 },
});
