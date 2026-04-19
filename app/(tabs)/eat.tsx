import { Bell, ChevronDown, Plus, X } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AnimatedSection,
  Eyebrow,
  Hairline,
  Pill,
  Screen,
  TapScale,
  Text,
} from '../../components/ui';
import {
  GROCERY_BASE,
  GROCERY_MULTIPLIERS,
  type GroceryCycle,
  MEALS,
  SUPPS,
  type Meal,
} from '../../data/meals';
import { MACROS } from '../../data/profile';
import { todayKey } from '../../lib/dates';
import { useAppStore } from '../../store/useAppStore';
import { colors, space } from '../../theme';

export default function EatScreen() {
  const state = useAppStore();
  const tk = todayKey();
  const [openMeal, setOpenMeal] = useState<number | null>(null);
  const [cycle, setCycle] = useState<GroceryCycle>(state.grocCycle);

  const logged = state.meals[tk] ?? [];
  const consumed = logged.reduce(
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

  const logMeal = (m: Meal) => {
    state.logMeal(tk, { name: m.n, cal: m.cal, p: m.p, c: m.c, f: m.f });
  };

  const onCycleChange = (c: GroceryCycle) => {
    setCycle(c);
    state.setGrocCycle(c);
  };

  const multiplier = GROCERY_MULTIPLIERS[cycle];
  const multiplyQty = (item: string): string => {
    const m1 = item.match(/(\d+(?:\.\d+)?)(kg|g|L|ml)/i);
    if (m1) {
      const q = parseFloat(m1[1]) * multiplier;
      return item.replace(m1[0], `${q}${m1[2]}`);
    }
    const m2 = item.match(/— (\d+)/);
    if (m2) {
      return item.replace(m2[0], `— ${parseInt(m2[1], 10) * multiplier}`);
    }
    return item;
  };

  return (
    <Screen
      topBar={
        <>
          <Text variant="nano" tone="faint" uppercase weight="bold">
            Fuel
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
            Remaining Today
          </Text>
          <View style={styles.heroNumRow}>
            <Text variant="hero" family="serif" weight="regular">
              {remaining.cal}
            </Text>
            <Text
              variant="title"
              family="serif"
              tone="faint"
              style={{ marginLeft: 4, marginBottom: 10 }}
            >
              kcal
            </Text>
          </View>
          <Text variant="bodySm" tone="muted" style={{ marginTop: space.xs }}>
            <Text variant="bodySm" tone="accent" weight="bold">
              {remaining.p}g
            </Text>{' '}
            protein · {remaining.c}g carbs · {remaining.f}g fat
          </Text>
        </View>
      </AnimatedSection>

      {/* Today's log */}
      <AnimatedSection delay={160}>
        <Eyebrow
          label="Today's Log"
          accent={logged.length > 0}
          right={
            <Text
              variant="micro"
              tone={logged.length > 0 ? 'accent' : 'faint'}
              uppercase
              weight={logged.length > 0 ? 'bold' : 'regular'}
            >
              {logged.length} {logged.length === 1 ? 'item' : 'items'}
            </Text>
          }
        />
        <Hairline dim />
        {logged.length === 0 ? (
          <View style={styles.emptyBlock}>
            <Text variant="body" tone="muted" family="serif">
              Nothing logged yet.
            </Text>
            <Text variant="bodySm" tone="faint" style={{ marginTop: space.sm }}>
              Log a meal from the plan below to track your macros.
            </Text>
          </View>
        ) : (
          logged.map((m, i) => (
            <View key={i}>
              <View style={styles.logRow}>
                <View style={{ flex: 1 }}>
                  <Text variant="body" family="serif" weight="regular">
                    {m.name}
                  </Text>
                  <Text variant="nano" tone="faint" uppercase style={{ marginTop: 2 }}>
                    {m.cal} kcal · {m.p}g P · {m.c}g C · {m.f}g F
                  </Text>
                </View>
                <TapScale
                  onPress={() => state.removeMeal(tk, i)}
                  haptic="selection"
                >
                  <View style={styles.removeBtn}>
                    <X size={14} color={colors.textFaint} strokeWidth={1.5} />
                  </View>
                </TapScale>
              </View>
              <Hairline dim />
            </View>
          ))
        )}
      </AnimatedSection>

      {/* Meal plan */}
      <AnimatedSection delay={220}>
        <Eyebrow label="Meal Plan" />
        <Hairline dim />
        {MEALS.map((m, i) => {
          const open = openMeal === i;
          return (
            <View key={i}>
              <TapScale
                onPress={() => setOpenMeal(open ? null : i)}
                haptic="selection"
                scaleTo={0.99}
              >
                <View style={styles.mealRow}>
                  <Text
                    variant="nano"
                    tone="faint"
                    uppercase
                    weight="bold"
                    style={styles.mealTime}
                  >
                    {m.time}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text variant="body" family="serif" weight="regular">
                      {m.n}
                    </Text>
                    <Text variant="nano" tone="faint" uppercase style={{ marginTop: 2 }}>
                      {m.cal} kcal · {m.p}g P
                    </Text>
                  </View>
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
                  <View style={styles.mealExpand}>
                    <Text variant="nano" tone="faint" uppercase weight="bold">
                      Ingredients
                    </Text>
                    <View style={{ marginTop: space.sm }}>
                      {m.ing.map((ing, j) => (
                        <Text
                          key={j}
                          variant="bodySm"
                          tone="muted"
                          style={{ paddingVertical: 2 }}
                        >
                          {ing}
                        </Text>
                      ))}
                    </View>

                    <Text
                      variant="nano"
                      tone="faint"
                      uppercase
                      weight="bold"
                      style={{ marginTop: space.lg }}
                    >
                      Steps
                    </Text>
                    <View style={{ marginTop: space.sm }}>
                      {m.steps.map((s, j) => (
                        <View key={j} style={styles.stepRow}>
                          <Text
                            variant="nano"
                            tone="accent"
                            family="mono"
                            weight="bold"
                            style={{ width: 18 }}
                          >
                            {j + 1}
                          </Text>
                          <Text variant="bodySm" tone="muted" style={{ flex: 1 }}>
                            {s}
                          </Text>
                        </View>
                      ))}
                    </View>

                    <TapScale
                      onPress={() => logMeal(m)}
                      haptic="success"
                      scaleTo={0.97}
                    >
                      <View style={styles.logBtn}>
                        <Plus size={14} color={colors.bg} strokeWidth={2} />
                        <Text
                          variant="bodySm"
                          uppercase
                          weight="bold"
                          style={{ color: colors.bg, letterSpacing: 1.5 }}
                        >
                          Log this meal
                        </Text>
                      </View>
                    </TapScale>
                  </View>
                </AnimatedSection>
              ) : null}
              <Hairline dim />
            </View>
          );
        })}
      </AnimatedSection>

      {/* Grocery */}
      <AnimatedSection delay={280}>
        <Eyebrow label="Grocery" />
        <Hairline dim />
        <View style={styles.cycleRow}>
          {(['weekly', 'biweekly', 'monthly'] as const).map((c) => (
            <Pill
              key={c}
              label={c[0].toUpperCase() + c.slice(1)}
              active={cycle === c}
              onPress={() => onCycleChange(c)}
              style={{ flex: 1 }}
            />
          ))}
        </View>

        {Object.entries(GROCERY_BASE).map(([cat, items]) => {
          // strip emoji prefix from category label for cleanliness
          const catLabel = cat.replace(/^[^\w]+\s*/, '').trim();
          return (
            <View key={cat} style={{ marginTop: space.xl }}>
              <Text variant="nano" tone="faint" uppercase weight="bold">
                {catLabel}
              </Text>
              <Hairline dim style={{ marginTop: space.sm }} />
              {items.map((item, i) => {
                const key = `${cat}-${i}`;
                const checked = !!state.grocChk[key];
                const displayed = multiplyQty(item);
                return (
                  <View key={i}>
                    <TapScale
                      onPress={() => state.setGrocChk(key, !checked)}
                      haptic="selection"
                      scaleTo={0.99}
                    >
                      <View style={styles.grocRow}>
                        <View
                          style={[
                            styles.grocCheck,
                            checked && styles.grocCheckOn,
                          ]}
                        />
                        <Text
                          variant="body"
                          tone={checked ? 'faint' : 'muted'}
                          style={{
                            flex: 1,
                            textDecorationLine: checked ? 'line-through' : 'none',
                          }}
                        >
                          {displayed}
                        </Text>
                      </View>
                    </TapScale>
                    <Hairline dim />
                  </View>
                );
              })}
            </View>
          );
        })}
      </AnimatedSection>

      {/* Supplements */}
      <AnimatedSection delay={340}>
        <Eyebrow label="Supplement Protocol" />
        <Hairline dim />
        {SUPPS.map((s, i) => (
          <View key={i}>
            <View style={styles.suppDetailRow}>
              <View style={{ flex: 1 }}>
                <View style={styles.suppHeader}>
                  <Text variant="body" family="serif" weight="regular">
                    {s.n}
                  </Text>
                  <SuppPriorityBadge priority={s.p} />
                </View>
                <Text variant="nano" tone="faint" uppercase style={{ marginTop: 4 }}>
                  {s.t}
                </Text>
                <Text
                  variant="bodySm"
                  tone="muted"
                  style={{ marginTop: space.sm, fontStyle: 'italic' }}
                >
                  {s.why}
                </Text>
              </View>
            </View>
            <Hairline dim />
          </View>
        ))}
      </AnimatedSection>

      <View style={{ height: space.section }} />
    </Screen>
  );
}

const SuppPriorityBadge = ({ priority }: { priority: 'critical' | 'training' | 'secondary' }) => {
  const colorMap = {
    critical: colors.accent,
    training: colors.textMuted,
    secondary: colors.textFaint,
  } as const;
  return (
    <Text
      variant="nano"
      uppercase
      weight="bold"
      style={{
        color: colorMap[priority],
        letterSpacing: 2,
      }}
    >
      {priority}
    </Text>
  );
};

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
  emptyBlock: {
    paddingVertical: space.xxl,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.md,
  },
  removeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.md,
  },
  mealTime: {
    width: 42,
  },
  mealExpand: {
    paddingVertical: space.lg,
    paddingLeft: 42 + space.md,
  },
  stepRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    gap: space.sm,
  },
  logBtn: {
    marginTop: space.xl,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderRadius: 4,
  },
  cycleRow: {
    flexDirection: 'row',
    gap: space.sm,
    paddingVertical: space.md,
  },
  grocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.md,
    gap: space.md,
  },
  grocCheck: {
    width: 14,
    height: 14,
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  grocCheckOn: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  suppDetailRow: {
    paddingVertical: space.lg,
  },
  suppHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
