
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

export interface ResumeCustomization {
  primaryColor: string;
  font: string;
  spacing: 'compact' | 'normal' | 'relaxed';
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  template: 'modern' | 'classic' | 'creative';
  customization: ResumeCustomization;
}

export interface JobAnalysis {
  keywords: string[];
  matchScore: number;
  suggestions: string[];
  missingSkills: string[];
}
