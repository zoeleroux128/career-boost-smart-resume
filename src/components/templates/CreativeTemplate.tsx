
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { personal, summary, experience, education, skills, customization } = data;
  const primaryColor = customization.primaryColor;

  return (
    <div className="flex min-h-full">
      {/* Left Sidebar */}
      <div 
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Profile */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{personal.fullName}</h1>
          <div className="space-y-2 text-sm opacity-90">
            {personal.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {personal.email}
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {personal.phone}
              </div>
            )}
            {personal.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {personal.location}
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center">
                <Linkedin className="h-4 w-4 mr-2" />
                {personal.linkedin}
              </div>
            )}
            {personal.website && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {personal.website}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.technical.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-2">
              {skills.technical.map((skill, index) => (
                <div key={index} className="text-sm opacity-90">{skill}</div>
              ))}
            </div>
          </div>
        )}

        {skills.soft.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">
              Core Skills
            </h2>
            <div className="space-y-2">
              {skills.soft.map((skill, index) => (
                <div key={index} className="text-sm opacity-90">{skill}</div>
              ))}
            </div>
          </div>
        )}

        {skills.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">
              Languages
            </h2>
            <div className="space-y-2">
              {skills.languages.map((lang, index) => (
                <div key={index} className="text-sm opacity-90">
                  <span className="font-medium">{lang.language}</span>
                  <div className="text-xs opacity-75">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8 bg-white">
        {/* Summary */}
        {summary && (
          <div className="mb-8">
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: primaryColor }}
            >
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-xl font-bold mb-6"
              style={{ color: primaryColor }}
            >
              Experience
            </h2>
            
            {experience.map((exp, index) => (
              <div key={exp.id} className={index > 0 ? "mt-6" : ""}>
                <div className="relative pl-6">
                  <div 
                    className="absolute left-0 top-0 w-3 h-3 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  {index < experience.length - 1 && (
                    <div 
                      className="absolute left-1.5 top-3 w-0.5 h-full"
                      style={{ backgroundColor: `${primaryColor}40` }}
                    ></div>
                  )}
                  
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
                    <div 
                      className="font-medium"
                      style={{ color: primaryColor }}
                    >
                      {exp.company}
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      {exp.location && ` • ${exp.location}`}
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                  )}
                  
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 
              className="text-xl font-bold mb-6"
              style={{ color: primaryColor }}
            >
              Education
            </h2>
            
            {education.map((edu, index) => (
              <div key={edu.id} className={index > 0 ? "mt-4" : ""}>
                <div className="relative pl-6">
                  <div 
                    className="absolute left-0 top-0 w-3 h-3 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  
                  <div>
                    <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                    <div 
                      className="font-medium"
                      style={{ color: primaryColor }}
                    >
                      {edu.institution}
                    </div>
                    <div className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                      {edu.location && ` • ${edu.location}`}
                    </div>
                    {(edu.gpa || edu.honors) && (
                      <div className="text-sm text-gray-600 mt-1">
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                        {edu.honors && <span className={edu.gpa ? " • " : ""}>{edu.honors}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
