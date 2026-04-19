import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { FitnessEvent } from '../data/events';
import type { Readiness } from '../lib/readiness';
import { colors, fonts, radius, space } from '../theme';
import { ProgressBar } from './ProgressBar';

type Props = {
  event: FitnessEvent | null;
  daysUntil: number | null;
  readiness: Readiness | null;
  onPress: () => void;
};

export const EventBanner = ({ event, daysUntil, readiness, onPress }: Props) => {
  if (!event) {
    return (
      <TouchableOpacity
        style={[styles.card, styles.empty]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.emptyIcon}>🎯</Text>
        <Text style={styles.emptyTitle}>No Active Quest</Text>
        <Text style={styles.emptySubtitle}>Tap to choose your boss fight</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: event.color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.top}>
        <Text style={styles.icon}>{event.icon}</Text>
        <View style={styles.info}>
          <Text style={styles.label}>CURRENT QUEST</Text>
          <Text style={styles.name} numberOfLines={1}>
            {event.name}
          </Text>
        </View>
        <View style={styles.days}>
          <Text style={[styles.daysNum, { color: event.color }]}>{daysUntil}</Text>
          <Text style={styles.daysLbl}>DAYS</Text>
        </View>
      </View>
      {readiness ? (
        <View style={styles.readiness}>
          <ProgressBar pct={readiness.total} color={readiness.color} height={5} />
          <Text style={[styles.verdict, { color: readiness.color }]}>
            {readiness.verdict} • {readiness.total}% ready
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgSurface,
    borderRadius: 18,
    padding: space.xxl,
    marginBottom: space.lg,
    borderWidth: 2,
  },
  empty: {
    borderColor: colors.borderHi,
    borderStyle: 'dashed',
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: { fontSize: 32 },
  emptyTitle: {
    fontSize: 14,
    fontFamily: fonts.displayBlack,
    color: colors.textFaint,
    marginTop: 6,
  },
  emptySubtitle: {
    fontSize: 11,
    color: colors.textPlaceholder,
    marginTop: 2,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xl,
    marginBottom: space.lg,
  },
  icon: { fontSize: 32 },
  info: { flex: 1 },
  label: {
    fontSize: 9,
    color: colors.textFaint,
    fontFamily: fonts.monoBold,
    letterSpacing: 1.5,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.displayBlack,
    color: colors.text,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  days: {
    alignItems: 'flex-end',
  },
  daysNum: {
    fontSize: 32,
    fontFamily: fonts.monoBold,
    lineHeight: 34,
  },
  daysLbl: {
    fontSize: 8,
    color: colors.textFaint,
    fontFamily: fonts.monoBold,
    letterSpacing: 1,
    marginTop: 2,
  },
  readiness: {
    paddingTop: space.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 5,
  },
  verdict: {
    fontSize: 10,
    fontFamily: fonts.monoBold,
    letterSpacing: 0.5,
  },
});

export const getRadius = (): number => radius.xl;
