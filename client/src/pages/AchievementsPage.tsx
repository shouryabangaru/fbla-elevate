import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Medal, Gem, GraduationCap, Brain, Trophy, Star, Crown, Flame, Users, Rocket, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: number;
  points: number;
  earned: boolean;
  progress?: number;
}

const achievementIcons = {
  'graduation-cap': GraduationCap,
  'brain': Brain,
  'trophy': Trophy,
  'star': Star,
  'crown': Crown,
  'fire': Flame,
  'users': Users,
  'rocket': Rocket,
  'heart': Heart,
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadAchievements();
  }, [user]);

  const loadAchievements = async () => {
    setLoading(true);
    try {
      // For demo purposes, we'll use sample achievements
      const sampleAchievements = getSampleAchievements();
      setAchievements(sampleAchievements);
    } catch (error) {
      console.error('Error loading achievements:', error);
      toast({
        title: 'Error',
        description: 'Failed to load achievements. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getSampleAchievements = (): Achievement[] => {
    return [
      // Study Achievements
      {
        id: '1',
        name: 'First Steps',
        description: 'Complete 10 flashcards',
        icon: 'graduation-cap',
        category: 'Study',
        requirement: 10,
        points: 100,
        earned: true,
        progress: 10,
      },
      {
        id: '2',
        name: 'Knowledge Seeker',
        description: 'Study for 7 consecutive days',
        icon: 'brain',
        category: 'Study',
        requirement: 7,
        points: 200,
        earned: true,
        progress: 7,
      },
      {
        id: '3',
        name: 'Master Scholar',
        description: 'Complete 500 flashcards',
        icon: 'trophy',
        category: 'Study',
        requirement: 500,
        points: 1000,
        earned: false,
        progress: 125,
      },
      // Competition Achievements
      {
        id: '4',
        name: 'Rising Star',
        description: 'Reach top 10 in leaderboard',
        icon: 'star',
        category: 'Competition',
        requirement: 10,
        points: 300,
        earned: true,
        progress: 10,
      },
      {
        id: '5',
        name: 'Champion',
        description: 'Reach #1 in leaderboard',
        icon: 'crown',
        category: 'Competition',
        requirement: 1,
        points: 1000,
        earned: false,
        progress: 0,
      },
      {
        id: '6',
        name: 'Streak Master',
        description: 'Maintain 30-day streak',
        icon: 'fire',
        category: 'Competition',
        requirement: 30,
        points: 500,
        earned: false,
        progress: 12,
      },
      // Special Achievements
      {
        id: '7',
        name: 'Team Player',
        description: 'Help 5 students with questions',
        icon: 'users',
        category: 'Special',
        requirement: 5,
        points: 250,
        earned: true,
        progress: 5,
      },
      {
        id: '8',
        name: 'Early Adopter',
        description: 'Join within first 100 users',
        icon: 'rocket',
        category: 'Special',
        requirement: 100,
        points: 150,
        earned: false,
        progress: 0,
      },
      {
        id: '9',
        name: 'FBLA Ambassador',
        description: 'Invite 10 friends to join',
        icon: 'heart',
        category: 'Special',
        requirement: 10,
        points: 400,
        earned: false,
        progress: 0,
      },
    ];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Study':
        return <BookOpen className="text-fbla-yellow w-6 h-6" />;
      case 'Competition':
        return <Medal className="text-fbla-yellow w-6 h-6" />;
      case 'Special':
        return <Gem className="text-fbla-yellow w-6 h-6" />;
      default:
        return <BookOpen className="text-fbla-yellow w-6 h-6" />;
    }
  };

  const getProgressPercentage = (achievement: Achievement): number => {
    if (!achievement.progress) return 0;
    return Math.min((achievement.progress / achievement.requirement) * 100, 100);
  };

  const categories = ['Study', 'Competition', 'Special'];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-fbla-blue mb-4">Achievements</h1>
          <p className="text-gray-600 text-lg">Unlock badges and track your progress</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbla-blue"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category} className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-fbla-blue flex items-center">
                    {getCategoryIcon(category)}
                    <span className="ml-2">{category} Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements
                      .filter((achievement) => achievement.category === category)
                      .map((achievement) => {
                        const IconComponent = achievementIcons[achievement.icon as keyof typeof achievementIcons] || GraduationCap;
                        const progressPercentage = getProgressPercentage(achievement);
                        
                        return (
                          <Card
                            key={achievement.id}
                            className={`transition-all duration-200 ${
                              achievement.earned
                                ? 'bg-white shadow-sm border-l-4 border-green-500'
                                : 'bg-gray-100 opacity-60 border-l-4 border-gray-400'
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mr-4 ${
                                  achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                                }`}>
                                  <IconComponent className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                                  <p className="text-sm text-gray-600">{achievement.description}</p>
                                  {!achievement.earned && achievement.progress !== undefined && (
                                    <div className="mt-2">
                                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Progress: {achievement.progress}/{achievement.requirement}</span>
                                        <span>{Math.round(progressPercentage)}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                          className="bg-fbla-yellow h-2 rounded-full transition-all duration-300"
                                          style={{ width: `${progressPercentage}%` }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {achievement.earned && (
                                    <Badge className="mt-2 bg-green-100 text-green-800">
                                      +{achievement.points} points
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
