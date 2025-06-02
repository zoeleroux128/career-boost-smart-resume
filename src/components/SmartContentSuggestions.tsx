
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Plus, Wand2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface SmartContentSuggestionsProps {
  resumeData: ResumeData;
  onApplySuggestion: (section: string, content: string) => void;
  jobAnalysis?: any;
}

const SmartContentSuggestions = ({ resumeData, onApplySuggestion, jobAnalysis }: SmartContentSuggestionsProps) => {
  const [selectedRole, setSelectedRole] = useState('');

  const roleSuggestions = {
    'Software Engineer': {
      summary: [
        'Experienced software engineer with expertise in full-stack development and cloud technologies',
        'Results-driven developer with strong problem-solving skills and experience in agile environments',
        'Passionate software engineer with a track record of delivering scalable applications'
      ],
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git'],
      achievements: [
        'Reduced application load time by 40% through code optimization',
        'Led development of microservices architecture serving 1M+ users',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ]
    },
    'Product Manager': {
      summary: [
        'Strategic product manager with experience driving product growth and user engagement',
        'Data-driven product leader with expertise in market research and user experience design',
        'Innovative product manager skilled in cross-functional team leadership'
      ],
      skills: ['Product Strategy', 'Market Research', 'Agile', 'Scrum', 'Analytics', 'User Research', 'Roadmap Planning'],
      achievements: [
        'Increased user engagement by 45% through feature optimization',
        'Launched 3 successful products generating $2M+ in revenue',
        'Led cross-functional team of 12 engineers and designers'
      ]
    },
    'Marketing Manager': {
      summary: [
        'Creative marketing professional with proven track record in digital marketing and brand growth',
        'Strategic marketing manager experienced in multi-channel campaign development',
        'Results-oriented marketer with expertise in customer acquisition and retention'
      ],
      skills: ['Digital Marketing', 'SEO/SEM', 'Content Marketing', 'Social Media', 'Analytics', 'Brand Management'],
      achievements: [
        'Increased brand awareness by 150% through integrated marketing campaigns',
        'Generated 300% ROI on digital marketing spend',
        'Grew social media following by 250% in 12 months'
      ]
    }
  };

  const industryKeywords = {
    'Technology': ['innovation', 'scalable', 'cutting-edge', 'digital transformation', 'automation'],
    'Healthcare': ['patient-centered', 'compliance', 'quality improvement', 'evidence-based', 'collaborative'],
    'Finance': ['risk management', 'analytical', 'regulatory compliance', 'cost optimization', 'strategic planning'],
    'Marketing': ['brand development', 'customer engagement', 'market analysis', 'creative campaigns', 'ROI-driven']
  };

  const applySuggestion = (section: string, content: string) => {
    onApplySuggestion(section, content);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand2 className="h-5 w-5 mr-2 text-purple-500" />
            Smart Content Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {Object.keys(roleSuggestions).map((role) => (
              <Button
                key={role}
                variant={selectedRole === role ? "default" : "outline"}
                onClick={() => setSelectedRole(role)}
                className="justify-start"
              >
                {role}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedRole && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Summary Suggestions for {selectedRole}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roleSuggestions[selectedRole as keyof typeof roleSuggestions].summary.map((suggestion, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">{suggestion}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => applySuggestion('summary', suggestion)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Use This
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {roleSuggestions[selectedRole as keyof typeof roleSuggestions].skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => applySuggestion('skills', skill)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievement Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roleSuggestions[selectedRole as keyof typeof roleSuggestions].achievements.map((achievement, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">{achievement}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => applySuggestion('achievement', achievement)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add to Experience
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {jobAnalysis && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <Lightbulb className="h-5 w-5 mr-2" />
              Job-Specific Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {jobAnalysis.suggestions?.map((suggestion: string, index: number) => (
                <p key={index} className="text-sm text-blue-800">• {suggestion}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartContentSuggestions;
