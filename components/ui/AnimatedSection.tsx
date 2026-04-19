import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: StyleProp<ViewStyle>;
};

// Wraps a section with a subtle fade-in-from-below entry animation.
// Stagger via the `delay` prop so sections appear in sequence.
export const AnimatedSection = ({
  children,
  delay = 0,
  duration = 400,
  distance = 16,
  style,
}: Props) => (
  <Animated.View
    entering={FadeInDown.duration(duration).delay(delay).springify().damping(14)}
    style={style}
  >
    {children}
  </Animated.View>
);
