
import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TicketCard, Ticket } from '../../components/tickets/TicketCard';

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '001',
    title: 'Password Reset Request',
    description: 'Unable to access my account after password change',
    status: 'assigned',
    urgency: 'medium',
    department: 'IT',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    assignedAgent: 'John Smith',
    creator: 'user'
  },
  {
    id: '002',
    title: 'Vacation Request',
    description: 'Requesting vacation days for next month',
    status: 'resolved',
    urgency: 'low',
    department: 'HR',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    creator: 'user'
  },
  {
    id: '003',
    title: 'Software Installation Issue',
    description: 'Need help installing required software for my project',
    status: 'open',
    urgency: 'high',
    department: 'IT',
    createdAt: '2024-01-20T08:45:00Z',
    updatedAt: '2024-01-20T08:45:00Z',
    creator: 'user'
  }
];

const MyTickets: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const filteredTickets = mockTickets.filter(ticket => 
    statusFilter === 'all' || ticket.status === statusFilter
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
            <p className="text-gray-600 mt-2">
              View and manage all your support tickets
            </p>
          </div>
          <Button onClick={() => navigate('/user/tickets/new')}>
            Create New Ticket
          </Button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
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
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => navigate(`/user/tickets/${ticket.id}`)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tickets found</p>
              <p className="text-gray-400 mt-2">
                {statusFilter === 'all' 
                  ? "You haven't created any tickets yet." 
                  : `No tickets with status "${statusFilter}".`
                }
              </p>
              <Button 
                className="mt-4" 
                onClick={() => navigate('/user/tickets/new')}
              >
                Create Your First Ticket
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyTickets;
