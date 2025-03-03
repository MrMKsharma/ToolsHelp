export interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  image: string;
  link: string;
  tags: string[];
}

export type Category = 'Finance' | 'Productivity' | 'Education' | 'All';