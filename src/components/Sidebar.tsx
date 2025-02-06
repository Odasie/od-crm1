import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookCheck,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Leads', to: '/leads', icon: Users },
  { name: 'Itineraries', to: '/itineraries', icon: Calendar },
  { name: 'Bookings', to: '/bookings', icon: BookCheck },
];

interface SidebarProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isVisible, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 bg-white border-r border-gray-200 transition-[width] duration-300",
      isVisible ? "w-64" : "w-16"
    )}>
      <div className="flex flex-col h-full">
        <div className={cn(
          "flex h-16 items-center border-b border-gray-200",
          isVisible ? "px-6 justify-between" : "justify-center"
        )}>
          {isVisible && <h1 className="text-xl font-semibold text-gray-900">Odasie CRM</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-900"
          >
            {isVisible ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <nav className={cn(
          "flex-1 py-4",
          isVisible ? "px-4" : "px-2"
        )}>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1",
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  !isVisible && "justify-center"
                )
              }
              title={!isVisible ? item.name : undefined}
            >
              <item.icon className={cn(
                "h-5 w-5",
                isVisible ? "mr-3" : "mr-0"
              )} />
              {isVisible && item.name}
            </NavLink>
          ))}
        </nav>

        <div className={cn(
          "flex-shrink-0 border-t border-gray-200",
          isVisible ? "p-4" : "p-2"
        )}>
          <Button
            variant="ghost"
            className={cn(
              "w-full text-gray-600 hover:text-gray-900 mb-2",
              isVisible ? "justify-start" : "justify-center"
            )}
            title={!isVisible ? "Settings" : undefined}
          >
            <Settings className={cn(
              "h-5 w-5",
              isVisible ? "mr-3" : "mr-0"
            )} />
            {isVisible && "Settings"}
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full text-gray-600 hover:text-gray-900",
              isVisible ? "justify-start" : "justify-center"
            )}
            title={!isVisible ? "Logout" : undefined}
          >
            <LogOut className={cn(
              "h-5 w-5",
              isVisible ? "mr-3" : "mr-0"
            )} />
            {isVisible && "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}