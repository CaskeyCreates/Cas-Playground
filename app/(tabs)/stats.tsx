import { useRouter } from 'expo-router';
import { Bell, ChevronDown, Pencil } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import {
  AnimatedSection,
  Eyebrow,
  Hairline,
  Screen,
  TapScale,
  Text,
} from '../../components/ui';
import { DNA_SECTIONS } from '../../data/dna';
import { getEx } from '../../data/exercises';
import { PROFILE } from '../../data/profile';
import { useAppStore } from '../../store/useAppStore';
import { colors, fonts, space } from '../../theme';

type SubView = 'body' | 'prs' | 'dna';

const MEASUREMENTS: { k: 'weight' | 'bf' | 'chest' | 'waist' | 'arms' | 'legs' | 'shoulders' | 'neck'; label: string; unit: string }[] = [
  { k: 'weight', label: 'Weight', unit: 'kg' },
  { k: 'bf', label: 'Body Fat', unit: '%' },
  { k: 'chest', label: 'Chest', unit: 'cm' },
  { k: 'waist', label: 'Waist', unit: 'cm' },
  { k: 'arms', label: 'Arms', unit: 'cm' },
  { k: 'legs', label: 'Legs', unit: 'cm' },
  { k: 'shoulders', label: 'Shoulders', unit: 'cm' },
  { k: 'neck', label: 'Neck', unit: 'cm' },
];

export default function StatsScreen() {
  const router = useRouter();
  const state = useAppStore();
  const [editing, setEditing] = useState(false);
  const [openDna, setOpenDna] = useState<string | null>('infl');

  const currentWeight = state.body.weight ?? PROFILE.startWeight;
  const weightDelta = currentWeight - PROFILE.startWeight;
  const toTarget = currentWeight - PROFILE.targetWeight;

  const prs = Object.keys(state.logs)
    .filter((id) => state.logs[id]?.length > 0)
    .map((id) => {
      const ex = getEx(id);
      const max = Math.max(
        ...state.logs[id].flatMap((e) => e.sets.map((s) => Number(s.w) || 0))
      );
      return { id, name: ex?.n ?? id, muscle: ex?.muscle ?? '', pr: max };
    })
    .filter((p) => p.pr > 0)
    .sort((a, b) => b.pr - a.pr);

  return (
    <Screen
      topBar={
        <>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            Stats
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
          <Text variant="nano" tone="faint" uppercase weight="bold">
            Body
          </Text>
          <View style={styles.heroNumRow}>
            <Text
              variant="hero"
              family="serif"
              weight="regular"
              style={{ color: colors.text }}
            >
              {currentWeight}
            </Text>
            <Text
              variant="title"
              family="serif"
              tone="faint"
              style={{ marginLeft: 4, marginBottom: 10 }}
            >
              kg
            </Text>
          </View>
          <Text variant="bodySm" tone="muted" style={{ marginTop: space.xs }}>
            {weightDelta === 0
              ? 'No change from start'
              : weightDelta > 0
              ? `+${weightDelta.toFixed(1)}kg from start`
              : `${weightDelta.toFixed(1)}kg from start`}
            {' · '}
            <Text variant="bodySm" tone="accent" weight="bold">
              {Math.abs(toTarget).toFixed(1)}kg
            </Text>
            {' to target'}
          </Text>
        </View>
      </AnimatedSection>

      {/* Body measurements */}
      <AnimatedSection delay={160}>
        <Eyebrow
          label="Measurements"
          right={
            <TapScale onPress={() => setEditing(!editing)} haptic="light">
              <View style={styles.editBtn}>
                <Pencil
                  size={12}
                  color={editing ? colors.accent : colors.textFaint}
                  strokeWidth={1.5}
                />
                <Text
                  variant="nano"
                  tone={editing ? 'accent' : 'faint'}
                  uppercase
                  weight="bold"
                >
                  {editing ? 'Done' : 'Edit'}
                </Text>
              </View>
            </TapScale>
          }
        />
        <Hairline dim />
        {MEASUREMENTS.map((m) => {
          const v = state.body[m.k];
          return (
            <View key={m.k}>
              <View style={styles.measureRow}>
                <Text variant="body" tone="muted" weight="regular">
                  {m.label}
                </Text>
                <View style={styles.measureValue}>
                  {editing ? (
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="—"
                      placeholderTextColor={colors.textPlaceholder}
                      value={v !== undefined ? String(v) : ''}
                      onChangeText={(t) => state.setBody(m.k, Number(t) || 0)}
                    />
                  ) : (
                    <Text
                      variant="heading"
                      family="serif"
                      tone={v !== undefined ? 'default' : 'faint'}
                    >
                      {v ?? '—'}
                    </Text>
                  )}
                  <Text
                    variant="nano"
                    tone="faint"
                    uppercase
                    style={{ marginLeft: 4 }}
                  >
                    {m.unit}
                  </Text>
                </View>
              </View>
              <Hairline dim />
            </View>
          );
        })}
      </AnimatedSection>

      {/* Personal Records */}
      <AnimatedSection delay={220}>
        <Eyebrow
          label="Personal Records"
          accent={prs.length > 0}
          right={
            <Text variant="micro" tone="faint" uppercase>
              {prs.length}
            </Text>
          }
        />
        <Hairline dim />
        {prs.length === 0 ? (
          <View style={styles.emptyBlock}>
            <Text variant="body" tone="muted" family="serif">
              No personal records yet.
            </Text>
            <Text variant="bodySm" tone="faint" style={{ marginTop: space.sm }}>
              Complete a workout and log your weights to build your PR ladder.
            </Text>
          </View>
        ) : (
          prs.map((p, i) => (
            <View key={p.id}>
              <TapScale
                onPress={() => router.push('/train')}
                haptic="light"
                scaleTo={0.98}
              >
                <View style={styles.prRow}>
                  <Text variant="nano" tone="faint" uppercase weight="bold">
                    #{String(i + 1).padStart(2, '0')}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text variant="body" family="serif" weight="regular">
                      {p.name}
                    </Text>
                    <Text variant="nano" tone="faint" uppercase>
                      {p.muscle}
                    </Text>
                  </View>
                  <Text
                    variant="heading"
                    family="serif"
                    tone="accent"
                    weight="bold"
                  >
                    {p.pr}
                    <Text variant="nano" tone="faint" uppercase>
                      {' '}
                      kg
                    </Text>
                  </Text>
                </View>
              </TapScale>
              <Hairline dim />
            </View>
          ))
        )}
      </AnimatedSection>

      {/* DNA */}
      <AnimatedSection delay={280}>
        <Eyebrow label="DNA Profile" />
        <Hairline dim />
        {DNA_SECTIONS.map((s) => {
          const open = openDna === s.id;
          return (
            <View key={s.id}>
              <TapScale
                onPress={() => setOpenDna(open ? null : s.id)}
                haptic="selection"
                scaleTo={0.99}
              >
                <View style={styles.dnaRow}>
                  <View style={[styles.dnaMark, { backgroundColor: s.c }]} />
                  <Text variant="heading" family="serif" weight="regular" style={{ flex: 1 }}>
                    {s.t}
                  </Text>
                  <ChevronDown
                    size={16}
                    color={colors.textFaint}
                    strokeWidth={1.5}
                    style={{
                      transform: [{ rotate: open ? '180deg' : '0deg' }],
                    }}
                  />
                </View>
              </TapScale>
              {open ? (
                <AnimatedSection delay={0}>
                  <View style={styles.dnaBody}>
                    {s.body.split('\n').map((line, i) => (
                      <Text
                        key={i}
                        variant="bodySm"
                        tone="muted"
                        style={{ marginBottom: line.trim() ? space.xs : 0, lineHeight: 20 }}
                      >
                        {line}
                      </Text>
                    ))}
                  </View>
                </AnimatedSection>
              ) : null}
              <Hairline dim />
            </View>
          );
        })}
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
  heroNumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: space.md,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  measureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: space.lg,
  },
  measureValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  input: {
    minWidth: 50,
    paddingVertical: 0,
    color: colors.text,
    fontSize: 18,
    fontFamily: fonts.serif,
    textAlign: 'right',
  },
  emptyBlock: {
    paddingVertical: space.xxl,
  },
  prRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.lg,
  },
  dnaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.md,
  },
  dnaMark: {
    width: 4,
    height: 20,
    borderRadius: 1,
  },
  dnaBody: {
    paddingBottom: space.lg,
    paddingLeft: space.xl,
  },
});
