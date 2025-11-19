"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  description: string;
}

interface EventWithMeta extends Event {
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

const eventMetadata: Record<string, { icon: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; category: string }> = {
  'Accounting I': { icon: '📊', difficulty: 'Intermediate', category: 'Finance' },
  'Advanced Accounting': { icon: '🧮', difficulty: 'Advanced', category: 'Finance' },
  'Advertising': { icon: '📢', difficulty: 'Intermediate', category: 'Marketing' },
  'Agribusiness': { icon: '🌾', difficulty: 'Intermediate', category: 'Business' },
  'Banking & Financial Systems': { icon: '🏦', difficulty: 'Intermediate', category: 'Finance' },
  'Business Communication': { icon: '💬', difficulty: 'Intermediate', category: 'Communication' },
  'Business Ethics': { icon: '🎯', difficulty: 'Intermediate', category: 'Business' },
  'Business Law': { icon: '⚖️', difficulty: 'Advanced', category: 'Legal' },
  'Business Management': { icon: '💼', difficulty: 'Intermediate', category: 'Management' },
  'Computer Problem Solving': { icon: '💻', difficulty: 'Advanced', category: 'Technology' },
  'Customer Service': { icon: '🤝', difficulty: 'Beginner', category: 'Communication' },
  'Cybersecurity': { icon: '🔒', difficulty: 'Advanced', category: 'Technology' },
  'Data Science & AI': { icon: '🤖', difficulty: 'Advanced', category: 'Technology' },
  'Economics': { icon: '📈', difficulty: 'Intermediate', category: 'Finance' },
  'Entrepreneurship': { icon: '🚀', difficulty: 'Advanced', category: 'Business' },
  'Healthcare Administration': { icon: '🏥', difficulty: 'Intermediate', category: 'Management' },
  'Hospitality & Event Management': { icon: '🏨', difficulty: 'Intermediate', category: 'Management' },
  'Human Resource Management': { icon: '👥', difficulty: 'Intermediate', category: 'Management' },
  'Insurance & Risk Management': { icon: '🛡️', difficulty: 'Intermediate', category: 'Finance' },
  'International Business': { icon: '🌍', difficulty: 'Advanced', category: 'Business' },
  'Introduction to Business Communication': { icon: '📝', difficulty: 'Beginner', category: 'Communication' },
  'Introduction to Business Concepts': { icon: '📋', difficulty: 'Beginner', category: 'Business' },
  'Introduction to Business Procedures': { icon: '📑', difficulty: 'Beginner', category: 'Business' },
  'Introduction to FBLA': { icon: '🏛️', difficulty: 'Beginner', category: 'Leadership' },
  'Introduction to Information Technology': { icon: '🖥️', difficulty: 'Beginner', category: 'Technology' },
  'Introduction to Marketing Concepts': { icon: '📢', difficulty: 'Beginner', category: 'Marketing' },
  'Introduction to Parliamentary Procedure': { icon: '🏛️', difficulty: 'Beginner', category: 'Leadership' },
  'Introduction to Retail & Merchandising': { icon: '🛍️', difficulty: 'Beginner', category: 'Business' },
  'Introduction to Supply Chain Management': { icon: '📦', difficulty: 'Beginner', category: 'Business' },
  'Journalism': { icon: '📰', difficulty: 'Intermediate', category: 'Communication' },
  'Management Information Systems': { icon: '💾', difficulty: 'Advanced', category: 'Technology' },
  'Marketing': { icon: '📈', difficulty: 'Intermediate', category: 'Marketing' },
  'Network Design': { icon: '🔗', difficulty: 'Advanced', category: 'Technology' },
  'Networking Infrastructures': { icon: '🌐', difficulty: 'Advanced', category: 'Technology' },
  'Organizational Leadership': { icon: '👑', difficulty: 'Intermediate', category: 'Leadership' },
  'Parliamentary Procedure': { icon: '🏛️', difficulty: 'Intermediate', category: 'Leadership' },
  'Personal Finance': { icon: '💰', difficulty: 'Beginner', category: 'Finance' },
  'Project Management': { icon: '📊', difficulty: 'Intermediate', category: 'Management' },
  'Public Administration & Management': { icon: '🏢', difficulty: 'Intermediate', category: 'Management' },
  'Real Estate': { icon: '🏠', difficulty: 'Intermediate', category: 'Finance' },
  'Retail Management': { icon: '🛒', difficulty: 'Intermediate', category: 'Management' },
  'Securities & Investments': { icon: '📊', difficulty: 'Advanced', category: 'Finance' },
  'Sports & Entertainment Management': { icon: '🎭', difficulty: 'Intermediate', category: 'Management' },
  'Technology Support & Services': { icon: '🔧', difficulty: 'Intermediate', category: 'Technology' },
};

export default function PracticeQuestionsPageNew() {
  const router = useRouter();
  const [events, setEvents] = useState<EventWithMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Business', 'Finance', 'Marketing', 'Technology', 'Management', 'Communication', 'Leadership', 'Legal'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Combine with metadata
      const eventsWithMeta: EventWithMeta[] = data.map((event: Event) => ({
        ...event,
        ...(eventMetadata[event.name] || { icon: '📝', difficulty: 'Beginner' as const, category: 'General' })
      }));

      setEvents(eventsWithMeta);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-400 mx-auto" />
          <p className="text-gray-300 text-lg">Loading practice events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <Card className="max-w-md mx-auto bg-red-950/20 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              Error Loading Events
            </CardTitle>
            <CardDescription className="text-gray-400">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchEvents} 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Practice Questions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Test your knowledge with comprehensive FBLA practice events. Choose from {events.length} different competitive events.
          </p>
        </div>

        {/* Category Filter */}
        <Card className="mb-8 bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Filter by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={selectedCategory === category 
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                    : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                  }
                >
                  {category === 'all' ? 'All Events' : category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Events Count */}
        <div className="mb-6 text-gray-400 text-sm">
          Showing {filteredEvents.length} of {events.length} events
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="py-12 text-center">
              <p className="text-gray-400 text-lg">No events found in this category.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id} 
                className="bg-gray-900/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-4xl">{event.icon}</div>
                    <div className="flex flex-col gap-2">
                      <Badge className={`${getDifficultyColor(event.difficulty)} border`}>
                        {event.difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-400">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl leading-tight">
                    {event.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => router.push(`/practice/${event.id}`)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Practicing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
