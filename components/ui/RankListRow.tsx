import { Check, Lock } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { colors, space } from '../../theme';
import { Hairline } from './Hairline';
import { Text } from './Text';

type Props = {
  rank: string;
  levelRange: string;
  state: 'past' | 'current' | 'future';
};

// Editorial rank progression row — hairline separated, no card chrome.
export const RankListRow = ({ rank, levelRange, state }: Props) => (
  <>
    <View style={styles.row}>
      <View style={styles.status}>
        {state === 'past' ? (
          <Check size={14} color={colors.text} strokeWidth={2} />
        ) : state === 'future' ? (
          <Lock size={12} color={colors.textPlaceholder} strokeWidth={1.5} />
        ) : (
          <View style={styles.currentDot} />
        )}
      </View>
      <View style={styles.info}>
        <Text
          variant="heading"
          weight={state === 'current' ? 'bold' : 'regular'}
          tone={state === 'future' ? 'ghost' : 'default'}
          family="serif"
        >
          {rank}
        </Text>
        <Text variant="nano" tone="faint" uppercase>
          Levels {levelRange}
        </Text>
      </View>
      {state === 'current' ? (
        <Text variant="nano" tone="accent" uppercase weight="bold">
          You
        </Text>
      ) : null}
    </View>
    <Hairline dim />
  </>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: space.lg,
    gap: space.lg,
  },
  status: {
    width: 24,
    alignItems: 'center',
  },
  currentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  info: { flex: 1 },
});
