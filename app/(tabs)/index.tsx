import { useRouter } from 'expo-router';
import { ArrowUpRight, Bell, Plus } from 'lucide-react-native';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  AnimatedSection,
  DateStrip,
  Eyebrow,
  Pill,
  Screen,
  TapScale,
  Text,
} from '../../components/ui';
import { getEventById } from '../../data/events';
import { SUPPS } from '../../data/meals';
import { MACROS } from '../../data/profile';
import { getTodayProgram } from '../../data/program';
import { DAILY_QUESTS } from '../../data/quests';
import { daysBetween, todayKey } from '../../lib/dates';
import { getGreetingIcon, supplementMonograms } from '../../lib/icons';
import { getLevel, getRank, levelProgress } from '../../lib/xp';
import { selectTotalXP, useAppStore } from '../../store/useAppStore';
import { colors, fonts, radius, space } from '../../theme';

const greetingByHour = (h: number): string => {
  if (h < 5) return 'Late night, hunter.';
  if (h < 12) return 'Rise and train.';
  if (h < 17) return 'Halfway there.';
  if (h < 21) return 'Finish strong.';
  return 'One more day down.';
};

const dailyLines = [
  { text: '"You do not just wake up and become a butterfly. Growth is a process."', author: 'RUPI KAUR' },
  { text: '"The body achieves what the mind believes."', author: 'NAPOLEON HILL' },
  { text: '"Discipline is choosing between what you want now and what you want most."', author: 'ABRAHAM LINCOLN' },
  { text: '"Success is the sum of small efforts, repeated day in and day out."', author: 'ROBERT COLLIER' },
  { text: '"You don\'t rise to the level of your goals. You fall to the level of your systems."', author: 'JAMES CLEAR' },
];

export default function HomeScreen() {
  const router = useRouter();
  const state = useAppStore();
  const totalXP = useAppStore(selectTotalXP);

  const today = new Date();
  const tk = todayKey(today);
  const dow = today.getDay();

  const { level } = getLevel(totalXP);
  const rank = getRank(level);
  const progressPct = levelProgress(totalXP);

  const activeEvent = getEventById(state.activeEvent);
  const todayProgram = getTodayProgram(today);

  const todayMeals = state.meals[tk] ?? [];
  const consumed = todayMeals.reduce(
    (a, m) => ({
      cal: a.cal + (m.cal ?? 0),
      p: a.p + (m.p ?? 0),
      c: a.c + (m.c ?? 0),
      f: a.f + (m.f ?? 0),
    }),
    { cal: 0, p: 0, c: 0, f: 0 }
  );
  const remaining = {
    cal: Math.max(0, MACROS.cal - consumed.cal),
    p: Math.max(0, MACROS.p - consumed.p),
    c: Math.max(0, MACROS.c - consumed.c),
    f: Math.max(0, MACROS.f - consumed.f),
  };

  const todayQuests = state.quests[tk] ?? {};
  const questsDone = DAILY_QUESTS.filter((q) => todayQuests[q.id]?.done).length;
  const todayXP = state.xp[tk] ?? 0;

  const suppsToday = state.supps[tk] ?? {};
  const suppsCount = Object.values(suppsToday).filter(Boolean).length;

  const streak = useMemo(() => {
    let count = 0;
    const d = new Date(today);
    if (state.ci[todayKey(d)]) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    while (state.ci[todayKey(d)]) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [state.ci, today]);

  const line = useMemo(() => {
    const seed = today.getFullYear() * 366 + (today.getMonth() + 1) * 31 + today.getDate();
    return dailyLines[seed % dailyLines.length];
  }, [today]);

  const eventDaysUntil = activeEvent ? daysBetween(today, activeEvent.date) : null;
  const GreetIcon = getGreetingIcon(today.getHours());

  return (
    <Screen
      topBar={
        <>
          <View style={styles.logoMark}>
            <Text family="serif" weight="bold" style={styles.logoText}>
              CK
            </Text>
          </View>
          <TapScale onPress={() => {}} haptic="light">
            <Bell size={22} color={colors.textFaint} strokeWidth={1.5} />
          </TapScale>
        </>
      }
    >
      <DateStrip activeDayOfWeek={dow} />

      {/* Editorial hero */}
      <AnimatedSection delay={80}>
        <View style={styles.hero}>
          <View style={styles.greetingRow}>
            <GreetIcon
              size={14}
              color={
                today.getHours() < 12 ? colors.accent : colors.textFaint
              }
              strokeWidth={1.5}
            />
            <Text
              variant="nano"
              tone={today.getHours() < 12 ? 'accent' : 'faint'}
              uppercase
              weight="bold"
            >
              {greetingByHour(today.getHours())}
            </Text>
          </View>
          <Text variant="hero" style={styles.heroQuote} weight="regular">
            {line.text}
          </Text>
          <View style={{ height: space.md }} />
          <Text variant="micro" tone="dim" uppercase>
            — {line.author}
          </Text>
        </View>
      </AnimatedSection>

      {/* YOUR PRACTICE */}
      <AnimatedSection delay={160}>
        <Eyebrow
          label="Your Practice"
          right={
            <Text variant="micro" tone="faint" uppercase>
              {rank.name} · Lv {level} · {Math.round(progressPct)}%
            </Text>
          }
        />
        <View style={styles.pillRow}>
          <Pill
            label={`${streak} day streak`}
            subtitle="Consistency"
            onPress={() => router.push('/quests')}
            style={[styles.pillHalf, { marginRight: space.sm }]}
            right={
              streak > 0 ? (
                <View style={styles.accentDot} />
              ) : null
            }
          />
          <Pill
            label={todayXP > 0 ? `+${todayXP} XP` : 'Start earning'}
            subtitle="Today"
            onPress={() => router.push('/quests')}
            style={styles.pillHalf}
            right={todayXP > 0 ? <View style={styles.accentDot} /> : null}
          />
        </View>
        <View style={[styles.pillRow, { marginTop: space.sm }]}>
          <Pill
            label={`${questsDone} of ${DAILY_QUESTS.length} quests`}
            subtitle={questsDone === DAILY_QUESTS.length ? 'Complete' : 'In progress'}
            onPress={() => router.push('/quests')}
            style={{ flex: 1 }}
            right={
              questsDone === DAILY_QUESTS.length ? (
                <View style={styles.accentDot} />
              ) : null
            }
          />
        </View>
      </AnimatedSection>

      {/* ACTIVE QUEST — only if one set. Inverse: white bg, black text. */}
      {activeEvent && eventDaysUntil !== null ? (
        <AnimatedSection delay={220}>
          <Eyebrow label="Active Quest" accent />
          <TapScale
            onPress={() => router.push(`/event/${activeEvent.id}`)}
            haptic="light"
            scaleTo={0.98}
          >
            <View style={styles.invCard}>
              <View style={styles.questTop}>
                <View style={{ flex: 1 }}>
                  <Text
                    variant="nano"
                    uppercase
                    weight="bold"
                    style={{ color: colors.invTextFaint, letterSpacing: 2 }}
                  >
                    {activeEvent.bossLevel}
                  </Text>
                  <Text
                    variant="title"
                    family="serif"
                    weight="regular"
                    style={{ color: colors.invText, marginTop: space.xs, maxWidth: '90%' }}
                  >
                    {activeEvent.name}
                  </Text>
                </View>
                <View style={styles.questDays}>
                  <Text
                    variant="display"
                    family="serif"
                    weight="regular"
                    style={{ color: colors.invText }}
                  >
                    {eventDaysUntil}
                  </Text>
                  <Text
                    variant="nano"
                    uppercase
                    style={{ color: colors.invTextDim }}
                  >
                    days out
                  </Text>
                </View>
              </View>
              <View style={[styles.invHairline, { marginVertical: space.md }]} />
              <View style={styles.questBottom}>
                <Text variant="bodySm" style={{ color: colors.invTextMuted, flex: 1 }}>
                  {activeEvent.distance} · {activeEvent.location}
                </Text>
                <View style={styles.invArrow}>
                  <ArrowUpRight size={14} color={colors.text} strokeWidth={2} />
                </View>
              </View>
            </View>
          </TapScale>
        </AnimatedSection>
      ) : null}

      {/* TODAY'S SESSION */}
      <AnimatedSection delay={activeEvent ? 280 : 220}>
        <Eyebrow
          label="Today"
          accent={todayProgram.exIds.length > 0}
          right={
            <Text variant="micro" tone="faint" uppercase>
              {todayProgram.full}
            </Text>
          }
        />
        <TapScale
          onPress={() => router.push('/train')}
          haptic="light"
          scaleTo={0.98}
        >
          <View style={styles.invCard}>
            <View style={styles.sessionInner}>
              <View style={{ flex: 1 }}>
                <Text
                  variant="nano"
                  uppercase
                  weight="bold"
                  style={{ color: colors.invTextFaint, letterSpacing: 2 }}
                >
                  {todayProgram.type === 'lift'
                    ? 'Strength'
                    : todayProgram.type === 'cardio'
                    ? 'Conditioning'
                    : 'Recovery'}
                </Text>
                <Text
                  variant="display"
                  family="serif"
                  weight="regular"
                  style={[styles.sessionFocus, { color: colors.invText }]}
                >
                  {todayProgram.focus}
                </Text>
                {todayProgram.exIds.length > 0 ? (
                  <Text
                    variant="bodySm"
                    style={{
                      color: colors.invTextMuted,
                      marginTop: space.md,
                    }}
                  >
                    {todayProgram.exIds.length} movements ·{' '}
                    {estimateDuration(todayProgram)}
                  </Text>
                ) : (
                  <Text
                    variant="bodySm"
                    style={{
                      color: colors.invTextMuted,
                      marginTop: space.md,
                    }}
                  >
                    Walk, stretch, hydrate.
                  </Text>
                )}
              </View>
              {todayProgram.exIds.length > 0 ? (
                <View style={styles.invCtaCircle}>
                  <ArrowUpRight size={18} color={colors.invBg} strokeWidth={2.5} />
                </View>
              ) : null}
            </View>
          </View>
        </TapScale>
      </AnimatedSection>

      {/* FUEL */}
      <AnimatedSection delay={activeEvent ? 340 : 280}>
        <Eyebrow
          label="Fuel"
          right={
            <Text variant="micro" tone="faint" uppercase>
              {consumed.cal} / {MACROS.cal} kcal
            </Text>
          }
        />
        <View style={styles.macroGrid}>
          <MacroStat label="Calories" value={remaining.cal} unit="left" />
          <MacroStat label="Protein" value={remaining.p} unit="g" accent />
          <MacroStat label="Carbs" value={remaining.c} unit="g" />
          <MacroStat label="Fat" value={remaining.f} unit="g" />
        </View>
      </AnimatedSection>

      {/* SUPPLEMENTS */}
      <AnimatedSection delay={activeEvent ? 400 : 340}>
        <Eyebrow
          label="Supplements"
          accent={suppsCount === SUPPS.length}
          right={
            <Text
              variant="micro"
              tone={suppsCount === SUPPS.length ? 'accent' : 'faint'}
              uppercase
              weight={suppsCount === SUPPS.length ? 'bold' : 'regular'}
            >
              {suppsCount} of {SUPPS.length}
            </Text>
          }
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suppsRow}
        >
          {SUPPS.map((s, i) => {
            const taken = !!suppsToday[i];
            const mono = supplementMonograms[s.n] ?? s.n.slice(0, 3).toUpperCase();
            return (
              <TapScale
                key={i}
                onPress={() => state.toggleSupp(tk, i)}
                haptic={taken ? 'selection' : 'success'}
                scaleTo={0.9}
              >
                <View style={[styles.suppChip, taken && styles.suppChipOn]}>
                  <Text
                    variant="heading"
                    family="serif"
                    tone={taken ? 'accent' : 'faint'}
                    weight={taken ? 'bold' : 'regular'}
                  >
                    {mono}
                  </Text>
                  <Text
                    variant="nano"
                    tone={taken ? 'muted' : 'ghost'}
                    uppercase
                    style={{ marginTop: 6 }}
                  >
                    {taken ? 'Taken' : s.t.split(' ')[0]}
                  </Text>
                </View>
              </TapScale>
            );
          })}
        </ScrollView>
      </AnimatedSection>

      {/* DAILY CHECK-IN */}
      {!state.ci[tk] ? (
        <AnimatedSection delay={activeEvent ? 460 : 400}>
          <Eyebrow label="Daily Check-in" />
          <TapScale
            onPress={() => state.logCheckIn(tk)}
            haptic="success"
            scaleTo={0.98}
          >
            <View style={styles.checkinCard}>
              <View style={{ flex: 1 }}>
                <Text variant="body" weight="regular" family="serif">
                  Log today's recovery
                </Text>
                <Text variant="micro" tone="accent" uppercase style={{ marginTop: space.xs }} weight="bold">
                  +25 XP
                </Text>
              </View>
              <View style={styles.plusCircle}>
                <Plus size={16} color={colors.bg} strokeWidth={2} />
              </View>
            </View>
          </TapScale>
        </AnimatedSection>
      ) : null}

      <View style={{ height: space.section }} />
    </Screen>
  );
}

// ——————————————————————————————————————

const MacroStat = ({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: number;
  unit: string;
  accent?: boolean;
}) => (
  <View style={styles.macroCell}>
    <Text variant="micro" tone="faint" uppercase weight="bold">
      {label}
    </Text>
    <View style={styles.macroValueRow}>
      <Text
        variant="title"
        family="serif"
        weight="regular"
        tone={accent ? 'accent' : 'default'}
      >
        {value}
      </Text>
      <Text variant="micro" tone="dim" uppercase style={{ marginLeft: 4, marginBottom: 4 }}>
        {unit}
      </Text>
    </View>
  </View>
);

const estimateDuration = (day: ReturnType<typeof getTodayProgram>): string => {
  const sets = day.exIds.reduce((a, e) => a + e.s, 0);
  const minutes = Math.round(sets * 1.5 + 10);
  return `~${minutes} min`;
};

// ——————————————————————————————————————

const styles = StyleSheet.create({
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 16,
  },
  hero: {
    paddingTop: space.xxl,
    paddingBottom: space.lg,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroQuote: {
    marginTop: space.lg,
    color: colors.text,
    fontFamily: fonts.serif,
  },
  pillRow: {
    flexDirection: 'row',
    marginTop: space.sm,
  },
  pillHalf: { flex: 1 },
  accentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  focalCard: {
    backgroundColor: colors.bgLift,
    borderRadius: radius.lg,
    padding: space.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  invCard: {
    backgroundColor: colors.invBg,
    borderRadius: radius.lg,
    padding: space.xl,
  },
  invHairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.invHairline,
    width: '100%',
  },
  invArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.invText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invCtaCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.invText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  questName: {
    marginTop: space.xs,
    maxWidth: '80%',
  },
  questDays: {
    alignItems: 'flex-end',
  },
  questBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionInner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: space.lg,
  },
  sessionFocus: {
    marginTop: space.sm,
  },
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  macroCell: {
    width: '50%',
    paddingVertical: space.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  macroValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: space.xs,
  },
  suppsRow: {
    gap: space.sm,
    paddingRight: space.xl,
  },
  suppChip: {
    width: 76,
    height: 76,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suppChipOn: {
    backgroundColor: colors.bgLift,
    borderColor: colors.accent,
  },
  checkinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.lg,
  },
  plusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
