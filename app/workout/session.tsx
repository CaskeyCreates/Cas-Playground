import { useRouter } from 'expo-router';
import { Check, Info, Plus, X } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import {
  AnimatedSection,
  Eyebrow,
  Hairline,
  TapScale,
  Text,
} from '../../components/ui';
import { getEx } from '../../data/exercises';
import { getTodayProgram } from '../../data/program';
import { todayKey } from '../../lib/dates';
import { useAppStore } from '../../store/useAppStore';
import { colors, fonts, space } from '../../theme';

type SetRow = {
  w: string;
  r: string;
  done: boolean;
};

type WorkoutExercise = {
  id: string;
  name: string;
  muscle: string;
  targetSets: number;
  targetReps: string;
  rest: number;
  sets: SetRow[];
};

export default function WorkoutSession() {
  const router = useRouter();
  const state = useAppStore();
  const today = new Date();
  const program = getTodayProgram(today);

  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [restLeft, setRestLeft] = useState(0);
  const [restTotal, setRestTotal] = useState(0);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [exercises, setExercises] = useState<WorkoutExercise[]>(() =>
    program.exIds.map((prog) => {
      const ex = getEx(prog.id);
      const hist = state.logs[prog.id] ?? [];
      const lastLog = hist[hist.length - 1];
      return {
        id: prog.id,
        name: ex?.n ?? prog.id,
        muscle: ex?.muscle ?? '',
        targetSets: prog.s,
        targetReps: prog.r,
        rest: prog.rest,
        sets: Array.from({ length: prog.s }, (_, i) => ({
          w: lastLog?.sets[i]?.w ?? '',
          r: lastLog?.sets[i]?.r ?? '',
          done: false,
        })),
      };
    })
  );

  // Elapsed timer
  useEffect(() => {
    elapsedRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => {
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    };
  }, [startTime]);

  // Rest timer
  useEffect(() => {
    if (restLeft <= 0) {
      if (restRef.current) clearInterval(restRef.current);
      return;
    }
    restRef.current = setInterval(() => {
      setRestLeft((p) => {
        if (p <= 1) {
          if (restRef.current) clearInterval(restRef.current);
          if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => {
      if (restRef.current) clearInterval(restRef.current);
    };
  }, [restLeft]);

  const updateSet = (exI: number, sI: number, field: 'w' | 'r', val: string) => {
    setExercises((prev) =>
      prev.map((ex, i) =>
        i === exI
          ? {
              ...ex,
              sets: ex.sets.map((s, j) => (j === sI ? { ...s, [field]: val } : s)),
            }
          : ex
      )
    );
  };

  const completeSet = (exI: number, sI: number) => {
    const ex = exercises[exI];
    setExercises((prev) =>
      prev.map((e, i) =>
        i === exI
          ? { ...e, sets: e.sets.map((s, j) => (j === sI ? { ...s, done: !s.done } : s)) }
          : e
      )
    );
    if (!ex.sets[sI].done) {
      setRestTotal(ex.rest);
      setRestLeft(ex.rest);
    }
  };

  const addSet = (exI: number) => {
    setExercises((prev) =>
      prev.map((ex, i) =>
        i === exI
          ? { ...ex, sets: [...ex.sets, { w: '', r: '', done: false }] }
          : ex
      )
    );
  };

  const finish = () => {
    const tk = todayKey(today);
    const sessionExs: { id: string; sets: { w: string; r: string }[] }[] = [];
    exercises.forEach((ex) => {
      const done = ex.sets.filter((s) => s.done);
      if (done.length > 0) {
        state.addExerciseLog(ex.id, {
          d: tk,
          sets: done.map((s) => ({ w: s.w, r: s.r })),
          dur: elapsed,
        });
        sessionExs.push({ id: ex.id, sets: done.map((s) => ({ w: s.w, r: s.r })) });
      }
    });
    if (sessionExs.length > 0) {
      const totalSets = sessionExs.reduce((a, e) => a + e.sets.length, 0);
      state.addSession({
        timestamp: Date.now(),
        day: program.full,
        focus: program.focus,
        exercises: sessionExs,
        totalSets,
        duration: elapsed,
      });
    }
    router.back();
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const totalSets = exercises.reduce((a, ex) => a + ex.sets.length, 0);
  const doneSets = exercises.reduce(
    (a, ex) => a + ex.sets.filter((s) => s.done).length,
    0
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TapScale onPress={() => router.back()} haptic="light">
          <View style={styles.closeBtn}>
            <X size={18} color={colors.text} strokeWidth={1.5} />
          </View>
        </TapScale>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            {program.focus}
          </Text>
          <Text
            variant="bodySm"
            family="mono"
            tone="accent"
            weight="bold"
            style={{ marginTop: 2 }}
          >
            {fmt(elapsed)} · {doneSets}/{totalSets}
          </Text>
        </View>
        <TapScale onPress={finish} haptic="success" scaleTo={0.95}>
          <View style={styles.finishBtn}>
            <Text
              variant="nano"
              uppercase
              weight="bold"
              style={{ color: colors.bg, letterSpacing: 1.5 }}
            >
              Finish
            </Text>
          </View>
        </TapScale>
      </View>

      {/* Rest timer banner */}
      {restLeft > 0 ? (
        <AnimatedSection delay={0}>
          <View style={styles.restBanner}>
            <View
              style={[
                styles.restFill,
                { width: `${((restTotal - restLeft) / restTotal) * 100}%` },
              ]}
            />
            <View style={styles.restContent}>
              <Text variant="nano" tone="faint" uppercase weight="bold">
                Rest
              </Text>
              <Text
                variant="display"
                family="mono"
                weight="bold"
                tone="accent"
                style={{ marginTop: 2 }}
              >
                {fmt(restLeft)}
              </Text>
              <View style={styles.restActions}>
                <TapScale
                  onPress={() => setRestLeft((l) => l + 15)}
                  haptic="light"
                >
                  <View style={styles.restAction}>
                    <Text variant="nano" tone="accent" uppercase weight="bold">
                      +15s
                    </Text>
                  </View>
                </TapScale>
                <TapScale onPress={() => setRestLeft(0)} haptic="light">
                  <View style={styles.restAction}>
                    <Text variant="nano" tone="muted" uppercase weight="bold">
                      Skip
                    </Text>
                  </View>
                </TapScale>
              </View>
            </View>
          </View>
        </AnimatedSection>
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {exercises.map((ex, exI) => {
          const lastLog = (state.logs[ex.id] ?? []).slice(-1)[0];
          return (
            <View key={exI} style={styles.exerciseBlock}>
              <View style={styles.exerciseHeader}>
                <Text
                  variant="nano"
                  tone="faint"
                  family="mono"
                  weight="bold"
                  style={{ width: 28 }}
                >
                  {String(exI + 1).padStart(2, '0')}
                </Text>
                <TapScale
                  onPress={() => router.push(`/exercise/${ex.id}`)}
                  haptic="light"
                >
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text variant="body" family="serif" weight="regular">
                      {ex.name}
                    </Text>
                    <Info size={12} color={colors.textFaint} strokeWidth={1.5} />
                  </View>
                </TapScale>
                <Text variant="nano" tone="faint" uppercase>
                  {ex.targetSets}×{ex.targetReps}
                </Text>
              </View>

              <View style={styles.gridHeader}>
                <Text variant="nano" tone="faint" uppercase style={styles.colSet}>
                  Set
                </Text>
                <Text variant="nano" tone="faint" uppercase style={styles.colPrev}>
                  Prev
                </Text>
                <Text variant="nano" tone="faint" uppercase style={styles.colInput}>
                  Kg
                </Text>
                <Text variant="nano" tone="faint" uppercase style={styles.colInput}>
                  Reps
                </Text>
                <View style={styles.colCheck} />
              </View>
              <Hairline dim />

              {ex.sets.map((set, sI) => {
                const prevSet = lastLog?.sets[sI];
                return (
                  <View key={sI}>
                    <View style={[styles.gridRow, set.done && styles.gridRowDone]}>
                      <Text
                        variant="body"
                        family="mono"
                        tone={set.done ? 'accent' : 'faint'}
                        weight="bold"
                        style={styles.colSet}
                      >
                        {sI + 1}
                      </Text>
                      <Text variant="nano" tone="faint" family="mono" style={styles.colPrev}>
                        {prevSet ? `${prevSet.w}×${prevSet.r}` : '—'}
                      </Text>
                      <TextInput
                        style={[styles.input, styles.colInput]}
                        keyboardType="numeric"
                        placeholder={prevSet?.w ?? '—'}
                        placeholderTextColor={colors.textPlaceholder}
                        value={set.w}
                        onChangeText={(v) => updateSet(exI, sI, 'w', v)}
                      />
                      <TextInput
                        style={[styles.input, styles.colInput]}
                        keyboardType="numeric"
                        placeholder={prevSet?.r ?? '—'}
                        placeholderTextColor={colors.textPlaceholder}
                        value={set.r}
                        onChangeText={(v) => updateSet(exI, sI, 'r', v)}
                      />
                      <View style={styles.colCheck}>
                        <TapScale
                          onPress={() => completeSet(exI, sI)}
                          haptic={set.done ? 'selection' : 'success'}
                          scaleTo={0.85}
                        >
                          <View style={[styles.check, set.done && styles.checkDone]}>
                            {set.done ? (
                              <Check size={12} color={colors.bg} strokeWidth={2.5} />
                            ) : null}
                          </View>
                        </TapScale>
                      </View>
                    </View>
                    <Hairline dim />
                  </View>
                );
              })}

              <TapScale
                onPress={() => addSet(exI)}
                haptic="light"
                scaleTo={0.98}
              >
                <View style={styles.addSet}>
                  <Plus size={12} color={colors.textFaint} strokeWidth={1.5} />
                  <Text variant="nano" tone="faint" uppercase weight="bold">
                    Add set
                  </Text>
                </View>
              </TapScale>
            </View>
          );
        })}

        <TapScale onPress={finish} haptic="success" scaleTo={0.98}>
          <View style={styles.finishFull}>
            <Text
              variant="body"
              uppercase
              weight="bold"
              style={{ color: colors.bg, letterSpacing: 2 }}
            >
              Finish Session
            </Text>
            <Text
              variant="nano"
              uppercase
              weight="bold"
              style={{ color: colors.bg, letterSpacing: 1, marginTop: 4, opacity: 0.55 }}
            >
              {doneSets} / {totalSets} sets · +100 XP
            </Text>
          </View>
        </TapScale>

        <View style={{ height: space.section }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
    gap: space.md,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: 4,
  },
  restBanner: {
    marginHorizontal: space.xl,
    marginTop: space.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accentBorder,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  restFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.accentBg,
  },
  restContent: {
    padding: space.xl,
    alignItems: 'center',
  },
  restActions: {
    flexDirection: 'row',
    gap: space.sm,
    marginTop: space.md,
  },
  restAction: {
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  content: {
    paddingHorizontal: space.xl,
    paddingTop: space.xl,
    paddingBottom: 40,
  },
  exerciseBlock: {
    marginBottom: space.xxl,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingVertical: space.md,
  },
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.sm,
  },
  gridRowDone: {
    opacity: 0.6,
  },
  colSet: { width: 32, textAlign: 'center' },
  colPrev: { flex: 1.2, textAlign: 'center' },
  colInput: { flex: 1.2, textAlign: 'center' },
  colCheck: { width: 40, alignItems: 'center' },
  input: {
    paddingVertical: 8,
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts.mono,
    textAlign: 'center',
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.02)',
    marginHorizontal: 2,
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  addSet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: space.md,
    marginTop: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    borderRadius: 4,
    borderStyle: 'dashed',
  },
  finishFull: {
    backgroundColor: colors.accent,
    paddingVertical: space.xl,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: space.lg,
  },
});
