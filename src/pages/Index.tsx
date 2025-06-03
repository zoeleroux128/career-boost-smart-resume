
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Zap, Target, Shield, Globe, Star, CheckCircle, Users, TrendingUp } from 'lucide-react';
import ResumeBuilder from '@/components/ResumeBuilder';

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  if (showBuilder) {
    return <ResumeBuilder onBack={() => setShowBuilder(false)} />;
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Compact Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-1.5">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">ResumeAI-Builder</h1>
                <p className="text-xs text-gray-400 font-medium">Professional Resume Builder</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-300 border-emerald-600 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                ATS-Optimized
              </Badge>
              <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-600 text-xs">
                <Star className="h-3 w-3 mr-1" />
                Free
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Hero Section - Compact */}
        <section className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-xs font-medium mb-3">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trusted by 50,000+ professionals
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              Build Your Perfect Resume in
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Minutes</span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed max-w-2xl mx-auto">
              Create ATS-friendly resumes with AI-powered content suggestions and professional templates
            </p>
            
            <Button 
              onClick={() => setShowBuilder(true)}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-base font-semibold shadow-lg"
            >
              Start Building Your Resume
              <Zap className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Features Grid - Scrollable */}
        <section className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Everything You Need
              </h3>
              <p className="text-sm text-gray-300 max-w-xl mx-auto">
                Comprehensive tools for creating standout resumes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-lg p-3 w-fit mb-2">
                    <Target className="h-5 w-5 text-blue-400" />
                  </div>
                  <CardTitle className="text-base font-bold text-white">ATS-Optimized</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Templates designed to pass Applicant Tracking Systems
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 rounded-lg p-3 w-fit mb-2">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <CardTitle className="text-base font-bold text-white">AI-Powered</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Smart content recommendations based on your industry
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-lg p-3 w-fit mb-2">
                    <Download className="h-5 w-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-base font-bold text-white">Multiple Formats</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Export as PDF, DOCX, or HTML with perfect formatting
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 rounded-lg p-3 w-fit mb-2">
                    <Shield className="h-5 w-5 text-orange-400" />
                  </div>
                  <CardTitle className="text-base font-bold text-white">Privacy First</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Your data stays secure on your device - complete privacy
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-lg p-3 w-fit mb-2">
                    <FileText className="h-5 w-5 text-red-400" />
                  </div>
                  <CardTitle className="text-base font-bold text-white">Professional</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Expertly designed templates for any industry
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/50 rounded-lg p-3 w-fit mb-2">
                    <Globe className="h-5 w-5 text-indigo-400" />
                  </div>
                  <CardTitle className="text-base font-bold text-white">Universal</CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    Works seamlessly across all browsers and devices
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Compact CTA */}
            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-xl p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-sm text-blue-100 mb-4">
                  Create your winning resume in minutes
                </p>
                <Button 
                  onClick={() => setShowBuilder(true)}
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-2 font-semibold"
                >
                  Get Started - It's Free
                  <Star className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-blue-200 mt-2">
                  ✓ No signup required ✓ Export instantly
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
