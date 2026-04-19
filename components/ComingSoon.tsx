import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';

type Props = { title: string; note?: string };

export const ComingSoon = ({ title, note }: Props) => (
  <View style={styles.wrap}>
    <Text style={styles.icon}>🛠️</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.note}>{note ?? 'This tab is next up — the foundation is in place.'}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  icon: { fontSize: 48, marginBottom: 12 },
  title: {
    fontSize: 16,
    fontFamily: fonts.displayBlack,
    color: colors.text,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  note: {
    fontSize: 12,
    color: colors.textGhost,
    fontFamily: fonts.body,
    textAlign: 'center',
    lineHeight: 18,
  },
});
