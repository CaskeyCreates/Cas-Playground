import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { RankDef } from '../data/quests';
import { colors, fonts, radius, space } from '../theme';

type Props = {
  def: RankDef;
  isCurrent: boolean;
  isPast: boolean;
  isNext: boolean;
  open: boolean;
  onToggle: () => void;
};

export const RankRow = ({ def, isCurrent, isPast, isNext, open, onToggle }: Props) => {
  const borderColor = isCurrent
    ? def.color
    : isPast
    ? `${def.color}40`
    : colors.border;

  return (
    <TouchableOpacity
      style={[
        styles.row,
        { borderColor },
        isCurrent && styles.rowCurrent,
        isPast && styles.rowPast,
        isNext && styles.rowNext,
      ]}
      onPress={onToggle}
      activeOpacity={0.85}
    >
      <View style={styles.top}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: isPast || isCurrent ? def.color : 'rgba(255,255,255,0.06)',
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: isPast || isCurrent ? colors.bg : colors.textPlaceholder },
            ]}
          >
            {isPast ? '✓' : def.rank.split('-')[0]}
          </Text>
        </View>
        <View style={styles.info}>
          <Text
            style={[
              styles.name,
              { color: isCurrent ? def.color : isPast ? colors.textDim : colors.textGhost },
            ]}
          >
            {def.rank}
          </Text>
          <Text style={styles.lvl}>Level {def.lvl} • {def.xpNeeded} XP</Text>
        </View>
        {isCurrent ? (
          <View style={[styles.youBadge, { backgroundColor: `${def.color}15` }]}>
            <Text style={[styles.youText, { color: def.color }]}>YOU</Text>
          </View>
        ) : null}
        <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
      </View>

      {open ? (
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>PREREQUISITES</Text>
          {def.prereqs.map((p, i) => (
            <View key={i} style={styles.prereqRow}>
              <Text style={styles.prereqCheck}>{isPast ? '✓' : '○'}</Text>
              <Text style={[styles.prereqText, isPast && styles.prereqDone]}>{p}</Text>
            </View>
          ))}
          <Text style={[styles.sectionTitle, { color: colors.accent, marginTop: space.lg }]}>
            UNLOCKS
          </Text>
          {def.unlocks.map((u, i) => (
            <Text key={i} style={styles.unlock}>⚡ {u}</Text>
          ))}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 6,
    borderWidth: 1,
  },
  rowCurrent: { backgroundColor: colors.bgSurfaceHi },
  rowPast: { opacity: 0.6 },
  rowNext: { borderStyle: 'dashed' },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 14,
    fontFamily: fonts.monoBold,
  },
  info: { flex: 1 },
  name: {
    fontSize: 13,
    fontFamily: fonts.monoBold,
    letterSpacing: 0.5,
  },
  lvl: {
    fontSize: 9,
    color: colors.textGhost,
    marginTop: 1,
    fontFamily: fonts.body,
  },
  youBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  youText: {
    fontSize: 8,
    fontFamily: fonts.monoBold,
    letterSpacing: 1,
  },
  arrow: {
    fontSize: 10,
    color: colors.textPlaceholder,
  },
  body: {
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: fonts.monoBold,
    color: colors.textDim,
    letterSpacing: 1,
    marginBottom: 6,
  },
  prereqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingVertical: 5,
  },
  prereqCheck: {
    fontSize: 11,
    color: colors.textPlaceholder,
    width: 16,
    fontFamily: fonts.mono,
  },
  prereqText: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: fonts.body,
  },
  prereqDone: {
    color: colors.textGhost,
    textDecorationLine: 'line-through',
  },
  unlock: {
    fontSize: 11,
    color: colors.accent,
    paddingVertical: 3,
    fontFamily: fonts.body,
  },
});
