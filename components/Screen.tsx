import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, space } from '../theme';

type Props = {
  children: ReactNode;
  header?: ReactNode;
  title?: string;
  subtitle?: string;
  scroll?: boolean;
};

export const Screen = ({ children, header, title, subtitle, scroll = true }: Props) => {
  const content = (
    <>
      {header}
      {title ? (
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      ) : null}
      {children}
    </>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={styles.flex}>{content}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  scrollContent: {
    paddingHorizontal: space.xl,
    paddingTop: space.xl,
    paddingBottom: 40,
  },
  titleWrap: {
    marginBottom: space.xl,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.displayBlack,
    color: colors.accent,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textPlaceholder,
    fontFamily: fonts.body,
    marginTop: 2,
  },
});
