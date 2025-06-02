
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { FileText, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface JobDescriptionAnalyzerProps {
  resumeData: ResumeData;
  onSuggestContent: (suggestions: any) => void;
}

const JobDescriptionAnalyzer = ({ resumeData, onSuggestContent }: JobDescriptionAnalyzerProps) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeJobDescription = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis - in a real app, this would call an AI service
    setTimeout(() => {
      const keywords = extractKeywords(jobDescription);
      const matchScore = calculateMatchScore(keywords, resumeData);
      const suggestions = generateSuggestions(keywords, resumeData);
      
      const analysisResult = {
        keywords,
        matchScore,
        suggestions,
        missingSkills: keywords.filter(keyword => 
          !resumeData.skills.technical.some(skill => 
            skill.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      };
      
      setAnalysis(analysisResult);
      onSuggestContent(analysisResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const extractKeywords = (text: string): string[] => {
    const techKeywords = [
      'react', 'javascript', 'typescript', 'python', 'java', 'node.js', 'aws', 'docker',
      'kubernetes', 'sql', 'mongodb', 'git', 'agile', 'scrum', 'ci/cd', 'api', 'rest',
      'graphql', 'microservices', 'cloud', 'azure', 'gcp', 'machine learning', 'ai'
    ];
    
    const words = text.toLowerCase().split(/\W+/);
    return techKeywords.filter(keyword => 
      words.some(word => word.includes(keyword) || keyword.includes(word))
    );
  };

  const calculateMatchScore = (keywords: string[], resume: ResumeData): number => {
    const resumeSkills = resume.skills.technical.map(skill => skill.toLowerCase());
    const matchedKeywords = keywords.filter(keyword =>
      resumeSkills.some(skill => skill.includes(keyword) || keyword.includes(skill))
    );
    
    return keywords.length > 0 ? Math.round((matchedKeywords.length / keywords.length) * 100) : 0;
  };

  const generateSuggestions = (keywords: string[], resume: ResumeData): string[] => {
    const suggestions = [];
    
    if (keywords.includes('leadership') && !resume.summary.toLowerCase().includes('lead')) {
      suggestions.push('Add leadership experience to your summary');
    }
    
    if (keywords.includes('agile') && !resume.skills.technical.includes('Agile')) {
      suggestions.push('Include Agile methodology in your technical skills');
    }
    
    if (keywords.length > resume.skills.technical.length) {
      suggestions.push('Consider adding more technical skills mentioned in the job description');
    }
    
    return suggestions;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            Job Description Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="job-description">Paste Job Description</Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to get personalized suggestions..."
              className="min-h-[120px]"
            />
          </div>
          
          <Button 
            onClick={analyzeJobDescription}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze & Get Suggestions'}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-500" />
                Match Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {analysis.matchScore}%
                </div>
                <Progress value={analysis.matchScore} className="mb-2" />
                <p className="text-sm text-gray-600">
                  Your resume matches {analysis.matchScore}% of the job requirements
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Skills Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {analysis.missingSkills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Missing Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-orange-600">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {analysis.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Improvement Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default JobDescriptionAnalyzer;
