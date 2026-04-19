import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../theme';

type TabIconProps = { emoji: string; label: string; focused: boolean };

const TabIcon = ({ emoji, label, focused }: TabIconProps) => (
  <View style={styles.tabItem}>
    <Text style={styles.tabEmoji}>{emoji}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.bar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textFaint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚡" label="HOME" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="train"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏋️" label="TRAIN" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚔️" label="QUESTS" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="eat"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🍽️" label="EAT" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="📊" label="STATS" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'rgba(8,8,12,0.96)',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: 14,
    height: 76,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: 60,
  },
  tabEmoji: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 8,
    color: colors.textFade,
    fontFamily: fonts.mono,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  tabLabelActive: {
    color: colors.accent,
  },
});
