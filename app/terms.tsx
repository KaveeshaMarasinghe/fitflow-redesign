import { LegalScreen } from '../components/LegalScreen';
import { termsSections } from '../data/legal';
export default function Terms() {
  return <LegalScreen title="Terms of use" sections={termsSections} />;
}
