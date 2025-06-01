
import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TicketCard, Ticket } from '../../components/tickets/TicketCard';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data for demonstration
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
  }
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiChat, setAiChat] = useState<Array<{message: string, isUser: boolean}>>([]);

  const handleSendAiMessage = () => {
    if (!aiMessage.trim()) return;
    
    setAiChat(prev => [...prev, { message: aiMessage, isUser: true }]);
    
    // Simulate AI response
    setTimeout(() => {
      setAiChat(prev => [...prev, { 
        message: "I understand you need help. Let me assist you with that. Could you provide more details about your specific issue?", 
        isUser: false 
      }]);
    }, 1000);
    
    setAiMessage('');
  };

  const stats = {
    openTickets: mockTickets.filter(t => t.status === 'open' || t.status === 'assigned').length,
    resolvedTickets: mockTickets.filter(t => t.status === 'resolved' || t.status === 'closed').length
  };

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
              Manage your support tickets and get help from our AI assistant
            </p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={() => navigate('/user/tickets/new')}>
              Create New Ticket
            </Button>
            <Dialog open={aiChatOpen} onOpenChange={setAiChatOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">AI Bot</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>AI Assistant</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-2">
                    {aiChat.length === 0 && (
                      <p className="text-gray-500 text-sm">
                        Hi! I'm your AI assistant. How can I help you today?
                      </p>
                    )}
                    {aiChat.map((chat, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-lg text-sm ${
                          chat.isUser
                            ? 'bg-blue-100 text-blue-900 ml-auto max-w-[80%]'
                            : 'bg-gray-100 text-gray-900 mr-auto max-w-[80%]'
                        }`}
                      >
                        {chat.message}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      placeholder="Type your question..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendAiMessage()}
                    />
                    <Button onClick={handleSendAiMessage}>Send</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => navigate('/user/tickets/new')}>
            <CardHeader>
              <CardTitle className="text-lg">Create New Ticket</CardTitle>
              <CardDescription>Submit a new support request</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/user/tickets')}>
            <CardHeader>
              <CardTitle className="text-lg">My Tickets</CardTitle>
              <CardDescription>View and manage your tickets</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setAiChatOpen(true)}>
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription>Get instant help from our AI bot</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600">
                {stats.openTickets}
              </CardTitle>
              <CardDescription>Open Tickets</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-600">
                {stats.resolvedTickets}
              </CardTitle>
              <CardDescription>Resolved Tickets</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Tickets */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Tickets</h2>
          <div className="space-y-4">
            {mockTickets.slice(0, 3).map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => navigate(`/user/tickets/${ticket.id}`)}
              />
            ))}
          </div>
          {mockTickets.length > 3 && (
            <div className="mt-4">
              <Button variant="outline" onClick={() => navigate('/user/tickets')}>
                View All Tickets
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
