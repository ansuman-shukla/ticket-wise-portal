
import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface MisuseReport {
  id: string;
  user: string;
  detectionDate: string;
  misuseType: string;
  severity: 'low' | 'medium' | 'high';
  reviewStatus: 'unreviewed' | 'reviewed';
  affectedTickets: string[];
}

const mockReports: MisuseReport[] = [
  {
    id: 'MR001',
    user: 'user3',
    detectionDate: '2024-01-20T11:00:00Z',
    misuseType: 'Inappropriate Content',
    severity: 'high',
    reviewStatus: 'unreviewed',
    affectedTickets: ['003', '005']
  },
  {
    id: 'MR002',
    user: 'user5',
    detectionDate: '2024-01-19T15:30:00Z',
    misuseType: 'Spam/Repetitive Content',
    severity: 'medium',
    reviewStatus: 'reviewed',
    affectedTickets: ['007', '008', '009']
  },
  {
    id: 'MR003',
    user: 'user8',
    detectionDate: '2024-01-18T09:15:00Z',
    misuseType: 'Policy Violation',
    severity: 'low',
    reviewStatus: 'unreviewed',
    affectedTickets: ['012']
  }
];

const AdminMisuseReports: React.FC = () => {
  const navigate = useNavigate();
  const [reviewFilter, setReviewFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredReports = mockReports.filter(report => {
    if (reviewFilter === 'unreviewed' && report.reviewStatus !== 'unreviewed') return false;
    if (severityFilter !== 'all' && report.severity !== severityFilter) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getReviewStatusColor = (status: string) => {
    return status === 'reviewed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const handleRunDetection = () => {
    // Simulate running detection
    console.log('Running misuse detection...');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Misuse Detection Reports</h1>
            <p className="text-gray-600 mt-2">
              Review and manage content violations and policy breaches
            </p>
          </div>
          <Button onClick={handleRunDetection}>
            Run Misuse Detection Now
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Review Status</label>
            <Select value={reviewFilter} onValueChange={setReviewFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="unreviewed">Unreviewed Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Severity</label>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium invisible">Actions</label>
            <Button 
              variant="outline" 
              onClick={() => {
                setReviewFilter('all');
                setSeverityFilter('all');
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg bg-red-50">
            <div className="text-2xl font-bold text-red-600">
              {filteredReports.filter(r => r.reviewStatus === 'unreviewed').length}
            </div>
            <div className="text-sm text-gray-600">Unreviewed Reports</div>
          </div>
          <div className="p-4 border rounded-lg bg-orange-50">
            <div className="text-2xl font-bold text-orange-600">
              {filteredReports.filter(r => r.severity === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Severity</div>
          </div>
          <div className="p-4 border rounded-lg bg-blue-50">
            <div className="text-2xl font-bold text-blue-600">
              {filteredReports.length}
            </div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <Card 
                key={report.id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  report.reviewStatus === 'unreviewed' ? 'border-orange-200 bg-orange-50' : ''
                }`}
                onClick={() => navigate(`/admin/misuse-reports/${report.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Report #{report.id} - {report.user}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Badge className={getSeverityColor(report.severity)}>
                        {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                      </Badge>
                      <Badge className={getReviewStatusColor(report.reviewStatus)}>
                        {report.reviewStatus.charAt(0).toUpperCase() + report.reviewStatus.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Type:</span> {report.misuseType}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Detected:</span> {new Date(report.detectionDate).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Affected Tickets:</span> {report.affectedTickets.join(', ')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No misuse reports found</p>
              <p className="text-gray-400 mt-2">
                No reports match your current filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminMisuseReports;
