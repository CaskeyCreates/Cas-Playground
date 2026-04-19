import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { space } from '../../theme';
import { Hairline } from './Hairline';
import { Text } from './Text';

type Props = {
  label: string;
  right?: ReactNode;
};

export const Eyebrow = ({ label, right }: Props) => (
  <View style={styles.wrap}>
    <Hairline />
    <View style={styles.row}>
      <Text variant="eyebrow" tone="muted" uppercase weight="bold">
        {label}
      </Text>
      {right ?? null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    marginTop: space.xxxl,
    marginBottom: space.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: space.lg,
  },
});
