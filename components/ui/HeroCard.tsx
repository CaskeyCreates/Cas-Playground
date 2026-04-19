import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radius, space } from '../../theme';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  gradient?: readonly [string, string, ...string[]];
  aspectRatio?: number;
  style?: StyleProp<ViewStyle>;
};

// Large hero card — fills with a gradient (stand-in for photography)
// matching Open's "Addictions Anonymous" program card pattern.
export const HeroCard = ({
  children,
  onPress,
  gradient = ['#1a1a1a', '#0a0a0a'],
  aspectRatio = 1.3,
  style,
}: Props) => {
  const content = (
    <View style={[styles.card, { aspectRatio }, style]}>
      <LinearGradient colors={gradient} style={StyleSheet.absoluteFillObject} />
      {/* Subtle vignette overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.5)']}
        style={StyleSheet.absoluteFillObject}
        locations={[0.4, 1]}
      />
      <View style={styles.inner}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.bgLift,
    width: '100%',
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: space.xl,
  },
});
