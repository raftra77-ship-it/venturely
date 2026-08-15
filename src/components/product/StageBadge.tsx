import React from 'react';
import { ProductStage } from '@/types';
import { STAGES } from '@/lib/constants';

interface StageBadgeProps {
  stage: ProductStage;
  showIcon?: boolean;
  className?: string;
}

export function StageBadge({ stage, className = '' }: StageBadgeProps) {
  const info = STAGES[stage] || STAGES['0_IDEA'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${info.badgeBg} ${info.badgeText} ${info.badgeBorder} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      {info.shortLabel}
    </span>
  );
}
