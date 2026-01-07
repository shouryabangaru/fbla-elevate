"use client";

import { PageLayout } from '@/components/shared/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, FileText, Users, Lock, Mail, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <PageLayout title="Terms & Conditions" subtitle="Please read our terms carefully">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
            <p className="text-lg text-gray-600">
              Last updated: January 6, 2026
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Welcome to FBLA Elevate
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                These Terms and Conditions ("Terms") govern your use of the FBLA Elevate web application 
                ("Service"), operated by the FBLA Elevate team ("we," "us," or "our"). By creating an 
                account or using our Service, you agree to be bound by these Terms. If you do not agree 
                to these Terms, please do not use the Service.
              </p>
            </CardContent>
          </Card>

          {/* Section 1: Eligibility */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">1. Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>To use FBLA Elevate, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 13 years of age</li>
                <li>Be a current student, educator, or affiliated member of an FBLA chapter</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
              </ul>
              <p>
                If you are under 18, you represent that you have your parent's or guardian's permission 
                to use the Service. We may request verification of parental consent at any time.
              </p>
            </CardContent>
          </Card>

          {/* Section 2: Account Registration */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                2. Account Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>When you create an account, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Update your information to keep it accurate and complete</li>
                <li>Safeguard your password and restrict access to your account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or 
                contain false information.
              </p>
            </CardContent>
          </Card>

          {/* Section 3: Acceptable Use */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">3. Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Share your account credentials with others</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with or disrupt the Service or its servers</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Use automated systems (bots, scrapers) to access the Service</li>
                <li>Cheat or manipulate leaderboard rankings</li>
                <li>Copy, distribute, or modify any content without permission</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4: Privacy & Data */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                4. Privacy & Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>We collect and process the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, school affiliation</li>
                <li><strong>Usage Data:</strong> Study progress, quiz scores, achievements earned</li>
                <li><strong>Device Information:</strong> Browser type, IP address, device identifiers</li>
              </ul>
              <p>We use this information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve the Service</li>
                <li>Track your learning progress and achievements</li>
                <li>Display school and global leaderboards</li>
                <li>Send important updates about your account</li>
                <li>Ensure the security and integrity of the platform</li>
              </ul>
              <p>
                We do not sell your personal information to third parties. Your data may be shared 
                with service providers (e.g., hosting, analytics) who help us operate the Service.
              </p>
            </CardContent>
          </Card>

          {/* Section 5: Intellectual Property */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">5. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>
                All content on FBLA Elevate, including but not limited to text, graphics, logos, 
                images, flashcards, practice questions, and software, is the property of FBLA Elevate 
                or its content suppliers and is protected by intellectual property laws.
              </p>
              <p>
                You may use the content solely for your personal, non-commercial educational purposes 
                related to FBLA preparation. You may not reproduce, distribute, modify, or create 
                derivative works without our express written permission.
              </p>
              <p>
                FBLA Elevate is not officially affiliated with Future Business Leaders of America 
                (FBLA-PBL, Inc.). FBLA® is a registered trademark of FBLA-PBL, Inc.
              </p>
            </CardContent>
          </Card>

          {/* Section 6: User Content */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">6. User Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>
                Any content you submit, post, or display on the Service (such as profile information 
                or feedback) remains your property. However, by submitting content, you grant us a 
                worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display 
                such content in connection with operating and improving the Service.
              </p>
              <p>
                You are solely responsible for your content and represent that you have all necessary 
                rights to grant us this license.
              </p>
            </CardContent>
          </Card>

          {/* Section 7: Disclaimers */}
          <Card className="mb-6 shadow-md border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                7. Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>
                <strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF 
                ANY KIND, EXPRESS OR IMPLIED.</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  We do not guarantee that the content is complete, accurate, or up-to-date for 
                  current FBLA competition requirements
                </li>
                <li>
                  Using FBLA Elevate does not guarantee success in any FBLA competition
                </li>
                <li>
                  We are not responsible for any decisions made based on information provided by 
                  the Service
                </li>
                <li>
                  We do not guarantee uninterrupted or error-free access to the Service
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 8: Limitation of Liability */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, FBLA ELEVATE SHALL NOT BE LIABLE FOR ANY 
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT 
                NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, OR BUSINESS INTERRUPTION.
              </p>
              <p>
                Our total liability for any claim arising from your use of the Service shall not 
                exceed the amount you paid us (if any) in the twelve months preceding the claim.
              </p>
            </CardContent>
          </Card>

          {/* Section 9: Changes to Terms */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">9. Changes to These Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>
                We may update these Terms from time to time. When we do, we will revise the "Last 
                updated" date at the top of this page and, for significant changes, we will notify 
                you via email or a prominent notice on the Service.
              </p>
              <p>
                Your continued use of the Service after any changes constitutes acceptance of the 
                new Terms. If you do not agree to the updated Terms, you must stop using the Service.
              </p>
            </CardContent>
          </Card>

          {/* Section 10: Termination */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">10. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>
                You may terminate your account at any time by contacting us. We may suspend or 
                terminate your access to the Service at our sole discretion, without notice, for 
                conduct that we believe violates these Terms or is harmful to other users, us, or 
                third parties.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. Provisions 
                that should survive termination (such as intellectual property rights and limitation 
                of liability) will continue to apply.
              </p>
            </CardContent>
          </Card>

          {/* Section 11: Contact */}
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                11. Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p>
                If you have any questions about these Terms or the Service, please contact us at:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p><strong>FBLA Elevate Support</strong></p>
                <p>Email: support@fblaelevate.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Agreement Notice */}
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-700">
              By creating an account or using FBLA Elevate, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
