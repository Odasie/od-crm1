import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

const mockBookings = [
  {
    id: 1,
    reference: 'BK-2024-001',
    client: 'John Smith',
    package: 'Bali Adventure Package',
    dates: 'Mar 15 - Mar 22, 2024',
    status: 'Confirmed',
    value: '$4,500',
  },
  // Add more mock bookings as needed
];

export default function Bookings() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {booking.reference}
                    </h3>
                    <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{booking.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font icient text-gray-900">
                    {booking.value}
                  </p>
                  <p className="text-sm text-gray-500">{booking.dates}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-700">{booking.package}</p>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline">View Details</Button>
                <Button>Manage Booking</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}