"use client";

import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Medal, Gem, GraduationCap, Brain, Trophy, Star, Crown, Flame, Users, Rocket, Heart, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import './AchievementsPage.css';

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
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockDate?: Date;
}

const achievementIcons = {
  'graduation-cap': GraduationCap,
  'brain': Brain,
  'trophy': Trophy,
  'star': Star,
  'crown': Crown,
  'flame': Flame,
  'users': Users,
  'rocket': Rocket,
  'heart': Heart,
  'medal': Medal,
  'gem': Gem,
  'book': BookOpen,
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadAchievements();
  }, [user]);

  const loadAchievements = async () => {
    setLoading(true);
    try {
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
        description: 'Complete your first 10 flashcards',
        icon: 'graduation-cap',
        category: 'Study',
        requirement: 10,
        points: 100,
        earned: true,
        progress: 10,
        rarity: 'common',
        unlockDate: new Date('2024-01-15'),
      },
      {
        id: '2',
        name: 'Quick Learner',
        description: 'Complete 50 flashcards in one day',
        icon: 'brain',
        category: 'Study',
        requirement: 50,
        points: 250,
        earned: true,
        progress: 50,
        rarity: 'rare',
        unlockDate: new Date('2024-01-20'),
      },
      {
        id: '3',
        name: 'Study Master',
        description: 'Complete 500 flashcards total',
        icon: 'star',
        category: 'Study',
        requirement: 500,
        points: 1000,
        earned: false,
        progress: 287,
        rarity: 'epic',
      },
      {
        id: '4',
        name: 'Knowledge Seeker',
        description: 'Study all 6 FBLA event categories',
        icon: 'book',
        category: 'Study',
        requirement: 6,
        points: 500,
        earned: false,
        progress: 3,
        rarity: 'rare',
      },
      
      // Competition Achievements
      {
        id: '5',
        name: 'Rising Star',
        description: 'Reach top 50 on the leaderboard',
        icon: 'trophy',
        category: 'Competition',
        requirement: 50,
        points: 300,
        earned: true,
        progress: 50,
        rarity: 'rare',
        unlockDate: new Date('2024-02-01'),
      },
      {
        id: '6',
        name: 'Elite Competitor',
        description: 'Reach top 10 on the leaderboard',
        icon: 'crown',
        category: 'Competition',
        requirement: 10,
        points: 750,
        earned: false,
        progress: 15,
        rarity: 'epic',
      },
      {
        id: '7',
        name: 'Champion',
        description: 'Reach #1 on the leaderboard',
        icon: 'crown',
        category: 'Competition',
        requirement: 1,
        points: 2000,
        earned: false,
        progress: 0,
        rarity: 'legendary',
      },
      
      // Social Achievements
      {
        id: '8',
        name: 'Team Player',
        description: 'Help 5 fellow students with study tips',
        icon: 'users',
        category: 'Social',
        requirement: 5,
        points: 200,
        earned: false,
        progress: 2,
        rarity: 'common',
      },
      {
        id: '9',
        name: 'Mentor',
        description: 'Help 25 students improve their scores',
        icon: 'heart',
        category: 'Social',
        requirement: 25,
        points: 500,
        earned: false,
        progress: 0,
        rarity: 'rare',
      },
      
      // Streak Achievements
      {
        id: '10',
        name: 'Consistent Learner',
        description: 'Maintain a 7-day study streak',
        icon: 'flame',
        category: 'Streak',
        requirement: 7,
        points: 150,
        earned: true,
        progress: 7,
        rarity: 'common',
        unlockDate: new Date('2024-01-25'),
      },
      {
        id: '11',
        name: 'Dedication',
        description: 'Maintain a 30-day study streak',
        icon: 'flame',
        category: 'Streak',
        requirement: 30,
        points: 600,
        earned: false,
        progress: 18,
        rarity: 'epic',
      },
      {
        id: '12',
        name: 'Unstoppable',
        description: 'Maintain a 100-day study streak',
        icon: 'rocket',
        category: 'Streak',
        requirement: 100,
        points: 2500,
        earned: false,
        progress: 18,
        rarity: 'legendary',
      },
      
      // Special Achievements
      {
        id: '13',
        name: 'Early Bird',
        description: 'Study before 7 AM for 5 days',
        icon: 'star',
        category: 'Special',
        requirement: 5,
        points: 300,
        earned: false,
        progress: 0,
        rarity: 'rare',
      },
      {
        id: '14',
        name: 'Night Owl',
        description: 'Study after 10 PM for 10 days',
        icon: 'star',
        category: 'Special',
        requirement: 10,
        points: 250,
        earned: false,
        progress: 0,
        rarity: 'rare',
      },
      {
        id: '15',
        name: 'Perfect Score',
        description: 'Get 100% on a practice quiz',
        icon: 'gem',
        category: 'Special',
        requirement: 1,
        points: 400,
        earned: false,
        progress: 0,
        rarity: 'epic',
      },
    ];
  };

  const getFilteredAchievements = () => {
    if (filter === 'all') return achievements;
    if (filter === 'earned') return achievements.filter(a => a.earned);
    if (filter === 'unearned') return achievements.filter(a => !a.earned);
    return achievements.filter(a => a.category === filter);
  };

  const getProgressPercentage = (achievement: Achievement): number => {
    if (!achievement.progress) return 0;
    return Math.min((achievement.progress / achievement.requirement) * 100, 100);
  };

  const getIconComponent = (iconName: string) => {
    const Icon = achievementIcons[iconName as keyof typeof achievementIcons] || Trophy;
    return Icon;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'rarity-common';
      case 'rare': return 'rarity-rare';
      case 'epic': return 'rarity-epic';
      case 'legendary': return 'rarity-legendary';
      default: return 'rarity-common';
    }
  };

  const categories = ['all', 'earned', 'unearned', 'Study', 'Competition', 'Social', 'Streak', 'Special'];
  const earnedCount = achievements.filter(a => a.earned).length;
  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);

  return (
    <PageLayout
      title="Achievements"
      subtitle="Track your progress and unlock badges as you master FBLA concepts"
    >
      <div className="achievements-container">
        <div className="achievements-content">
          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-grid">
              <StyledCard className="stat-card">
                <div className="card-content">
                  <div className="stat-icon">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{earnedCount}</div>
                    <div className="stat-label">Achievements Earned</div>
                  </div>
                </div>
              </StyledCard>
              
              <StyledCard className="stat-card">
                <div className="card-content">
                  <div className="stat-icon">
                    <Star className="w-8 h-8" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{totalPoints.toLocaleString()}</div>
                    <div className="stat-label">Points Earned</div>
                  </div>
                </div>
              </StyledCard>
              
              <StyledCard className="stat-card">
                <div className="card-content">
                  <div className="stat-icon">
                    <Medal className="w-8 h-8" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{Math.round((earnedCount / achievements.length) * 100)}%</div>
                    <div className="stat-label">Completion Rate</div>
                  </div>
                </div>
              </StyledCard>
            </div>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <StyledCard className="filter-card">
              <div className="card-content">
                <h3 className="filter-title">Filter Achievements</h3>
                <div className="filter-buttons">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setFilter(category)}
                      variant={filter === category ? 'default' : 'outline'}
                      className={`filter-btn ${filter === category ? 'active' : ''}`}
                    >
                      {category === 'all' ? 'All' : 
                       category === 'earned' ? 'Earned' :
                       category === 'unearned' ? 'Locked' :
                       category}
                    </Button>
                  ))}
                </div>
              </div>
            </StyledCard>
          </div>

          {/* Achievements Grid */}
          <div className="achievements-grid">
            {getFilteredAchievements().map((achievement) => {
              const IconComponent = getIconComponent(achievement.icon);
              const progressPercentage = getProgressPercentage(achievement);
              
              return (
                <StyledCard 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.earned ? 'earned' : 'locked'} ${getRarityColor(achievement.rarity)}`}
                >
                  <div className="card-content">
                    <div className="achievement-header">
                      <div className={`achievement-icon ${achievement.earned ? 'earned' : 'locked'}`}>
                        {achievement.earned ? (
                          <IconComponent className="w-8 h-8" />
                        ) : (
                          <Lock className="w-8 h-8" />
                        )}
                      </div>
                      <div className="achievement-status">
                        {achievement.earned ? (
                          <CheckCircle className="status-icon earned" />
                        ) : (
                          <Lock className="status-icon locked" />
                        )}
                      </div>
                    </div>
                    
                    <div className="achievement-info">
                      <h4 className="achievement-name">{achievement.name}</h4>
                      <p className="achievement-description">{achievement.description}</p>
                      
                      <div className="achievement-meta">
                        <Badge className={`category-badge ${achievement.category.toLowerCase()}`}>
                          {achievement.category}
                        </Badge>
                        <Badge className={`rarity-badge ${achievement.rarity}`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      
                      <div className="achievement-points">
                        <Star className="w-4 h-4" />
                        <span>{achievement.points} points</span>
                      </div>
                      
                      {!achievement.earned && achievement.progress !== undefined && (
                        <div className="achievement-progress">
                          <div className="progress-text">
                            {achievement.progress} / {achievement.requirement}
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {achievement.earned && achievement.unlockDate && (
                        <div className="unlock-date">
                          Earned on {achievement.unlockDate.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </StyledCard>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}