import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';

type Props = {
  pct: number;
  color?: string;
  height?: number;
  trackColor?: string;
};

export const ProgressBar = ({
  pct,
  color = colors.accent,
  height = 6,
  trackColor = 'rgba(255,255,255,0.05)',
}: Props) => {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor }]}>
      <View
        style={[
          styles.fill,
          { width: `${clamped}%`, backgroundColor: color, height },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    borderRadius: 4,
  },
});
