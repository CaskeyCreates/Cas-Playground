import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';
import { Platform, Pressable, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type HapticKind = 'light' | 'medium' | 'selection' | 'success' | 'none';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  scaleTo?: number;
  haptic?: HapticKind;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const triggerHaptic = (kind: HapticKind) => {
  if (kind === 'none' || Platform.OS === 'web') return;
  switch (kind) {
    case 'light':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'selection':
      Haptics.selectionAsync();
      break;
    case 'success':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
  }
};

// Tappable wrapper: spring-scales down on press, fires haptic on release.
export const TapScale = ({
  children,
  onPress,
  scaleTo = 0.96,
  haptic = 'light',
  disabled,
  style,
}: Props) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={() => {
        triggerHaptic(haptic);
        onPress?.();
      }}
      onPressIn={() => {
        scale.value = withSpring(scaleTo, { damping: 18, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 18, stiffness: 300 });
      }}
      disabled={disabled}
    >
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </Pressable>
  );
};
