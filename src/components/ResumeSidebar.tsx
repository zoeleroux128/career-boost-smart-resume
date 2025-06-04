
import ATSAnalyzer from './ATSAnalyzer';
import JobDescriptionAnalyzer from './JobDescriptionAnalyzer';
import SmartContentSuggestions from './SmartContentSuggestions';
import { ResumeData } from '@/types/resume';

interface ResumeSidebarProps {
  showATSAnalysis: boolean;
  showJobAnalysis: boolean;
  showSmartSuggestions: boolean;
  resumeData: ResumeData;
  onEdit: (step: number) => void;
  onApplySuggestion: (section: string, content: string) => void;
  jobAnalysis: any;
  onJobAnalysisSuggestions: (analysis: any) => void;
}

const ResumeSidebar = ({
  showATSAnalysis,
  showJobAnalysis,
  showSmartSuggestions,
  resumeData,
  onEdit,
  onApplySuggestion,
  jobAnalysis,
  onJobAnalysisSuggestions
}: ResumeSidebarProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {showATSAnalysis && (
        <ATSAnalyzer resumeData={resumeData} onEdit={onEdit} />
      )}
      
      {showJobAnalysis && (
        <JobDescriptionAnalyzer 
          resumeData={resumeData} 
          onSuggestContent={onJobAnalysisSuggestions}
        />
      )}
      
      {showSmartSuggestions && (
        <SmartContentSuggestions 
          resumeData={resumeData}
          onApplySuggestion={onApplySuggestion}
          jobAnalysis={jobAnalysis}
        />
      )}
    </div>
  );
};

export default ResumeSidebar;
