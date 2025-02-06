import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Filter } from 'lucide-react';

const mockLeads = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    destination: 'Bali, Indonesia',
    budget: '$5,000',
    status: 'Hot',
    created: '2024-02-20',
  },
  // Add more mock leads as needed
];

export default function Leads() {
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Lead
        </Button>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <Button
              variant={selectedStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('all')}
            >
              All
            </Button>
            <Button
              variant={selectedStatus === 'hot' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('hot')}
            >
              Hot
            </Button>
            <Button
              variant={selectedStatus === 'warm' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('warm')}
            >
              Warm
            </Button>
            <Button
              variant={selectedStatus === 'cold' ? 'default' : 'outline'}
              onClick={() => setSelectedStatus('cold')}
            >
              Cold
            </Button>
          </div>
          
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="space-y-4">
          {mockLeads.map((lead) => (
            <Card key={lead.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {lead.name}
                  </h3>
                  <p className="text-sm text-gray-500">{lead.email}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {lead.destination}
                    </p>
                    <p className="text-sm text-gray-500">{lead.budget}</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {lead.status}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}