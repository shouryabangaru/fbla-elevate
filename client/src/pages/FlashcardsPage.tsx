import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Flashcard } from '@shared/schema';

const events = [
  { id: 'business-law', name: 'Business Law' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'economics', name: 'Economics' },
  { id: 'accounting', name: 'Accounting' },
  { id: 'finance', name: 'Finance' },
];

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
      const q = query(collection(db, 'flashcards'), where('eventId', '==', selectedEvent));
      const querySnapshot = await getDocs(q);
      const cards: Flashcard[] = [];
      
      querySnapshot.forEach((doc) => {
        cards.push({ id: doc.id, ...doc.data() } as Flashcard);
      });

      if (cards.length === 0) {
        // Create sample flashcards if none exist
        const sampleCards = getSampleFlashcards(selectedEvent);
        setFlashcards(sampleCards);
      } else {
        setFlashcards(cards);
      }
      
      setCurrentIndex(0);
      setShowDefinition(false);
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
      'business-law': [
        { id: 1, eventId, term: 'Opportunity Cost', definition: 'The value of the next best alternative that is given up when making a choice. It represents the benefits an individual, investor, or business misses out on when choosing one alternative over another.', createdAt: new Date() },
        { id: 2, eventId, term: 'Supply and Demand', definition: 'The relationship between the quantity of a product available and the desire for that product. When supply exceeds demand, prices typically fall. When demand exceeds supply, prices typically rise.', createdAt: new Date() },
        { id: 3, eventId, term: 'Market Equilibrium', definition: 'The point at which supply and demand meet, resulting in a stable price for a product or service in the market.', createdAt: new Date() },
      ],
      'marketing': [
        { id: 1, eventId, term: 'Target Market', definition: 'A specific group of consumers at which a company aims its products and services. These consumers are the end users most likely to purchase a product.', createdAt: new Date() },
        { id: 2, eventId, term: 'Brand Positioning', definition: 'The process of positioning your brand in the mind of your customers relative to competing brands in the marketplace.', createdAt: new Date() },
        { id: 3, eventId, term: 'Customer Acquisition Cost', definition: 'The cost associated with convincing a consumer to buy a product or service, including research, marketing, and advertising costs.', createdAt: new Date() },
      ],
      'economics': [
        { id: 1, eventId, term: 'GDP', definition: 'Gross Domestic Product - the total monetary value of all finished goods and services produced within a country during a specific time period.', createdAt: new Date() },
        { id: 2, eventId, term: 'Inflation', definition: 'The rate at which the general level of prices for goods and services is rising, and purchasing power is falling.', createdAt: new Date() },
        { id: 3, eventId, term: 'Fiscal Policy', definition: 'The use of government spending and taxation to influence the economy.', createdAt: new Date() },
      ],
      'accounting': [
        { id: 1, eventId, term: 'Assets', definition: 'Resources owned by a business that have economic value and can be converted into cash or used to generate revenue.', createdAt: new Date() },
        { id: 2, eventId, term: 'Liabilities', definition: 'Debts or obligations that a company owes to external parties, such as loans, accounts payable, or accrued expenses.', createdAt: new Date() },
        { id: 3, eventId, term: 'Equity', definition: 'The residual interest in the assets of an entity after deducting liabilities, representing the owner\'s claim on the business.', createdAt: new Date() },
      ],
      'finance': [
        { id: 1, eventId, term: 'ROI', definition: 'Return on Investment - a measure of the efficiency of an investment, calculated as the gain or loss from an investment relative to its cost.', createdAt: new Date() },
        { id: 2, eventId, term: 'Compound Interest', definition: 'Interest calculated on the initial principal and also on the accumulated interest of previous periods of a deposit or loan.', createdAt: new Date() },
        { id: 3, eventId, term: 'Diversification', definition: 'The practice of spreading investments across various financial instruments, industries, and other categories to reduce risk.', createdAt: new Date() },
      ],
    };

    return samples[eventId as keyof typeof samples] || [];
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

  const toggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-fbla-blue mb-4">Flashcards</h1>
          <p className="text-gray-600 text-lg">Master key concepts with our interactive flashcard system</p>
        </div>

        {/* Event Selector */}
        <div className="mb-8">
          <label className="block text-fbla-blue font-semibold mb-2">Select Event:</label>
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-full md:w-96 mx-auto focus:ring-2 focus:ring-fbla-yellow focus:border-transparent">
              <SelectValue placeholder="Choose an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Flashcard Container */}
        <div className="max-w-2xl mx-auto">
          {!selectedEvent ? (
            <Card className="bg-gray-50 border-2 border-dashed border-gray-300 min-h-80 flex items-center justify-center">
              <CardContent className="text-center">
                <Layers className="text-fbla-blue w-16 h-16 mx-auto mb-4" />
                <p className="text-gray-600">Select an event to view flashcards</p>
              </CardContent>
            </Card>
          ) : loading ? (
            <Card className="bg-white shadow-lg min-h-80 flex items-center justify-center border-l-4 border-fbla-yellow">
              <CardContent className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbla-blue mx-auto mb-4"></div>
                <p className="text-gray-600">Loading flashcards...</p>
              </CardContent>
            </Card>
          ) : flashcards.length === 0 ? (
            <Card className="bg-white shadow-lg min-h-80 flex items-center justify-center border-l-4 border-fbla-yellow">
              <CardContent className="text-center">
                <p className="text-gray-600">No flashcards available for this event.</p>
              </CardContent>
            </Card>
          ) : (
            <Card 
              className="bg-white shadow-lg min-h-80 flex items-center justify-center border-l-4 border-fbla-yellow cursor-pointer hover:shadow-xl transition-shadow duration-200"
              onClick={toggleDefinition}
            >
              <CardContent className="text-center p-8">
                {!showDefinition ? (
                  <div>
                    <h3 className="text-2xl font-bold text-fbla-blue mb-4">{currentCard.term}</h3>
                    <p className="text-gray-600 text-lg">Click to reveal definition</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-fbla-blue mb-4">{currentCard.term}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{currentCard.definition}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Controls */}
          {flashcards.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <Button
                onClick={prevCard}
                disabled={currentIndex === 0}
                variant="outline"
                className="flex items-center px-6 py-3 bg-fbla-blue text-white border-fbla-blue hover:bg-blue-800 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <span className="text-gray-600 font-medium">
                Card {currentIndex + 1} of {flashcards.length}
              </span>
              
              <Button
                onClick={nextCard}
                disabled={currentIndex === flashcards.length - 1}
                variant="outline"
                className="flex items-center px-6 py-3 bg-fbla-blue text-white border-fbla-blue hover:bg-blue-800 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
