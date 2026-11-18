import { notFound } from 'next/navigation';
import {
  getAllStations,
  getStationById,
  getStationQuizItems,
} from '@/content';
import { StationQuizClient } from '@/app/_components/StationQuizClient';

export function generateStaticParams() {
  return getAllStations().map((station) => ({
    stationId: station.id,
  }));
}

export default async function StationQuizPage({
  params,
}: {
  params: Promise<{ stationId: string }>;
}) {
  const { stationId } = await params;
  const decodedId = decodeURIComponent(stationId);
  const station = getStationById(decodedId);
  if (!station) {
    notFound();
  }

  const items = getStationQuizItems(station.id);

  return (
    <StationQuizClient
      stationId={station.id}
      stationTitle={`المحطة ${station.number}: ${station.title}`}
      items={items}
    />
  );
}
