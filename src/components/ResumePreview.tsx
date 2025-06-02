
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, FileText, Share, Eye } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ATSAnalyzer from './ATSAnalyzer';

interface ResumePreviewProps {
  resumeData: ResumeData;
  onBack: () => void;
  onEdit: (step: number) => void;
}

const ResumePreview = ({ resumeData, onBack, onEdit }: ResumePreviewProps) => {
  const [showATSAnalysis, setShowATSAnalysis] = useState(false);

  const renderTemplate = () => {
    const templateProps = { data: resumeData };
    
    switch (resumeData.template) {
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  const exportToPDF = () => {
    window.print();
  };

  const exportToHTML = () => {
    const resumeElement = document.getElementById('resume-content');
    if (resumeElement) {
      const htmlContent = resumeElement.outerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personal.fullName || 'resume'}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Resume Preview</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline"
                onClick={() => setShowATSAnalysis(!showATSAnalysis)}
              >
                <Eye className="h-4 w-4 mr-2" />
                ATS Analysis
              </Button>
              <Button variant="outline" onClick={exportToHTML}>
                <FileText className="h-4 w-4 mr-2" />
                Export HTML
              </Button>
              <Button onClick={exportToPDF} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ATS Analysis Sidebar */}
          {showATSAnalysis && (
            <div className="lg:col-span-1">
              <ATSAnalyzer resumeData={resumeData} onEdit={onEdit} />
            </div>
          )}
          
          {/* Resume Preview */}
          <div className={showATSAnalysis ? "lg:col-span-3" : "lg:col-span-4"}>
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <div 
                  id="resume-content"
                  className="bg-white"
                  style={{ 
                    fontFamily: resumeData.customization.font,
                    minHeight: '11in',
                    width: '8.5in',
                    margin: '0 auto',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                  }}
                >
                  {renderTemplate()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-content, #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            box-shadow: none;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
