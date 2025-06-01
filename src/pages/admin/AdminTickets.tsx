
import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TicketCard, Ticket } from '../../components/tickets/TicketCard';

// Mock data with misuse flags
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
    title: 'Vacation Request',
    description: 'Requesting vacation days for next month',
    status: 'resolved',
    urgency: 'low',
    department: 'HR',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    assignedAgent: 'Jane Doe',
    creator: 'user2'
  },
  {
    id: '003',
    title: 'Inappropriate Content Report',
    description: 'This content contains offensive language and should be reviewed immediately',
    status: 'open',
    urgency: 'high',
    department: 'IT',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z',
    creator: 'user3',
    misuseFlag: true
  },
  {
    id: '004',
    title: 'Software Installation Issue',
    description: 'Need help installing required software',
    status: 'assigned',
    urgency: 'medium',
    department: 'IT',
    createdAt: '2024-01-18T14:15:00Z',
    updatedAt: '2024-01-19T09:30:00Z',
    assignedAgent: 'John Smith',
    creator: 'user4'
  }
];

const AdminTickets: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');

  const filteredTickets = mockTickets.filter(ticket => {
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
    if (departmentFilter !== 'all' && ticket.department !== departmentFilter) return false;
    if (userSearch && !ticket.creator.toLowerCase().includes(userSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All System Tickets</h1>
            <p className="text-gray-600 mt-2">
              Monitor and manage all tickets across departments
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">User Search</label>
            <Input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search by username..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium invisible">Actions</label>
            <Button 
              variant="outline" 
              onClick={() => {
                setStatusFilter('all');
                setDepartmentFilter('all');
                setUserSearch('');
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg bg-yellow-50">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredTickets.filter(t => t.status === 'open').length}
            </div>
            <div className="text-sm text-gray-600">Open Tickets</div>
          </div>
          <div className="p-4 border rounded-lg bg-blue-50">
            <div className="text-2xl font-bold text-blue-600">
              {filteredTickets.filter(t => t.status === 'assigned').length}
            </div>
            <div className="text-sm text-gray-600">Assigned Tickets</div>
          </div>
          <div className="p-4 border rounded-lg bg-green-50">
            <div className="text-2xl font-bold text-green-600">
              {filteredTickets.filter(t => t.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved Tickets</div>
          </div>
          <div className="p-4 border rounded-lg bg-red-50">
            <div className="text-2xl font-bold text-red-600">
              {filteredTickets.filter(t => t.misuseFlag).length}
            </div>
            <div className="text-sm text-gray-600">Flagged for Misuse</div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
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

export default AdminTickets;
