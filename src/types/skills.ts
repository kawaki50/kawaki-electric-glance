
export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Language';
  color: string;
  delay: number;
}

export interface MultimediaSkill {
  name: string;
  icon: string;
  description: string;
  delay: number;
}
