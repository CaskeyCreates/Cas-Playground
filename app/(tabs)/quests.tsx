import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { EventCard } from '../../components/EventCard';
import { QuestCard } from '../../components/QuestCard';
import { RankCard } from '../../components/RankCard';
import { RankRow } from '../../components/RankRow';
import { Screen } from '../../components/Screen';
import { SubNav } from '../../components/SubNav';
import { EVENTS } from '../../data/events';
import { DAILY_QUESTS, RANK_PREREQS } from '../../data/quests';
import { daysBetween, todayKey } from '../../lib/dates';
import { calculateReadiness } from '../../lib/readiness';
import { getLevel, getRank, xpForLevel, levelProgress } from '../../lib/xp';
import { selectTotalXP, useAppStore } from '../../store/useAppStore';
import { colors, fonts, space } from '../../theme';

type SubView = 'daily' | 'ranks' | 'events';
type Filter = 'all' | 'running' | 'fitness' | 'ultra';

export default function QuestsScreen() {
  const router = useRouter();
  const [view, setView] = useState<SubView>('daily');
  const [filter, setFilter] = useState<Filter>('all');
  const [openRankIdx, setOpenRankIdx] = useState<number | null>(null);

  const state = useAppStore();
  const totalXP = useAppStore(selectTotalXP);
  const tk = todayKey();

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

  const activeDays = Object.keys(state.xp).length;
  const totalSessions = state.sessions.length;

  const currentRankIdx = RANK_PREREQS.findIndex((r) => r.rank === rank.name);
  const nextRank = currentRankIdx < RANK_PREREQS.length - 1 ? RANK_PREREQS[currentRankIdx + 1] : null;

  const handleQuestChange = (qId: string, xpReward: number, newValue: string, newDone: boolean) => {
    const wasDone = !!todayQuests[qId]?.done;
    const xpDelta = !wasDone && newDone ? xpReward : wasDone && !newDone ? -xpReward : 0;
    state.setQuest(tk, qId, { val: newValue, done: newDone }, xpDelta);
  };

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((e) => {
      if (filter === 'all') return true;
      return e.tags.includes(filter);
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filter]);

  const allComplete = completed === DAILY_QUESTS.length;
  const totalDailyXP = DAILY_QUESTS.reduce((a, q) => a + q.xp, 0);

  return (
    <Screen>
      <RankCard
        rankName={rank.name}
        rankColor={rank.color}
        level={level}
        totalXP={totalXP}
        nextLvlXP={nextLvlXP}
        progressPct={progressPct}
        stats={[
          { label: 'STREAK', value: streak },
          { label: 'ACTIVE DAYS', value: activeDays },
          { label: 'SESSIONS', value: totalSessions },
          { label: 'TODAY', value: `+${todayXP}` },
        ]}
      />

      <SubNav
        items={[
          { id: 'daily', label: 'Daily Quests' },
          { id: 'ranks', label: 'Rank System' },
          { id: 'events', label: 'Events' },
        ]}
        value={view}
        onChange={(v) => setView(v as SubView)}
      />

      {view === 'daily' ? (
        <>
          <View style={styles.questHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.qhTitle}>⚔️ DAILY QUESTS</Text>
              <Text style={styles.qhSub}>
                {completed}/{DAILY_QUESTS.length} complete • +{todayXP} XP today
              </Text>
            </View>
            <Text
              style={[
                styles.qhPct,
                { color: allComplete ? colors.accent : colors.textDim },
              ]}
            >
              {Math.round((completed / DAILY_QUESTS.length) * 100)}%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(completed / DAILY_QUESTS.length) * 100}%`,
                  backgroundColor: allComplete ? colors.accent : rank.color,
                },
              ]}
            />
          </View>

          {DAILY_QUESTS.map((q) => {
            const s = todayQuests[q.id] ?? { val: '', done: false };
            return (
              <QuestCard
                key={q.id}
                quest={q}
                value={s.val}
                done={s.done}
                onChange={(newValue, newDone) =>
                  handleQuestChange(q.id, q.xp, newValue, newDone)
                }
              />
            );
          })}

          {allComplete ? (
            <View style={styles.celebrate}>
              <Text style={styles.celebrateIcon}>🏆</Text>
              <Text style={styles.celebrateTitle}>ALL QUESTS COMPLETE</Text>
              <Text style={styles.celebrateSub}>+{totalDailyXP} XP earned today</Text>
            </View>
          ) : null}
        </>
      ) : null}

      {view === 'ranks' ? (
        <>
          <Text style={styles.rankTitle}>RANK PROGRESSION</Text>
          <Text style={styles.rankSubtitle}>
            Meet the prerequisites. Level up. Unlock power.
          </Text>

          {RANK_PREREQS.map((r, i) => (
            <RankRow
              key={r.rank}
              def={r}
              isCurrent={i === currentRankIdx}
              isPast={i < currentRankIdx}
              isNext={i === currentRankIdx + 1}
              open={openRankIdx === i}
              onToggle={() => setOpenRankIdx(openRankIdx === i ? null : i)}
            />
          ))}

          {nextRank ? (
            <View style={[styles.nextRank, { borderColor: nextRank.color }]}>
              <Text style={[styles.nextRankTitle, { color: nextRank.color }]}>
                NEXT: {nextRank.rank}
              </Text>
              <Text style={styles.nextRankDesc}>You need:</Text>
              {nextRank.prereqs.map((p, i) => (
                <Text key={i} style={styles.nextRankPrereq}>
                  → {p}
                </Text>
              ))}
            </View>
          ) : null}
        </>
      ) : null}

      {view === 'events' ? (
        <>
          <SubNav
            items={[
              { id: 'all', label: 'All' },
              { id: 'running', label: 'Running' },
              { id: 'fitness', label: 'Fitness' },
              { id: 'ultra', label: 'Ultra' },
            ]}
            value={filter}
            onChange={(f) => setFilter(f as Filter)}
          />
          {filteredEvents.map((event) => {
            const days = daysBetween(new Date(), event.date);
            const readiness = calculateReadiness(event, {
              sessions: state.sessions,
              logs: state.logs,
              body: state.body,
            });
            return (
              <EventCard
                key={event.id}
                event={event}
                daysUntil={days}
                readiness={readiness}
                isActive={state.activeEvent === event.id}
                onPress={() => router.push(`/event/${event.id}`)}
              />
            );
          })}
        </>
      ) : null}

      <View style={{ height: 20 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  qhTitle: {
    fontSize: 14,
    fontFamily: fonts.monoBold,
    color: colors.accent,
    letterSpacing: 1,
  },
  qhSub: {
    fontSize: 10,
    color: colors.textFaint,
    marginTop: 2,
    fontFamily: fonts.body,
  },
  qhPct: {
    fontSize: 24,
    fontFamily: fonts.monoBold,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: space.lg,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  celebrate: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.accentBgHi,
    borderWidth: 2,
    borderColor: colors.gold,
    borderRadius: 16,
    marginTop: space.lg,
  },
  celebrateIcon: { fontSize: 32 },
  celebrateTitle: {
    fontSize: 16,
    fontFamily: fonts.displayBlack,
    color: colors.gold,
    marginTop: 8,
    letterSpacing: 1,
  },
  celebrateSub: {
    fontSize: 11,
    color: colors.textDim,
    marginTop: 4,
    fontFamily: fonts.body,
  },
  rankTitle: {
    fontSize: 18,
    fontFamily: fonts.displayBlack,
    color: colors.accent,
    marginBottom: 4,
  },
  rankSubtitle: {
    fontSize: 11,
    color: colors.textGhost,
    marginBottom: space.xl,
    fontFamily: fonts.body,
  },
  nextRank: {
    backgroundColor: colors.bgSurface,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 16,
    marginTop: space.lg,
  },
  nextRankTitle: {
    fontSize: 14,
    fontFamily: fonts.monoBold,
    letterSpacing: 1,
    marginBottom: 8,
  },
  nextRankDesc: {
    fontSize: 11,
    color: colors.textDim,
    marginBottom: 6,
    fontFamily: fonts.body,
  },
  nextRankPrereq: {
    fontSize: 12,
    color: colors.textMuted,
    paddingVertical: 3,
    fontFamily: fonts.body,
  },
});
