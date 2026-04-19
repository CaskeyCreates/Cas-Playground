import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, space } from '../../theme';
import { Hairline } from './Hairline';
import { Text } from './Text';

type Props = {
  label: string;
  right?: ReactNode;
  accent?: boolean;
};

// Section header: hairline → small accent dot + uppercase label → content.
// `accent` flips the marker dot to yellow for "important" sections.
export const Eyebrow = ({ label, right, accent }: Props) => (
  <View style={styles.wrap}>
    <Hairline />
    <View style={styles.row}>
      <View style={styles.left}>
        <View
          style={[
            styles.dot,
            { backgroundColor: accent ? colors.accent : colors.textFaint },
          ]}
        />
        <Text
          variant="eyebrow"
          tone={accent ? 'accent' : 'muted'}
          uppercase
          weight="bold"
        >
          {label}
        </Text>
      </View>
      {right ?? null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    marginTop: space.section,
    marginBottom: space.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: space.lg,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
