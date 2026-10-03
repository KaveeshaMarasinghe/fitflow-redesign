import { LegalScreen } from '../components/LegalScreen';
import { privacySections } from '../data/legal';
export default function Privacy() {
  return <LegalScreen title="Privacy Policy" sections={privacySections} />;
}
