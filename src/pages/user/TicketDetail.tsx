
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { UrgencyBadge } from '@/components/ui/urgency-badge';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '../../components/tickets/TicketCard';

interface Message {
  id: string;
  content: string;
  sender_role: string;
  isAI: boolean;
  timestamp: string;
}

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    urgency: 'medium' as 'low' | 'medium' | 'high'
  });

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        // Mock ticket data for now
        const mockTicket: Ticket = {
          id: id || '',
          title: 'Login Issues with Company Portal',
          description: 'I am unable to log into the company portal. Getting error message "Invalid credentials" even though I am using the correct username and password.',
          status: 'assigned',
          urgency: 'medium',
          department: 'IT',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T14:20:00Z',
          assignedAgent: 'John Smith',
          creator: 'user'
        };

        const mockMessages: Message[] = [
          {
            id: '1',
            content: 'I am unable to log into the company portal. Getting error message "Invalid credentials".',
            sender_role: 'user',
            isAI: false,
            timestamp: '2024-01-15T10:35:00Z'
          },
          {
            id: '2',
            content: 'Hi! I can help you with login issues. Let me suggest a few troubleshooting steps: 1) Clear your browser cache and cookies, 2) Try using an incognito window, 3) Reset your password if needed.',
            sender_role: 'it_agent',
            isAI: true,
            timestamp: '2024-01-15T11:00:00Z'
          },
          {
            id: '3',
            content: 'I tried clearing cache but still having the same issue. Should I reset my password?',
            sender_role: 'user',
            isAI: false,
            timestamp: '2024-01-15T11:15:00Z'
          }
        ];

        setTicket(mockTicket);
        setMessages(mockMessages);
        setEditForm({
          title: mockTicket.title,
          description: mockTicket.description,
          urgency: mockTicket.urgency
        });
      } catch (error) {
        console.error('Error fetching ticket:', error);
        toast({
          title: "Error",
          description: "Failed to load ticket details",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTicketData();
    }
  }, [id, toast]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender_role: 'user',
        isAI: false,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      toast({
        title: "Message sent",
        description: "Your message has been sent successfully"
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };

  const handleMarkResolved = async () => {
    try {
      if (ticket) {
        setTicket({ ...ticket, status: 'resolved' });
        toast({
          title: "Ticket marked as resolved",
          description: "Thank you for your feedback!"
        });
      }
    } catch (error) {
      console.error('Error marking ticket as resolved:', error);
      toast({
        title: "Error",
        description: "Failed to mark ticket as resolved",
        variant: "destructive"
      });
    }
  };

  const handleEditTicket = async () => {
    try {
      if (ticket) {
        const updatedTicket = {
          ...ticket,
          title: editForm.title,
          description: editForm.description,
          urgency: editForm.urgency,
          updatedAt: new Date().toISOString()
        };
        setTicket(updatedTicket);
        setIsEditModalOpen(false);
        
        toast({
          title: "Ticket updated",
          description: "Your ticket has been updated successfully"
        });
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast({
        title: "Error",
        description: "Failed to update ticket",
        variant: "destructive"
      });
    }
  };

  const handleMessageFeedback = async (messageId: string, feedback: 'up' | 'down') => {
    try {
      toast({
        title: "Feedback recorded",
        description: `Thank you for your ${feedback === 'up' ? 'positive' : 'negative'} feedback`
      });
    } catch (error) {
      console.error('Error recording feedback:', error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ticket Not Found</h1>
          <Button onClick={() => navigate('/user/tickets')}>
            Back to My Tickets
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Ticket #{ticket.id} - {ticket.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <StatusBadge status={ticket.status} />
                <UrgencyBadge urgency={ticket.urgency} />
                <Badge variant="outline">{ticket.department}</Badge>
                {ticket.misuseFlag && (
                  <Badge variant="destructive">⚠️ Flagged</Badge>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <p>Created: {new Date(ticket.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(ticket.updatedAt).toLocaleString()}</p>
                {ticket.assignedAgent && (
                  <p>Assigned to: {ticket.assignedAgent}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {ticket.status === 'open' && (
                <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                  Edit Ticket
                </Button>
              )}
              {ticket.status === 'assigned' && (
                <Button onClick={handleMarkResolved}>
                  Mark as Resolved
                </Button>
              )}
              <Button variant="outline" onClick={() => navigate('/user/tickets')}>
                Back to Tickets
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender_role === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.isAI
                      ? 'bg-green-100 border border-green-200'
                      : 'bg-gray-100'
                  }`}>
                    <div className="text-sm mb-1">
                      {message.isAI ? '🤖 AI Assistant' : 
                       message.sender_role === 'user' ? 'You' : 'Agent'}
                    </div>
                    <p>{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                    {message.isAI && message.sender_role !== 'user' && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleMessageFeedback(message.id, 'up')}
                          className="text-xs hover:bg-green-200 p-1 rounded"
                          title="Helpful"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleMessageFeedback(message.id, 'down')}
                          className="text-xs hover:bg-red-200 p-1 rounded"
                          title="Not helpful"
                        >
                          👎
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {ticket.status !== 'closed' && (
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  Send
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Urgency</label>
                  <select
                    value={editForm.urgency}
                    onChange={(e) => setEditForm({ ...editForm, urgency: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={handleEditTicket}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TicketDetail;
