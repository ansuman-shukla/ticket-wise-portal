
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UrgencyBadgeProps {
  urgency: 'low' | 'medium' | 'high';
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency }) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge className={getUrgencyColor(urgency)}>
      {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
    </Badge>
  );
};
