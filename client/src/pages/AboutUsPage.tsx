import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Trophy, Heart, GraduationCap, Star } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-fbla-blue mb-4">About FBLA Elevate</h1>
          <p className="text-gray-600 text-lg">Built for FBLA students, by FBLA students</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                FBLA Elevate is dedicated to empowering Future Business Leaders of America students to excel in competitive events through innovative preparation tools, collaborative learning, and comprehensive resources. We believe that every student deserves access to high-quality materials to succeed in their FBLA journey.
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-fbla-yellow">
            <CardHeader>
              <CardTitle className="text-fbla-blue flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We envision a future where FBLA students across the nation have equal access to cutting-edge preparation resources, creating a more competitive and skilled generation of business leaders. Our platform serves as a bridge between traditional learning and modern technology.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-br from-fbla-blue to-blue-800 text-white rounded-lg p-8 mb-12">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-fbla-yellow mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Why FBLA Elevate?</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Created as part of an NC FBLA Vice President campaign, FBLA Elevate represents our commitment to supporting fellow students in their competitive event preparation. We understand the challenges students face and have built solutions that truly make a difference.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <GraduationCap className="w-12 h-12 text-fbla-blue mx-auto mb-2" />
              <CardTitle className="text-fbla-blue">Student-Centered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Built by students who understand the unique challenges of FBLA competition preparation.
              </p>
              <Badge className="bg-fbla-yellow text-fbla-blue">For Students</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <Star className="w-12 h-12 text-fbla-blue mx-auto mb-2" />
              <CardTitle className="text-fbla-blue">Quality Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive study materials aligned with official FBLA competitive event guidelines.
              </p>
              <Badge className="bg-fbla-yellow text-fbla-blue">High Quality</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <Heart className="w-12 h-12 text-fbla-blue mx-auto mb-2" />
              <CardTitle className="text-fbla-blue">Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Fostering collaboration and healthy competition among FBLA students nationwide.
              </p>
              <Badge className="bg-fbla-yellow text-fbla-blue">Together</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-fbla-blue text-center">Features & Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-fbla-blue mb-2">📚 Interactive Flashcards</h4>
                <p className="text-gray-600 mb-4">Study key concepts with our dynamic flashcard system, organized by competitive event.</p>
                
                <h4 className="font-semibold text-fbla-blue mb-2">🏆 Competitive Leaderboards</h4>
                <p className="text-gray-600 mb-4">Track your progress and compete with students from schools across the nation.</p>
                
                <h4 className="font-semibold text-fbla-blue mb-2">🎯 Achievement System</h4>
                <p className="text-gray-600">Earn badges and track milestones as you progress through your FBLA journey.</p>
              </div>
              <div>
                <h4 className="font-semibold text-fbla-blue mb-2">❓ Practice Questions</h4>
                <p className="text-gray-600 mb-4">Test your knowledge with comprehensive practice questions for each competitive event.</p>
                
                <h4 className="font-semibold text-fbla-blue mb-2">🎤 Presentation Tips</h4>
                <p className="text-gray-600 mb-4">Master the art of presenting with expert tips and best practices.</p>
                
                <h4 className="font-semibold text-fbla-blue mb-2">🔐 Secure Authentication</h4>
                <p className="text-gray-600">Safe and secure login system with Google integration for easy access.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <h3 className="text-xl font-bold text-fbla-blue mb-4">Ready to Elevate Your FBLA Experience?</h3>
          <p className="text-gray-600">
            Join thousands of FBLA students who are already using FBLA Elevate to prepare for competitive events and achieve their goals.
          </p>
        </div>
      </div>
    </div>
  );
}
