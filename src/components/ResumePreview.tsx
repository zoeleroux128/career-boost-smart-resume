
import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import ResumeHeader from './ResumeHeader';
import ResumeSidebar from './ResumeSidebar';
import ResumeContent from './ResumeContent';
import { exportToPDF, exportToHTML, exportToDOCX } from '@/utils/exportUtils';

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

  const showSidebar = showATSAnalysis || showJobAnalysis || showSmartSuggestions;

  return (
    <div className="min-h-screen bg-gray-50">
      <ResumeHeader
        onBack={onBack}
        editMode={editMode}
        setEditMode={setEditMode}
        showSmartSuggestions={showSmartSuggestions}
        setShowSmartSuggestions={setShowSmartSuggestions}
        showJobAnalysis={showJobAnalysis}
        setShowJobAnalysis={setShowJobAnalysis}
        showATSAnalysis={showATSAnalysis}
        setShowATSAnalysis={setShowATSAnalysis}
        onExportHTML={() => exportToHTML(resumeData)}
        onExportDOCX={() => exportToDOCX(resumeData)}
        onExportPDF={() => exportToPDF(resumeData)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {showSidebar && (
            <ResumeSidebar
              showATSAnalysis={showATSAnalysis}
              showJobAnalysis={showJobAnalysis}
              showSmartSuggestions={showSmartSuggestions}
              resumeData={resumeData}
              onEdit={onEdit}
              onApplySuggestion={handleApplySuggestion}
              jobAnalysis={jobAnalysis}
              onJobAnalysisSuggestions={handleJobAnalysisSuggestions}
            />
          )}
          
          <div className={showSidebar ? "lg:col-span-3" : "lg:col-span-4"}>
            <ResumeContent
              resumeData={resumeData}
              editMode={editMode}
              onUpdate={onUpdate || (() => {})}
            />
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
