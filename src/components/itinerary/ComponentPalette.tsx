import { Card } from '@/components/ui/card';
import {
  Bed,
  Car,
  Utensils,
  Compass,
  Users,
  Calendar,
  Search,
  type LucideIcon,
} from 'lucide-react';
import { ItineraryComponent } from '@/types/itinerary';

type ComponentType = {
  id: string;
  title: string;
  icon: LucideIcon;
  type: 'accommodation' | 'transfer' | 'meal' | 'activity' | 'guide' | 'free-time';
};

const components: ComponentType[] = [
  {
    id: 'accommodation',
    title: 'Accommodation',
    icon: Bed,
    type: 'accommodation',
  },
  { id: 'transfer', title: 'Transfer', icon: Car, type: 'transfer' },
  { id: 'meal', title: 'Meal', icon: Utensils, type: 'meal' },
  { id: 'activity', title: 'Activity', icon: Compass, type: 'activity' },
  { id: 'guide', title: 'Guide', icon: Users, type: 'guide' },
  { id: 'free-time', title: 'Free Time', icon: Calendar, type: 'free-time' },
];

type ComponentPaletteProps = {
  onAddComponent: (component: ItineraryComponent) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export function ComponentPalette({ 
  onAddComponent, 
  searchQuery, 
  onSearchChange 
}: ComponentPaletteProps) {
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    component: ComponentType
  ) => {
    event.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        id: `${component.type}-${Date.now()}`,
        type: component.type,
        title: component.title,
      })
    );
  };

  const filteredComponents = components.filter(component =>
    component.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-4">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-4">Components</h3>
      <div className="space-y-2">
        {filteredComponents.map((component) => (
          <div
            key={component.id}
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
            className="flex items-center p-3 rounded-md border border-gray-200 bg-white cursor-move hover:bg-gray-50 transition-colors"
          >
            <component.icon className="w-5 h-5 mr-3 text-gray-500" />
            <span className="text-sm font-medium">{component.title}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}