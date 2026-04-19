import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../../theme';

type Props = {
  dim?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Hairline = ({ dim, style }: Props) => (
  <View
    style={[
      styles.line,
      { backgroundColor: dim ? colors.hairlineDim : colors.hairline },
      style,
    ]}
  />
);

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
