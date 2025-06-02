
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Zap, Target, Shield, Globe } from 'lucide-react';
import ResumeBuilder from '@/components/ResumeBuilder';

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  if (showBuilder) {
    return <ResumeBuilder onBack={() => setShowBuilder(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ResumeForge</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ATS-Optimized
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Create Your Perfect Resume in
            <span className="text-blue-600"> Minutes</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Generate ATS-friendly resumes with AI-powered content suggestions, 
            industry-specific optimization, and professional templates.
          </p>
          <Button 
            onClick={() => setShowBuilder(true)}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Start Building Your Resume
            <Zap className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-blue-100 rounded-lg p-3 w-fit">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">ATS-Optimized</CardTitle>
              <CardDescription>
                Designed to pass Applicant Tracking Systems with optimized keywords and formatting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-green-100 rounded-lg p-3 w-fit">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Smart Suggestions</CardTitle>
              <CardDescription>
                AI-powered content recommendations based on your industry and job role
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-purple-100 rounded-lg p-3 w-fit">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Multiple Formats</CardTitle>
              <CardDescription>
                Export your resume as PDF, DOCX, or HTML with professional formatting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-orange-100 rounded-lg p-3 w-fit">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Privacy First</CardTitle>
              <CardDescription>
                Your data stays on your device with local storage - complete privacy guaranteed
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-red-100 rounded-lg p-3 w-fit">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Professional Templates</CardTitle>
              <CardDescription>
                Choose from 3 distinct templates with customization options for any industry
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-indigo-100 rounded-lg p-3 w-fit">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-xl">Cross-Platform</CardTitle>
              <CardDescription>
                Works seamlessly across all browsers and devices with responsive design
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've created winning resumes with ResumeForge
          </p>
          <Button 
            onClick={() => setShowBuilder(true)}
            size="lg" 
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-lg"
          >
            Get Started Now - It's Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
