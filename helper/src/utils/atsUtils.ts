import { IResume } from '../models/Resume';

// ATS (Applicant Tracking System) scoring algorithm
export const calculateATSScore = (resumeData: Partial<IResume>): number => {
  let score = 0;
  const maxScore = 100;

  // Personal Information (20 points)
  if (resumeData.personalInfo) {
    const info = resumeData.personalInfo;
    if (info.firstName && info.lastName) score += 5;
    if (info.email && isValidEmail(info.email)) score += 5;
    if (info.phone) score += 3;
    if (info.address) score += 2;
    if (info.summary && info.summary.length >= 50) score += 5;
  }

  // Experience Section (30 points)
  if (resumeData.experience && resumeData.experience.length > 0) {
    score += Math.min(resumeData.experience.length * 10, 20); // Up to 20 points for experience entries
    
    // Check for detailed descriptions and achievements
    const hasDetailedDescriptions = resumeData.experience.some(exp => 
      exp.description && exp.description.length >= 100
    );
    if (hasDetailedDescriptions) score += 5;
    
    const hasAchievements = resumeData.experience.some(exp => 
      exp.achievements && exp.achievements.length > 0
    );
    if (hasAchievements) score += 5;
  }

  // Education Section (15 points)
  if (resumeData.education && resumeData.education.length > 0) {
    score += Math.min(resumeData.education.length * 7, 15);
  }

  // Skills Section (20 points)
  if (resumeData.skills && resumeData.skills.length > 0) {
    const totalSkills = resumeData.skills.reduce((sum, skillGroup) => 
      sum + (skillGroup.items ? skillGroup.items.length : 0), 0
    );
    score += Math.min(totalSkills * 2, 20);
  }

  // Additional Sections (15 points)
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    score += Math.min(resumeData.certifications.length * 3, 9);
  }
  
  if (resumeData.projects && resumeData.projects.length > 0) {
    score += Math.min(resumeData.projects.length * 2, 6);
  }

  // Formatting and Structure Bonus (bonus points for well-structured content)
  if (hasConsistentDates(resumeData)) score += 3;
  if (hasQuantifiableAchievements(resumeData)) score += 5;
  if (hasRelevantKeywords(resumeData)) score += 2;

  return Math.min(Math.round(score), maxScore);
};

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Check if resume has consistent date formatting
const hasConsistentDates = (resumeData: Partial<IResume>): boolean => {
  const experiences = resumeData.experience || [];
  const education = resumeData.education || [];
  
  return experiences.every(exp => exp.startDate) && 
         education.every(edu => edu.startDate);
};

// Check if resume contains quantifiable achievements
const hasQuantifiableAchievements = (resumeData: Partial<IResume>): boolean => {
  const experiences = resumeData.experience || [];
  const numberRegex = /\d+(%|k|million|billion|\$|years?|months?)/i;
  
  return experiences.some(exp => 
    exp.achievements?.some(achievement => numberRegex.test(achievement)) ||
    (exp.description && numberRegex.test(exp.description))
  );
};

// Check if resume contains industry-relevant keywords
const hasRelevantKeywords = (resumeData: Partial<IResume>): boolean => {
  const commonKeywords = [
    'managed', 'developed', 'implemented', 'designed', 'created', 'led', 'improved',
    'increased', 'decreased', 'analyzed', 'collaborated', 'coordinated', 'supervised'
  ];
  
  const allText = JSON.stringify(resumeData).toLowerCase();
  
  return commonKeywords.some(keyword => allText.includes(keyword));
};

// Generate ATS improvement suggestions
export const getATSImprovementSuggestions = (resumeData: Partial<IResume>, currentScore: number): string[] => {
  const suggestions: string[] = [];

  if (currentScore < 30) {
    suggestions.push('Add more detailed work experience with specific achievements and responsibilities.');
  }

  if (!resumeData.personalInfo?.summary || resumeData.personalInfo.summary.length < 50) {
    suggestions.push('Include a professional summary that highlights your key skills and experience.');
  }

  if (!resumeData.skills || resumeData.skills.length === 0) {
    suggestions.push('Add a skills section with relevant technical and soft skills.');
  }

  if (!hasQuantifiableAchievements(resumeData)) {
    suggestions.push('Include quantifiable achievements with numbers, percentages, or dollar amounts.');
  }

  if (!resumeData.education || resumeData.education.length === 0) {
    suggestions.push('Add your educational background including degrees and certifications.');
  }

  if (currentScore >= 30 && currentScore < 60) {
    suggestions.push('Improve formatting consistency and add more industry-specific keywords.');
  }

  if (currentScore >= 60 && currentScore < 80) {
    suggestions.push('Consider adding relevant projects, certifications, or volunteer experience.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Your resume is well-optimized for ATS systems!');
  }

  return suggestions;
};