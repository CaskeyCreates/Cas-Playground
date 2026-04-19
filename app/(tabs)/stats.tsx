import { ComingSoon } from '../../components/ComingSoon';
import { Screen } from '../../components/Screen';

export default function StatsScreen() {
  return (
    <Screen title="Progress" subtitle="Body • PRs • DNA profile">
      <ComingSoon
        title="Progress tracker"
        note="Body measurements, personal records, and DNA-driven protocols — shipping next."
      />
    </Screen>
  );
}
