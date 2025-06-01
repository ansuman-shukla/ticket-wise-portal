
import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { UrgencyBadge } from '@/components/ui/urgency-badge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  content: string;
  sender: string;
  isAI: boolean;
  timestamp: string;
}

const TicketDetail: React.FC = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello, I need help with resetting my password. I tried the usual process but it\'s not working.',
      sender: 'user',
      isAI: false,
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      content: 'Hello! I understand you\'re having trouble with password reset. Let me help you with that. Can you tell me which step is failing?',
      sender: 'John Smith',
      isAI: false,
      timestamp: '2024-01-15T10:35:00Z'
    },
    {
      id: '3',
      content: 'Based on the common password reset issues, I recommend trying these steps: 1) Clear your browser cache 2) Try using a different browser 3) Check your spam folder for the reset email',
      sender: 'AI Assistant',
      isAI: true,
      timestamp: '2024-01-15T10:40:00Z'
    }
  ]);

  // Mock ticket data
  const ticket = {
    id: id || '001',
    title: 'Password Reset Request',
    description: 'Unable to access my account after password change. I have tried multiple times but the reset email is not working.',
    status: 'assigned' as const,
    urgency: 'medium' as const,
    department: 'IT' as const,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    assignedAgent: 'John Smith',
    creator: 'user'
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      content: message,
      sender: 'user',
      isAI: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (messages.length + 2).toString(),
        content: 'Thank you for the additional information. I\'m looking into this issue for you.',
        sender: 'John Smith',
        isAI: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const handleMarkResolved = () => {
    // In real app, this would make an API call
    console.log('Marking ticket as resolved');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Ticket Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  Ticket #{ticket.id} - {ticket.title}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Created: {new Date(ticket.createdAt).toLocaleString()}
                  {ticket.updatedAt !== ticket.createdAt && (
                    <span className="ml-4">
                      Updated: {new Date(ticket.updatedAt).toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex space-x-2">
                <StatusBadge status={ticket.status} />
                <UrgencyBadge urgency={ticket.urgency} />
                <Badge variant="outline">{ticket.department}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{ticket.description}</p>
              </div>
              {ticket.assignedAgent && (
                <div>
                  <h3 className="font-semibold mb-2">Assigned Agent</h3>
                  <p className="text-gray-700">{ticket.assignedAgent}</p>
                </div>
              )}
              {ticket.status === 'assigned' && (
                <Button onClick={handleMarkResolved}>
                  Mark as Resolved
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Section */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Messages */}
              <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-lg">
                {messages.map((msg, index) => (
                  <div key={msg.id}>
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : msg.isAI 
                            ? 'bg-purple-100 text-purple-900'
                            : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="text-sm font-medium mb-1">
                          {msg.sender === 'user' ? 'You' : msg.sender}
                          {msg.isAI && ' (AI)'}
                        </div>
                        <div>{msg.content}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    {msg.isAI && (
                      <div className="flex justify-start mt-2">
                        <div className="flex space-x-2 text-sm">
                          <button className="text-green-600 hover:text-green-800">👍</button>
                          <button className="text-red-600 hover:text-red-800">👎</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              {ticket.status !== 'closed' && (
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TicketDetail;
