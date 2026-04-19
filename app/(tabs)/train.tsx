import { useRouter } from 'expo-router';
import { ArrowUpRight, Bell, ChevronRight, Info } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  AnimatedSection,
  Eyebrow,
  Hairline,
  Screen,
  TapScale,
  Text,
} from '../../components/ui';
import { getEx } from '../../data/exercises';
import { PROGRAM, type ProgramDay } from '../../data/program';
import { useAppStore } from '../../store/useAppStore';
import { colors, fonts, space } from '../../theme';

const DOW_ORDER: ProgramDay['day'][] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DOW_TO_INDEX: Record<number, ProgramDay['day']> = {
  0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat',
};

export default function TrainScreen() {
  const router = useRouter();
  const state = useAppStore();
  const today = new Date();
  const todayDow = DOW_TO_INDEX[today.getDay()];
  const [selectedDay, setSelectedDay] = useState<ProgramDay['day']>(todayDow);

  const dayProgram = PROGRAM.find((p) => p.day === selectedDay) ?? PROGRAM[0];
  const isToday = selectedDay === todayDow;

  const sessions = state.sessions;
  const recentSessions = useMemo(
    () => sessions.slice().reverse().slice(0, 3),
    [sessions]
  );

  const sets = dayProgram.exIds.reduce((a, e) => a + e.s, 0);
  const minutes = Math.round(sets * 1.5 + 10);

  return (
    <Screen
      topBar={
        <>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            Train
          </Text>
          <TapScale onPress={() => {}} haptic="light">
            <Bell size={22} color={colors.textFaint} strokeWidth={1.5} />
          </TapScale>
        </>
      }
    >
      {/* Hero */}
      <AnimatedSection delay={80}>
        <View style={styles.hero}>
          <Text variant="nano" tone={isToday ? 'accent' : 'faint'} uppercase weight="bold">
            {isToday ? 'Today' : dayProgram.full}
          </Text>
          <Text
            variant="hero"
            family="serif"
            weight="regular"
            style={{ marginTop: space.md }}
          >
            {dayProgram.focus}
          </Text>
          {dayProgram.exIds.length > 0 ? (
            <Text variant="bodySm" tone="muted" style={{ marginTop: space.sm }}>
              {dayProgram.exIds.length} movements · {sets} sets ·{' '}
              <Text variant="bodySm" tone="accent" weight="bold">
                ~{minutes} min
              </Text>
            </Text>
          ) : (
            <Text variant="bodySm" tone="muted" style={{ marginTop: space.sm }}>
              Recovery day. Walk, stretch, hydrate.
            </Text>
          )}
        </View>
      </AnimatedSection>

      {/* Day selector */}
      <AnimatedSection delay={160}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daySelector}
        >
          {DOW_ORDER.map((d) => {
            const p = PROGRAM.find((pp) => pp.day === d);
            if (!p) return null;
            const active = selectedDay === d;
            const isTodayChip = d === todayDow;
            return (
              <TapScale
                key={d}
                onPress={() => setSelectedDay(d)}
                haptic="selection"
                scaleTo={0.95}
              >
                <View style={[styles.dayChip, active && styles.dayChipActive]}>
                  <Text
                    variant="nano"
                    tone={active ? 'default' : 'faint'}
                    uppercase
                    weight="bold"
                    style={{ letterSpacing: 2 }}
                  >
                    {d}
                  </Text>
                  <Text
                    variant="bodySm"
                    family="serif"
                    tone={active ? 'default' : 'faint'}
                    style={{ marginTop: 4 }}
                  >
                    {p.focus.split(' ')[0]}
                  </Text>
                  {isTodayChip ? <View style={styles.todayDot} /> : null}
                </View>
              </TapScale>
            );
          })}
        </ScrollView>
      </AnimatedSection>

      {/* Exercises */}
      {dayProgram.exIds.length > 0 ? (
        <AnimatedSection delay={220}>
          <Eyebrow
            label="Movements"
            right={
              <Text variant="micro" tone="faint" uppercase>
                {dayProgram.exIds.length}
              </Text>
            }
          />
          <Hairline dim />
          {dayProgram.exIds.map((prog, i) => {
            const ex = getEx(prog.id);
            if (!ex) return null;
            const hist = state.logs[prog.id] ?? [];
            const lastSession = hist[hist.length - 1];
            const lastMax = lastSession
              ? Math.max(...lastSession.sets.map((s) => Number(s.w) || 0))
              : 0;

            return (
              <View key={i}>
                <TapScale
                  onPress={() => router.push(`/exercise/${prog.id}`)}
                  haptic="light"
                  scaleTo={0.98}
                >
                  <View style={styles.exerciseRow}>
                    <Text
                      variant="nano"
                      tone="faint"
                      family="mono"
                      weight="bold"
                      style={{ width: 28 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text variant="body" family="serif" weight="regular">
                        {ex.n}
                      </Text>
                      <Text variant="nano" tone="faint" uppercase style={{ marginTop: 2 }}>
                        {ex.muscle} · {prog.s}×{prog.r} · RPE {prog.rpe}
                      </Text>
                      {lastMax > 0 ? (
                        <Text variant="nano" tone="accent" style={{ marginTop: 3 }} weight="bold">
                          Last · {lastMax} kg
                        </Text>
                      ) : null}
                    </View>
                    <Info size={14} color={colors.textFaint} strokeWidth={1.5} />
                  </View>
                </TapScale>
                <Hairline dim />
              </View>
            );
          })}

          {isToday ? (
            <TapScale
              onPress={() => router.push('/workout/session')}
              haptic="success"
              scaleTo={0.98}
            >
              <View style={styles.startBtn}>
                <Text
                  variant="body"
                  uppercase
                  weight="bold"
                  style={{ color: colors.bg, letterSpacing: 2 }}
                >
                  Start Session
                </Text>
                <View style={styles.startArrow}>
                  <ArrowUpRight size={16} color={colors.accent} strokeWidth={2.5} />
                </View>
              </View>
            </TapScale>
          ) : null}
        </AnimatedSection>
      ) : (
        <AnimatedSection delay={220}>
          <Eyebrow label="Rest Day" />
          <Hairline dim />
          <View style={styles.emptyBlock}>
            <Text variant="body" tone="muted" family="serif">
              {dayProgram.focus}.
            </Text>
            <Text variant="bodySm" tone="faint" style={{ marginTop: space.sm }}>
              Take a walk, stretch, hydrate. Recovery is when growth happens.
            </Text>
          </View>
        </AnimatedSection>
      )}

      {/* Recent sessions */}
      <AnimatedSection delay={280}>
        <Eyebrow
          label="History"
          right={
            <Text variant="micro" tone="faint" uppercase>
              {sessions.length} sessions
            </Text>
          }
        />
        <Hairline dim />
        {recentSessions.length === 0 ? (
          <View style={styles.emptyBlock}>
            <Text variant="body" tone="muted" family="serif">
              No sessions logged yet.
            </Text>
            <Text variant="bodySm" tone="faint" style={{ marginTop: space.sm }}>
              Complete a workout and your history will live here.
            </Text>
          </View>
        ) : (
          recentSessions.map((s, i) => (
            <View key={i}>
              <View style={styles.historyRow}>
                <View style={{ flex: 1 }}>
                  <Text variant="body" family="serif" weight="regular">
                    {s.focus}
                  </Text>
                  <Text variant="nano" tone="faint" uppercase style={{ marginTop: 2 }}>
                    {new Date(s.timestamp).toLocaleDateString('en-GB', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    · {s.totalSets} sets · {Math.floor(s.duration / 60)} min
                  </Text>
                </View>
                <ChevronRight size={14} color={colors.textFaint} strokeWidth={1.5} />
              </View>
              <Hairline dim />
            </View>
          ))
        )}
      </AnimatedSection>

      <View style={{ height: space.section }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: space.xxl,
    paddingBottom: space.xl,
  },
  daySelector: {
    gap: space.sm,
    paddingRight: space.xl,
  },
  dayChip: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    minWidth: 84,
    alignItems: 'center',
  },
  dayChipActive: {
    backgroundColor: colors.bgLift,
    borderColor: colors.text,
  },
  todayDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.accent,
    marginTop: 4,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.lg,
  },
  emptyBlock: {
    paddingVertical: space.xxl,
  },
  startBtn: {
    marginTop: space.xl,
    backgroundColor: colors.accent,
    paddingVertical: space.lg,
    paddingHorizontal: space.xl,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.md,
  },
  startArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.md,
  },
});
