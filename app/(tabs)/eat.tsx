import { ComingSoon } from '../../components/ComingSoon';
import { Screen } from '../../components/Screen';

export default function EatScreen() {
  return (
    <Screen title="Nutrition" subtitle="Plan • Scan • Grocery • Supplements">
      <ComingSoon
        title="Nutrition system"
        note="Meal plan, AI photo scanner, grocery list with cycle toggle, and supplement detail — shipping next."
      />
    </Screen>
  );
}
