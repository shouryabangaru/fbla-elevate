import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Target, TrendingUp, Heart, Star, Rocket, BookOpen, Trophy } from 'lucide-react';
import './AboutUsPage.css';

export default function AboutUsPage() {
  return (
    <PageLayout
      title="About FBLA Elevate"
      subtitle="Empowering North Carolina FBLA students with championship-ready preparation tools"
    >
      <div className="about-container">
        <div className="about-content">
          {/* Mission Section */}
          <div className="mission-section">
            <StyledCard className="mission-card" variant="primary">
              <div className="card-content">
                <div className="mission-header">
                  <div className="mission-icon">
                    <Target className="w-12 h-12" />
                  </div>
                  <h2 className="mission-title">Our Mission</h2>
                </div>
                <p className="mission-text">
                  FBLA Elevate is dedicated to providing North Carolina FBLA students with the most comprehensive 
                  and effective preparation tools for competitive events. We believe every student deserves the 
                  opportunity to excel and reach their full potential in business leadership.
                </p>
                <div className="mission-stats">
                  <div className="stat-item">
                    <div className="stat-number">10,000+</div>
                    <div className="stat-label">Students Reached</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">25+</div>
                    <div className="stat-label">FBLA Events Covered</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">95%</div>
                    <div className="stat-label">Success Rate</div>
                  </div>
                </div>
              </div>
            </StyledCard>
          </div>

          {/* Features Grid */}
          <div className="features-section">
            <h2 className="section-title">What Makes FBLA Elevate Special</h2>
            <div className="features-grid">
              <StyledCard className="feature-card">
                <div className="card-content">
                  <div className="feature-icon">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">Interactive Flashcards</h3>
                  <p className="feature-description">
                    Master key concepts with our adaptive flashcard system that tracks your progress 
                    and focuses on areas that need improvement.
                  </p>
                  <Badge className="feature-badge">Study Tools</Badge>
                </div>
              </StyledCard>

              <StyledCard className="feature-card">
                <div className="card-content">
                  <div className="feature-icon">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">Practice Exams</h3>
                  <p className="feature-description">
                    Test your knowledge with realistic practice exams that simulate actual 
                    FBLA competitive event conditions and timing.
                  </p>
                  <Badge className="feature-badge">Assessment</Badge>
                </div>
              </StyledCard>

              <StyledCard className="feature-card">
                <div className="card-content">
                  <div className="feature-icon">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">Progress Tracking</h3>
                  <p className="feature-description">
                    Monitor your improvement with detailed analytics and personalized 
                    recommendations for optimal study strategies.
                  </p>
                  <Badge className="feature-badge">Analytics</Badge>
                </div>
              </StyledCard>

              <StyledCard className="feature-card">
                <div className="card-content">
                  <div className="feature-icon">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">Community Competition</h3>
                  <p className="feature-description">
                    Compete with fellow students on leaderboards and earn achievements 
                    to stay motivated throughout your preparation journey.
                  </p>
                  <Badge className="feature-badge">Social</Badge>
                </div>
              </StyledCard>

              <StyledCard className="feature-card">
                <div className="card-content">
                  <div className="feature-icon">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">Achievement System</h3>
                  <p className="feature-description">
                    Unlock badges and milestones as you progress, celebrating every 
                    step of your learning journey with meaningful rewards.
                  </p>
                  <Badge className="feature-badge">Gamification</Badge>
                </div>
              </StyledCard>

              <StyledCard className="feature-card">
                <div className="card-content">
                  <div className="feature-icon">
                    <Rocket className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">Expert Content</h3>
                  <p className="feature-description">
                    Access content curated by FBLA champions and business education 
                    experts to ensure you're learning the most relevant material.
                  </p>
                  <Badge className="feature-badge">Quality</Badge>
                </div>
              </StyledCard>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <StyledCard className="team-card">
              <div className="card-content">
                <div className="team-header">
                  <div className="team-icon">
                    <Heart className="w-10 h-10" />
                  </div>
                  <h2 className="team-title">Built by Students, for Students</h2>
                </div>
                <p className="team-description">
                  FBLA Elevate was created by passionate FBLA members who understand the challenges 
                  of preparing for competitive events. Our team consists of former state and national 
                  competitors who have experienced firsthand what it takes to succeed at the highest levels.
                </p>
                <div className="team-values">
                  <div className="value-item">
                    <Award className="value-icon" />
                    <div className="value-content">
                      <h4 className="value-title">Excellence</h4>
                      <p className="value-text">We strive for the highest quality in everything we create.</p>
                    </div>
                  </div>
                  <div className="value-item">
                    <Users className="value-icon" />
                    <div className="value-content">
                      <h4 className="value-title">Community</h4>
                      <p className="value-text">We believe in the power of collaborative learning and support.</p>
                    </div>
                  </div>
                  <div className="value-item">
                    <Rocket className="value-icon" />
                    <div className="value-content">
                      <h4 className="value-title">Innovation</h4>
                      <p className="value-text">We continuously evolve to meet the changing needs of FBLA students.</p>
                    </div>
                  </div>
                </div>
              </div>
            </StyledCard>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <StyledCard className="cta-card" variant="primary">
              <div className="card-content">
                <h2 className="cta-title">Ready to Elevate Your FBLA Performance?</h2>
                <p className="cta-description">
                  Join thousands of students who have already improved their competitive 
                  event performance with FBLA Elevate. Start your journey to success today.
                </p>
                <div className="cta-actions">
                  <button className="cta-button primary">
                    <Rocket className="w-5 h-5 mr-2" />
                    Get Started Now
                  </button>
                  <button className="cta-button secondary">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Learn More
                  </button>
                </div>
              </div>
            </StyledCard>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}