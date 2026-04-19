import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, fonts, radius, space } from '../theme';

type Item = { id: string; label: string };

type Props = {
  items: Item[];
  value: string;
  onChange: (id: string) => void;
};

export const SubNav = ({ items, value, onChange }: Props) => (
  <View style={styles.wrap}>
    {items.map((it) => {
      const on = value === it.id;
      return (
        <TouchableOpacity
          key={it.id}
          style={[styles.btn, on && styles.btnOn]}
          onPress={() => onChange(it.id)}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, on && styles.labelOn]}>{it.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: space.lg,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.lg,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btn: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 9,
    alignItems: 'center',
  },
  btnOn: { backgroundColor: colors.accentBg },
  label: {
    fontSize: 11,
    color: colors.textGhost,
    fontFamily: fonts.displayBlack,
  },
  labelOn: { color: colors.accent },
});
