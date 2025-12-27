"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { PageLayout } from '@/components/shared/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Search, 
  X, 
  Sparkles,
  ArrowRight,
  Clock,
  Flame,
  Check,
  Command
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import './FlashcardsPage.css';

const events = [
  { id: 'accounting', name: 'Accounting', icon: '📊', category: 'Finance' },
  { id: 'advanced-accounting', name: 'Advanced Accounting', icon: '🧮', category: 'Finance' },
  { id: 'advertising', name: 'Advertising', icon: '📢', category: 'Marketing' },
  { id: 'agribusiness', name: 'Agribusiness', icon: '🌾', category: 'Business' },
  { id: 'banking-financial-systems', name: 'Banking & Financial Systems', icon: '🏦', category: 'Finance' },
  { id: 'business-communication', name: 'Business Communication', icon: '💬', category: 'Communication' },
  { id: 'business-law', name: 'Business Law', icon: '⚖️', category: 'Law' },
  { id: 'business-management', name: 'Business Management', icon: '📋', category: 'Management' },
  { id: 'computer-problem-solving', name: 'Computer Problem Solving', icon: '💻', category: 'Technology' },
  { id: 'customer-service', name: 'Customer Service', icon: '🤝', category: 'Business' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒', category: 'Technology' },
  { id: 'data-science-ai', name: 'Data Science & AI', icon: '🤖', category: 'Technology' },
  { id: 'economics', name: 'Economics', icon: '💰', category: 'Finance' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', icon: '🚀', category: 'Business' },
  { id: 'healthcare-administration', name: 'Healthcare Administration', icon: '🏥', category: 'Healthcare' },
  { id: 'hospitality-event-management', name: 'Hospitality & Event Management', icon: '🎉', category: 'Hospitality' },
  { id: 'human-resource-management', name: 'Human Resource Management', icon: '👥', category: 'Management' },
  { id: 'insurance-risk-management', name: 'Insurance & Risk Management', icon: '🛡️', category: 'Finance' },
  { id: 'international-business', name: 'International Business', icon: '🌍', category: 'Business' },
  { id: 'intro-business-communication', name: 'Introduction to Business Communication', icon: '📝', category: 'Intro' },
  { id: 'intro-business-concepts', name: 'Introduction to Business Concepts', icon: '💡', category: 'Intro' },
  { id: 'intro-business-procedures', name: 'Introduction to Business Procedures', icon: '📄', category: 'Intro' },
  { id: 'intro-fbla', name: 'Introduction to FBLA', icon: '🏆', category: 'Intro' },
  { id: 'intro-information-technology', name: 'Introduction to Information Technology', icon: '💾', category: 'Intro' },
  { id: 'intro-marketing-concepts', name: 'Introduction to Marketing Concepts', icon: '📈', category: 'Intro' },
  { id: 'intro-parliamentary-procedure', name: 'Introduction to Parliamentary Procedure', icon: '🗳️', category: 'Intro' },
  { id: 'intro-retail-merchandising', name: 'Introduction to Retail & Merchandising', icon: '🛍️', category: 'Intro' },
  { id: 'intro-supply-chain-management', name: 'Introduction to Supply Chain Management', icon: '🚚', category: 'Intro' },
  { id: 'journalism', name: 'Journalism', icon: '📰', category: 'Communication' },
  { id: 'management-information-systems', name: 'Management Information Systems', icon: '📊', category: 'Technology' },
  { id: 'marketing', name: 'Marketing', icon: '📈', category: 'Marketing' },
  { id: 'network-design', name: 'Network Design', icon: '🔗', category: 'Technology' },
  { id: 'networking-infrastructures', name: 'Networking Infrastructures', icon: '🌐', category: 'Technology' },
  { id: 'organizational-leadership', name: 'Organizational Leadership', icon: '👔', category: 'Management' },
  { id: 'parliamentary-procedure', name: 'Parliamentary Procedure', icon: '🗳️', category: 'Communication' },
  { id: 'personal-finance', name: 'Personal Finance', icon: '💳', category: 'Finance' },
  { id: 'project-management', name: 'Project Management', icon: '📅', category: 'Management' },
  { id: 'public-administration-management', name: 'Public Administration & Management', icon: '🏛️', category: 'Management' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏠', category: 'Business' },
  { id: 'retail-management', name: 'Retail Management', icon: '🏪', category: 'Business' },
  { id: 'securities-investments', name: 'Securities & Investments', icon: '📈', category: 'Finance' },
  { id: 'sports-entertainment-management', name: 'Sports & Entertainment Management', icon: '🎭', category: 'Business' },
  { id: 'technology-support-services', name: 'Technology Support & Services', icon: '🔧', category: 'Technology' }
];

interface Flashcard {
  id: number;
  eventId: string;
  term: string;
  definition: string;
  createdAt: Date;
}

export default function FlashcardsPage() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedEvent) {
      loadFlashcards();
    }
  }, [selectedEvent]);

  const loadFlashcards = async () => {
    setLoading(true);
    try {
      const sampleCards = getSampleFlashcards(selectedEvent);
      setFlashcards(sampleCards);
      setCurrentIndex(0);
      setShowDefinition(false);
      setMasteredCards([]);
      
      toast({
        title: "Ready to Study!",
        description: `${sampleCards.length} cards loaded for ${events.find(e => e.id === selectedEvent)?.name}`,
      });
    } catch (error) {
      console.error('Error loading flashcards:', error);
      toast({
        title: 'Error',
        description: 'Failed to load flashcards. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getSampleFlashcards = (eventId: string): Flashcard[] => {
    const samples: { [key: string]: Flashcard[] } = {
      'accounting': [
        { id: 1, eventId, term: 'Balance Sheet', definition: 'A financial statement that shows a company\'s assets, liabilities, and shareholder equity at a specific point in time.', createdAt: new Date() },
        { id: 2, eventId, term: 'Double-Entry Bookkeeping', definition: 'A method of bookkeeping in which every transaction is recorded in at least two accounts.', createdAt: new Date() },
        { id: 3, eventId, term: 'Revenue', definition: 'The total amount of income generated by a business from its operations.', createdAt: new Date() },
        { id: 4, eventId, term: 'Depreciation', definition: 'The reduction in value of an asset over time, particularly due to wear and tear.', createdAt: new Date() },
        { id: 5, eventId, term: 'Cash Flow', definition: 'The net amount of cash and cash equivalents being transferred into and out of a business.', createdAt: new Date() },
      ],
      'business-law': [
        { id: 1, eventId, term: 'Contract', definition: 'A legally binding agreement between two or more parties that creates mutual obligations enforceable by law.', createdAt: new Date() },
        { id: 2, eventId, term: 'Tort', definition: 'A civil wrong that causes harm to another person or their property, resulting in legal liability.', createdAt: new Date() },
        { id: 3, eventId, term: 'Intellectual Property', definition: 'Creations of the mind: inventions, literary works, designs, symbols, names, and images used in commerce.', createdAt: new Date() },
        { id: 4, eventId, term: 'Breach of Contract', definition: 'A violation of any agreed-upon terms and conditions of a binding contract.', createdAt: new Date() },
        { id: 5, eventId, term: 'Negligence', definition: 'Failure to exercise the care that a reasonably prudent person would exercise in like circumstances.', createdAt: new Date() },
      ],
      'marketing': [
        { id: 1, eventId, term: 'Target Market', definition: 'A specific group of consumers at which a company aims its products and services.', createdAt: new Date() },
        { id: 2, eventId, term: 'Brand Positioning', definition: 'The process of positioning your brand in the mind of your customers relative to competing brands.', createdAt: new Date() },
        { id: 3, eventId, term: 'Marketing Mix (4 Ps)', definition: 'Product, Price, Place, and Promotion - the four key elements of marketing strategy.', createdAt: new Date() },
        { id: 4, eventId, term: 'Customer Segmentation', definition: 'The practice of dividing a customer base into groups of individuals with similar characteristics.', createdAt: new Date() },
        { id: 5, eventId, term: 'Value Proposition', definition: 'A statement that explains what benefit you provide for whom and how you do it uniquely well.', createdAt: new Date() },
      ],
      'economics': [
        { id: 1, eventId, term: 'Opportunity Cost', definition: 'The value of the next best alternative that is given up when making a choice.', createdAt: new Date() },
        { id: 2, eventId, term: 'Supply and Demand', definition: 'The relationship between the quantity of a product available and the desire for that product.', createdAt: new Date() },
        { id: 3, eventId, term: 'Market Equilibrium', definition: 'The point at which supply and demand meet, resulting in a stable price for a product.', createdAt: new Date() },
        { id: 4, eventId, term: 'GDP', definition: 'Gross Domestic Product - the total value of all goods and services produced in a country.', createdAt: new Date() },
        { id: 5, eventId, term: 'Inflation', definition: 'The rate at which the general level of prices for goods and services is rising.', createdAt: new Date() },
      ],
      'entrepreneurship': [
        { id: 1, eventId, term: 'Business Model', definition: 'A plan for the successful operation of a business, identifying revenue sources and target customers.', createdAt: new Date() },
        { id: 2, eventId, term: 'Venture Capital', definition: 'Financing provided to startups and small businesses with perceived long-term growth potential.', createdAt: new Date() },
        { id: 3, eventId, term: 'Bootstrapping', definition: 'Building a company from personal finances or operating revenues without external investment.', createdAt: new Date() },
        { id: 4, eventId, term: 'Pivot', definition: 'A fundamental change in business strategy to test a new approach about a product or business model.', createdAt: new Date() },
        { id: 5, eventId, term: 'MVP', definition: 'Minimum Viable Product - a version of a product with just enough features to satisfy early customers.', createdAt: new Date() },
      ],
      'personal-finance': [
        { id: 1, eventId, term: 'Emergency Fund', definition: 'A cash reserve specifically set aside for unplanned expenses or financial emergencies.', createdAt: new Date() },
        { id: 2, eventId, term: 'Credit Score', definition: 'A numerical expression of creditworthiness based on credit files and credit history.', createdAt: new Date() },
        { id: 3, eventId, term: '401(k)', definition: 'An employer-sponsored retirement savings plan that allows employees to contribute pre-tax dollars.', createdAt: new Date() },
        { id: 4, eventId, term: 'Compound Interest', definition: 'Interest calculated on the initial principal and also on the accumulated interest from previous periods.', createdAt: new Date() },
        { id: 5, eventId, term: 'Net Worth', definition: 'The value of all assets minus the total of all liabilities.', createdAt: new Date() },
      ],
      'cybersecurity': [
        { id: 1, eventId, term: 'Firewall', definition: 'A network security device that monitors and filters incoming and outgoing network traffic.', createdAt: new Date() },
        { id: 2, eventId, term: 'Phishing', definition: 'A type of social engineering attack used to steal user data, including login credentials and credit card numbers.', createdAt: new Date() },
        { id: 3, eventId, term: 'Encryption', definition: 'The process of converting information or data into a code to prevent unauthorized access.', createdAt: new Date() },
        { id: 4, eventId, term: 'Malware', definition: 'Malicious software designed to disrupt, damage, or gain unauthorized access to computer systems.', createdAt: new Date() },
        { id: 5, eventId, term: 'Two-Factor Authentication', definition: 'A security process that requires two different authentication factors to verify identity.', createdAt: new Date() },
      ],
      'business-management': [
        { id: 1, eventId, term: 'Strategic Planning', definition: 'The process of defining an organization\'s strategy and making decisions on allocating resources.', createdAt: new Date() },
        { id: 2, eventId, term: 'SWOT Analysis', definition: 'A strategic planning technique to evaluate Strengths, Weaknesses, Opportunities, and Threats.', createdAt: new Date() },
        { id: 3, eventId, term: 'Organizational Chart', definition: 'A diagram that shows the structure of an organization and the relationships between different positions.', createdAt: new Date() },
        { id: 4, eventId, term: 'Key Performance Indicators', definition: 'Measurable values that demonstrate how effectively a company is achieving key business objectives.', createdAt: new Date() },
        { id: 5, eventId, term: 'Delegation', definition: 'The assignment of responsibility and authority to another person to carry out specific activities.', createdAt: new Date() },
      ],
    };
    return samples[eventId] || [
      { id: 1, eventId, term: 'Coming Soon', definition: 'Flashcards for this event are being developed. Check back soon!', createdAt: new Date() }
    ];
  };

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowDefinition(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowDefinition(false);
    }
  };

  const flipCard = () => {
    setShowDefinition(!showDefinition);
  };

  const markAsMastered = () => {
    if (!masteredCards.includes(currentIndex)) {
      setMasteredCards([...masteredCards, currentIndex]);
      toast({
        title: "Card Mastered! 🎉",
        description: "Great job! Keep up the momentum.",
      });
    }
    nextCard();
  };

  const resetProgress = () => {
    setCurrentIndex(0);
    setShowDefinition(false);
    setMasteredCards([]);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (flashcards.length === 0) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
          setShowDefinition(false);
        }
        break;
      case 'ArrowRight':
        if (currentIndex < flashcards.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setShowDefinition(false);
        }
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        setShowDefinition(prev => !prev);
        break;
    }
  }, [currentIndex, flashcards.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentCard = flashcards[currentIndex];
  const progressPercent = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;
  const masteryPercent = flashcards.length > 0 ? (masteredCards.length / flashcards.length) * 100 : 0;

  return (
    <PageLayout
      title="Flashcards"
      subtitle="Master FBLA concepts with interactive study cards"
    >
      <div className="fc-page">
        {/* Left Panel - Event Selection */}
        <aside className="fc-sidebar">
          <div className="fc-sidebar-header">
            <div className="fc-sidebar-title">
              <BookOpen className="w-5 h-5" />
              <span>Study Topics</span>
            </div>
            <span className="fc-event-count">{events.length} Events</span>
          </div>

          {/* Search */}
          <div className="fc-search" ref={searchContainerRef}>
            <Search className="fc-search-icon" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="fc-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="fc-search-clear">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Event List */}
          <div className="fc-event-list">
            {filteredEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event.id);
                  setSearchQuery('');
                }}
                className={`fc-event-item ${selectedEvent === event.id ? 'active' : ''}`}
              >
                <span className="fc-event-icon">{event.icon}</span>
                <div className="fc-event-info">
                  <span className="fc-event-name">{event.name}</span>
                  <span className="fc-event-category">{event.category}</span>
                </div>
                {selectedEvent === event.id && (
                  <ArrowRight className="fc-event-arrow" />
                )}
              </button>
            ))}
            
            {filteredEvents.length === 0 && (
              <div className="fc-no-results">
                <Search className="w-8 h-8 mb-3 opacity-40" />
                <p>No events found</p>
                <span>Try a different search term</span>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="fc-main">
          {!selectedEvent ? (
            /* Empty State */
            <div className="fc-empty">
              <div className="fc-empty-icon">
                <Sparkles className="w-12 h-12" />
              </div>
              <h2>Select an Event to Start</h2>
              <p>Choose a topic from the sidebar to begin studying flashcards</p>
              <div className="fc-empty-features">
                <div className="fc-empty-feature">
                  <Command className="w-5 h-5" />
                  <span>Keyboard shortcuts for fast navigation</span>
                </div>
                <div className="fc-empty-feature">
                  <Flame className="w-5 h-5" />
                  <span>Track your mastery progress</span>
                </div>
                <div className="fc-empty-feature">
                  <Clock className="w-5 h-5" />
                  <span>Study at your own pace</span>
                </div>
              </div>
            </div>
          ) : loading ? (
            /* Loading State */
            <div className="fc-loading">
              <div className="fc-loading-spinner"></div>
              <p>Loading flashcards...</p>
            </div>
          ) : flashcards.length === 0 ? (
            /* No Cards State */
            <div className="fc-empty">
              <div className="fc-empty-icon">
                <BookOpen className="w-12 h-12" />
              </div>
              <h2>No Flashcards Available</h2>
              <p>Flashcards for this event are coming soon!</p>
            </div>
          ) : (
            /* Study Area */
            <>
              {/* Stats Bar */}
              <div className="fc-stats">
                <div className="fc-stat">
                  <div className="fc-stat-value">{currentIndex + 1}/{flashcards.length}</div>
                  <div className="fc-stat-label">Progress</div>
                </div>
                <div className="fc-stat">
                  <div className="fc-stat-value">{masteredCards.length}</div>
                  <div className="fc-stat-label">Mastered</div>
                </div>
                <div className="fc-stat">
                  <div className="fc-stat-value">{flashcards.length - masteredCards.length}</div>
                  <div className="fc-stat-label">Remaining</div>
                </div>
                <button onClick={resetProgress} className="fc-reset-btn">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Progress Bar */}
              <div className="fc-progress-container">
                <div className="fc-progress-bar">
                  <div 
                    className="fc-progress-fill" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="fc-mastery-bar">
                  <div 
                    className="fc-mastery-fill" 
                    style={{ width: `${masteryPercent}%` }}
                  />
                </div>
              </div>

              {/* Card Indicators */}
              <div className="fc-card-indicators">
                {flashcards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowDefinition(false);
                    }}
                    className={`fc-indicator ${idx === currentIndex ? 'active' : ''} ${masteredCards.includes(idx) ? 'mastered' : ''}`}
                  />
                ))}
              </div>

              {/* Flashcard */}
              <div className="fc-card-container" onClick={flipCard}>
                <div className={`fc-card ${showDefinition ? 'flipped' : ''}`}>
                  <div className="fc-card-inner">
                    {/* Front */}
                    <div className="fc-card-front">
                      <div className="fc-card-badge">
                        <span>TERM</span>
                      </div>
                      <h2 className="fc-card-term">{currentCard?.term}</h2>
                      <div className="fc-card-action">
                        <span>Tap to reveal definition</span>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="fc-card-back">
                      <div className="fc-card-badge definition">
                        <span>DEFINITION</span>
                      </div>
                      <p className="fc-card-definition">{currentCard?.definition}</p>
                      <div className="fc-card-action">
                        <span>Tap to see term</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="fc-nav">
                <Button
                  onClick={prevCard}
                  disabled={currentIndex === 0}
                  className="fc-nav-btn"
                  variant="outline"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </Button>

                <Button
                  onClick={markAsMastered}
                  className="fc-mastered-btn"
                  disabled={masteredCards.includes(currentIndex)}
                >
                  <Check className="w-5 h-5" />
                  <span>{masteredCards.includes(currentIndex) ? 'Mastered!' : 'Mark as Mastered'}</span>
                </Button>

                <Button
                  onClick={nextCard}
                  disabled={currentIndex === flashcards.length - 1}
                  className="fc-nav-btn"
                  variant="outline"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Keyboard Hints */}
              <div className="fc-shortcuts">
                <div className="fc-shortcut">
                  <kbd>←</kbd>
                  <span>Previous</span>
                </div>
                <div className="fc-shortcut">
                  <kbd>Space</kbd>
                  <span>Flip</span>
                </div>
                <div className="fc-shortcut">
                  <kbd>→</kbd>
                  <span>Next</span>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </PageLayout>
  );
}
