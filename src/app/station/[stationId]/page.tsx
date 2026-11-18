import { notFound } from 'next/navigation';
import { getAllStations, getStationById, getUnitById } from '@/content';
import { StationClient } from '@/app/_components/StationClient';

export function generateStaticParams() {
  return getAllStations().map((station) => ({
    stationId: station.id,
  }));
}

export default async function StationPage({
  params,
}: {
  params: Promise<{ stationId: string }>;
}) {
  const { stationId } = await params;
  const station = getStationById(decodeURIComponent(stationId));
  if (!station) {
    notFound();
  }

  const unit = getUnitById(station.unitId);

  return <StationClient station={station} unitTitle={unit?.title} />;
}
