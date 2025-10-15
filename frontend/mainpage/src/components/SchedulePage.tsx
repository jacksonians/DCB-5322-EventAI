import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, Plus, MapPin, Users } from 'lucide-react';

interface SchedulePageProps {
  onNavigate: (page: string, eventId?: string) => void;
}

export function SchedulePage({ onNavigate }: SchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState('2024-03-15');
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');

  const scheduleItems = [
    {
      id: '1',
      time: '09:00 AM',
      duration: '30 min',
      title: 'Registration & Welcome Coffee',
      location: 'Main Lobby',
      attendees: 150,
      status: 'confirmed',
      date: '2024-03-15'
    },
    {
      id: '2', 
      time: '09:30 AM',
      duration: '45 min',
      title: 'Opening Keynote',
      location: 'Grand Ballroom',
      attendees: 150,
      status: 'confirmed',
      date: '2024-03-15'
    },
    {
      id: '3',
      time: '10:15 AM',
      duration: '15 min',
      title: 'Networking Break',
      location: 'Terrace',
      attendees: 150,
      status: 'pending',
      date: '2024-03-15'
    },
    {
      id: '4',
      time: '10:30 AM',
      duration: '60 min',
      title: 'Panel Discussion',
      location: 'Conference Room A',
      attendees: 75,
      status: 'confirmed',
      date: '2024-03-15'
    },
    {
      id: '5',
      time: '11:30 AM',
      duration: '90 min',
      title: 'Workshop Sessions',
      location: 'Multiple Rooms',
      attendees: 150,
      status: 'draft',
      date: '2024-03-15'
    }
  ];

  const weeklyEvents = [
    { id: 'w1', title: 'Team Meeting', time: '10:00 AM', date: '2024-03-11', status: 'confirmed' },
    { id: 'w2', title: 'Client Presentation', time: '2:00 PM', date: '2024-03-12', status: 'confirmed' },
    { id: 'w3', title: 'Planning Session', time: '9:00 AM', date: '2024-03-13', status: 'pending' },
    { id: 'w4', title: 'Corporate Summit', time: '9:00 AM', date: '2024-03-15', status: 'confirmed' },
    { id: 'w5', title: 'Follow-up Meeting', time: '11:00 AM', date: '2024-03-16', status: 'draft' }
  ];

  const monthlyEvents = [
    { id: 'm1', title: 'Corporate Summit', date: '2024-03-15', status: 'confirmed' },
    { id: 'm2', title: 'Product Launch', date: '2024-03-22', status: 'confirmed' },
    { id: 'm3', title: 'Quarterly Review', date: '2024-03-28', status: 'pending' },
    { id: 'm4', title: 'Team Building', date: '2024-03-05', status: 'confirmed' },
    { id: 'm5', title: 'Client Workshop', date: '2024-03-18', status: 'draft' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderDayView = () => (
    <section>
      <h2 className="mb-4">Daily Timeline</h2>
      <div className="space-y-3">
        {scheduleItems.map((item, index) => (
          <Card 
            key={item.id} 
            className="p-4 border-2 border-gray-800 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onNavigate('event', item.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center min-w-20">
                  <span className="font-medium">{item.time}</span>
                  <span className="text-sm text-gray-500">{item.duration}</span>
                </div>
                
                <div className="w-px h-12 bg-gray-300"></div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{item.title}</h3>
                    <Badge className={`border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{item.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );

  const renderWeekView = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekDates = ['11', '12', '13', '14', '15', '16', '17'];
    
    return (
      <section>
        <h2 className="mb-4">Weekly View</h2>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={day} className="border-2 border-gray-800 bg-white rounded-lg p-3 min-h-32">
              <div className="text-center mb-2">
                <div className="text-sm text-gray-600">{day}</div>
                <div className="font-medium">{weekDates[index]}</div>
              </div>
              <div className="space-y-1">
                {weeklyEvents
                  .filter(event => event.date.endsWith(`-${weekDates[index]}`))
                  .map(event => (
                    <div 
                      key={event.id} 
                      className="text-xs p-1 rounded bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => onNavigate('event', event.id)}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-gray-600">{event.time}</div>
                      <Badge className={`border text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderMonthView = () => {
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const firstDayOffset = 4; // March 1st is a Friday (4 days offset)
    const calendarDays = Array.from({ length: firstDayOffset }, () => null).concat(daysInMonth);
    
    return (
      <section>
        <h2 className="mb-4">Monthly View - March 2024</h2>
        <div className="border-2 border-gray-800 bg-white rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-7 border-b-2 border-gray-800">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center font-medium bg-gray-50 border-r border-gray-300 last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className="h-24 border-r border-b border-gray-300 last:border-r-0 p-1 relative hover:bg-gray-50 transition-colors"
              >
                {day && (
                  <>
                    <div className="text-sm font-medium mb-1">{day}</div>
                    <div className="space-y-1">
                      {monthlyEvents
                        .filter(event => event.date.endsWith(`-${day.toString().padStart(2, '0')}`))
                        .map(event => (
                          <div 
                            key={event.id} 
                            className="text-xs p-1 rounded bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors truncate"
                            onClick={() => onNavigate('event', event.id)}
                          >
                            <div className="font-medium">{event.title}</div>
                            <Badge className={`border text-xs ${getStatusColor(event.status)}`}>
                              {event.status}
                            </Badge>
                          </div>
                        ))
                      }
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Calendar size={24} className="text-gray-800" />
          <h1>Event Schedule</h1>
        </div>
      </section>

      {/* Date Navigation */}
      <section>
        <Card className="p-4 border-2 border-gray-800 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">← Previous</Button>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>March 15, 2024</span>
              </div>
              <Button variant="outline" size="sm">Next →</Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <Button 
                variant={currentView === 'day' ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentView('day')}
                className={currentView === 'day' ? "bg-gray-800 text-white" : ""}
              >
                Day
              </Button>
              <Button 
                variant={currentView === 'month' ? "default" : "ghost"} 
                size="sm"
                onClick={() => setCurrentView('month')}
                className={currentView === 'month' ? "bg-gray-800 text-white" : ""}
              >
                Month
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Dynamic View Content */}
      {currentView === 'day' && renderDayView()}
      {currentView === 'month' && renderMonthView()}
    </div>
  );
}