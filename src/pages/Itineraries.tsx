import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Calendar } from 'lucide-react';
import { ItineraryBuilder } from '@/components/itinerary/ItineraryBuilder';

const mockItineraries = [
  {
    id: 1,
    title: 'Bali Adventure Package',
    client: 'John Smith',
    dates: 'Mar 15 - Mar 22, 2024',
    status: 'Draft',
    totalValue: '$4,500',
  },
];

export default function Itineraries() {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create New Itinerary
          </h1>
          <Button variant="outline" onClick={() => setIsCreating(false)}>
            Cancel
          </Button>
        </div>
        <ItineraryBuilder />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Itineraries</h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Itinerary
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockItineraries.map((itinerary) => (
          <Card key={itinerary.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {itinerary.title}
                </h3>
                <p className="text-sm text-gray-500">{itinerary.client}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {itinerary.status}
              </span>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-2 h-4 w-4" />
                {itinerary.dates}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900">
                Total Value: {itinerary.totalValue}
              </p>
            </div>

            <div className="mt-6 flex space-x-3">
              <Button variant="outline" className="flex-1">
                Edit
              </Button>
              <Button className="flex-1">View</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}