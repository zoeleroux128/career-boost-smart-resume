
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Lightbulb } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface SkillsFormProps {
  data: ResumeData;
  onUpdate: (section: string, data: any) => void;
}

const SkillsForm = ({ data, onUpdate }: SkillsFormProps) => {
  const [skills, setSkills] = useState(data.skills);
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newProficiency, setNewProficiency] = useState('');

  const updateSkills = (newSkills: any) => {
    setSkills(newSkills);
    onUpdate('skills', newSkills);
  };

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      updateSkills({
        ...skills,
        technical: [...skills.technical, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    updateSkills({
      ...skills,
      technical: skills.technical.filter((_, i) => i !== index)
    });
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      updateSkills({
        ...skills,
        soft: [...skills.soft, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (index: number) => {
    updateSkills({
      ...skills,
      soft: skills.soft.filter((_, i) => i !== index)
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim() && newProficiency) {
      updateSkills({
        ...skills,
        languages: [...skills.languages, { 
          language: newLanguage.trim(), 
          proficiency: newProficiency 
        }]
      });
      setNewLanguage('');
      setNewProficiency('');
    }
  };

  const removeLanguage = (index: number) => {
    updateSkills({
      ...skills,
      languages: skills.languages.filter((_, i) => i !== index)
    });
  };

  const technicalSkillSuggestions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 
    'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'HTML/CSS', 'Angular', 'Vue.js'
  ];

  const softSkillSuggestions = [
    'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 
    'Project Management', 'Critical Thinking', 'Adaptability', 'Time Management'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-full p-1">
              <Lightbulb className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Skills Strategy</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Include skills that match the job description</li>
                <li>• Mix technical skills with soft skills for balance</li>
                <li>• List your strongest skills first</li>
                <li>• Be honest about your proficiency levels</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
          <CardDescription>
            Programming languages, frameworks, tools, and technologies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeTechnicalSkill(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              placeholder="Enter a technical skill"
              onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
            />
            <Button onClick={addTechnicalSkill} disabled={!newTechnicalSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label className="text-sm text-gray-600">Popular technical skills:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {technicalSkillSuggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!skills.technical.includes(suggestion)) {
                      updateSkills({
                        ...skills,
                        technical: [...skills.technical, suggestion]
                      });
                    }
                  }}
                  disabled={skills.technical.includes(suggestion)}
                  className="h-8 text-xs"
                >
                  + {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Soft Skills</CardTitle>
          <CardDescription>
            Personal attributes and interpersonal skills
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.soft.map((skill, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeSoftSkill(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              placeholder="Enter a soft skill"
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            />
            <Button onClick={addSoftSkill} disabled={!newSoftSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label className="text-sm text-gray-600">Popular soft skills:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {softSkillSuggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!skills.soft.includes(suggestion)) {
                      updateSkills({
                        ...skills,
                        soft: [...skills.soft, suggestion]
                      });
                    }
                  }}
                  disabled={skills.soft.includes(suggestion)}
                  className="h-8 text-xs"
                >
                  + {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>
            Languages you speak and your proficiency level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {skills.languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-sm text-gray-500 ml-2">({lang.proficiency})</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeLanguage(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Language"
            />
            <Select value={newProficiency} onValueChange={setNewProficiency}>
              <SelectTrigger>
                <SelectValue placeholder="Proficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Native">Native</SelectItem>
                <SelectItem value="Fluent">Fluent</SelectItem>
                <SelectItem value="Conversational">Conversational</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={addLanguage} 
              disabled={!newLanguage.trim() || !newProficiency}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsForm;
