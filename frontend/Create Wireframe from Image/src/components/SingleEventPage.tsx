import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Edit, Share2, Download, CheckCircle, AlertCircle, Circle, Store, Plus, Star, DollarSign } from 'lucide-react';

interface SingleEventPageProps {
  onNavigate: (page: string) => void;
  eventId?: string;
}

export function SingleEventPage({ onNavigate, eventId }: SingleEventPageProps) {
  // Mock event data - in real app this would be fetched based on eventId
  const event = {
    id: eventId || '1',
    title: 'Annual Corporate Networking Summit',
    date: 'March 15, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Grand Ballroom, Downtown Convention Center',
    description: 'Join us for our annual corporate networking summit featuring keynote speakers, panel discussions, and networking opportunities.',
    attendees: 150,
    maxCapacity: 200,
    status: 'confirmed',
    budget: {
      total: 25000,
      spent: 18500,
      remaining: 6500
    },
    organizer: 'Sarah Johnson',
    contact: 'sarah.johnson@company.com'
  };

  const tasks = [
    { id: '1', title: 'Book venue', status: 'completed', dueDate: 'Feb 15', assignee: 'John D.' },
    { id: '2', title: 'Send invitations', status: 'completed', dueDate: 'Feb 20', assignee: 'Sarah J.' },
    { id: '3', title: 'Confirm catering', status: 'in-progress', dueDate: 'March 1', assignee: 'Mike R.' },
    { id: '4', title: 'Setup registration desk', status: 'pending', dueDate: 'March 14', assignee: 'Lisa M.' },
    { id: '5', title: 'Test AV equipment', status: 'pending', dueDate: 'March 14', assignee: 'Tech Team' },
    { id: '6', title: 'Prepare welcome bags', status: 'pending', dueDate: 'March 15', assignee: 'Volunteers' }
  ];

  const schedule = [
    { time: '9:00 AM', title: 'Registration & Welcome Coffee', duration: '30 min' },
    { time: '9:30 AM', title: 'Opening Keynote', duration: '45 min' },
    { time: '10:15 AM', title: 'Networking Break', duration: '15 min' },
    { time: '10:30 AM', title: 'Panel Discussion', duration: '60 min' },
    { time: '11:30 AM', title: 'Workshop Sessions', duration: '90 min' }
  ];

  const registeredVendors = [
    {
      id: '1',
      name: 'Grand Vista Venues',
      category: 'Venue',
      rating: 4.8,
      status: 'confirmed',
      cost: '$8,500',
      contact: 'venues@grandvista.com'
    },
    {
      id: '2',
      name: 'Gourmet Catering Co.',
      category: 'Catering',
      rating: 4.9,
      status: 'confirmed',
      cost: '$6,200',
      contact: 'orders@gourmetcatering.com'
    },
    {
      id: '3',
      name: 'Harmony Sound Systems',
      category: 'Audio/Visual',
      rating: 4.7,
      status: 'pending',
      cost: '$1,800',
      contact: 'bookings@harmonysound.com'
    },
    {
      id: '4',
      name: 'Elite Photography Studio',
      category: 'Photography',
      rating: 4.9,
      status: 'confirmed',
      cost: '$2,000',
      contact: 'studio@elitephoto.com'
    }
  ];

  const getTaskIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'in-progress': return <AlertCircle size={16} className="text-yellow-600" />;
      default: return <Circle size={16} className="text-gray-400" />;
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getVendorStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'declined': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('home')}
            className="hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1>{event.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 size={16} />
              Share
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2">
              <Edit size={16} />
              Edit Event
            </Button>
          </div>
        </div>
      </section>

      {/* Event Overview */}
      <section className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Event Details */}
          <Card className="p-6 border-2 border-gray-800 bg-white">
            <h2 className="mb-4">Event Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Description</label>
                <p>{event.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Organizer</label>
                  <p>{event.organizer}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Contact</label>
                  <p>{event.contact}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Schedule */}
          <Card className="p-6 border-2 border-gray-800 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2>Event Schedule</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('schedule')}
              >
                View Full Schedule
              </Button>
            </div>
            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                  <div className="text-sm font-medium min-w-20">{item.time}</div>
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Registered Vendors */}
          <Card className="p-6 border-2 border-gray-800 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2>Registered Vendors</h2>
              <Button 
                className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2"
                onClick={() => onNavigate('vendors')}
              >
                <Plus size={16} />
                Add New Vendors
              </Button>
            </div>
            <div className="space-y-3">
              {registeredVendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4>{vendor.name}</h4>
                      <Badge className={`border ${getVendorStatusColor(vendor.status)}`}>
                        {vendor.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{vendor.category}</span>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span>{vendor.rating}</span>
                      </div>
                      <span>{vendor.contact}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <DollarSign size={14} />
                        <span>{vendor.cost}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Contact</Button>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Vendor Costs:</span>
                <span className="font-medium">$18,500</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Progress Tracker */}
          <Card className="p-6 border-2 border-gray-800 bg-white">
            <h3 className="mb-4">Event Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span>{completedTasks}/{tasks.length}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <div className="space-y-2">
                {tasks.slice(0, 4).map((task) => (
                  <div key={task.id} className="flex items-center gap-2 text-sm">
                    {getTaskIcon(task.status)}
                    <span className="flex-1">{task.title}</span>
                    <Badge className={`text-xs border ${getTaskStatusColor(task.status)}`}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Tasks
              </Button>
            </div>
          </Card>

          {/* Event Stats */}
          <Card className="p-6 border-2 border-gray-800 bg-white">
            <h3 className="mb-4">Event Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {event.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Attendees</span>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{event.attendees}/{event.maxCapacity}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Capacity</span>
                  <span>{Math.round((event.attendees / event.maxCapacity) * 100)}%</span>
                </div>
                <Progress value={(event.attendees / event.maxCapacity) * 100} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Budget Overview */}
          <Card className="p-6 border-2 border-gray-800 bg-white">
            <h3 className="mb-4">Budget Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Budget</span>
                <span>${event.budget.total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Spent</span>
                <span>${event.budget.spent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Remaining</span>
                <span className="text-green-600">${event.budget.remaining.toLocaleString()}</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Budget Used</span>
                  <span>{Math.round((event.budget.spent / event.budget.total) * 100)}%</span>
                </div>
                <Progress value={(event.budget.spent / event.budget.total) * 100} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}