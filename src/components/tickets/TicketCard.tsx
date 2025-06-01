
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { UrgencyBadge } from '@/components/ui/urgency-badge';
import { Badge } from '@/components/ui/badge';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'assigned' | 'resolved' | 'closed';
  urgency: 'low' | 'medium' | 'high';
  department: 'IT' | 'HR';
  createdAt: string;
  updatedAt: string;
  assignedAgent?: string;
  creator: string;
  misuseFlag?: boolean;
}

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        ticket.misuseFlag ? 'border-red-200 bg-red-50' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            #{ticket.id} - {ticket.title}
            {ticket.misuseFlag && <span className="ml-2 text-red-500">⚠️</span>}
          </CardTitle>
          <div className="flex space-x-2">
            <StatusBadge status={ticket.status} />
            <UrgencyBadge urgency={ticket.urgency} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {ticket.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex space-x-2">
            <Badge variant="outline">{ticket.department}</Badge>
            {ticket.assignedAgent && (
              <span>Assigned to: {ticket.assignedAgent}</span>
            )}
          </div>
          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};
