import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

// Smooth, eased fade-from-below entrance. No spring, no bounce.
// The easing curve is ease-out-expo — slow deceleration at the end,
// which reads as "premium" in motion design.
export const AnimatedSection = ({
  children,
  delay = 0,
  duration = 700,
  style,
}: Props) => (
  <Animated.View
    entering={FadeInDown.duration(duration)
      .delay(delay)
      .easing(Easing.out(Easing.exp))}
    style={style}
  >
    {children}
  </Animated.View>
);
