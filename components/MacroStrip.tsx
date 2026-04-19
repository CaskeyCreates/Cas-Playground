import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, space } from '../theme';
import { ProgressBar } from './ProgressBar';

type Row = { label: string; color: string; value: number; target: number; unit?: string };

type Props = { rows: Row[] };

export const MacroStrip = ({ rows }: Props) => (
  <View style={styles.wrap}>
    {rows.map((r, i) => {
      const pct = r.target > 0 ? (r.value / r.target) * 100 : 0;
      return (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>{r.label}</Text>
          <View style={styles.barWrap}>
            <ProgressBar pct={pct} color={r.color} height={8} />
          </View>
          <Text style={styles.value}>
            {r.value}
            {r.unit ?? ''}
          </Text>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  wrap: { gap: space.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  label: {
    fontSize: 9,
    fontFamily: fonts.monoBold,
    color: colors.textFaint,
    width: 30,
  },
  barWrap: { flex: 1 },
  value: {
    fontSize: 10,
    fontFamily: fonts.monoBold,
    color: colors.textMuted,
    width: 48,
    textAlign: 'right',
  },
});
