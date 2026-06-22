'use client';

import { Alert, AlertDescription, AlertTitle } from '@/starter/components/ui/alert';
import { Icons } from '@/starter/components/icons';

export default function OverviewError({ error }: { error: Error }) {
  return (
    <Alert variant='destructive'>
      <Icons.alertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Failed to load statistics: {error.message}</AlertDescription>
    </Alert>
  );
}

