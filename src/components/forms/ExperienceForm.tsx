
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Lightbulb } from 'lucide-react';
import { ResumeData, Experience } from '@/types/resume';

interface ExperienceFormProps {
  data: ResumeData;
  onUpdate: (section: string, data: any) => void;
}

const ExperienceForm = ({ data, onUpdate }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(data.experience);

  const updateExperiences = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    onUpdate('experience', newExperiences);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    updateExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    updateExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    updateExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addAchievement = (id: string) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'achievements', [...experience.achievements, '']);
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const experience = experiences.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const experience = experiences.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-full p-1">
              <Lightbulb className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Writing Great Experience Entries</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Start each achievement with an action verb (Developed, Managed, Increased)</li>
                <li>• Include specific numbers and metrics when possible</li>
                <li>• Focus on results and impact, not just responsibilities</li>
                <li>• Use keywords from job descriptions you're targeting</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {experiences.map((experience, index) => (
        <Card key={experience.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Work Experience {index + 1}
              </CardTitle>
              {experiences.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`position-${experience.id}`}>Job Title *</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  placeholder="Software Engineer"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Tech Corp Inc."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`startDate-${experience.id}`}>Start Date *</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                <Input
                  id={`endDate-${experience.id}`}
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  disabled={experience.current}
                  className="mt-1"
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onCheckedChange={(checked) => {
                      updateExperience(experience.id, 'current', checked);
                      if (checked) {
                        updateExperience(experience.id, 'endDate', '');
                      }
                    }}
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-sm">
                    I currently work here
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                placeholder="Brief description of your role and responsibilities..."
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Key Achievements</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addAchievement(experience.id)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Achievement
                </Button>
              </div>
              
              {experience.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                    placeholder="• Increased team productivity by 25% through implementation of new workflow processes"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeAchievement(experience.id, achIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {experience.achievements.length === 0 && (
                <div className="text-sm text-gray-500 italic">
                  Add achievements to make your experience stand out
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-2 py-6"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Another Work Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;
