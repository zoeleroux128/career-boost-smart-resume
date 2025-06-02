
import { ResumeData } from '@/types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const { personal, summary, experience, education, skills } = data;

  return (
    <div className="p-8 text-gray-900 font-serif">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-900 pb-4">
        <h1 className="text-3xl font-bold mb-3">{personal.fullName}</h1>
        
        <div className="text-sm space-y-1">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
          {personal.website && <div>{personal.website}</div>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide">
            Objective
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
            Professional Experience
          </h2>
          
          {experience.map((exp, index) => (
            <div key={exp.id} className={index > 0 ? "mt-5" : ""}>
              <div className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold">{exp.position}</h3>
                  <span className="text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="italic">
                  {exp.company}{exp.location && `, ${exp.location}`}
                </div>
              </div>
              
              {exp.description && (
                <p className="text-gray-700 mb-2">{exp.description}</p>
              )}
              
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={edu.id} className={index > 0 ? "mt-3" : ""}>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <div className="italic">{edu.institution}{edu.location && `, ${edu.location}`}</div>
                  {(edu.gpa || edu.honors) && (
                    <div className="text-sm">
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      {edu.honors && <span className={edu.gpa ? ", " : ""}>{edu.honors}</span>}
                    </div>
                  )}
                </div>
                <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
        <div>
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">
            Skills & Qualifications
          </h2>
          
          {skills.technical.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold mb-1">Technical Skills:</h3>
              <p className="text-gray-700">{skills.technical.join(', ')}</p>
            </div>
          )}

          {skills.soft.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold mb-1">Core Competencies:</h3>
              <p className="text-gray-700">{skills.soft.join(', ')}</p>
            </div>
          )}

          {skills.languages.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1">Languages:</h3>
              <p className="text-gray-700">
                {skills.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
