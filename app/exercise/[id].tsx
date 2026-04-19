import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, X } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AnimatedSection,
  Eyebrow,
  Hairline,
  TapScale,
  Text,
} from '../../components/ui';
import { getEx } from '../../data/exercises';
import { useAppStore } from '../../store/useAppStore';
import { colors, space } from '../../theme';

export default function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const state = useAppStore();
  const ex = getEx(id ?? '');

  if (!ex) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <BackBar onBack={() => router.back()} />
        <View style={{ padding: space.xxl }}>
          <Text tone="muted">Exercise not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const hist = state.logs[ex.id] ?? [];
  const pr = hist.length
    ? Math.max(...hist.flatMap((e) => e.sets.map((s) => Number(s.w) || 0)))
    : null;
  const lastSession = hist[hist.length - 1];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <BackBar onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Hero */}
        <AnimatedSection delay={40}>
          <View style={styles.hero}>
            <Text variant="nano" tone="faint" uppercase weight="bold">
              {ex.muscle} · {ex.category}
            </Text>
            <Text
              variant="hero"
              family="serif"
              weight="regular"
              style={{ marginTop: space.md }}
            >
              {ex.n}
            </Text>
            <Text variant="bodySm" tone="muted" style={{ marginTop: space.sm }}>
              {ex.equipment}
              {ex.tempo ? ` · Tempo ${ex.tempo}` : ''}
              {pr !== null ? (
                <>
                  {' · '}
                  <Text variant="bodySm" tone="accent" weight="bold">
                    PR {pr}kg
                  </Text>
                </>
              ) : null}
            </Text>
          </View>
        </AnimatedSection>

        {/* Muscles */}
        <AnimatedSection delay={120}>
          <Eyebrow label="Muscles" />
          <Hairline dim />
          <View style={styles.muscleBlock}>
            <Text variant="nano" tone="faint" uppercase weight="bold">
              Primary
            </Text>
            <View style={styles.tagRow}>
              {ex.primary.map((m, i) => (
                <View key={i} style={[styles.tag, styles.tagPrimary]}>
                  <Text variant="nano" tone="accent" weight="bold">
                    {m}
                  </Text>
                </View>
              ))}
            </View>
            {ex.secondary.length > 0 ? (
              <>
                <Text
                  variant="nano"
                  tone="faint"
                  uppercase
                  weight="bold"
                  style={{ marginTop: space.lg }}
                >
                  Secondary
                </Text>
                <View style={styles.tagRow}>
                  {ex.secondary.map((m, i) => (
                    <View key={i} style={styles.tag}>
                      <Text variant="nano" tone="muted">
                        {m}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            ) : null}
          </View>
        </AnimatedSection>

        {/* Why */}
        <AnimatedSection delay={180}>
          <Eyebrow label="Why" />
          <Hairline dim />
          <View style={styles.paraBlock}>
            <Text variant="body" family="serif" tone="muted" style={{ lineHeight: 24 }}>
              {ex.why}
            </Text>
          </View>
        </AnimatedSection>

        {/* Setup */}
        <AnimatedSection delay={240}>
          <Eyebrow label="Setup" />
          <Hairline dim />
          <View style={styles.paraBlock}>
            {ex.setup.map((s, i) => (
              <View key={i} style={styles.stepRow}>
                <Text
                  variant="nano"
                  tone="faint"
                  family="mono"
                  weight="bold"
                  style={{ width: 20 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Text variant="bodySm" tone="muted" style={{ flex: 1, lineHeight: 20 }}>
                  {s}
                </Text>
              </View>
            ))}
          </View>
        </AnimatedSection>

        {/* Execution */}
        <AnimatedSection delay={300}>
          <Eyebrow label="Execution" accent />
          <Hairline dim />
          <View style={styles.paraBlock}>
            {ex.execution.map((s, i) => (
              <View key={i} style={styles.stepRow}>
                <Text
                  variant="nano"
                  tone="accent"
                  family="mono"
                  weight="bold"
                  style={{ width: 20 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Text variant="bodySm" tone="default" style={{ flex: 1, lineHeight: 20 }}>
                  {s}
                </Text>
              </View>
            ))}
          </View>
        </AnimatedSection>

        {/* Mistakes */}
        <AnimatedSection delay={360}>
          <Eyebrow label="Common Mistakes" />
          <Hairline dim />
          <View style={styles.paraBlock}>
            {ex.mistakes.map((s, i) => (
              <View key={i} style={styles.mistakeRow}>
                <View style={styles.mistakeMark}>
                  <X size={10} color={colors.redMuted} strokeWidth={2.5} />
                </View>
                <Text variant="bodySm" tone="muted" style={{ flex: 1, lineHeight: 20 }}>
                  {s}
                </Text>
              </View>
            ))}
          </View>
        </AnimatedSection>

        {/* Last session */}
        {lastSession ? (
          <AnimatedSection delay={420}>
            <Eyebrow label="Last Session" />
            <Hairline dim />
            <View style={styles.paraBlock}>
              <Text variant="nano" tone="faint" uppercase style={{ marginBottom: space.md }}>
                {lastSession.d}
              </Text>
              {lastSession.sets.map((set, i) => (
                <View key={i} style={styles.setRow}>
                  <Text variant="nano" tone="faint" family="mono">
                    Set {i + 1}
                  </Text>
                  <Text variant="body" family="mono" tone="default" weight="bold">
                    {set.w}
                    <Text tone="faint"> × </Text>
                    {set.r}
                  </Text>
                </View>
              ))}
            </View>
          </AnimatedSection>
        ) : null}

        <View style={{ height: space.section }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const BackBar = ({ onBack }: { onBack: () => void }) => (
  <View style={styles.backBar}>
    <TapScale onPress={onBack} haptic="light">
      <View style={styles.backBtn}>
        <ArrowLeft size={20} color={colors.text} strokeWidth={1.5} />
      </View>
    </TapScale>
  </View>
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
    paddingBottom: 40,
  },
  hero: {
    paddingVertical: space.xxl,
  },
  muscleBlock: {
    paddingVertical: space.lg,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
    marginTop: space.sm,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  tagPrimary: {
    backgroundColor: colors.accentBg,
    borderColor: colors.accentBorder,
  },
  paraBlock: {
    paddingVertical: space.lg,
  },
  stepRow: {
    flexDirection: 'row',
    paddingVertical: space.sm,
    gap: space.md,
  },
  mistakeRow: {
    flexDirection: 'row',
    paddingVertical: space.sm,
    gap: space.md,
  },
  mistakeMark: {
    width: 20,
    alignItems: 'flex-start',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: space.sm,
  },
});
