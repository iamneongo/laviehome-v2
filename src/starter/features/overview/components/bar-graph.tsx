'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/starter/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/starter/components/ui/chart';
import { Badge } from '@/starter/components/ui/badge';
import { Icons } from '@/starter/components/icons';
import { getPriceBands } from '@/lib/homestay-dashboard';

const chartData = getPriceBands();

const chartConfig = {
  count: {
    label: 'Số phòng',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const topBand = [...chartData].sort((a, b) => b.count - a.count)[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Cơ cấu phòng theo mức giá
          <Badge variant='outline'>
            <Icons.trendingUp />
            {topBand ? `${topBand.share}%` : '0%'}
          </Badge>
        </CardTitle>
        <CardDescription>Cho biết dải giá nào đang chiếm nhiều phòng nhất trong catalogue.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey='label'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' hideLabel />} />
            <Bar dataKey='count' fill='var(--color-count)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
