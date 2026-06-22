import { delay } from '@/constants/mock-api';
import { RecentSales } from '@/starter/features/overview/components/recent-sales';

export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}

