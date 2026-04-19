import { useRouter } from 'expo-router';
import { ArrowUpRight, Bell, ChevronRight, Plus } from 'lucide-react-native';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CircleButton, DateStrip, Eyebrow, Hairline, Pill, Screen, Text } from '../../components/ui';
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
  {
    text: '"You do not just wake up and become a butterfly. Growth is a process."',
    author: 'RUPI KAUR',
  },
  {
    text: '"The body achieves what the mind believes."',
    author: 'NAPOLEON HILL',
  },
  {
    text: '"Discipline is choosing between what you want now and what you want most."',
    author: 'ABRAHAM LINCOLN',
  },
  {
    text: '"Success is the sum of small efforts, repeated day in and day out."',
    author: 'ROBERT COLLIER',
  },
  {
    text: '"You don\'t rise to the level of your goals. You fall to the level of your systems."',
    author: 'JAMES CLEAR',
  },
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

  // Daily line — deterministic based on date so it's stable through the day.
  const line = useMemo(() => {
    const seed = today.getFullYear() * 366 + (today.getMonth() + 1) * 31 + today.getDate();
    return dailyLines[seed % dailyLines.length];
  }, [today]);

  const eventDaysUntil = activeEvent ? daysBetween(today, activeEvent.date) : null;

  return (
    <Screen
      topBar={
        <>
          <View style={styles.logoMark}>
            <Text family="serif" weight="bold" style={styles.logoText}>
              CK
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Bell size={22} color={colors.textFaint} strokeWidth={1.5} />
          </TouchableOpacity>
        </>
      }
    >
      <DateStrip activeDayOfWeek={dow} />

      {/* Editorial hero */}
      <View style={styles.hero}>
        <View style={styles.greetingRow}>
          {(() => {
            const GreetIcon = getGreetingIcon(today.getHours());
            return <GreetIcon size={14} color={colors.textFaint} strokeWidth={1.5} />;
          })()}
          <Text variant="nano" tone="faint" uppercase weight="bold">
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

      {/* YOUR PRACTICE */}
      <Eyebrow label="Your Practice" />

      <View style={styles.pillRow}>
        <Pill
          label={`${rank.name} · Lv ${level}`}
          subtitle={`${totalXP.toLocaleString()} XP · ${Math.round(progressPct)}% to next`}
          onPress={() => router.push('/quests')}
          right={<ChevronRight size={14} color={colors.textFaint} strokeWidth={1.5} />}
          style={styles.pillFull}
        />
      </View>
      <View style={styles.pillRow}>
        <Pill
          label="Daily Quests"
          subtitle={`${questsDone} of ${DAILY_QUESTS.length} complete`}
          onPress={() => router.push('/quests')}
          style={[styles.pillHalf, { marginRight: space.sm }]}
        />
        <Pill
          label={`${streak}d streak`}
          subtitle="Consistency"
          style={styles.pillHalf}
        />
      </View>

      {/* ACTIVE QUEST — only if one set */}
      {activeEvent && eventDaysUntil !== null ? (
        <>
          <Eyebrow label="Active Quest" />
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push(`/event/${activeEvent.id}`)}
            style={styles.questCard}
          >
            <View style={styles.questTop}>
              <View>
                <Text variant="micro" tone="dim" uppercase weight="bold">
                  {activeEvent.bossLevel}
                </Text>
                <Text variant="title" style={styles.questName} weight="regular" family="serif">
                  {activeEvent.name}
                </Text>
              </View>
              <View style={styles.questDays}>
                <Text variant="display" family="serif" weight="regular">
                  {eventDaysUntil}
                </Text>
                <Text variant="nano" tone="dim" uppercase>
                  days out
                </Text>
              </View>
            </View>
            <Hairline style={{ marginVertical: space.md }} />
            <View style={styles.questBottom}>
              <Text variant="bodySm" tone="muted">
                {activeEvent.distance} · {activeEvent.location}
              </Text>
              <ArrowUpRight size={16} color={colors.textFaint} strokeWidth={1.5} />
            </View>
          </TouchableOpacity>
        </>
      ) : null}

      {/* TODAY'S SESSION */}
      <Eyebrow
        label="Today"
        right={
          <Text variant="micro" tone="faint" uppercase>
            {todayProgram.full}
          </Text>
        }
      />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push('/train')}
        style={styles.sessionCard}
      >
        <View style={styles.sessionInner}>
          <View style={{ flex: 1 }}>
            <Text variant="micro" tone="dim" uppercase weight="bold">
              {todayProgram.type === 'lift'
                ? 'Strength'
                : todayProgram.type === 'cardio'
                ? 'Conditioning'
                : 'Recovery'}
            </Text>
            <Text
              variant="display"
              style={styles.sessionFocus}
              family="serif"
              weight="regular"
            >
              {todayProgram.focus}
            </Text>
            {todayProgram.exIds.length > 0 ? (
              <Text variant="bodySm" tone="muted" style={{ marginTop: space.md }}>
                {todayProgram.exIds.length} movements · {estimateDuration(todayProgram)}
              </Text>
            ) : (
              <Text variant="bodySm" tone="muted" style={{ marginTop: space.md }}>
                Walk, stretch, hydrate.
              </Text>
            )}
          </View>
          {todayProgram.exIds.length > 0 ? (
            <CircleButton
              variant="solid"
              size="md"
              onPress={() => router.push('/train')}
            >
              <ArrowUpRight size={18} color={colors.bg} strokeWidth={2} />
            </CircleButton>
          ) : null}
        </View>
      </TouchableOpacity>

      {/* FUEL */}
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

      {/* SUPPLEMENTS */}
      <Eyebrow
        label="Supplements"
        right={
          <Text variant="micro" tone="faint" uppercase>
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
            <TouchableOpacity
              key={i}
              onPress={() => state.toggleSupp(tk, i)}
              activeOpacity={0.7}
              style={[styles.suppChip, taken && styles.suppChipOn]}
            >
              <Text
                variant="heading"
                family="serif"
                tone={taken ? 'default' : 'faint'}
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
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* DAILY CHECK-IN */}
      {!state.ci[tk] ? (
        <>
          <Eyebrow label="Daily Check-in" />
          <TouchableOpacity
            style={styles.checkinCard}
            onPress={() => state.logCheckIn(tk)}
            activeOpacity={0.8}
          >
            <View style={{ flex: 1 }}>
              <Text variant="body" weight="regular" family="serif">
                Log today's recovery
              </Text>
              <Text variant="micro" tone="dim" uppercase style={{ marginTop: space.xs }}>
                +25 XP
              </Text>
            </View>
            <CircleButton variant="outline" size="sm" onPress={() => state.logCheckIn(tk)}>
              <Plus size={16} color={colors.text} strokeWidth={1.5} />
            </CircleButton>
          </TouchableOpacity>
        </>
      ) : null}

      <View style={{ height: space.xxxl }} />
    </Screen>
  );
}

// ——————————————————————————————————————
// Subcomponents
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
// Styles
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
  pillFull: { flex: 1 },
  pillHalf: { flex: 1 },
  questCard: {
    paddingVertical: space.lg,
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
  sessionCard: {
    paddingVertical: space.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.bgLift,
    padding: space.xl,
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
    borderColor: colors.text,
  },
  checkinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.lg,
  },
});
