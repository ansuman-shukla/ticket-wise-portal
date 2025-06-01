
import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { UrgencyBadge } from '@/components/ui/urgency-badge';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface Message {
  id: string;
  content: string;
  sender: string;
  isAI: boolean;
  timestamp: string;
}

const AgentTicketDetail: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [sendAsAI, setSendAsAI] = useState(false);
  const [ticketStatus, setTicketStatus] = useState('assigned');
  const [department, setDepartment] = useState('IT');
  const [feedback, setFeedback] = useState('');
  const [aiSuggestionOpen, setAiSuggestionOpen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello, I need help with resetting my password. I tried the usual process but it\'s not working.',
      sender: 'user1',
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
  ]);

  // Mock ticket data
  const ticket = {
    id: id || '001',
    title: 'Password Reset Request',
    description: 'Unable to access my account after password change. I have tried multiple times but the reset email is not working.',
    status: ticketStatus as 'open' | 'assigned' | 'resolved' | 'closed',
    urgency: 'medium' as const,
    department: department as 'IT' | 'HR',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    assignedAgent: 'John Smith',
    creator: 'user1'
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      content: message,
      sender: sendAsAI ? 'AI Assistant' : user?.username || 'Agent',
      isAI: sendAsAI,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setSendAsAI(false);
  };

  const handleUpdateTicket = () => {
    console.log('Updating ticket:', { status: ticketStatus, department, feedback });
    // In real app, this would make an API call
  };

  const handleSuggestReply = () => {
    // Simulate AI suggestion
    const suggestion = "Based on the conversation, I suggest responding with: 'I can help you with the password reset. Let me check your account settings and send you a new reset link directly.'";
    setAiSuggestion(suggestion);
    setAiSuggestionOpen(true);
  };

  const handleUseAiSuggestion = () => {
    setMessage(aiSuggestion.replace('Based on the conversation, I suggest responding with: ', '').replace(/'/g, ''));
    setAiSuggestionOpen(false);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Ticket Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  Ticket #{ticket.id} - {ticket.title}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Created by: {ticket.creator} | 
                  Created: {new Date(ticket.createdAt).toLocaleString()}
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
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{ticket.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversation</CardTitle>
                  <Button onClick={handleSuggestReply} variant="outline">
                    Suggest Reply
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Messages */}
                  <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-lg">
                    {messages.map((msg) => (
                      <div key={msg.id}>
                        <div className={`flex ${msg.sender === user?.username ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] p-3 rounded-lg ${
                            msg.sender === user?.username
                              ? 'bg-blue-500 text-white' 
                              : msg.isAI 
                                ? 'bg-purple-100 text-purple-900'
                                : 'bg-gray-100 text-gray-900'
                          }`}>
                            <div className="text-sm font-medium mb-1">
                              {msg.sender}
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
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="send-as-ai"
                        checked={sendAsAI}
                        onCheckedChange={(checked) => setSendAsAI(checked as boolean)}
                      />
                      <label htmlFor="send-as-ai" className="text-sm">
                        Send as AI Assistant
                      </label>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>Send</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent Actions Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={ticketStatus} onValueChange={setTicketStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Agent Feedback</label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Add notes about this ticket..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleUpdateTicket} className="w-full">
                  Update Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Suggestion Dialog */}
        <Dialog open={aiSuggestionOpen} onOpenChange={setAiSuggestionOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Suggested Response</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={aiSuggestion}
                onChange={(e) => setAiSuggestion(e.target.value)}
                rows={4}
                className="w-full"
              />
              <div className="flex space-x-2">
                <Button onClick={handleUseAiSuggestion}>Use This Response</Button>
                <Button variant="outline" onClick={() => setAiSuggestionOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AgentTicketDetail;
