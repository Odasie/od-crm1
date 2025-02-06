import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, PanelLeftClose, PanelLeft } from 'lucide-react';
import { DayTimeline } from './DayTimeline';
import { ComponentPalette } from './ComponentPalette';
import { ItineraryComponent, Day } from '@/types/itinerary';

export function ItineraryBuilder() {
  const [days, setDays] = useState<Day[]>([
    { id: '1', date: new Date(), components: [] },
  ]);
  const [activeComponent, setActiveComponent] = useState<ItineraryComponent | null>(
    null
  );
  const [isPaletteVisible, setIsPaletteVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeComponent = days
      .flatMap((day) => day.components)
      .find((component) => component.id === active.id);
    setActiveComponent(activeComponent || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeDay = days.find((day) =>
      day.components.some((comp) => comp.id === active.id)
    );
    const overDay = days.find((day) =>
      day.components.some((comp) => comp.id === over.id)
    );

    if (activeDay && overDay) {
      setDays((days) => {
        const oldIndex = activeDay.components.findIndex(
          (comp) => comp.id === active.id
        );
        const newIndex = overDay.components.findIndex(
          (comp) => comp.id === over.id
        );

        const newDays = [...days];
        const dayIndex = days.findIndex((day) => day.id === activeDay.id);
        newDays[dayIndex] = {
          ...activeDay,
          components: arrayMove(activeDay.components, oldIndex, newIndex),
        };

        return newDays;
      });
    }

    setActiveComponent(null);
  };

  const addDay = () => {
    const lastDay = days[days.length - 1];
    const newDate = new Date(lastDay.date);
    newDate.setDate(newDate.getDate() + 1);

    setDays([
      ...days,
      {
        id: (days.length + 1).toString(),
        date: newDate,
        components: [],
      },
    ]);
  };

  const removeDay = (dayId: string) => {
    setDays((days) => days.filter((day) => day.id !== dayId));
  };

  const handleAddComponent = (dayId: string, component: ItineraryComponent) => {
    setDays((days) =>
      days.map((day) =>
        day.id === dayId
          ? { ...day, components: [...day.components, component] }
          : day
      )
    );
  };

  const handleRemoveComponent = (dayId: string, componentId: string) => {
    setDays((days) =>
      days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              components: day.components.filter((comp) => comp.id !== componentId),
            }
          : day
      )
    );
  };

  const filteredDays = days.filter((day) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      day.components.some((comp) =>
        comp.title.toLowerCase().includes(query)
      ) ||
      `Day ${day.id}`.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex gap-6">
      {isPaletteVisible && (
        <div className="w-80 flex-shrink-0">
          <ComponentPalette 
            onAddComponent={handleAddComponent}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      )}

      <div className="flex-1">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPaletteVisible(!isPaletteVisible)}
              >
                {isPaletteVisible ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeft className="h-4 w-4" />
                )}
              </Button>
              <h2 className="text-lg font-semibold">Itinerary Timeline</h2>
            </div>
            <Button onClick={addDay}>
              <Plus className="w-4 h-4 mr-2" />
              Add Day
            </Button>
          </div>

          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-6">
              {filteredDays.map((day) => (
                <SortableContext
                  key={day.id}
                  items={day.components.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <DayTimeline
                    day={day}
                    onAddComponent={(component) =>
                      handleAddComponent(day.id, component)
                    }
                    onRemoveComponent={(componentId) =>
                      handleRemoveComponent(day.id, componentId)
                    }
                    onRemoveDay={() => removeDay(day.id)}
                  />
                </SortableContext>
              ))}
            </div>

            <DragOverlay>
              {activeComponent && (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  {activeComponent.title}
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </Card>
      </div>
    </div>
  );
}