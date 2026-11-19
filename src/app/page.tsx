import { getAllUnits } from '@/content';
import { HomeClient } from './_components/HomeClient';

export default function HomePage() {
  const unitsByCourse = {
    'prep3-term1': getAllUnits('prep3-term1'),
    'prep3-term2': getAllUnits('prep3-term2'),
    'prep3-term2-ict': getAllUnits('prep3-term2'),
  };
  return (
    <HomeClient
      units={unitsByCourse['prep3-term1']}
      unitsByCourse={unitsByCourse}
    />
  );
}
