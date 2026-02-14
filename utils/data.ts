
export const PROJECTS = [
  {
    id: 'httpxx',
    title: 'HTTPxx',
    description: 'A high-throughput C++20 web server engineered for raw performance. Implements a custom thread pool and non-blocking I/O to handle 15k+ req/s.',
    tags: ['C++20', 'Systems', 'Networking'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    link: 'https://github.com/waougri/httpxx',
    featured: true
  },
  {
    id: 'graphxx',
    title: 'Graphxx',
    description: 'Hardware-accelerated mathematical function visualizer using SFML. Custom shader pipeline for real-time rendering of complex parametric equations.',
    tags: ['C++', 'OpenGL', 'SFML'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop',
    link: 'https://github.com/waougri/Graphxx',
    featured: true
  },
  {
    id: 'giftint',
    title: 'Giftint',
    description: 'Rust-based CLI tool for algorithmic color remapping of GIF files. Supports custom palettes (Catppuccin, Nord) with dithering algorithms.',
    tags: ['Rust', 'Image Processing', 'CLI'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    link: 'https://github.com/waougri/giftint',
    featured: false
  },
  {
    id: 'crownpoint',
    title: 'Crown Point',
    description: 'Corporate PWA built with modern web standards. Features automated deployment pipelines and CDN edge caching optimization.',
    tags: ['TypeScript', 'React', 'DevOps'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    link: 'https://crownpointconsult.com/',
    featured: false
  }
];

export const EXPERIENCE = [
  {
    company: 'Starlith',
    role: 'Lead Systems Engineer',
    period: '2023 - Present',
    desc: 'Architecting scalable backend solutions using Rust and Go. Leading a team of 3 developers for internal tool creation.',
    tech: ['Rust', 'Go', 'K8s']
  },
  {
    company: 'Axentra OS',
    role: 'Backend Intern',
    period: '2024 - 2025',
    desc: 'Developed high-performance REST APIs with FastAPI. Reduced database query latency by 40% through index optimization.',
    tech: ['Python', 'PostgreSQL', 'Redis']
  },
  {
    company: 'VNB-IT',
    role: 'Full Stack Intern',
    period: '2025',
    desc: 'Implemented secure authentication flows (OAuth2/OIDC) and real-time dashboard updates using WebSockets.',
    tech: ['Node.js', 'React', 'Socket.io']
  }
];

export const SKILLS = [
  { name: 'C++', level: 90 },
  { name: 'Rust', level: 85 },
  { name: 'TypeScript', level: 88 },
  { name: 'Python', level: 82 },
  { name: 'System Design', level: 75 },
  { name: 'DevOps', level: 70 },
];
