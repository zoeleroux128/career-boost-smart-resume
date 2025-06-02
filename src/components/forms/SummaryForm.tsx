
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Wand2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface SummaryFormProps {
  data: ResumeData;
  onUpdate: (section: string, data: any) => void;
}

const SummaryForm = ({ data, onUpdate }: SummaryFormProps) => {
  const [summary, setSummary] = useState(data.summary);

  const handleChange = (value: string) => {
    setSummary(value);
    onUpdate('summary', value);
  };

  const suggestions = [
    "Results-driven software engineer with 5+ years of experience in full-stack development",
    "Experienced marketing professional with proven track record of increasing brand awareness by 150%",
    "Detail-oriented financial analyst with expertise in risk management and portfolio optimization",
    "Creative UI/UX designer passionate about creating user-centered digital experiences"
  ];

  const applySuggestion = (suggestion: string) => {
    handleChange(suggestion);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            Professional Summary
          </CardTitle>
          <CardDescription>
            Write a compelling 2-3 sentence summary that highlights your key qualifications and career goals.
            This section appears at the top of your resume and is often the first thing employers read.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="summary">Summary Statement</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Example: Results-driven software engineer with 5+ years of experience in full-stack development, specializing in React and Node.js. Proven track record of delivering scalable web applications that improve user engagement by 40%. Passionate about clean code and mentoring junior developers."
              className="mt-1 min-h-[120px]"
            />
            <div className="text-sm text-gray-500 mt-1">
              {summary.length}/500 characters
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand2 className="h-5 w-5 mr-2 text-purple-500" />
            AI Suggestions
          </CardTitle>
          <CardDescription>
            Click on any suggestion below to use it as a starting point for your summary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <p className="text-sm text-gray-700 mb-2">{suggestion}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => applySuggestion(suggestion)}
                >
                  Use This Summary
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-full p-1">
              <Lightbulb className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Pro Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Include 2-3 years of experience or key achievements</li>
                <li>• Mention 1-2 specific skills relevant to your target role</li>
                <li>• Use action words like "developed," "managed," "increased"</li>
                <li>• Keep it concise but impactful (2-3 sentences)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryForm;
