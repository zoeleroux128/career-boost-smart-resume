
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { ResumeData, Education } from '@/types/resume';

interface EducationFormProps {
  data: ResumeData;
  onUpdate: (section: string, data: any) => void;
}

const EducationForm = ({ data, onUpdate }: EducationFormProps) => {
  const [education, setEducation] = useState<Education[]>(data.education);

  const updateEducation = (newEducation: Education[]) => {
    setEducation(newEducation);
    onUpdate('education', newEducation);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: ''
    };
    updateEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    updateEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducationField = (id: string, field: string, value: string) => {
    updateEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="space-y-6">
      {education.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-4">No education entries yet. Add your educational background to strengthen your resume.</p>
        </div>
      )}

      {education.map((edu, index) => (
        <Card key={edu.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Education {index + 1}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`institution-${edu.id}`}>Institution *</Label>
                <Input
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(e) => updateEducationField(edu.id, 'institution', e.target.value)}
                  placeholder="University of California"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`location-${edu.id}`}>Location</Label>
                <Input
                  id={`location-${edu.id}`}
                  value={edu.location}
                  onChange={(e) => updateEducationField(edu.id, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`degree-${edu.id}`}>Degree *</Label>
                <Input
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => updateEducationField(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`field-${edu.id}`}>Field of Study *</Label>
                <Input
                  id={`field-${edu.id}`}
                  value={edu.field}
                  onChange={(e) => updateEducationField(edu.id, 'field', e.target.value)}
                  placeholder="Computer Science"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${edu.id}`}
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducationField(edu.id, 'startDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                <Input
                  id={`endDate-${edu.id}`}
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducationField(edu.id, 'endDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${edu.id}`}
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducationField(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`honors-${edu.id}`}>Honors (Optional)</Label>
                <Input
                  id={`honors-${edu.id}`}
                  value={edu.honors || ''}
                  onChange={(e) => updateEducationField(edu.id, 'honors', e.target.value)}
                  placeholder="Magna Cum Laude"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full border-dashed border-2 py-6"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Education
      </Button>
    </div>
  );
};

export default EducationForm;
