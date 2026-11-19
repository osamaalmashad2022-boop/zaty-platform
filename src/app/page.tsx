import { getAllUnits } from '@/content';
import { HomeClient } from './_components/HomeClient';

export default function HomePage() {
  const units = getAllUnits('prep3-term1');
  return <HomeClient units={units} />;
}
