import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, FileText, Share, Eye, Edit, Lightbulb, Target } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ATSAnalyzer from './ATSAnalyzer';
import JobDescriptionAnalyzer from './JobDescriptionAnalyzer';
import SmartContentSuggestions from './SmartContentSuggestions';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

interface ResumePreviewProps {
  resumeData: ResumeData;
  onBack: () => void;
  onEdit: (step: number) => void;
  onUpdate?: (section: string, data: any) => void;
}

const ResumePreview = ({ resumeData, onBack, onEdit, onUpdate }: ResumePreviewProps) => {
  const [showATSAnalysis, setShowATSAnalysis] = useState(false);
  const [showJobAnalysis, setShowJobAnalysis] = useState(false);
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [jobAnalysis, setJobAnalysis] = useState<any>(null);

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

  const exportToDOCX = async () => {
    const { personal, summary, experience, education, skills } = resumeData;
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Header with name
          new Paragraph({
            children: [
              new TextRun({
                text: personal.fullName,
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          
          // Contact info
          new Paragraph({
            children: [
              new TextRun({
                text: [
                  personal.email,
                  personal.phone,
                  personal.location,
                  personal.linkedin,
                  personal.website
                ].filter(Boolean).join(' | '),
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Summary section
          ...(summary ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "PROFESSIONAL SUMMARY",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: summary,
                  size: 22,
                }),
              ],
              spacing: { after: 400 },
            }),
          ] : []),

          // Experience section
          ...(experience.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "PROFESSIONAL EXPERIENCE",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 200 },
            }),
            ...experience.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.position,
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: ` | ${exp.company}`,
                    size: 22,
                  }),
                  new TextRun({
                    text: ` | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                    size: 20,
                    italics: true,
                  }),
                ],
                spacing: { after: 100 },
              }),
              ...(exp.description ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: exp.description,
                      size: 20,
                    }),
                  ],
                  spacing: { after: 100 },
                }),
              ] : []),
              ...exp.achievements.map(achievement => 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `• ${achievement}`,
                      size: 20,
                    }),
                  ],
                  spacing: { after: 50 },
                })
              ),
              new Paragraph({
                children: [new TextRun({ text: "", size: 20 })],
                spacing: { after: 200 },
              }),
            ]),
          ] : []),

          // Education section
          ...(education.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "EDUCATION",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 200 },
            }),
            ...education.map(edu => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.degree} in ${edu.field}`,
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: ` | ${edu.institution}`,
                    size: 22,
                  }),
                  new TextRun({
                    text: ` | ${edu.startDate} - ${edu.endDate}`,
                    size: 20,
                    italics: true,
                  }),
                  ...(edu.gpa ? [
                    new TextRun({
                      text: ` | GPA: ${edu.gpa}`,
                      size: 20,
                    }),
                  ] : []),
                ],
                spacing: { after: 200 },
              })
            ),
          ] : []),

          // Skills section
          ...(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "SKILLS",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 200 },
            }),
            ...(skills.technical.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Technical Skills: ",
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: skills.technical.join(', '),
                    size: 22,
                  }),
                ],
                spacing: { after: 100 },
              }),
            ] : []),
            ...(skills.soft.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Core Competencies: ",
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: skills.soft.join(', '),
                    size: 22,
                  }),
                ],
                spacing: { after: 100 },
              }),
            ] : []),
            ...(skills.languages.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Languages: ",
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: skills.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', '),
                    size: 22,
                  }),
                ],
                spacing: { after: 100 },
              }),
            ] : []),
          ] : []),
        ],
      }],
    });

    try {
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${personal.fullName || 'resume'}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating DOCX:', error);
    }
  };

  const handleApplySuggestion = (section: string, content: string) => {
    if (!onUpdate) return;
    
    switch (section) {
      case 'summary':
        onUpdate('summary', content);
        break;
      case 'skills':
        const currentSkills = [...resumeData.skills.technical];
        if (!currentSkills.includes(content)) {
          currentSkills.push(content);
          onUpdate('skills', { ...resumeData.skills, technical: currentSkills });
        }
        break;
      case 'achievement':
        // For achievements, we'd need to specify which experience entry to update
        // This is a simplified implementation
        console.log('Achievement suggestion:', content);
        break;
    }
  };

  const handleJobAnalysisSuggestions = (analysis: any) => {
    setJobAnalysis(analysis);
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
                variant={editMode ? "default" : "outline"}
                onClick={() => setEditMode(!editMode)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {editMode ? 'Exit Edit' : 'Edit Mode'}
              </Button>
              <Button 
                variant={showSmartSuggestions ? "default" : "outline"}
                onClick={() => setShowSmartSuggestions(!showSmartSuggestions)}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Smart Suggestions
              </Button>
              <Button 
                variant={showJobAnalysis ? "default" : "outline"}
                onClick={() => setShowJobAnalysis(!showJobAnalysis)}
              >
                <Target className="h-4 w-4 mr-2" />
                Job Match
              </Button>
              <Button 
                variant={showATSAnalysis ? "default" : "outline"}
                onClick={() => setShowATSAnalysis(!showATSAnalysis)}
              >
                <Eye className="h-4 w-4 mr-2" />
                ATS Analysis
              </Button>
              
              <Button variant="outline" onClick={exportToHTML}>
                <FileText className="h-4 w-4 mr-2" />
                Export HTML
              </Button>
              <Button variant="outline" onClick={exportToDOCX}>
                <FileText className="h-4 w-4 mr-2" />
                Export DOCX
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
          {/* Sidebar for Analysis and Suggestions */}
          {(showATSAnalysis || showJobAnalysis || showSmartSuggestions) && (
            <div className="lg:col-span-1 space-y-6">
              {showATSAnalysis && (
                <ATSAnalyzer resumeData={resumeData} onEdit={onEdit} />
              )}
              
              {showJobAnalysis && (
                <JobDescriptionAnalyzer 
                  resumeData={resumeData} 
                  onSuggestContent={handleJobAnalysisSuggestions}
                />
              )}
              
              {showSmartSuggestions && (
                <SmartContentSuggestions 
                  resumeData={resumeData}
                  onApplySuggestion={handleApplySuggestion}
                  jobAnalysis={jobAnalysis}
                />
              )}
            </div>
          )}
          
          {/* Resume Preview */}
          <div className={
            (showATSAnalysis || showJobAnalysis || showSmartSuggestions) 
              ? "lg:col-span-3" 
              : "lg:col-span-4"
          }>
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
      <style>{`
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
