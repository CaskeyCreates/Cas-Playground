import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import type { DailyQuest } from '../data/quests';
import { colors, fonts, radius, space } from '../theme';

type Props = {
  quest: DailyQuest;
  value: string;
  done: boolean;
  onChange: (value: string, done: boolean) => void;
};

export const QuestCard = ({ quest, value, done, onChange }: Props) => {
  const isInput = quest.type === 'input';

  const handleInputChange = (v: string) => {
    const num = Number(v);
    const complete = !Number.isNaN(num) && quest.target !== undefined && num >= quest.target;
    onChange(v, complete);
  };

  const handleCheckToggle = () => {
    onChange('1', !done);
  };

  return (
    <View style={[styles.card, done && styles.cardDone]}>
      <View style={styles.left}>
        <View style={[styles.icon, done && styles.iconDone]}>
          <Text style={styles.iconEmoji}>{quest.icon}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{quest.n}</Text>
          <Text style={styles.desc}>{quest.desc}</Text>
          <Text style={styles.xp}>+{quest.xp} XP</Text>
        </View>
      </View>
      <View style={styles.right}>
        {isInput ? (
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.textFade}
              value={value}
              onChangeText={handleInputChange}
            />
            {quest.unit ? <Text style={styles.unit}>{quest.unit}</Text> : null}
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.check, done && styles.checkDone]}
            onPress={handleCheckToggle}
            activeOpacity={0.7}
          >
            {done ? <Text style={styles.checkMark}>✓</Text> : null}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.lg,
    padding: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardDone: {
    backgroundColor: colors.accentBg,
    borderColor: colors.accentBorder,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDone: {
    backgroundColor: colors.accentBgHi,
  },
  iconEmoji: { fontSize: 22 },
  info: { flex: 1 },
  name: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.text,
  },
  desc: {
    fontSize: 9,
    color: colors.textGhost,
    marginTop: 2,
    lineHeight: 12,
    fontFamily: fonts.body,
  },
  xp: {
    fontSize: 9,
    color: colors.accent,
    fontFamily: fonts.monoBold,
    marginTop: 3,
  },
  right: {},
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  input: {
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.borderHi,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    color: colors.text,
    fontSize: 14,
    fontFamily: fonts.monoBold,
    textAlign: 'center',
  },
  unit: {
    fontSize: 9,
    color: colors.textGhost,
    fontFamily: fonts.mono,
  },
  check: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 2,
    borderColor: colors.borderHover,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: colors.accentBgHi,
    borderColor: colors.accent,
  },
  checkMark: {
    color: colors.accent,
    fontSize: 18,
    fontFamily: fonts.displayBlack,
  },
});
