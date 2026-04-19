import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, space } from '../theme';

type Props = {
  rankName: string;
  rankColor: string;
  level: number;
  subtitle?: string;
};

export const AppHeader = ({ rankName, rankColor, level, subtitle }: Props) => (
  <View style={styles.wrap}>
    <View style={styles.left}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>CK</Text>
      </View>
      <View>
        <Text style={styles.name}>CK ASCEND</Text>
        <Text style={styles.subtitle}>{subtitle ?? 'Training System'}</Text>
      </View>
    </View>
    <View style={[styles.rankBadge, { borderColor: rankColor }]}>
      <Text style={[styles.rankName, { color: rankColor }]}>{rankName}</Text>
      <Text style={styles.rankLvl}>LVL {level}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: space.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 13,
    fontFamily: fonts.monoBold,
    color: colors.bg,
  },
  name: {
    fontSize: 15,
    fontFamily: fonts.displayBlack,
    color: colors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 9,
    color: colors.textGhost,
    fontFamily: fonts.body,
  },
  rankBadge: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: 'flex-end',
  },
  rankName: {
    fontSize: 11,
    fontFamily: fonts.monoBold,
    letterSpacing: 1,
  },
  rankLvl: {
    fontSize: 8,
    color: colors.textGhost,
    fontFamily: fonts.monoBold,
    marginTop: 1,
  },
});
