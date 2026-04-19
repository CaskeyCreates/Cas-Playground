import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { colors, radius, space } from '../../theme';
import { Hairline } from './Hairline';
import { TapScale } from './TapScale';
import { Text } from './Text';

type Props = {
  Icon: LucideIcon;
  name: string;
  desc: string;
  xp: number;
  kind: 'input' | 'check';
  value: string;
  done: boolean;
  unit?: string;
  onChange: (value: string, done: boolean) => void;
  target?: number;
};

// Editorial quest row — hairline separated, no card, pure typography.
// Accent yellow marks the "done" state on the check / input value.
export const QuestRow = ({
  Icon,
  name,
  desc,
  xp,
  kind,
  value,
  done,
  unit,
  onChange,
  target,
}: Props) => {
  const wasDone = useSharedValue(done ? 1 : 0);

  const handleInputChange = (v: string) => {
    const num = Number(v);
    const complete = !Number.isNaN(num) && target !== undefined && num >= target;
    if (complete && !done && Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    wasDone.value = withSpring(complete ? 1 : 0, { damping: 14 });
    onChange(v, complete);
  };

  const handleCheckToggle = () => {
    wasDone.value = withSpring(done ? 0 : 1, { damping: 14 });
    onChange('1', !done);
  };

  const checkAnimated = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + wasDone.value * 0.05 }],
  }));

  return (
    <>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Icon
            size={18}
            color={done ? colors.accent : colors.textFaint}
            strokeWidth={1.5}
          />
        </View>

        <View style={styles.info}>
          <Text
            variant="body"
            tone={done ? 'default' : 'muted'}
            weight={done ? 'bold' : 'regular'}
          >
            {name}
          </Text>
          <Text variant="nano" tone="faint" uppercase style={{ marginTop: 2 }}>
            {desc} · +{xp} XP
          </Text>
        </View>

        <View style={styles.action}>
          {kind === 'input' ? (
            <View style={styles.inputWrap}>
              <TextInput
                style={[styles.input, done && styles.inputDone]}
                keyboardType="numeric"
                placeholder="—"
                placeholderTextColor={colors.textPlaceholder}
                value={value}
                onChangeText={handleInputChange}
              />
              {unit ? (
                <Text
                  variant="nano"
                  tone={done ? 'accent' : 'faint'}
                  uppercase
                  weight={done ? 'bold' : 'regular'}
                >
                  {unit}
                </Text>
              ) : null}
            </View>
          ) : (
            <TapScale
              onPress={handleCheckToggle}
              haptic={done ? 'selection' : 'success'}
              scaleTo={0.85}
            >
              <Animated.View style={[styles.check, done && styles.checkDone, checkAnimated]}>
                {done ? <Check size={14} color={colors.bg} strokeWidth={2.5} /> : null}
              </Animated.View>
            </TapScale>
          )}
        </View>
      </View>
      <Hairline dim />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.lg,
  },
  iconWrap: {
    width: 32,
    alignItems: 'center',
  },
  info: { flex: 1 },
  action: { minWidth: 60, alignItems: 'flex-end' },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.xs,
  },
  input: {
    minWidth: 44,
    paddingVertical: 4,
    paddingHorizontal: 2,
    color: colors.textMuted,
    fontSize: 16,
    fontFamily: 'IBMPlexMono_600SemiBold',
    textAlign: 'right',
  },
  inputDone: {
    color: colors.accent,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
});
