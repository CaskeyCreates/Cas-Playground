import { ComingSoon } from '../../components/ComingSoon';
import { Screen } from '../../components/Screen';

export default function TrainScreen() {
  return (
    <Screen title="Training" subtitle="Program • History • Exercise details">
      <ComingSoon
        title="Training engine"
        note="Hevy-style logger, exercise detail drawer, and history — shipping next."
      />
    </Screen>
  );
}
