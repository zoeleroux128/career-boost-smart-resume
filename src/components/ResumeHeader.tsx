
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, FileText, Share, Eye, Edit, Lightbulb, Target } from 'lucide-react';

interface ResumeHeaderProps {
  onBack: () => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  showSmartSuggestions: boolean;
  setShowSmartSuggestions: (show: boolean) => void;
  showJobAnalysis: boolean;
  setShowJobAnalysis: (show: boolean) => void;
  showATSAnalysis: boolean;
  setShowATSAnalysis: (show: boolean) => void;
  onExportHTML: () => void;
  onExportDOCX: () => void;
  onExportPDF: () => void;
}

const ResumeHeader = ({
  onBack,
  editMode,
  setEditMode,
  showSmartSuggestions,
  setShowSmartSuggestions,
  showJobAnalysis,
  setShowJobAnalysis,
  showATSAnalysis,
  setShowATSAnalysis,
  onExportHTML,
  onExportDOCX,
  onExportPDF
}: ResumeHeaderProps) => {
  return (
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
            
            <Button variant="outline" onClick={onExportHTML}>
              <FileText className="h-4 w-4 mr-2" />
              Export HTML
            </Button>
            <Button variant="outline" onClick={onExportDOCX}>
              <FileText className="h-4 w-4 mr-2" />
              Export DOCX
            </Button>
            <Button onClick={onExportPDF} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ResumeHeader;
