
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalDepartmentTickets: 24,
    myAssignedTickets: 8,
    unreadMessages: 3
  };

  const recentActivity = [
    { id: 1, action: 'New ticket created', details: 'Password reset request #045', time: '2 hours ago' },
    { id: 2, action: 'Ticket resolved', details: 'Software installation #043', time: '4 hours ago' },
    { id: 3, action: 'Ticket assigned', details: 'Email configuration #044', time: '6 hours ago' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.username}!
            </h1>
            <p className="text-gray-600 mt-2">
              Department: {user?.department} | Manage your assigned tickets and help users
            </p>
          </div>
          <Button onClick={() => navigate('/agent/tickets/new')}>
            Create New Ticket
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => navigate('/agent/tickets/new')}>
            <CardHeader>
              <CardTitle className="text-lg">Create New Ticket</CardTitle>
              <CardDescription>Create a ticket on behalf of a user</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/agent/tickets')}>
            <CardHeader>
              <CardTitle className="text-lg">Department Tickets</CardTitle>
              <CardDescription>View all {user?.department} department tickets</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/agent/tickets?assigned_to_me=true')}>
            <CardHeader>
              <CardTitle className="text-lg">My Assigned Tickets</CardTitle>
              <CardDescription>Tickets assigned to you</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600">
                {stats.totalDepartmentTickets}
              </CardTitle>
              <CardDescription>Total {user?.department} Tickets (Open)</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-600">
                {stats.myAssignedTickets}
              </CardTitle>
              <CardDescription>My Assigned Tickets</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-600">
                {stats.unreadMessages}
              </CardTitle>
              <CardDescription>Unread Chat Messages</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest activities in your department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AgentDashboard;
