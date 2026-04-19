import { ComingSoon } from '../../components/ComingSoon';
import { Screen } from '../../components/Screen';

export default function QuestsScreen() {
  return (
    <Screen title="Quests" subtitle="Daily quests • Rank system • Events">
      <ComingSoon
        title="Solo Leveling system"
        note="Daily quest grid, rank progression chart, and the event center — shipping next."
      />
    </Screen>
  );
}
