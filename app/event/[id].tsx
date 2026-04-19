import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Eyebrow, Hairline, TapScale, Text } from '../../components/ui';
import { getEventById } from '../../data/events';
import { daysBetween } from '../../lib/dates';
import { calculateReadiness } from '../../lib/readiness';
import { useAppStore } from '../../store/useAppStore';
import { colors, space } from '../../theme';

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = getEventById(id);
  const state = useAppStore();
  const isActive = state.activeEvent === event?.id;

  if (!event) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <BackBar onBack={() => router.back()} />
        <View style={{ padding: space.xxl }}>
          <Text tone="muted">Event not found.</Text>
        </View>
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
      <BackBar onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Editorial hero */}
        <View style={styles.hero}>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            {event.bossLevel}
          </Text>
          <Text
            variant="hero"
            family="serif"
            weight="regular"
            style={{ marginTop: space.md }}
          >
            {event.name}
          </Text>
          <Text variant="bodySm" tone="muted" style={{ marginTop: space.sm }}>
            {event.type} · {event.distance}
          </Text>
        </View>

        <Hairline />

        {/* Countdown + date */}
        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
            <Text variant="nano" tone="faint" uppercase weight="bold">
              Days out
            </Text>
            <Text
              variant="display"
              family="serif"
              weight="regular"
              style={{ marginTop: space.xs }}
            >
              {days}
            </Text>
          </View>
          <View style={styles.metaCol}>
            <Text variant="nano" tone="faint" uppercase weight="bold">
              Difficulty
            </Text>
            <Text
              variant="display"
              family="serif"
              weight="regular"
              style={{ marginTop: space.xs }}
            >
              {event.difficulty}
              <Text variant="display" tone="faint" family="serif">
                /10
              </Text>
            </Text>
          </View>
        </View>

        <Hairline />
        <View style={styles.detailRow}>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            Date
          </Text>
          <Text variant="body" tone="default">
            {new Date(event.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>
        <Hairline dim />
        <View style={styles.detailRow}>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            Location
          </Text>
          <Text
            variant="body"
            tone="default"
            style={{ textAlign: 'right', flex: 1, marginLeft: space.xl }}
          >
            {event.location}
          </Text>
        </View>
        <Hairline dim />
        <View style={styles.detailRow}>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            Prep
          </Text>
          <Text variant="body" tone="default">
            {event.prepWeeks} weeks · min {event.minPrepWeeks}
          </Text>
        </View>
        <Hairline dim />

        {/* Readiness */}
        <Eyebrow label="Readiness" />
        <Hairline dim />
        <View style={styles.readiness}>
          <Text
            variant="hero"
            family="serif"
            weight="regular"
            tone={readiness.total >= 50 ? 'default' : 'muted'}
          >
            {readiness.total}
            <Text variant="title" family="serif" tone="faint">
              /100
            </Text>
          </Text>
          <Text
            variant="micro"
            uppercase
            weight="bold"
            tone="muted"
            style={{ marginTop: space.md, letterSpacing: 2 }}
          >
            {readiness.verdict}
          </Text>
          <Text
            variant="bodySm"
            tone="muted"
            style={{ marginTop: space.lg, lineHeight: 20 }}
          >
            {readiness.recommendation}
          </Text>
        </View>
        <Hairline dim />

        {/* Readiness breakdown */}
        <ScoreRow label="Time available" value={readiness.timeScore} />
        <ScoreRow label="Consistency" value={readiness.consistencyScore} />
        <ScoreRow label="Body composition" value={readiness.fitnessScore} />
        <ScoreRow label="Strength" value={readiness.strengthScore} />

        {/* Description */}
        <Eyebrow label="About" />
        <Hairline dim />
        <View style={styles.descBlock}>
          <Text variant="body" tone="muted" style={{ lineHeight: 22 }}>
            {event.description}
          </Text>
        </View>

        {/* Prerequisites */}
        <Eyebrow label="Prerequisites" />
        <Hairline dim />
        <PrereqRow label="Cardio" value={event.requirements.cardio} />
        <PrereqRow label="Strength" value={event.requirements.strength} />
        <PrereqRow label="Experience" value={event.requirements.experience} />

        <View style={{ height: space.xxxl }} />
      </ScrollView>

      {/* Action */}
      <View style={styles.actionBar}>
        <TapScale
          onPress={toggle}
          haptic={isActive ? 'medium' : 'success'}
          scaleTo={0.97}
        >
          <View
            style={[styles.action, isActive ? styles.actionAbandon : styles.actionAccept]}
          >
            <Text
              variant="body"
              weight="bold"
              uppercase
              style={{
                color: isActive ? colors.text : colors.bg,
                letterSpacing: 2,
              }}
            >
              {isActive ? 'Abandon quest' : 'Accept quest'}
            </Text>
          </View>
        </TapScale>
      </View>
    </SafeAreaView>
  );
}

const BackBar = ({ onBack }: { onBack: () => void }) => (
  <View style={styles.backBar}>
    <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backBtn}>
      <ArrowLeft size={20} color={colors.text} strokeWidth={1.5} />
    </TouchableOpacity>
  </View>
);

const ScoreRow = ({ label, value }: { label: string; value: number }) => (
  <>
    <View style={styles.scoreRow}>
      <Text variant="bodySm" tone="muted" style={{ flex: 1 }}>
        {label}
      </Text>
      <View style={styles.scoreBar}>
        <View style={[styles.scoreFill, { width: `${value}%` }]} />
      </View>
      <Text
        variant="bodySm"
        tone="default"
        family="mono"
        weight="bold"
        style={{ width: 44, textAlign: 'right' }}
      >
        {value}
      </Text>
    </View>
    <Hairline dim />
  </>
);

const PrereqRow = ({ label, value }: { label: string; value: string }) => (
  <>
    <View style={styles.prereqBlock}>
      <Text variant="nano" tone="faint" uppercase weight="bold">
        {label}
      </Text>
      <Text variant="body" tone="muted" style={{ marginTop: space.xs }}>
        {value}
      </Text>
    </View>
    <Hairline dim />
  </>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  backBar: {
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    paddingHorizontal: space.xl,
    paddingBottom: 100,
  },
  hero: {
    paddingVertical: space.xxl,
  },
  metaRow: {
    flexDirection: 'row',
    paddingVertical: space.xl,
    gap: space.xxxl,
  },
  metaCol: { flex: 1 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: space.lg,
  },
  readiness: {
    paddingVertical: space.xl,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.md,
    gap: space.lg,
  },
  scoreBar: {
    flex: 1.5,
    height: 2,
    backgroundColor: colors.hairline,
  },
  scoreFill: {
    height: 2,
    backgroundColor: colors.text,
  },
  descBlock: {
    paddingVertical: space.lg,
  },
  prereqBlock: {
    paddingVertical: space.md,
  },
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: space.xl,
    paddingBottom: space.xxl,
    backgroundColor: colors.bg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  action: {
    paddingVertical: space.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  actionAccept: {
    backgroundColor: colors.accent,
  },
  actionAbandon: {
    backgroundColor: colors.bg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
});
