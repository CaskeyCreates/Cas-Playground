import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, shadow, space } from '../theme';
import { ProgressBar } from './ProgressBar';

type StatItem = { label: string; value: string | number };

type Props = {
  rankName: string;
  rankColor: string;
  level: number;
  totalXP: number;
  nextLvlXP: number;
  progressPct: number;
  stats: StatItem[];
};

export const RankCard = ({
  rankName,
  rankColor,
  level,
  totalXP,
  nextLvlXP,
  progressPct,
  stats,
}: Props) => {
  const initial = rankName.split('-')[0];
  return (
    <View style={[styles.card, { borderColor: rankColor }]}>
      <View style={styles.top}>
        <View style={[styles.badge, { backgroundColor: rankColor }, shadow.glow(rankColor, 0.3)]}>
          <Text style={styles.badgeText}>{initial}</Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.rankName, { color: rankColor }]}>{rankName}</Text>
          <Text style={styles.lvl}>HUNTER • LEVEL {level}</Text>
        </View>
      </View>
      <View style={styles.xpRow}>
        <Text style={styles.xp}>{totalXP.toLocaleString()} XP</Text>
        <Text style={styles.next}>{nextLvlXP.toLocaleString()} XP next level</Text>
      </View>
      <ProgressBar pct={progressPct} color={rankColor} height={8} />
      <View style={styles.statsGrid}>
        {stats.map((s, i) => (
          <View key={i} style={styles.stat}>
            <Text style={styles.statNum}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgSurfaceHi,
    borderRadius: 20,
    padding: space.xxxl,
    marginBottom: space.xl,
    borderWidth: 2,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xl,
    marginBottom: 14,
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 22,
    fontFamily: fonts.monoBold,
    color: colors.bg,
  },
  info: { flex: 1 },
  rankName: {
    fontSize: 22,
    fontFamily: fonts.monoBold,
    letterSpacing: 1,
  },
  lvl: {
    fontSize: 10,
    fontFamily: fonts.displayBlack,
    color: colors.textFaint,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xp: {
    fontSize: 14,
    fontFamily: fonts.monoBold,
    color: colors.accent,
  },
  next: {
    fontSize: 10,
    fontFamily: fonts.mono,
    color: colors.textGhost,
    alignSelf: 'flex-end',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 14,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  statNum: {
    fontSize: 16,
    fontFamily: fonts.monoBold,
    color: colors.accent,
  },
  statLabel: {
    fontSize: 7,
    color: colors.textGhost,
    fontFamily: fonts.displayBlack,
    letterSpacing: 0.5,
    marginTop: 2,
  },
});
