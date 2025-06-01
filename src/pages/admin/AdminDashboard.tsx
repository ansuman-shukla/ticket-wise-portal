
import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalTickets: { open: 15, assigned: 28, resolved: 42, closed: 156 },
    departmentBreakdown: { IT: 35, HR: 20 },
    misuseReports: 3,
    activeUsers: 127
  };

  const recentActivity = [
    { id: 1, event: 'Misuse detected', details: 'Inappropriate content in ticket #067', time: '1 hour ago' },
    { id: 2, event: 'Ticket closed', details: 'Password reset #065 resolved by IT Agent', time: '2 hours ago' },
    { id: 3, event: 'New user registered', details: 'john.doe@company.com joined the system', time: '3 hours ago' },
    { id: 4, event: 'System maintenance', details: 'Daily backup completed successfully', time: '6 hours ago' },
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
              System administration dashboard - Monitor and manage the helpdesk system
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => navigate('/admin/tickets')}>
            <CardHeader>
              <CardTitle className="text-lg">All Tickets</CardTitle>
              <CardDescription>View and manage all system tickets</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/admin/misuse-reports')}>
            <CardHeader>
              <CardTitle className="text-lg">Misuse Reports</CardTitle>
              <CardDescription>Review flagged content and user behavior</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/admin/system')}>
            <CardHeader>
              <CardTitle className="text-lg">System Management</CardTitle>
              <CardDescription>Monitor system health and run maintenance</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Total Open</CardTitle>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.totalTickets.open}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Assigned</CardTitle>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalTickets.assigned}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Resolved</CardTitle>
              <div className="text-2xl font-bold text-green-600">
                {stats.totalTickets.resolved}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Misuse Reports</CardTitle>
              <div className="text-2xl font-bold text-red-600">
                {stats.misuseReports}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.departmentBreakdown.IT}
                </div>
                <div className="text-gray-600">IT Department</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {stats.departmentBreakdown.HR}
                </div>
                <div className="text-gray-600">HR Department</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>Latest events and system changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{activity.event}</p>
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

export default AdminDashboard;
