import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Users, Eye, Mic, Clock, Target } from 'lucide-react';

export default function PresentationTipsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-fbla-blue mb-4">Presentation Tips</h1>
          <p className="text-gray-600 text-lg">Master the art of presenting for FBLA competitive events</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Preparation Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Research your topic thoroughly and know it inside and out
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Create a clear outline with introduction, body, and conclusion
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Practice your presentation multiple times before the event
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Prepare for potential questions from judges
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Have backup materials ready in case of technical issues
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Audience Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Make eye contact with judges and audience members
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Use gestures and movement to emphasize key points
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Ask rhetorical questions to keep audience engaged
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Share relevant stories or examples to illustrate points
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Vary your tone and pace to maintain interest
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <Eye className="w-6 h-6 mr-2" />
                Visual Aids Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Keep slides clean and uncluttered with minimal text
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Use high-quality images and graphics
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Ensure text is large enough to read from the back of the room
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Use consistent fonts and color schemes
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Include charts and graphs to support your data
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <Mic className="w-6 h-6 mr-2" />
                Delivery Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Speak clearly and at an appropriate volume
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Control your pace - avoid rushing through material
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Use pauses effectively to emphasize important points
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Project confidence through your posture and voice
                </li>
                <li className="flex items-start">
                  <span className="text-fbla-yellow mr-2">•</span>
                  Practice breathing techniques to manage nerves
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Clock className="w-12 h-12 text-fbla-blue mx-auto mb-2" />
              <CardTitle className="text-fbla-blue">Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Most FBLA presentations have strict time limits. Practice with a timer to ensure you stay within bounds.</p>
              <Badge className="bg-fbla-yellow text-fbla-blue">Pro Tip</Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="w-12 h-12 text-fbla-blue mx-auto mb-2" />
              <CardTitle className="text-fbla-blue">Stay Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Stick to your main points and avoid going off on tangents. Every minute counts in competition.</p>
              <Badge className="bg-fbla-yellow text-fbla-blue">Essential</Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-fbla-blue mx-auto mb-2" />
              <CardTitle className="text-fbla-blue">Team Coordination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">For team presentations, practice smooth transitions and ensure everyone knows their role.</p>
              <Badge className="bg-fbla-yellow text-fbla-blue">Team Events</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-fbla-blue mb-4">Interactive Training Coming Soon!</h3>
            <p className="text-gray-600 mb-4">
              We're developing interactive presentation training modules with video examples, practice scenarios, and personalized feedback.
            </p>
            <p className="text-sm text-gray-500">
              Stay tuned for hands-on presentation skill development tools!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
