import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, shadow, space } from '../theme';
import { ProgressBar } from './ProgressBar';

type Props = {
  name: string;
  rankName: string;
  rankColor: string;
  level: number;
  xp: number;
  progressPct: number;
};

export const HunterCard = ({ name, rankName, rankColor, level, xp, progressPct }: Props) => {
  const initial = rankName.charAt(0);
  return (
    <View style={[styles.card, { borderColor: rankColor }]}>
      <View style={styles.top}>
        <View
          style={[
            styles.badge,
            { backgroundColor: rankColor },
            shadow.glow(rankColor, 0.25),
          ]}
        >
          <Text style={styles.badgeText}>{initial}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.rank, { color: rankColor }]}>
            {rankName} HUNTER • LVL {level}
          </Text>
          <Text style={styles.xp}>{xp.toLocaleString()} XP</Text>
        </View>
      </View>
      <ProgressBar pct={progressPct} color={rankColor} height={6} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgSurfaceHi,
    borderRadius: 18,
    padding: 18,
    marginBottom: space.lg,
    borderWidth: 2,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xl,
    marginBottom: 14,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 24,
    fontFamily: fonts.monoBold,
    color: colors.bg,
  },
  info: { flex: 1 },
  name: {
    fontSize: 18,
    fontFamily: fonts.displayBlack,
    color: colors.text,
    letterSpacing: -0.3,
  },
  rank: {
    fontSize: 10,
    fontFamily: fonts.monoBold,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  xp: {
    fontSize: 11,
    color: colors.textFaint,
    fontFamily: fonts.monoBold,
    marginTop: 2,
  },
});
