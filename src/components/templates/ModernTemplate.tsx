
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personal, summary, experience, education, skills, customization } = data;
  const primaryColor = customization.primaryColor;

  return (
    <div className="p-8 text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 
          className="text-4xl font-bold mb-2"
          style={{ color: primaryColor }}
        >
          {personal.fullName}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
          {personal.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" style={{ color: primaryColor }} />
              {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" style={{ color: primaryColor }} />
              {personal.phone}
            </div>
          )}
          {personal.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" style={{ color: primaryColor }} />
              {personal.location}
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" style={{ color: primaryColor }} />
              {personal.linkedin}
            </div>
          )}
          {personal.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" style={{ color: primaryColor }} />
              {personal.website}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-8">
          <h2 
            className="text-xl font-semibold mb-3 pb-1 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4 pb-1 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Professional Experience
          </h2>
          
          {experience.map((exp, index) => (
            <div key={exp.id} className={index > 0 ? "mt-6" : ""}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <div className="text-gray-600">
                    <span className="font-medium">{exp.company}</span>
                    {exp.location && <span className="ml-2">• {exp.location}</span>}
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              
              {exp.description && (
                <p className="text-gray-700 mb-2">{exp.description}</p>
              )}
              
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xl font-semibold mb-4 pb-1 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={edu.id} className={index > 0 ? "mt-4" : ""}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                  <div className="text-gray-600">
                    <span className="font-medium">{edu.institution}</span>
                    {edu.location && <span className="ml-2">• {edu.location}</span>}
                  </div>
                  {(edu.gpa || edu.honors) && (
                    <div className="text-sm text-gray-600 mt-1">
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      {edu.honors && <span className={edu.gpa ? "ml-2" : ""}>{edu.honors}</span>}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.technical.length > 0 && (
          <div>
            <h2 
              className="text-xl font-semibold mb-3 pb-1 border-b-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-sm border"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {(skills.soft.length > 0 || skills.languages.length > 0) && (
          <div>
            {skills.soft.length > 0 && (
              <div className="mb-4">
                <h2 
                  className="text-xl font-semibold mb-3 pb-1 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Core Competencies
                </h2>
                <div className="space-y-1">
                  {skills.soft.map((skill, index) => (
                    <div key={index} className="text-gray-700">• {skill}</div>
                  ))}
                </div>
              </div>
            )}

            {skills.languages.length > 0 && (
              <div>
                <h2 
                  className="text-xl font-semibold mb-3 pb-1 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Languages
                </h2>
                <div className="space-y-1">
                  {skills.languages.map((lang, index) => (
                    <div key={index} className="text-gray-700">
                      <span className="font-medium">{lang.language}:</span> {lang.proficiency}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
