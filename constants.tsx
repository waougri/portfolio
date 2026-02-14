
import { Project, LanguageStat, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'httpxx',
    title: 'HTTPxx',
    description: 'High-Performance Web Server built in C++ with full multi-threading support. Optimized memory management and request/response handling, achieving 15,000 requests/second and 35% throughput improvement.',
    tags: ['C++20', 'Multi-threading', 'Systems', 'Optimized'],
    github: 'https://github.com/waougri/httpxx',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    category: 'Distributed Systems'
  },
  {
    id: 'crown-point',
    title: 'Crown Point Consulting',
    description: 'Developed corporate website and internal tools featuring responsive design, HTTP/2 support, CDN optimization, and PWA functionality using modern web tech.',
    tags: ['Tailwind CSS', 'Alpine.js', 'Netlify', 'PWA'],
    github: 'https://github.com/waougri/crown_point',
    demo: 'https://crownpointconsult.com/',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    category: 'Web'
  },
  {
    id: 'graphxx',
    title: 'Graphxx',
    description: 'Mathematical Function Visualizer in C++ using SFML. Achieved 40% performance improvement for computation-intensive visualization tasks.',
    tags: ['C++', 'SFML', 'Graphics', 'Math'],
    github: 'https://github.com/waougri/Graphxx',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    category: 'Other'
  },
  {
    id: 'giftint',
    title: 'Giftint',
    description: 'Rust experiment in GIF recoloring. Remaps existing animated GIF colors to custom palettes like Catppuccin or Gruvbox.',
    tags: ['Rust', 'Image Processing', 'CLI'],
    github: 'https://github.com/waougri/giftint',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    category: 'Other'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'VNB-IT',
    role: 'Backend Developer Intern',
    location: 'Remote, France',
    period: '2025-09 - 2025-10',
    description: [
      'Designed and maintained secure RESTful APIs using Node.js and Express.js.',
      'Optimized PostgreSQL databases with query optimization and transaction handling.',
      'Implemented JWT-based authentication and RBAC.',
      'Wrote comprehensive unit and integration tests using Jest/Mocha.'
    ]
  },
  {
    company: 'AXENTRA OS',
    role: 'Python & FastAPI Backend Intern',
    location: 'Remote, United States',
    period: '2024-10 - 2025-11',
    description: [
      'Developed and maintained RESTful APIs using FastAPI and Python.',
      'Implemented real-time API integration with Shiprocket handling webhooks.',
      'Built secure webhook endpoints with request validation and error handling.',
      'Worked with PostgreSQL and MySQL including schema design and optimization.'
    ]
  },
  {
    company: 'Starlith',
    role: 'Lead Freelance Software Engineer',
    location: 'Remote',
    period: '2023-08 - Present',
    description: [
      'Deliver full-stack software solutions and system architecture.',
      'Design and maintain scalable web applications, internal tools, and dashboards.',
      'Build core business logic and infrastructure using C++, Rust, C#, Python, TypeScript, and Java.',
      'Apply computer science fundamentals to solve real-world engineering problems.'
    ]
  }
];

export const LANGUAGE_STATS: LanguageStat[] = [
  { name: 'C++', percent: 45, color: '#f34b7d' },
  { name: 'C', percent: 18, color: '#555555' },
  { name: 'Rust', percent: 12, color: '#dea584' },
  { name: 'Go', percent: 10, color: '#00add8' },
  { name: 'TypeScript', percent: 8, color: '#3178c6' },
  { name: 'Java', percent: 7, color: '#b07219' },
];
