
import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { TicketCard, Ticket } from '../../components/tickets/TicketCard';

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '001',
    title: 'Password Reset Request',
    description: 'Unable to access account after password change',
    status: 'assigned',
    urgency: 'medium',
    department: 'IT',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    assignedAgent: 'John Smith',
    creator: 'user1'
  },
  {
    id: '002',
    title: 'Software Installation Issue',
    description: 'Need help installing required software',
    status: 'open',
    urgency: 'high',
    department: 'IT',
    createdAt: '2024-01-20T08:45:00Z',
    updatedAt: '2024-01-20T08:45:00Z',
    creator: 'user2'
  },
  {
    id: '003',
    title: 'Email Configuration Problem',
    description: 'Cannot receive emails on new device',
    status: 'assigned',
    urgency: 'low',
    department: 'IT',
    createdAt: '2024-01-18T14:15:00Z',
    updatedAt: '2024-01-19T09:30:00Z',
    assignedAgent: 'John Smith',
    creator: 'user3'
  },
  {
    id: '004',
    title: 'Suspicious Content Report',
    description: 'This ticket contains potentially inappropriate content that needs review',
    status: 'open',
    urgency: 'medium',
    department: 'IT',
    createdAt: '2024-01-19T11:00:00Z',
    updatedAt: '2024-01-19T11:00:00Z',
    creator: 'user4',
    misuseFlag: true
  }
];

const AgentTickets: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [assignedToMe, setAssignedToMe] = useState(
    searchParams.get('assigned_to_me') === 'true'
  );

  const filteredTickets = mockTickets.filter(ticket => {
    if (ticket.department !== user?.department) return false;
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
    if (assignedToMe && ticket.assignedAgent !== user?.username) return false;
    return true;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.department} Department Tickets
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and respond to tickets in your department
            </p>
          </div>
          <Button onClick={() => navigate('/agent/tickets/new')}>
            Create New Ticket
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Status:</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="assigned-to-me"
              checked={assignedToMe}
              onCheckedChange={(checked) => setAssignedToMe(checked as boolean)}
            />
            <label htmlFor="assigned-to-me" className="text-sm font-medium">
              Assigned to Me
            </label>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => navigate(`/agent/tickets/${ticket.id}`)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tickets found</p>
              <p className="text-gray-400 mt-2">
                No tickets match your current filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgentTickets;
