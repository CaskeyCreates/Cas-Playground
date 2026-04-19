import { StyleSheet, Text, View } from 'react-native';

import { getEx } from '../data/exercises';
import type { ProgramDay } from '../data/program';
import { colors, fonts, space } from '../theme';
import { Button } from './Button';
import { Card, CardHeader } from './Card';

type Props = {
  day: ProgramDay;
  onStart: () => void;
  activeEventName?: string | null;
};

export const TodaySessionCard = ({ day, onStart, activeEventName }: Props) => {
  const isLift = day.type === 'lift';
  const isCardio = day.type === 'cardio';

  return (
    <Card>
      <CardHeader
        emoji={day.icon}
        title={`TODAY • ${day.focus.toUpperCase()}`}
        right={<Tag type={day.type} />}
      />
      {day.exIds.length > 0 ? (
        <>
          <View style={styles.list}>
            {day.exIds.map((p, i) => {
              const ex = getEx(p.id);
              if (!ex) return null;
              return (
                <View key={i} style={styles.row}>
                  <Text style={styles.exName}>{ex.n}</Text>
                  <Text style={styles.exDetail}>
                    {p.s}×{p.r}
                  </Text>
                </View>
              );
            })}
          </View>
          <Button label="▶ START SESSION" onPress={onStart} />
        </>
      ) : isCardio ? (
        <Text style={styles.restText}>
          Conditioning day. {activeEventName ? `Adapted for ${activeEventName}.` : 'Pick your cardio.'}
        </Text>
      ) : (
        <Text style={styles.restText}>
          Recovery day. Walk, stretch, hydrate.
        </Text>
      )}
    </Card>
  );
};

const Tag = ({ type }: { type: ProgramDay['type'] }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>
      {type === 'lift' ? 'LIFT' : type === 'cardio' ? 'CARDIO' : 'REST'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  list: {
    marginBottom: space.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  exName: { fontSize: 12, color: colors.textMuted, fontFamily: fonts.body },
  exDetail: {
    fontSize: 11,
    color: colors.accent,
    fontFamily: fonts.monoBold,
  },
  restText: {
    fontSize: 12,
    color: colors.textGhost,
    lineHeight: 18,
    fontFamily: fonts.body,
  },
  tag: {
    backgroundColor: colors.accentBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  tagText: {
    fontSize: 8,
    fontFamily: fonts.monoBold,
    color: colors.accent,
    letterSpacing: 1,
  },
});
