import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Target, TrendingUp } from 'lucide-react';

export default function PracticeQuestionsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-fbla-blue mb-4">Practice Questions</h1>
          <p className="text-gray-600 text-lg">Test your knowledge with interactive practice questions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Business Law
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Test your understanding of business law concepts including contracts, torts, and business ethics.</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  25 questions
                </span>
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  Intermediate
                </span>
              </div>
              <Button className="w-full bg-fbla-blue hover:bg-blue-800 text-white">
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Marketing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Practice marketing fundamentals including the 4 P's, market research, and consumer behavior.</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  30 questions
                </span>
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  Beginner
                </span>
              </div>
              <Button className="w-full bg-fbla-blue hover:bg-blue-800 text-white">
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Economics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Master economic principles including supply and demand, market structures, and macroeconomics.</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  35 questions
                </span>
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  Advanced
                </span>
              </div>
              <Button className="w-full bg-fbla-blue hover:bg-blue-800 text-white">
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Accounting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Practice accounting fundamentals including the accounting equation, financial statements, and ratios.</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  40 questions
                </span>
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  Intermediate
                </span>
              </div>
              <Button className="w-full bg-fbla-blue hover:bg-blue-800 text-white">
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Finance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Test your knowledge of personal finance, investment principles, and financial planning.</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  30 questions
                </span>
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  Intermediate
                </span>
              </div>
              <Button className="w-full bg-fbla-blue hover:bg-blue-800 text-white">
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Mixed Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Challenge yourself with questions from all FBLA competitive events in one comprehensive practice session.</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  50 questions
                </span>
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  All Levels
                </span>
              </div>
              <Button className="w-full bg-fbla-blue hover:bg-blue-800 text-white">
                Start Practice
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-fbla-blue mb-4">Coming Soon!</h3>
              <p className="text-gray-600 mb-4">
                Interactive practice questions with detailed explanations and adaptive learning technology are currently in development.
              </p>
              <p className="text-sm text-gray-500">
                Check back soon for the full practice question experience!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
