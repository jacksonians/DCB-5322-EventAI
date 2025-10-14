import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Wand2, Sparkles, MessageSquare, Calendar, MapPin, Users } from 'lucide-react';

interface EventAIPageProps {
  onNavigate: (page: string) => void;
}

export function EventAIPage({ onNavigate }: EventAIPageProps) {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = () => {
    const mockSuggestions = [
      "Consider a cocktail reception from 6-8 PM to encourage networking",
      "Book the Grand Ballroom for 150 guests with round table seating",
      "Hire a live jazz quartet for ambient background music",
      "Set up a photo booth with custom branded backdrop",
      "Arrange vegan and gluten-free menu options",
      "Create digital invitations with RSVP tracking"
    ];
    setSuggestions(mockSuggestions);
  };

  return (
    <div className="space-y-8">
      {/* AI Prompt Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Wand2 size={24} className="text-gray-800" />
          <h1>Event AI Assistant</h1>
        </div>
        
        <Card className="p-6 border-2 border-gray-800 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Describe your event idea</label>
              <Textarea
                placeholder="I want to plan a corporate networking event for 150 people in downtown..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-24 border-2 border-gray-300 focus:border-gray-800"
              />
            </div>
            
            <Button 
              onClick={generateSuggestions}
              className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-2"
            >
              <Sparkles size={16} />
              Generate AI Suggestions
            </Button>
          </div>
        </Card>
      </section>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <section>
          <h2 className="mb-4">AI Recommendations</h2>
          <div className="grid gap-4">
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="p-4 border-2 border-gray-800 bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <MessageSquare size={20} className="text-gray-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card 
            className="p-6 border-2 border-gray-800 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onNavigate('schedule')}
          >
            <Calendar size={32} className="text-gray-600 mb-3" />
            <h3>Schedule Planning</h3>
            <p className="text-gray-600">Create detailed event timeline</p>
          </Card>
          
          <Card 
            className="p-6 border-2 border-gray-800 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onNavigate('vendors')}
          >
            <MapPin size={32} className="text-gray-600 mb-3" />
            <h3>Find Venues</h3>
            <p className="text-gray-600">Discover perfect event locations</p>
          </Card>
          
          <Card className="p-6 border-2 border-gray-800 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
            <Users size={32} className="text-gray-600 mb-3" />
            <h3>Guest Management</h3>
            <p className="text-gray-600">Organize attendee lists and RSVPs</p>
          </Card>
        </div>
      </section>
    </div>
  );
}