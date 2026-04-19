import { Tabs } from 'expo-router';
import {
  Dumbbell,
  Home,
  Salad,
  Swords,
  TrendingUp,
} from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../theme';

type TabIconProps = {
  Icon: typeof Home;
  label: string;
  focused: boolean;
};

const TabIcon = ({ Icon, label, focused }: TabIconProps) => (
  <View style={styles.tabItem}>
    <Icon
      size={22}
      color={focused ? colors.text : colors.textFaint}
      strokeWidth={1.5}
    />
    {focused ? <Text style={styles.label}>{label}</Text> : null}
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.bar,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textFaint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={Home} label="TODAY" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="train"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={Dumbbell} label="TRAIN" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={Swords} label="QUESTS" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="eat"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={Salad} label="FUEL" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon Icon={TrendingUp} label="STATS" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.bg,
    borderTopColor: colors.hairline,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    paddingBottom: 16,
    height: 76,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 64,
  },
  label: {
    fontSize: 9,
    color: colors.text,
    fontFamily: fonts.sansBold,
    letterSpacing: 1.5,
  },
});
