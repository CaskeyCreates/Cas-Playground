import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, space } from '../theme';

type Stat = { icon: string; n: string | number; unit?: string; label: string };

type Props = { stats: Stat[] };

export const QuickStatsGrid = ({ stats }: Props) => (
  <View style={styles.grid}>
    {stats.map((s, i) => (
      <View key={i} style={styles.card}>
        <Text style={styles.icon}>{s.icon}</Text>
        <Text style={styles.num}>
          {s.n}
          {s.unit ? <Text style={styles.unit}>{s.unit}</Text> : null}
        </Text>
        <Text style={styles.label}>{s.label}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: space.lg,
  },
  card: {
    flexBasis: '48.5%',
    flexGrow: 1,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  icon: { fontSize: 18, marginBottom: 4 },
  num: {
    fontSize: 24,
    fontFamily: fonts.monoBold,
    color: colors.accent,
    lineHeight: 26,
  },
  unit: {
    fontSize: 11,
    color: colors.textFaint,
    fontFamily: fonts.bodyBold,
  },
  label: {
    fontSize: 8,
    color: colors.textGhost,
    fontFamily: fonts.displayBlack,
    letterSpacing: 1,
    marginTop: 4,
  },
});
