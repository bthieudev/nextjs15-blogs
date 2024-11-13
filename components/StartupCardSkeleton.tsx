import { cn } from '@/lib/utils';
import React from 'react';
import { Skeleton } from './ui/skeleton';

const StartupCardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((_, index: number) => (
        <li key={cn('skeleton', index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );
};

export default StartupCardSkeleton;
