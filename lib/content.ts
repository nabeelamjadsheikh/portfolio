// Single source of truth — every value here is drawn from Nabeel Ahmad's CV
// (public/nabeel-full-stack-engineer-cv.pdf). Copy is tightened for the web but
// kept factually exact: no invented employers, projects, titles, or metrics.

export const profile = {
  name: 'Nabeel Ahmad',
  firstName: 'Nabeel',
  lastName: 'Ahmad',
  role: 'Full-Stack Engineer',
  location: 'Lahore, Pakistan',
  email: 'nabeel.dev.eng@gmail.com',
  phone: '+923117064200',
  phoneDisplay: '+92 311 7064200',
  linkedin: 'https://www.linkedin.com/in/nabeelamjaddev/',
  cvPath: '/nabeel-full-stack-engineer-cv.pdf',
  availability: 'Open to select engineering roles',
  // Rotating words that "stream" in the hero, echoing his LLM-streaming work.
  streamPhrases: [
    'AI-integrated systems',
    'cloud-native applications',
    'distributed microservices',
    'RAG pipelines',
    'AI workflows',
    'real-time data platforms',
  ],
  tagline:
    'I design and ship scalable, cloud-native systems — and lately, the AI that runs inside them.',
} as const;

// Two-part bio rewritten from the CV summary.
export const about = {
  lead:
    'Full-Stack Engineer with 6+ years building scalable, cloud-native applications on Next.js, NestJS, and distributed microservices.',
  body: [
    'I work across the whole stack — from event-driven backend services deployed on AWS and GCP to high-performance, SEO-friendly front-ends. My focus is production-grade systems where scalability, reliability, and performance are non-negotiable.',
    'Most recently I’ve gone deep on AI: LLM-powered features, RAG pipelines, and intelligent automation woven directly into the products I build.',
  ],
  facts: [
    { label: 'Based in', value: 'Lahore, Pakistan' },
    { label: 'Experience', value: '6+ years' },
    { label: 'Focus', value: 'AI · Cloud · Scale' },
    { label: 'Status', value: 'Open to work' },
  ],
} as const;

export type Experience = {
  company: string;
  title: string;
  period: string;
  start: string;
  summary: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    company: 'InvoZone',
    title: 'Senior Software Engineer',
    period: 'Oct 2021 — Present',
    start: '2021',
    summary:
      'Leading a real-time social media analytics platform and its move into AI-assisted insight.',
    points: [
      'Lead development of a social media analytics platform delivering real-time insight across Instagram, Twitter/X, Facebook, TikTok, YouTube, blogs, and forums.',
      'Integrated OpenAI APIs with streaming responses, cutting manual report-generation time by 60% and sharpening client turnaround.',
      'Designed LLM-based content summarization and automated reporting features.',
      'Built micro-services and RESTful APIs in NestJS to aggregate, filter, and serve live metadata.',
      'Delivered the front-end in Next.js — high-performance, SEO-friendly dashboards with interactive charts for reach, engagement, sentiment, and share-of-voice, plus post streams and media walls.',
      'Coordinated inter-service communication via RabbitMQ, Pub/Sub, and Apache Pulsar.',
    ],
  },
  {
    company: 'Petsaal Technologies',
    title: 'Software Engineer',
    period: 'Sept 2020 — Oct 2021',
    start: '2020',
    summary:
      'Shipped core features and tuned the backend for speed and reliability.',
    points: [
      'Designed and shipped key features that improved user experience and lifted customer satisfaction.',
      'Optimized backend queries and caching strategy, reducing API response time by 45% and dashboard load speed by 35%.',
      'Worked closely with cross-functional teams to align solutions with business goals and client needs.',
      'Identified and resolved critical bugs, reducing downtime and improving overall system reliability.',
    ],
  },
  {
    company: 'Bloomrix',
    title: 'Software Developer',
    period: 'Sep 2019 — Sept 2020',
    start: '2019',
    summary:
      'Built a content platform end-to-end, from scraping pipelines to a polished UI.',
    points: [
      'Designed and launched a user-friendly novel platform that grew a significant user base.',
      'Built efficient web-scraping scripts to gather and refresh content automatically.',
      'Created a robust database structure for effective storage, retrieval, and updates of scraped data.',
      'Designed RESTful APIs with the Node.js REST framework for front-end/back-end communication.',
      'Integrated OAuth authentication and role-based access control (RBAC) to harden security.',
      'Built front-end components with React, Redux, and Material-UI, improving page-load times by 30%.',
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  url: string;
  role: string;
  challenge: string;
  solution: string;
  result: string;
  tech: string[];
  // Real product screenshot shown as the case-study visual.
  image: string;
  // Two hues used for the tint/glow framing the screenshot.
  accent: [string, string];
};

export const projects: Project[] = [
  {
    name: 'Cybrology',
    tagline: 'AI-driven cybersecurity risk-assessment & training',
    url: 'https://cybrology.com',
    role: 'Team Lead · AI & Platform',
    challenge:
      'Security teams needed continuous, credible risk assessment and training — not one-off audits.',
    solution:
      'Led a team to build a platform with a RAG pipeline at its core, grounded in real cybersecurity knowledge bases: adaptive LMS skill assessments, personalized learning paths, realistic phishing simulations, live labs, gamified leaderboards, and team analytics.',
    result:
      'Instant vulnerability checks, a personalized risk index, and compliance readiness for SOC 2, HIPAA, GDPR, and NIST.',
    tech: ['Next.js', 'RAG', 'LLM', 'AI Workflows', 'LMS'],
    image: '/projects/cybrology.jpeg',
    accent: ['#6366F1', '#A855F7'],
  },
  {
    name: 'Ask — Hulul',
    tagline: 'Event management for the Saudi government',
    url: 'https://hulul.askco.sa',
    role: 'Full-Stack Engineer',
    challenge:
      'A government-grade event platform needed seamless planning and registration at scale, with strict availability.',
    solution:
      'Built a fast, responsive Next.js front-end backed by NestJS microservices containerized with Docker, deployed on Google Cloud Platform.',
    result:
      'A scalable, secure, highly-available platform serving public-sector event planning and registration.',
    tech: ['Next.js', 'NestJS', 'Docker', 'GCP', 'Microservices'],
    image: '/projects/hulul.jpeg',
    accent: ['#A855F7', '#EC4899'],
  },
  {
    name: 'Keyhole — Muck Rack',
    tagline: 'Social media insights for brands & agencies',
    url: 'https://keyhole.co',
    role: 'Full-Stack Engineer',
    challenge:
      'Brands, agencies, and institutions needed analytics that go beyond vanity metrics to real decisions.',
    solution:
      'Integrated React, Node.js, Express, CakePHP, and NestJS with MySQL to power Keyhole’s comprehensive social analytics.',
    result:
      'A social insights platform, now part of Muck Rack, helping teams monitor presence and make data-driven decisions.',
    tech: ['React', 'Node.js', 'Express', 'NestJS', 'MySQL'],
    image: '/projects/keyhole.jpeg',
    accent: ['#EC4899', '#F59E0B'],
  },
  {
    name: 'Nano Apply',
    tagline: 'AI that accelerates the job hunt',
    url: 'https://nanoapply.com',
    role: 'Full-Stack Engineer',
    challenge:
      'Applying to jobs meant re-filling the same forms and rewriting the same answers, over and over.',
    solution:
      'Built a web dashboard plus a browser extension that auto-fills repetitive application forms and generates tailored answers from an uploaded resume, with multiple role-specific profiles.',
    result:
      'One place to apply faster, manage role-specific profiles, and track application history.',
    tech: ['Next.js', 'LLM', 'Browser Extension', 'PostgreSQL'],
    image: '/projects/nanoapply.jpeg',
    accent: ['#22D3EE', '#6366F1'],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'PHP', 'Python'] },
  {
    category: 'AI & LLM',
    items: ['OpenAI API', 'RAG', 'LLM Integration', 'AI Workflows', 'AI Automation', 'AI Chatbots'],
  },
  { category: 'Frontend', items: ['Next.js', 'React', 'Redux', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'NestJS', 'Express'] },
  { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'] },
  {
    category: 'Cloud & DevOps',
    items: ['GCP', 'AWS', 'Docker', 'CI/CD', 'Git', 'RabbitMQ', 'Pub/Sub', 'Apache Pulsar'],
  },
];

export type Metric = {
  value: number;
  suffix: string;
  label: string;
};

// Every figure below is a real number from the CV.
export const metrics: Metric[] = [
  { value: 60, suffix: '%', label: 'faster report generation with streaming LLMs' },
  { value: 45, suffix: '%', label: 'faster API responses after backend tuning' },
  { value: 35, suffix: '%', label: 'quicker dashboard loads' },
  { value: 30, suffix: '%', label: 'improvement in page-load times' },
];

export const stats = [
  { value: '6+', label: 'Years shipping' },
  { value: '4', label: 'Featured products' },
  { value: '3', label: 'Engineering teams' },
] as const;

export const strengths = [
  {
    title: 'Frontend & Backend',
    body: 'Fluent across the stack, with real depth on both sides — from React interfaces to NestJS services.',
  },
  {
    title: 'Team Leadership & Agile',
    body: 'Guiding teams and projects with Agile practices that keep collaboration smooth and productive.',
  },
  {
    title: 'Research & Optimization',
    body: 'Thorough research to lift system performance, cut costs, and bring in modern engineering practices.',
  },
] as const;

export const education = {
  degree: 'BS, Computer Science',
  school: 'University of Lahore',
  period: '2015 — 2019',
  location: 'Lahore, Pakistan',
} as const;

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const;
