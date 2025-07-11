import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@shared/schema';

const eventFilters = [
  { id: 'all', name: 'All Events' },
  { id: 'business-law', name: 'Business Law' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'economics', name: 'Economics' },
];

const schools = {
  'east-high': 'East High School',
  'west-valley': 'West Valley High School',
  'north-central': 'North Central High School',
  'south-ridge': 'South Ridge High School',
  'central-academy': 'Central Academy',
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadLeaderboard();
  }, [selectedFilter]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('points', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const usersList: User[] = [];
      
      querySnapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() } as User);
      });

      if (usersList.length === 0) {
        // Create sample data if no users exist
        const sampleUsers = getSampleUsers();
        setUsers(sampleUsers);
      } else {
        setUsers(usersList);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      toast({
        title: 'Error',
        description: 'Failed to load leaderboard. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getSampleUsers = (): User[] => {
    return [
      {
        id: 1,
        uid: 'sample-1',
        name: 'John Smith',
        email: 'john@example.com',
        schoolId: 'east-high',
        points: 2847,
        streak: 12,
        createdAt: new Date(),
      },
      {
        id: 2,
        uid: 'sample-2',
        name: 'Maria Johnson',
        email: 'maria@example.com',
        schoolId: 'west-valley',
        points: 2634,
        streak: 8,
        createdAt: new Date(),
      },
      {
        id: 3,
        uid: 'sample-3',
        name: 'Alex Davis',
        email: 'alex@example.com',
        schoolId: 'north-central',
        points: 2421,
        streak: 5,
        createdAt: new Date(),
      },
      {
        id: 4,
        uid: 'sample-4',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        schoolId: 'south-ridge',
        points: 2198,
        streak: 15,
        createdAt: new Date(),
      },
      {
        id: 5,
        uid: 'sample-5',
        name: 'Michael Brown',
        email: 'michael@example.com',
        schoolId: 'central-academy',
        points: 1987,
        streak: 3,
        createdAt: new Date(),
      },
    ];
  };

  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStreakColor = (streak: number): string => {
    if (streak >= 10) return 'bg-green-100 text-green-800';
    if (streak >= 5) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-fbla-blue mb-4">Leaderboard</h1>
          <p className="text-gray-600 text-lg">See how you stack up against other FBLA students</p>
        </div>

        {/* Event Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {eventFilters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              variant={selectedFilter === filter.id ? 'default' : 'outline'}
              className={selectedFilter === filter.id 
                ? 'bg-fbla-yellow text-fbla-blue hover:bg-yellow-600' 
                : 'text-fbla-blue border-fbla-blue hover:bg-fbla-blue hover:text-white'
              }
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Leaderboard */}
        <Card className="bg-white shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbla-blue"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-fbla-blue text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">School</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Points</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className={`font-bold text-lg ${index === 0 ? 'text-fbla-yellow' : 'text-gray-600'}`}>
                            #{index + 1}
                          </span>
                          {index === 0 && <Crown className="text-fbla-yellow w-5 h-5 ml-2" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-fbla-blue rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {getInitials(user.name)}
                          </div>
                          <span className="font-semibold text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {schools[user.schoolId as keyof typeof schools] || 'Unknown School'}
                      </td>
                      <td className="px-6 py-4 font-semibold text-fbla-blue">
                        {user.points?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getStreakColor(user.streak || 0)}>
                          {user.streak || 0} days
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
