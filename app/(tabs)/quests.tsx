import { useRouter } from 'expo-router';
import { ArrowUpRight, Bell } from 'lucide-react-native';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  Eyebrow,
  Hairline,
  Pill,
  QuestRow,
  RankListRow,
  Screen,
  Text,
} from '../../components/ui';
import { EVENTS, getEventById } from '../../data/events';
import { DAILY_QUESTS, RANK_PREREQS } from '../../data/quests';
import { daysBetween, todayKey } from '../../lib/dates';
import { questIcons } from '../../lib/icons';
import { getLevel, getRank, levelProgress, xpForLevel } from '../../lib/xp';
import { selectTotalXP, useAppStore } from '../../store/useAppStore';
import { colors, space } from '../../theme';

export default function QuestsScreen() {
  const router = useRouter();
  const state = useAppStore();
  const totalXP = useAppStore(selectTotalXP);

  const tk = todayKey();
  const today = new Date();

  const { level } = getLevel(totalXP);
  const rank = getRank(level);
  const progressPct = levelProgress(totalXP);
  const nextLvlXP = xpForLevel(level + 1);

  const todayQuests = state.quests[tk] ?? {};
  const completed = DAILY_QUESTS.filter((q) => todayQuests[q.id]?.done).length;
  const todayXP = state.xp[tk] ?? 0;

  const streak = useMemo(() => {
    let count = 0;
    const d = new Date();
    if (state.ci[todayKey(d)]) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    while (state.ci[todayKey(d)]) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [state.ci]);

  const activeEvent = getEventById(state.activeEvent);
  const activeEventDays = activeEvent ? daysBetween(today, activeEvent.date) : null;

  const currentRankIdx = RANK_PREREQS.findIndex((r) => r.rank === rank.name);

  const handleQuestChange = (
    qId: string,
    xpReward: number,
    newValue: string,
    newDone: boolean
  ) => {
    const wasDone = !!todayQuests[qId]?.done;
    const xpDelta = !wasDone && newDone ? xpReward : wasDone && !newDone ? -xpReward : 0;
    state.setQuest(tk, qId, { val: newValue, done: newDone }, xpDelta);
  };

  const allComplete = completed === DAILY_QUESTS.length;
  const totalDailyXP = DAILY_QUESTS.reduce((a, q) => a + q.xp, 0);

  const upcomingEvents = useMemo(
    () =>
      EVENTS.filter((e) => new Date(e.date).getTime() > today.getTime())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 4),
    [today]
  );

  return (
    <Screen
      topBar={
        <>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            Quests
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Bell size={22} color={colors.textFaint} strokeWidth={1.5} />
          </TouchableOpacity>
        </>
      }
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Text variant="nano" tone="faint" uppercase weight="bold">
          Your Rank
        </Text>
        <Text
          variant="display"
          family="serif"
          weight="regular"
          style={{ marginTop: space.md }}
        >
          {rank.name}
          <Text variant="display" family="serif" tone="faint">
            {'  '}· {level}
          </Text>
        </Text>
        <Text variant="bodySm" tone="muted" style={{ marginTop: space.sm }}>
          {totalXP.toLocaleString()} XP · {Math.round(progressPct)}% to {nextLvlXP.toLocaleString()}
        </Text>
      </View>

      {/* Stat pills */}
      <View style={styles.pillRow}>
        <Pill
          label={`${streak} day streak`}
          subtitle="Consistency"
          style={[styles.pillHalf, { marginRight: space.sm }]}
        />
        <Pill
          label={`+${todayXP} XP`}
          subtitle="Today"
          style={styles.pillHalf}
        />
      </View>

      {/* DAILY QUESTS */}
      <Eyebrow
        label="Daily Quests"
        right={
          <Text variant="micro" tone="faint" uppercase>
            {completed} / {DAILY_QUESTS.length}
          </Text>
        }
      />

      <Hairline dim />
      {DAILY_QUESTS.map((q) => {
        const s = todayQuests[q.id] ?? { val: '', done: false };
        const Icon = questIcons[q.id];
        if (!Icon) return null;
        return (
          <QuestRow
            key={q.id}
            Icon={Icon}
            name={q.n}
            desc={q.desc}
            xp={q.xp}
            kind={q.type}
            value={s.val}
            done={s.done}
            unit={q.unit}
            target={q.target}
            onChange={(newValue, newDone) =>
              handleQuestChange(q.id, q.xp, newValue, newDone)
            }
          />
        );
      })}

      {allComplete ? (
        <View style={styles.completeMoment}>
          <Text variant="display" family="serif" weight="regular">
            All quests complete.
          </Text>
          <Text
            variant="bodySm"
            tone="muted"
            style={{ marginTop: space.sm }}
          >
            +{totalDailyXP} XP earned today. Rest well.
          </Text>
        </View>
      ) : null}

      {/* RANK PROGRESSION */}
      <Eyebrow label="Rank Progression" />

      <Hairline dim />
      {RANK_PREREQS.map((r, i) => {
        const s: 'past' | 'current' | 'future' =
          i < currentRankIdx ? 'past' : i === currentRankIdx ? 'current' : 'future';
        return (
          <RankListRow
            key={r.rank}
            rank={r.rank}
            levelRange={r.lvl}
            state={s}
          />
        );
      })}

      {/* EVENTS */}
      <Eyebrow label="Events" />

      <Hairline dim />
      {activeEvent && activeEventDays !== null ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push(`/event/${activeEvent.id}`)}
          style={styles.eventRow}
        >
          <View style={{ flex: 1 }}>
            <Text variant="nano" tone="faint" uppercase weight="bold">
              Active Quest
            </Text>
            <Text variant="heading" family="serif" weight="regular" style={{ marginTop: space.xs }}>
              {activeEvent.name}
            </Text>
            <Text variant="bodySm" tone="muted" style={{ marginTop: space.xs }}>
              {activeEventDays} days · {activeEvent.distance}
            </Text>
          </View>
          <ArrowUpRight size={18} color={colors.textFaint} strokeWidth={1.5} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.eventRow} activeOpacity={0.7}>
          <Text variant="bodySm" tone="muted">
            No active quest. Pick one below.
          </Text>
        </TouchableOpacity>
      )}
      <Hairline dim />

      {upcomingEvents.map((e) => {
        const days = daysBetween(today, e.date);
        return (
          <View key={e.id}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push(`/event/${e.id}`)}
              style={styles.eventRow}
            >
              <View style={{ flex: 1 }}>
                <Text variant="body" weight="regular" family="serif">
                  {e.name}
                </Text>
                <Text variant="nano" tone="faint" uppercase style={{ marginTop: 2 }}>
                  {e.type} · {e.region}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text variant="heading" family="serif" weight="regular">
                  {days}
                </Text>
                <Text variant="nano" tone="faint" uppercase>
                  days
                </Text>
              </View>
            </TouchableOpacity>
            <Hairline dim />
          </View>
        );
      })}

      <View style={{ height: space.xxxl }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: space.xxl,
    paddingBottom: space.xl,
  },
  pillRow: {
    flexDirection: 'row',
    marginTop: space.sm,
  },
  pillHalf: { flex: 1 },
  completeMoment: {
    paddingVertical: space.xxl,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.lg,
  },
});
