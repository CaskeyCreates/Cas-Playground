import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { getEventById } from '../../data/events';
import { daysBetween } from '../../lib/dates';
import { calculateReadiness } from '../../lib/readiness';
import { useAppStore } from '../../store/useAppStore';
import { colors, fonts, radius, space } from '../../theme';

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = getEventById(id);
  const state = useAppStore();
  const isActive = state.activeEvent === event?.id;

  if (!event) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.missing}>Event not found.</Text>
      </SafeAreaView>
    );
  }

  const days = daysBetween(new Date(), event.date);
  const readiness = calculateReadiness(event, {
    sessions: state.sessions,
    logs: state.logs,
    body: state.body,
  });

  const toggle = () => {
    state.setActiveEvent(isActive ? null : event.id);
    if (!isActive) router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.hero, { borderColor: event.color }]}>
        <Text style={styles.heroIcon}>{event.icon}</Text>
        <Text style={[styles.boss, { color: event.color, borderColor: event.color }]}>
          {event.bossLevel}
        </Text>
        <Text style={styles.name}>{event.name}</Text>
        <Text style={styles.type}>
          {event.type} • {event.distance}
        </Text>
        <View style={styles.countdown}>
          <Text style={[styles.daysNum, { color: event.color }]}>{days}</Text>
          <Text style={styles.daysLbl}>DAYS UNTIL BATTLE</Text>
        </View>
      </View>

      <View style={styles.readiness}>
        <Text style={styles.sectionTitle}>AI READINESS</Text>
        <Text style={[styles.verdict, { color: readiness.color }]}>
          {readiness.total}% — {readiness.verdict}
        </Text>
        <Text style={styles.rec}>{readiness.recommendation}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          label={isActive ? '⊗ ABANDON QUEST' : '⚔️ ACCEPT QUEST'}
          onPress={toggle}
          style={{ backgroundColor: isActive ? colors.red : event.color }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: space.xxl, paddingVertical: 14 },
  back: {
    alignSelf: 'flex-start',
    backgroundColor: colors.bgSurfaceHi,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.borderHover,
  },
  backText: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: fonts.bodyBold,
  },
  missing: {
    color: colors.textFaint,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: fonts.body,
  },
  hero: {
    marginHorizontal: space.xxl,
    marginTop: space.xxl,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: colors.bgSurface,
  },
  heroIcon: { fontSize: 42, marginBottom: 10 },
  boss: {
    fontSize: 9,
    fontFamily: fonts.monoBold,
    letterSpacing: 2,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.displayBlack,
    color: colors.text,
    letterSpacing: -0.5,
  },
  type: {
    fontSize: 11,
    color: colors.textDim,
    fontFamily: fonts.bodyBold,
    marginBottom: 14,
  },
  countdown: {
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderHi,
    width: '100%',
  },
  daysNum: {
    fontSize: 48,
    fontFamily: fonts.monoBold,
    letterSpacing: -2,
    lineHeight: 50,
  },
  daysLbl: {
    fontSize: 9,
    fontFamily: fonts.displayBlack,
    letterSpacing: 2,
    marginTop: 4,
    color: colors.textFaint,
  },
  readiness: {
    marginHorizontal: space.xxl,
    marginTop: space.xxl,
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: fonts.monoBold,
    color: colors.textDim,
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  verdict: {
    fontSize: 16,
    fontFamily: fonts.displayBlack,
    marginBottom: 8,
  },
  rec: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    fontFamily: fonts.body,
  },
  actions: {
    padding: space.xxl,
    marginTop: 'auto',
  },
});
