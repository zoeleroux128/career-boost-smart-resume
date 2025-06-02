
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import InlineEditor from '../InlineEditor';

interface ModernTemplateProps {
  data: ResumeData;
  editMode?: boolean;
  onUpdate?: (section: string, data: any) => void;
}

const ModernTemplate = ({ data, editMode = false, onUpdate }: ModernTemplateProps) => {
  const { personal, summary, experience, education, skills, customization } = data;

  const handleUpdatePersonal = (field: string, value: string) => {
    if (onUpdate) {
      onUpdate('personal', { ...personal, [field]: value });
    }
  };

  const handleUpdateSummary = (value: string) => {
    if (onUpdate) {
      onUpdate('summary', value);
    }
  };

  const handleUpdateExperience = (index: number, field: string, value: string) => {
    if (onUpdate) {
      const updatedExperience = [...experience];
      updatedExperience[index] = { ...updatedExperience[index], [field]: value };
      onUpdate('experience', updatedExperience);
    }
  };

  const handleUpdateEducation = (index: number, field: string, value: string) => {
    if (onUpdate) {
      const updatedEducation = [...education];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      onUpdate('education', updatedEducation);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white" style={{ color: customization.primaryColor }}>
      {/* Header */}
      <header className="text-center mb-8">
        {editMode ? (
          <InlineEditor
            value={personal.fullName}
            onSave={(value) => handleUpdatePersonal('fullName', value)}
            className="text-4xl font-bold mb-4 text-center"
          />
        ) : (
          <h1 className="text-4xl font-bold mb-4" style={{ color: customization.primaryColor }}>
            {personal.fullName}
          </h1>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {editMode ? (
                <InlineEditor
                  value={personal.email}
                  onSave={(value) => handleUpdatePersonal('email', value)}
                />
              ) : (
                <span>{personal.email}</span>
              )}
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {editMode ? (
                <InlineEditor
                  value={personal.phone}
                  onSave={(value) => handleUpdatePersonal('phone', value)}
                />
              ) : (
                <span>{personal.phone}</span>
              )}
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {editMode ? (
                <InlineEditor
                  value={personal.location}
                  onSave={(value) => handleUpdatePersonal('location', value)}
                />
              ) : (
                <span>{personal.location}</span>
              )}
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              {editMode ? (
                <InlineEditor
                  value={personal.linkedin}
                  onSave={(value) => handleUpdatePersonal('linkedin', value)}
                />
              ) : (
                <a href={personal.linkedin} className="hover:underline">{personal.linkedin}</a>
              )}
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {editMode ? (
                <InlineEditor
                  value={personal.website}
                  onSave={(value) => handleUpdatePersonal('website', value)}
                />
              ) : (
                <a href={personal.website} className="hover:underline">{personal.website}</a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: customization.primaryColor }}>
            Professional Summary
          </h2>
          {editMode ? (
            <InlineEditor
              value={summary}
              onSave={handleUpdateSummary}
              multiline
              className="text-gray-700 leading-relaxed"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          )}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: customization.primaryColor }}>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-4 pl-4" style={{ borderColor: customization.primaryColor }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    {editMode ? (
                      <InlineEditor
                        value={exp.position}
                        onSave={(value) => handleUpdateExperience(index, 'position', value)}
                        className="text-xl font-semibold"
                      />
                    ) : (
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                    )}
                    {editMode ? (
                      <InlineEditor
                        value={exp.company}
                        onSave={(value) => handleUpdateExperience(index, 'company', value)}
                        className="text-lg text-gray-600"
                      />
                    ) : (
                      <p className="text-lg text-gray-600">{exp.company}</p>
                    )}
                  </div>
                  <span className="text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className="mb-2">
                    {editMode ? (
                      <InlineEditor
                        value={exp.description}
                        onSave={(value) => handleUpdateExperience(index, 'description', value)}
                        multiline
                        className="text-gray-700"
                      />
                    ) : (
                      <p className="text-gray-700">{exp.description}</p>
                    )}
                  </div>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: customization.primaryColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 pl-4" style={{ borderColor: customization.primaryColor }}>
                <div className="flex justify-between items-start">
                  <div>
                    {editMode ? (
                      <InlineEditor
                        value={`${edu.degree} in ${edu.field}`}
                        onSave={(value) => {
                          const [degree, ...fieldParts] = value.split(' in ');
                          handleUpdateEducation(index, 'degree', degree);
                          if (fieldParts.length > 0) {
                            handleUpdateEducation(index, 'field', fieldParts.join(' in '));
                          }
                        }}
                        className="text-lg font-semibold"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold">{edu.degree} in {edu.field}</h3>
                    )}
                    {editMode ? (
                      <InlineEditor
                        value={edu.institution}
                        onSave={(value) => handleUpdateEducation(index, 'institution', value)}
                        className="text-gray-600"
                      />
                    ) : (
                      <p className="text-gray-600">{edu.institution}</p>
                    )}
                    {edu.gpa && (
                      <p className="text-gray-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <span className="text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: customization.primaryColor }}>
          Skills & Expertise
        </h2>
        
        {skills.technical.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {skills.soft.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Core Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {skills.languages.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((lang, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {lang.language} ({lang.proficiency})
                </Badge>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ModernTemplate;
