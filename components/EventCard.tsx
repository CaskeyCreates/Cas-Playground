import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { FitnessEvent } from '../data/events';
import type { Readiness } from '../lib/readiness';
import { colors, fonts, radius, space } from '../theme';
import { ProgressBar } from './ProgressBar';

type Props = {
  event: FitnessEvent;
  daysUntil: number;
  readiness: Readiness;
  isActive: boolean;
  onPress: () => void;
};

export const EventCard = ({ event, daysUntil, readiness, isActive, onPress }: Props) => {
  const borderColor = isActive ? event.color : colors.border;

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor }, isActive && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {isActive ? (
        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>⚔️ ACTIVE QUEST</Text>
        </View>
      ) : null}

      <View style={styles.top}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: `${event.color}15`,
              borderColor: `${event.color}30`,
            },
          ]}
        >
          <Text style={styles.icon}>{event.icon}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{event.name}</Text>
          <Text style={styles.meta}>{event.type} • {event.distance}</Text>
          <Text style={styles.loc}>📍 {event.region}</Text>
        </View>
        <View style={styles.daysBox}>
          <Text style={[styles.daysNum, { color: event.color }]}>{daysUntil}</Text>
          <Text style={styles.daysLbl}>DAYS</Text>
        </View>
      </View>

      <Text style={[styles.boss, { color: event.color }]}>{event.bossLevel}</Text>

      <View style={styles.diffRow}>
        <Text style={styles.diffLabel}>DIFFICULTY</Text>
        <View style={styles.pipsRow}>
          {Array.from({ length: 10 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.pip,
                {
                  backgroundColor:
                    i < event.difficulty ? event.color : 'rgba(255,255,255,0.06)',
                },
              ]}
            />
          ))}
        </View>
        <Text style={styles.diffNum}>{event.difficulty}/10</Text>
      </View>

      <View style={styles.readiness}>
        <Text style={styles.readyLabel}>READINESS</Text>
        <View style={styles.readyBar}>
          <ProgressBar pct={readiness.total} color={readiness.color} height={6} />
        </View>
        <Text style={[styles.readyNum, { color: readiness.color }]}>
          {readiness.total}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.xl,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    position: 'relative',
  },
  cardActive: { backgroundColor: colors.bgSurfaceHi },
  activeBadge: {
    position: 'absolute',
    top: -8,
    left: 14,
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeText: {
    fontSize: 9,
    fontFamily: fonts.monoBold,
    color: colors.bg,
    letterSpacing: 1,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.xl,
    marginBottom: space.lg,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 24 },
  info: { flex: 1, minWidth: 0 },
  name: {
    fontSize: 15,
    fontFamily: fonts.displayBlack,
    color: colors.text,
    letterSpacing: -0.3,
  },
  meta: {
    fontSize: 10,
    color: colors.textFaint,
    marginTop: 3,
    fontFamily: fonts.body,
  },
  loc: {
    fontSize: 10,
    color: colors.textGhost,
    marginTop: 2,
    fontFamily: fonts.body,
  },
  daysBox: { alignItems: 'flex-end' },
  daysNum: {
    fontSize: 24,
    fontFamily: fonts.monoBold,
    lineHeight: 26,
  },
  daysLbl: {
    fontSize: 7,
    color: colors.textGhost,
    fontFamily: fonts.monoBold,
    letterSpacing: 1,
    marginTop: 2,
  },
  boss: {
    fontSize: 9,
    fontFamily: fonts.monoBold,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  diffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    marginBottom: 8,
  },
  diffLabel: {
    fontSize: 8,
    color: colors.textGhost,
    fontFamily: fonts.bodyBold,
    letterSpacing: 0.5,
    width: 60,
  },
  pipsRow: {
    flexDirection: 'row',
    gap: 2,
    flex: 1,
  },
  pip: {
    flex: 1,
    height: 6,
    borderRadius: 1,
  },
  diffNum: {
    fontSize: 10,
    fontFamily: fonts.monoBold,
    color: colors.textMuted,
  },
  readiness: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  readyLabel: {
    fontSize: 8,
    color: colors.textGhost,
    fontFamily: fonts.bodyBold,
    letterSpacing: 0.5,
    width: 60,
  },
  readyBar: { flex: 1 },
  readyNum: {
    fontSize: 11,
    fontFamily: fonts.monoBold,
  },
});
