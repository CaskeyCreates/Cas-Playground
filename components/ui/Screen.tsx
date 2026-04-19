import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, space } from '../../theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  topBar?: ReactNode;
  // Disable horizontal padding if the content should go edge-to-edge
  edgeToEdge?: boolean;
};

// Premium screen shell — generous horizontal padding, pure black bg.
export const Screen = ({ children, scroll = true, topBar, edgeToEdge }: Props) => {
  const paddingHorizontal = edgeToEdge ? 0 : space.xl;

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {topBar ? <View style={[styles.topBar, { paddingHorizontal }]}>{topBar}</View> : null}
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={{
            paddingHorizontal,
            paddingBottom: space.xxxxl,
          }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, { paddingHorizontal }]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: space.md,
  },
});
