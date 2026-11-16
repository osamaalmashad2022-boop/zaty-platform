import { getAllUnits } from '@/content';
import { HomeClient } from './_components/HomeClient';

export default function HomePage() {
  const units = getAllUnits();
  return <HomeClient units={units} />;
}
