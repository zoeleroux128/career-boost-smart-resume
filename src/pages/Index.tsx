
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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-2.5 shadow-lg">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ResumeAI-Builder</h1>
                <p className="text-xs text-gray-400 font-medium">Professional Resume Builder</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-300 border-emerald-600 font-semibold">
                <CheckCircle className="h-3 w-3 mr-1" />
                ATS-Optimized
              </Badge>
              <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-600 font-semibold">
                <Star className="h-3 w-3 mr-1" />
                Free to Use
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/50 text-blue-300 text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trusted by 50,000+ professionals worldwide
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Build Your Perfect Resume in
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Minutes</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Create ATS-friendly resumes with AI-powered content suggestions, 
            industry-specific optimization, and professional templates that land interviews.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setShowBuilder(true)}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Start Building Your Resume
              <Zap className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="flex items-center text-sm text-gray-400">
              <Users className="h-4 w-4 mr-2" />
              No signup required • Export instantly
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm text-gray-400 font-medium">Trusted by professionals at:</div>
            <div className="flex items-center gap-8 text-gray-500">
              <span className="font-bold text-lg">Google</span>
              <span className="font-bold text-lg">Microsoft</span>
              <span className="font-bold text-lg">Amazon</span>
              <span className="font-bold text-lg">Apple</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to Land Your Dream Job
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and features you need to create a standout resume
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-4 w-fit mb-4">
                <Target className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-xl font-bold text-white">ATS-Optimized Templates</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Designed to pass Applicant Tracking Systems with optimized keywords, formatting, and structure that recruiters love
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 rounded-xl p-4 w-fit mb-4">
                <Zap className="h-8 w-8 text-emerald-400" />
              </div>
              <CardTitle className="text-xl font-bold text-white">AI-Powered Suggestions</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Get intelligent content recommendations based on your industry, job role, and current market trends
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-4 w-fit mb-4">
                <Download className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-xl font-bold text-white">Multiple Export Formats</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Export your resume as PDF, DOCX, or HTML with pixel-perfect formatting that looks great everywhere
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 rounded-xl p-4 w-fit mb-4">
                <Shield className="h-8 w-8 text-orange-400" />
              </div>
              <CardTitle className="text-xl font-bold text-white">Privacy First Approach</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Your personal data stays secure on your device with local storage - complete privacy guaranteed, no data mining
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-xl p-4 w-fit mb-4">
                <FileText className="h-8 w-8 text-red-400" />
              </div>
              <CardTitle className="text-xl font-bold text-white">Professional Templates</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Choose from expertly designed templates with customization options perfect for any industry or career level
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/50 rounded-xl p-4 w-fit mb-4">
                <Globe className="h-8 w-8 text-indigo-400" />
              </div>
              <CardTitle className="text-xl font-bold text-white">Universal Compatibility</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Works seamlessly across all browsers and devices with responsive design and lightning-fast performance
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 rounded-2xl p-12 backdrop-blur-sm">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Land Your Dream Job?
            </h3>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of professionals who've created winning resumes with ResumeForge and landed interviews at top companies
            </p>
            <Button 
              onClick={() => setShowBuilder(true)}
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Get Started Now - It's Free
              <Star className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-blue-200 mt-4">
              ✓ No credit card required ✓ Export instantly ✓ Professional results
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
