
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, Edit } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface ATSAnalyzerProps {
  resumeData: ResumeData;
  onEdit: (step: number) => void;
}

const ATSAnalyzer = ({ resumeData, onEdit }: ATSAnalyzerProps) => {
  const [analysis, setAnalysis] = useState({
    score: 0,
    issues: [] as Array<{ type: 'error' | 'warning' | 'info', message: string, section?: number }>,
    keywords: [] as string[],
    suggestions: [] as string[]
  });

  useEffect(() => {
    analyzeResume();
  }, [resumeData]);

  const analyzeResume = () => {
    let score = 0;
    const issues: Array<{ type: 'error' | 'warning' | 'info', message: string, section?: number }> = [];
    const keywords: string[] = [];
    const suggestions: string[] = [];

    // Check for required fields
    if (resumeData.personal.fullName) score += 10;
    else issues.push({ type: 'error', message: 'Full name is required', section: 0 });

    if (resumeData.personal.email) score += 10;
    else issues.push({ type: 'error', message: 'Email address is required', section: 0 });

    if (resumeData.personal.phone) score += 10;
    else issues.push({ type: 'error', message: 'Phone number is required', section: 0 });

    if (resumeData.personal.location) score += 5;
    else issues.push({ type: 'warning', message: 'Location can help with local job searches', section: 0 });

    // Check summary
    if (resumeData.summary) {
      score += 15;
      if (resumeData.summary.length < 50) {
        issues.push({ type: 'warning', message: 'Summary seems too short. Aim for 2-3 sentences.', section: 1 });
      } else if (resumeData.summary.length > 500) {
        issues.push({ type: 'warning', message: 'Summary is too long. Keep it concise.', section: 1 });
      }
    } else {
      issues.push({ type: 'error', message: 'Professional summary is missing', section: 1 });
    }

    // Check experience
    if (resumeData.experience.length > 0) {
      score += 20;
      resumeData.experience.forEach((exp, index) => {
        if (!exp.position) issues.push({ type: 'error', message: `Job title missing for experience ${index + 1}`, section: 2 });
        if (!exp.company) issues.push({ type: 'error', message: `Company name missing for experience ${index + 1}`, section: 2 });
        if (!exp.startDate) issues.push({ type: 'error', message: `Start date missing for experience ${index + 1}`, section: 2 });
        
        if (exp.achievements.length === 0) {
          issues.push({ type: 'warning', message: `No achievements listed for ${exp.position}`, section: 2 });
        } else {
          score += 5;
        }
      });
    } else {
      issues.push({ type: 'error', message: 'No work experience added', section: 2 });
    }

    // Check education
    if (resumeData.education.length > 0) {
      score += 10;
    } else {
      issues.push({ type: 'warning', message: 'Consider adding education information', section: 3 });
    }

    // Check skills
    if (resumeData.skills.technical.length > 0) {
      score += 15;
      keywords.push(...resumeData.skills.technical);
    } else {
      issues.push({ type: 'warning', message: 'No technical skills listed', section: 4 });
    }

    if (resumeData.skills.soft.length > 0) {
      score += 5;
    } else {
      issues.push({ type: 'info', message: 'Consider adding soft skills', section: 4 });
    }

    // ATS-specific checks
    if (!resumeData.personal.email.includes('@')) {
      issues.push({ type: 'error', message: 'Invalid email format', section: 0 });
    }

    // Template checks
    if (resumeData.template === 'creative') {
      issues.push({ type: 'warning', message: 'Creative templates may not be ATS-friendly for all industries' });
      suggestions.push('Consider using Modern or Classic template for better ATS compatibility');
    }

    // Add suggestions based on analysis
    if (resumeData.experience.length > 0) {
      const hasQuantifiedAchievements = resumeData.experience.some(exp => 
        exp.achievements.some(ach => /\d+%|\d+\$|\d+ (times|x|percent)/.test(ach))
      );
      
      if (!hasQuantifiedAchievements) {
        suggestions.push('Add numbers and metrics to your achievements (e.g., "Increased sales by 25%")');
      }
    }

    if (keywords.length < 5) {
      suggestions.push('Add more relevant technical skills and keywords from job descriptions');
    }

    setAnalysis({
      score: Math.min(score, 100),
      issues,
      keywords,
      suggestions
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-4">
      {/* ATS Score */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            ATS Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-center p-4 rounded-lg ${getScoreBg(analysis.score)}`}>
            <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
              {analysis.score}/100
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {analysis.score >= 80 ? 'Excellent' : 
               analysis.score >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
          <Progress value={analysis.score} className="mt-4" />
        </CardContent>
      </Card>

      {/* Issues */}
      {analysis.issues.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Issues Found</CardTitle>
            <CardDescription>
              {analysis.issues.filter(i => i.type === 'error').length} errors, {' '}
              {analysis.issues.filter(i => i.type === 'warning').length} warnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.issues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {issue.type === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
                    {issue.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {issue.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{issue.message}</p>
                    {issue.section !== undefined && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(issue.section!)}
                        className="mt-2 h-6 text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Fix
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keywords */}
      {analysis.keywords.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Detected Keywords</CardTitle>
            <CardDescription>
              {analysis.keywords.length} keywords found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.slice(0, 10).map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
              {analysis.keywords.length > 10 && (
                <Badge variant="outline" className="text-xs">
                  +{analysis.keywords.length - 10} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ATSAnalyzer;
