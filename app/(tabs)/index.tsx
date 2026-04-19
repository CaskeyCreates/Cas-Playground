import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../../components/AppHeader';
import { Button } from '../../components/Button';
import { Card, CardHeader } from '../../components/Card';
import { EventBanner } from '../../components/EventBanner';
import { HunterCard } from '../../components/HunterCard';
import { MacroStrip } from '../../components/MacroStrip';
import { QuickStatsGrid } from '../../components/QuickStatsGrid';
import { Screen } from '../../components/Screen';
import { SupplementPills } from '../../components/SupplementPills';
import { TodaySessionCard } from '../../components/TodaySessionCard';
import { getEventById } from '../../data/events';
import { SUPPS } from '../../data/meals';
import { MACROS, PROFILE } from '../../data/profile';
import { getTodayProgram } from '../../data/program';
import { daysBetween, todayKey } from '../../lib/dates';
import { calculateReadiness } from '../../lib/readiness';
import { getLevel, getRank, levelProgress } from '../../lib/xp';
import { selectTotalXP, useAppStore } from '../../store/useAppStore';
import { colors, fonts } from '../../theme';

export default function HomeScreen() {
  const router = useRouter();
  const state = useAppStore();
  const totalXP = useAppStore(selectTotalXP);

  const { level } = getLevel(totalXP);
  const rank = getRank(level);
  const progressPct = levelProgress(totalXP);

  const activeEvent = getEventById(state.activeEvent);
  const today = new Date();
  const tk = todayKey(today);
  const todayProgram = getTodayProgram(today);

  const todayMeals = state.meals[tk] ?? [];
  const consumed = todayMeals.reduce(
    (a, m) => ({ cal: a.cal + (m.cal ?? 0), p: a.p + (m.p ?? 0) }),
    { cal: 0, p: 0 }
  );

  const streak = calculateStreak(state.ci, today);
  const totalWorkouts = state.sessions.length;
  const totalSets = state.sessions.reduce((a, s) => a + (s.totalSets ?? 0), 0);
  const currentWeight = state.body.weight ?? PROFILE.startWeight;

  const suppsToday = state.supps[tk] ?? {};
  const suppsCount = Object.values(suppsToday).filter(Boolean).length;

  const daysUntil = activeEvent ? daysBetween(today, activeEvent.date) : null;
  const readiness = activeEvent
    ? calculateReadiness(activeEvent, {
        sessions: state.sessions,
        logs: state.logs,
        body: state.body,
      })
    : null;

  const hasCheckedIn = !!state.ci[tk];

  const handleStartSession = () => {
    router.push('/train');
  };

  const handleEventPress = () => {
    if (activeEvent) {
      router.push(`/event/${activeEvent.id}`);
    } else {
      router.push('/quests');
    }
  };

  return (
    <Screen
      header={
        <AppHeader
          rankName={rank.name}
          rankColor={rank.color}
          level={level}
          subtitle={activeEvent ? `→ ${activeEvent.name}` : 'Training System'}
        />
      }
    >
      <HunterCard
        name={PROFILE.name}
        rankName={rank.name}
        rankColor={rank.color}
        level={level}
        xp={totalXP}
        progressPct={progressPct}
      />

      <EventBanner
        event={activeEvent}
        daysUntil={daysUntil}
        readiness={readiness}
        onPress={handleEventPress}
      />

      <QuickStatsGrid
        stats={[
          { icon: '🔥', n: streak, label: 'DAY STREAK' },
          { icon: '💪', n: totalWorkouts, label: 'SESSIONS' },
          { icon: '⚖️', n: currentWeight, unit: 'kg', label: 'WEIGHT' },
          { icon: '🎯', n: totalSets, label: 'TOTAL SETS' },
        ]}
      />

      <TodaySessionCard
        day={todayProgram}
        onStart={handleStartSession}
        activeEventName={activeEvent?.name}
      />

      <Card>
        <CardHeader
          emoji="🍽️"
          title="FUEL TRACKER"
          right={
            <Text style={styles.mini}>
              {consumed.cal}/{MACROS.cal}
            </Text>
          }
        />
        <MacroStrip
          rows={[
            { label: 'CAL', value: consumed.cal, target: MACROS.cal, color: colors.accent },
            {
              label: 'PRO',
              value: consumed.p,
              target: MACROS.p,
              color: colors.macroProtein,
              unit: 'g',
            },
          ]}
        />
      </Card>

      <Card>
        <CardHeader
          emoji="💊"
          title="SUPPLEMENTS"
          right={
            <Text style={styles.mini}>
              {suppsCount}/{SUPPS.length}
            </Text>
          }
        />
        <SupplementPills
          checked={suppsToday}
          onToggle={(idx) => state.toggleSupp(tk, idx)}
        />
      </Card>

      {!hasCheckedIn && (
        <Card>
          <CardHeader emoji="📝" title="DAILY CHECK-IN" />
          <Text style={styles.prompt}>
            Log your mood, sleep, and recovery for today
          </Text>
          <Button label="Quick Check-in" onPress={() => state.logCheckIn(tk)} />
        </Card>
      )}

      <View style={{ height: 20 }} />
    </Screen>
  );
}

const calculateStreak = (ci: Record<string, { ts: number }>, today: Date): number => {
  let count = 0;
  const d = new Date(today);
  if (ci[todayKey(d)]) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  while (ci[todayKey(d)]) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
};

const styles = StyleSheet.create({
  mini: {
    fontSize: 10,
    color: colors.accent,
    fontFamily: fonts.monoBold,
  },
  prompt: {
    fontSize: 11,
    color: colors.textFaint,
    marginBottom: 10,
    fontFamily: fonts.body,
  },
});
