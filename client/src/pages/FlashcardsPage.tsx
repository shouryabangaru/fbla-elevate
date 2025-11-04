"use client";

import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, Trophy, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import './FlashcardsPage.css';

const events = [
  { id: 'accounting', name: 'Accounting', icon: '📊' },
  { id: 'advanced-accounting', name: 'Advanced Accounting', icon: '🧮' },
  { id: 'advertising', name: 'Advertising', icon: '📢' },
  { id: 'agribusiness', name: 'Agribusiness', icon: '🌾' },
  { id: 'banking-financial-systems', name: 'Banking & Financial Systems', icon: '🏦' },
  { id: 'business-communication', name: 'Business Communication', icon: '💬' },
  { id: 'business-law', name: 'Business Law', icon: '⚖️' },
  { id: 'business-management', name: 'Business Management', icon: '📋' },
  { id: 'computer-problem-solving', name: 'Computer Problem Solving', icon: '💻' },
  { id: 'customer-service', name: 'Customer Service', icon: '🤝' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
  { id: 'data-science-ai', name: 'Data Science & AI', icon: '🤖' },
  { id: 'economics', name: 'Economics', icon: '💰' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', icon: '🚀' },
  { id: 'healthcare-administration', name: 'Healthcare Administration', icon: '🏥' },
  { id: 'hospitality-event-management', name: 'Hospitality & Event Management', icon: '🎉' },
  { id: 'human-resource-management', name: 'Human Resource Management', icon: '👥' },
  { id: 'insurance-risk-management', name: 'Insurance & Risk Management', icon: '🛡️' },
  { id: 'international-business', name: 'International Business', icon: '🌍' },
  { id: 'intro-business-communication', name: 'Introduction to Business Communication (9-10)', icon: '📝' },
  { id: 'intro-business-concepts', name: 'Introduction to Business Concepts (9-10)', icon: '💡' },
  { id: 'intro-business-procedures', name: 'Introduction to Business Procedures (9-10)', icon: '📄' },
  { id: 'intro-fbla', name: 'Introduction to FBLA (9-10)', icon: '🏆' },
  { id: 'intro-information-technology', name: 'Introduction to Information Technology (9-10)', icon: '💾' },
  { id: 'intro-marketing-concepts', name: 'Introduction to Marketing Concepts (9-10)', icon: '📈' },
  { id: 'intro-parliamentary-procedure', name: 'Introduction to Parliamentary Procedure (9-10)', icon: '🗳️' },
  { id: 'intro-retail-merchandising', name: 'Introduction to Retail & Merchandising (9-10)', icon: '🛍️' },
  { id: 'intro-supply-chain-management', name: 'Introduction to Supply Chain Management (9-10)', icon: '🚚' },
  { id: 'journalism', name: 'Journalism', icon: '📰' },
  { id: 'management-information-systems', name: 'Management Information Systems', icon: '📊' },
  { id: 'marketing', name: 'Marketing', icon: '📈' },
  { id: 'network-design', name: 'Network Design', icon: '🔗' },
  { id: 'networking-infrastructures', name: 'Networking Infrastructures', icon: '🌐' },
  { id: 'organizational-leadership', name: 'Organizational Leadership', icon: '👔' },
  { id: 'parliamentary-procedure', name: 'Parliamentary Procedure', icon: '🗳️' },
  { id: 'personal-finance', name: 'Personal Finance', icon: '💳' },
  { id: 'project-management', name: 'Project Management', icon: '📅' },
  { id: 'public-administration-management', name: 'Public Administration & Management', icon: '🏛️' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏠' },
  { id: 'retail-management', name: 'Retail Management', icon: '🏪' },
  { id: 'securities-investments', name: 'Securities & Investments', icon: '📈' },
  { id: 'sports-entertainment-management', name: 'Sports & Entertainment Management', icon: '🎭' },
  { id: 'technology-support-services', name: 'Technology Support & Services', icon: '🔧' }
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
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedEvent) {
      loadFlashcards();
    }
  }, [selectedEvent]);

  const loadFlashcards = async () => {
    setLoading(true);
    try {
      // For demo purposes, we'll use sample flashcards
      const sampleCards = getSampleFlashcards(selectedEvent);
      setFlashcards(sampleCards);
      setCurrentIndex(0);
      setShowDefinition(false);
      
      toast({
        title: "Flashcards Loaded",
        description: `${sampleCards.length} flashcards loaded for ${events.find(e => e.id === selectedEvent)?.name}`,
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
    const samples = {
      'accounting': [
        { id: 1, eventId, term: 'Balance Sheet', definition: 'A financial statement that shows a company\'s assets, liabilities, and shareholder equity at a specific point in time.', createdAt: new Date() },
        { id: 2, eventId, term: 'Double-Entry Bookkeeping', definition: 'A method of bookkeeping in which every transaction is recorded in at least two accounts.', createdAt: new Date() },
        { id: 3, eventId, term: 'Revenue', definition: 'The total amount of income generated by a business from its operations.', createdAt: new Date() },
        { id: 4, eventId, term: 'Depreciation', definition: 'The reduction in value of an asset over time, particularly due to wear and tear.', createdAt: new Date() },
        { id: 5, eventId, term: 'Cash Flow', definition: 'The net amount of cash and cash equivalents being transferred into and out of a business.', createdAt: new Date() },
      ],
      'business-law': [
        { id: 1, eventId, term: 'Contract', definition: 'A legally binding agreement between two or more parties that creates mutual obligations enforceable by law.', createdAt: new Date() },
        { id: 2, eventId, term: 'Tort', definition: 'A civil wrong that causes harm to another person or their property, resulting in legal liability for the person who commits the tortious act.', createdAt: new Date() },
        { id: 3, eventId, term: 'Intellectual Property', definition: 'Creations of the mind, such as inventions, literary and artistic works, designs, symbols, names, and images used in commerce.', createdAt: new Date() },
        { id: 4, eventId, term: 'Breach of Contract', definition: 'A violation of any of the agreed-upon terms and conditions of a binding contract.', createdAt: new Date() },
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
        { id: 1, eventId, term: 'Emergency Fund', definition: 'A cash reserve that is specifically set aside for unplanned expenses or financial emergencies.', createdAt: new Date() },
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
    return samples[eventId as keyof typeof samples] || [
      { id: 1, eventId, term: 'Coming Soon', definition: 'Flashcards for this event are being developed. Check back later for study materials!', createdAt: new Date() }
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

  const resetProgress = () => {
    setCurrentIndex(0);
    setShowDefinition(false);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <PageLayout
      title="Interactive Flashcards"
      subtitle="Master FBLA concepts with our adaptive learning system"
    >
      <div className="flashcards-container">
        <div className="flashcards-content">
          {/* Event Selection */}
          <div className="event-selection">
            <StyledCard className="selection-card">
              <div className="card-content">
                <div className="card-header">
                  <BookOpen className="card-icon-inline" />
                  <h3 className="card-title">Choose Your Event</h3>
                </div>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger className="event-select">
                    <SelectValue placeholder="Select an FBLA event to study" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        <div className="event-option">
                          <span className="event-icon">{event.icon}</span>
                          <span className="event-name">{event.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </StyledCard>
          </div>

          {/* Flashcard Study Area */}
          {selectedEvent && flashcards.length > 0 && currentCard && (
            <div className="study-area">
              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-info">
                  <div className="progress-stats">
                    <span className="progress-text">
                      Card {currentIndex + 1} of {flashcards.length}
                    </span>
                    <div className="progress-actions">
                      <Button
                        onClick={resetProgress}
                        variant="outline"
                        size="sm"
                        className="reset-button"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Flashcard */}
              <div className="flashcard-section">
                <StyledCard className="flashcard-wrapper">
                  <div className={`flashcard ${showDefinition ? 'flipped' : ''}`}>
                    <div className="flashcard-inner">
                      <div className="flashcard-front">
                        <div className="card-type">
                          <Layers className="w-5 h-5 mr-2" />
                          <span>Term</span>
                        </div>
                        <h2 className="flashcard-term">{currentCard?.term}</h2>
                        <p className="flashcard-hint">Click to reveal definition</p>
                      </div>
                      
                      <div className="flashcard-back">
                        <div className="card-type">
                          <Trophy className="w-5 h-5 mr-2" />
                          <span>Definition</span>
                        </div>
                        <p className="flashcard-definition">{currentCard?.definition}</p>
                      </div>
                    </div>
                  </div>
                </StyledCard>
              </div>

              {/* Navigation Controls */}
              <div className="navigation-controls">
                <Button
                  onClick={prevCard}
                  disabled={currentIndex === 0}
                  className="nav-button prev"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={flipCard}
                  className="flip-button"
                  variant="outline"
                >
                  {showDefinition ? 'Show Term' : 'Show Definition'}
                </Button>

                <Button
                  onClick={nextCard}
                  disabled={currentIndex === flashcards.length - 1}
                  className="nav-button next"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {selectedEvent && flashcards.length === 0 && (
            <div className="empty-state">
              <StyledCard className="empty-card">
                <div className="card-content">
                  <BookOpen className="empty-icon" />
                  <h3 className="empty-title">No Flashcards Available</h3>
                  <p className="empty-description">
                    Flashcards for this event are coming soon. Check back later!
                  </p>
                </div>
              </StyledCard>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}