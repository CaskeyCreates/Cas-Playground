import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp, Text } from 'react-native';

import { colors, fonts, radius, space } from '../theme';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: CardProps) => (
  <View style={[styles.card, style]}>{children}</View>
);

type CardHeaderProps = {
  emoji?: string;
  title: string;
  right?: ReactNode;
};

export const CardHeader = ({ emoji, title, right }: CardHeaderProps) => (
  <View style={styles.header}>
    {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
    <Text style={styles.title}>{title}</Text>
    {right ? <View style={styles.right}>{right}</View> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.xl,
    padding: space.xl,
    marginBottom: space.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    marginBottom: space.lg,
  },
  emoji: { fontSize: 18 },
  title: {
    flex: 1,
    fontSize: 11,
    fontFamily: fonts.displayBlack,
    color: colors.textDim,
    letterSpacing: 1,
  },
  right: {
    marginLeft: 'auto',
  },
});
