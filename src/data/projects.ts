import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'ExpenseSplit',
    description: 'A smart expense sharing app that helps groups track and settle bills effortlessly.',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80',
    link: '#',
    tags: ['React', 'TypeScript', 'Firebase'],
  },
  {
    id: 2,
    title: 'AttendanceTracker',
    description: 'Streamline attendance management with automated calculations and insights.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    link: 'https://attendando-genius.netlify.app/',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 3,
    title: 'TaskMaster',
    description: 'Boost productivity with this intuitive task management and scheduling tool.',
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80',
    link: '#',
    tags: ['React', 'Redux', 'Material-UI'],
  },
];