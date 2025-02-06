import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { GripVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Day, ItineraryComponent } from '@/types/itinerary';

type DayTimelineProps = {
  day: Day;
  onAddComponent: (component: ItineraryComponent) => void;
  onRemoveComponent: (componentId: string) => void;
  onRemoveDay: () => void;
};

export function DayTimeline({ 
  day, 
  onAddComponent, 
  onRemoveComponent,
  onRemoveDay 
}: DayTimelineProps) {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const componentData = event.dataTransfer.getData('application/json');
    if (componentData) {
      const component = JSON.parse(componentData);
      onAddComponent(component);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="border border-gray-200 rounded-lg p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          Day {day.id} - {format(new Date(day.date), 'MMMM d, yyyy')}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemoveDay}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {day.components.map((component) => (
          <SortableComponent 
            key={component.id} 
            component={component}
            onRemove={() => onRemoveComponent(component.id)}
          />
        ))}

        {day.components.length === 0 && (
          <div className="h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
            Drop components here
          </div>
        )}
      </div>
    </div>
  );
}

type SortableComponentProps = {
  component: ItineraryComponent;
  onRemove: () => void;
};

function SortableComponent({ component, onRemove }: SortableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center">
        <button
          className="p-1 hover:bg-gray-100 rounded mr-2 cursor-move"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
        <span className="text-sm font-medium">{component.title}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}