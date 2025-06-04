
import { Card, CardContent } from '@/components/ui/card';
import { ResumeData } from '@/types/resume';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

interface ResumeContentProps {
  resumeData: ResumeData;
  editMode: boolean;
  onUpdate: (section: string, data: any) => void;
}

const ResumeContent = ({ resumeData, editMode, onUpdate }: ResumeContentProps) => {
  const renderTemplate = () => {
    const templateProps = { 
      data: resumeData, 
      editMode, 
      onUpdate 
    };
    
    switch (resumeData.template) {
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return (
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
  );
};

export default ResumeContent;
