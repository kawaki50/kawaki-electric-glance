
import { Skill, MultimediaSkill } from '@/types/skills';

export const developmentSkills: Skill[] = [
  { name: 'HTML', category: 'Frontend', color: '#E34F26', delay: 0 },
  { name: 'CSS', category: 'Frontend', color: '#1572B6', delay: 0.2 },
  { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', delay: 0.4 },
  { name: 'React.js', category: 'Frontend', color: '#61DAFB', delay: 0.6 },
  { name: 'jQuery', category: 'Frontend', color: '#0769AD', delay: 0.8 },
  { name: 'Ajax', category: 'Frontend', color: '#39ff14', delay: 1.0 },
  { name: 'PHP', category: 'Backend', color: '#777BB4', delay: 1.2 },
  { name: 'Python', category: 'Backend', color: '#3776AB', delay: 1.4 },
  { name: 'Java', category: 'Language', color: '#ED8B00', delay: 1.6 },
  { name: 'MySQL', category: 'Database', color: '#4479A1', delay: 1.8 },
];

export const multimediaSkills: MultimediaSkill[] = [
  { name: 'Adobe Illustrator', icon: '🎨', description: 'Logo Design & Vector Graphics', delay: 0 },
  { name: 'Adobe Photoshop', icon: '🖼️', description: 'Photo Editing & Digital Art', delay: 0.2 },
  { name: 'Adobe InDesign', icon: '📑', description: 'Layout Design & Typography', delay: 0.4 },
  { name: 'Adobe After Effects', icon: '🎬', description: 'Motion Graphics & Animation', delay: 0.6 },
  { name: 'Figma', icon: '🎯', description: 'UI/UX Design & Prototyping', delay: 0.8 },
  { name: 'Canva', icon: '✨', description: 'Quick Design & Templates', delay: 1.0 },
];

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'Frontend':
      return '🎨';
    case 'Backend':
      return '⚙️';
    case 'Database':
      return '🗄️';
    case 'Language':
      return '💻';
    default:
      return '🚀';
  }
};
