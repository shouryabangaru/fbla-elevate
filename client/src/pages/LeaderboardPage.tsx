"use client";

import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Medal, Award, Users, TrendingUp, Star, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import './LeaderboardPage.css';

interface LeaderboardUser {
  id: number;
  name: string;
  schoolId: string;
  points: number;
  streak: number;
  avatar?: string;
  rank: number;
  weeklyPoints: number;
  achievements: number;
}

const schools = {
  'east-high': 'East High School',
  'west-valley': 'West Valley High School',
  'north-central': 'North Central High School',
  'south-ridge': 'South Ridge High School',
  'central-academy': 'Central Academy',
  'mountain-view': 'Mountain View High',
  'riverside': 'Riverside Preparatory',
  'sunset-valley': 'Sunset Valley High',
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [filter, setFilter] = useState<'all' | 'weekly' | 'school'>('all');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadLeaderboard();
  }, [filter]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      // For demo purposes, we'll use sample data
      const sampleUsers = getSampleUsers();
      setUsers(sampleUsers);
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

  const getSampleUsers = (): LeaderboardUser[] => {
    const sampleData = [
      { id: 1, name: 'Alexandra Chen', schoolId: 'east-high', points: 2850, streak: 15, weeklyPoints: 420, achievements: 12 },
      { id: 2, name: 'Marcus Johnson', schoolId: 'west-valley', points: 2720, streak: 12, weeklyPoints: 380, achievements: 10 },
      { id: 3, name: 'Emily Rodriguez', schoolId: 'north-central', points: 2650, streak: 18, weeklyPoints: 450, achievements: 11 },
      { id: 4, name: 'David Park', schoolId: 'south-ridge', points: 2580, streak: 9, weeklyPoints: 290, achievements: 9 },
      { id: 5, name: 'Sarah Williams', schoolId: 'central-academy', points: 2420, streak: 14, weeklyPoints: 360, achievements: 8 },
      { id: 6, name: 'James Thompson', schoolId: 'mountain-view', points: 2350, streak: 7, weeklyPoints: 250, achievements: 7 },
      { id: 7, name: 'Maya Patel', schoolId: 'riverside', points: 2280, streak: 11, weeklyPoints: 320, achievements: 9 },
      { id: 8, name: 'Connor Davis', schoolId: 'sunset-valley', points: 2210, streak: 6, weeklyPoints: 180, achievements: 6 },
      { id: 9, name: 'Olivia Garcia', schoolId: 'east-high', points: 2150, streak: 13, weeklyPoints: 340, achievements: 8 },
      { id: 10, name: 'Ryan Kim', schoolId: 'west-valley', points: 2080, streak: 5, weeklyPoints: 160, achievements: 5 },
    ];

    return sampleData.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
  };

  const getFilteredUsers = () => {
    let filtered = [...users];
    
    if (filter === 'weekly') {
      filtered.sort((a, b) => b.weeklyPoints - a.weeklyPoints);
    } else if (filter === 'school' && user?.schoolId) {
      filtered = filtered.filter(u => u.schoolId === user.schoolId);
    }
    
    return filtered;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="rank-icon gold" />;
      case 2: return <Trophy className="rank-icon silver" />;
      case 3: return <Medal className="rank-icon bronze" />;
      default: return <Award className="rank-icon default" />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="rank-badge gold">Champion</Badge>;
    if (rank === 2) return <Badge className="rank-badge silver">Runner-up</Badge>;
    if (rank === 3) return <Badge className="rank-badge bronze">Third Place</Badge>;
    if (rank <= 10) return <Badge className="rank-badge top10">Top 10</Badge>;
    return null;
  };

  const currentUser = users.find(u => u.name === user?.name);

  return (
    <PageLayout
      title="Leaderboard"
      subtitle="See how you stack up against other FBLA champions"
    >
      <div className="leaderboard-container">
        <div className="leaderboard-content">
          {/* Filter Controls */}
          <div className="filter-section">
            <StyledCard className="filter-card">
              <div className="card-content">
                <div className="filter-header">
                  <TrendingUp className="filter-icon" />
                  <h3 className="filter-title">View Rankings</h3>
                </div>
                <div className="filter-buttons">
                  <Button
                    onClick={() => setFilter('all')}
                    variant={filter === 'all' ? 'default' : 'outline'}
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    All Time
                  </Button>
                  <Button
                    onClick={() => setFilter('weekly')}
                    variant={filter === 'weekly' ? 'default' : 'outline'}
                    className={`filter-btn ${filter === 'weekly' ? 'active' : ''}`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    This Week
                  </Button>
                  <Button
                    onClick={() => setFilter('school')}
                    variant={filter === 'school' ? 'default' : 'outline'}
                    className={`filter-btn ${filter === 'school' ? 'active' : ''}`}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    My School
                  </Button>
                </div>
              </div>
            </StyledCard>
          </div>

          {/* Current User Stats */}
          {currentUser && (
            <div className="current-user-section">
              <StyledCard className="current-user-card" variant="primary">
                <div className="card-content">
                  <div className="user-header">
                    <div className="user-info">
                      <div className="user-avatar">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="user-details">
                        <h3 className="user-name">{currentUser.name}</h3>
                        <p className="user-school">{schools[currentUser.schoolId as keyof typeof schools]}</p>
                      </div>
                    </div>
                    <div className="user-rank">
                      {getRankIcon(currentUser.rank)}
                      <span className="rank-number">#{currentUser.rank}</span>
                    </div>
                  </div>
                  <div className="user-stats">
                    <div className="stat-item">
                      <span className="stat-value">{currentUser.points.toLocaleString()}</span>
                      <span className="stat-label">Total Points</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{currentUser.streak}</span>
                      <span className="stat-label">Day Streak</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{currentUser.weeklyPoints}</span>
                      <span className="stat-label">Weekly Points</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{currentUser.achievements}</span>
                      <span className="stat-label">Achievements</span>
                    </div>
                  </div>
                </div>
              </StyledCard>
            </div>
          )}

          {/* Leaderboard */}
          <div className="leaderboard-section">
            <StyledCard className="leaderboard-card">
              <div className="card-content">
                <div className="leaderboard-header">
                  <h3 className="leaderboard-title">
                    {filter === 'all' && 'All-Time Champions'}
                    {filter === 'weekly' && 'Weekly Leaders'}
                    {filter === 'school' && 'School Rankings'}
                  </h3>
                  <div className="leaderboard-count">
                    {getFilteredUsers().length} students
                  </div>
                </div>
                
                <div className="leaderboard-list">
                  {getFilteredUsers().map((user, index) => (
                    <div key={user.id} className={`leaderboard-item ${user.name === currentUser?.name ? 'current-user' : ''}`}>
                      <div className="item-rank">
                        {getRankIcon(index + 1)}
                        <span className="rank-number">#{index + 1}</span>
                      </div>
                      
                      <div className="item-user">
                        <div className="user-avatar">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="user-info">
                          <h4 className="user-name">{user.name}</h4>
                          <p className="user-school">{schools[user.schoolId as keyof typeof schools]}</p>
                        </div>
                      </div>
                      
                      <div className="item-stats">
                        <div className="stat-group">
                          <span className="stat-value primary">
                            {filter === 'weekly' ? user.weeklyPoints.toLocaleString() : user.points.toLocaleString()}
                          </span>
                          <span className="stat-label">
                            {filter === 'weekly' ? 'Weekly' : 'Points'}
                          </span>
                        </div>
                        <div className="stat-group">
                          <span className="stat-value">{user.streak}</span>
                          <span className="stat-label">Streak</span>
                        </div>
                        <div className="stat-group">
                          <span className="stat-value">{user.achievements}</span>
                          <span className="stat-label">Badges</span>
                        </div>
                      </div>
                      
                      <div className="item-badge">
                        {getRankBadge(index + 1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StyledCard>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}