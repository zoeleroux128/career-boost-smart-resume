
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, Download, Eye } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import SummaryForm from './forms/SummaryForm';
import ResumePreview from './ResumePreview';
import TemplateSelector from './TemplateSelector';
import { ResumeData } from '@/types/resume';
import { useToast } from '@/hooks/use-toast';

interface ResumeBuilderProps {
  onBack: () => void;
}

const steps = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
  { id: 'summary', title: 'Summary', component: SummaryForm },
  { id: 'experience', title: 'Experience', component: ExperienceForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'template', title: 'Template', component: TemplateSelector },
  { id: 'preview', title: 'Preview', component: ResumePreview },
];

const ResumeBuilder = ({ onBack }: ResumeBuilderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    template: 'modern',
    customization: {
      primaryColor: '#2563eb',
      font: 'Inter',
      spacing: 'normal'
    }
  });
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeForge_data');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeForge_data', JSON.stringify(resumeData));
  }, [resumeData]);

  const updateResumeData = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
    
    toast({
      title: "Progress Saved",
      description: "Your resume data has been automatically saved.",
      duration: 2000,
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  if (showPreview) {
    return (
      <ResumePreview 
        resumeData={resumeData} 
        onBack={() => setShowPreview(false)}
        onEdit={(step) => {
          setShowPreview(false);
          setCurrentStep(step);
        }}
      />
    );
  }

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
              <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowPreview(true)}
                className="hidden sm:flex"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent 
              data={resumeData}
              onUpdate={updateResumeData}
            />
            
            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(true)}
                  className="sm:hidden"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                
                {currentStep === steps.length - 1 ? (
                  <Button onClick={() => setShowPreview(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Finish & Export
                  </Button>
                ) : (
                  <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
