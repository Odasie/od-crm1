import { Card } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';

const stats = [
  {
    name: 'Total Leads',
    value: '1,234',
    change: '+12.3%',
    icon: Users,
  },
  {
    name: 'Active Itineraries',
    value: '456',
    change: '+8.2%',
    icon: Calendar,
  },
  {
    name: 'Revenue',
    value: '$123,456',
    change: '+23.1%',
    icon: DollarSign,
  },
  {
    name: 'Conversion Rate',
    value: '15.2%',
    change: '+4.3%',
    icon: TrendingUp,
  },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="ml-2 text-sm font-medium text-green-600">
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Placeholder for charts and detailed stats */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6 h-96">
          <h2 className="text-lg font-medium text-gray-900">Lead Conversion</h2>
          <div className="mt-4 flex items-center justify-center h-full">
            <p className="text-gray-500">Chart coming soon...</p>
          </div>
        </Card>
        
        <Card className="p-6 h-96">
          <h2 className="text-lg font-medium text-gray-900">Revenue Trends</h2>
          <div className="mt-4 flex items-center justify-center h-full">
            <p className="text-gray-500">Chart coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
}