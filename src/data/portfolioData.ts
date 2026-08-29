export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problemSolution: {
    problem: string;
    solution: string;
  };
  highlights: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  category: "AI / ML" | "Web Development" | "RAG" | "Tools";
  featured: boolean;
  status: string;
  imageUrl?: string;
  features?: string[];
  contribution?: string;
  architecture?: string;
  result?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level: string; iconName?: string }[];
  usedIn?: string[];
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  badges: string[];
  icon: string;
  accentColor: "purple" | "blue" | "cyan" | "emerald" | "amber";
  isCurrent?: boolean;
}

export const portfolioData = {
  personal: {
    name: "Rakesh",
    fullName: "Bhargava Sai Rakesh Reddy",
    title: "AI & Full-Stack Developer",
    badge: "AI & FULL-STACK DEVELOPER",
    subheading: "B.Tech Student | AI & Full-Stack Developer",
    shortDescription:
      "Building practical AI-powered solutions, full-stack applications, and learning by creating real-world projects.",
    aboutBio:
      "I'm a passionate developer who loves turning ideas into real-world solutions. I enjoy working with modern technologies and building products that make an impact.",
    location: "Kavitam, Andhra Pradesh, India",
    education: "B.Tech — 3rd Year (Class of 2028)",
    branch: "Computer Science & Engineering / AI & DS",
    college: "KIET College, Kakinada",
    experience: "Fresher / Active Builder",
    interests: "AI, Web Dev, RAG, Open Source, Problem Solving",
    email: "dwarampudirakesh143@gmail.com",
    github: "https://github.com/sairakesh-143",
    linkedin: "https://www.linkedin.com/in/rakeshreddydwarampudi/",
    resumeUrl: "",
    stats: [
      { label: "Projects", value: "12+", description: "Built & Shipped" },
      { label: "Technologies", value: "15+", description: "Worked With" },
      { label: "Hackathons", value: "Multiple", description: "Participated & Won" },
    ],
  },

  whatIDo: [
    {
      id: "ai-rag",
      title: "AI & RAG",
      description:
        "Building AI applications using LLMs, RAG, vector databases and prompt engineering.",
      icon: "Brain",
      accent: "purple",
    },
    {
      id: "full-stack",
      title: "Full Stack",
      description:
        "Building web applications using React, Python, modern APIs and databases.",
      icon: "Globe",
      accent: "blue",
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      description:
        "Turning ideas into functional software solutions and hackathon prototypes.",
      icon: "Zap",
      accent: "cyan",
    },
  ],

  approach: [
    {
      title: "Learn",
      description: "Continuously exploring new technologies and best practices.",
      icon: "BookOpen",
      tag: "01",
    },
    {
      title: "Build",
      description: "Turning knowledge into practical, user-focused applications.",
      icon: "Hammer",
      tag: "02",
    },
    {
      title: "Ship",
      description: "Delivering quality products with clean, tested, and reliable code.",
      icon: "Rocket",
      tag: "03",
    },
  ],

  toolsDaily: [
    { name: "Git", category: "VCS" },
    { name: "GitHub", category: "Platform" },
    { name: "VS Code", category: "Editor" },
    { name: "Postman", category: "API Testing" },
    { name: "Supabase", category: "Backend" },
    { name: "Figma", category: "Design" },
    { name: "Chrome DevTools", category: "Debugging" },
  ],

  projects: [
    {
      id: "hacklens",
      title: "HackLens",
      subtitle: "AI-Powered Hackathon Project Assistant",
      description:
        "An AI assistant that helps hackathon participants generate ideas, plan architecture, get live tech stack recommendations, and build projects faster.",
      problemSolution: {
        problem:
          "Hackathon participants struggle to come up with unique ideas, structured architectures, and optimal tech stacks under strict time constraints.",
        solution:
          "HackLens uses LLMs and RAG pipelines to generate tailored project plans, recommend scalable tech stacks, and create complete implementation roadmaps in seconds.",
      },
      highlights: [
        "AI-driven concept generation & novelty evaluation",
        "Automated tech stack recommendations based on constraints",
        "Interactive RAG chat assistant for debugging & architecture",
        "Instant markdown export of full implementation blueprint",
      ],
      features: [
        "Idea Generation Engine",
        "Project Architecture Blueprint",
        "Tech Stack Suggestion",
        "AI Chat Assistant (Gemini & Groq)",
        "One-click Project Plan Export",
      ],
      contribution: "Full-Stack Development, RAG Pipeline, UI/UX Design & Prompt Engineering",
      architecture: "React.js + Python FastAPI + Supabase pgvector + Gemini & Groq APIs",
      result: "Reduced hackathon project planning from hours to seconds with AI-generated blueprints and instant tech stack recommendations.",
      tags: ["React.js", "Python", "Supabase", "PostgreSQL", "Gemini", "Groq", "RAG"],
      category: "AI / ML",
      featured: true,
      status: "Published",
      liveUrl: "https://dbsr.netlify.app/",
      githubUrl: "https://github.com/sairakesh-143",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    },
    {
      id: "smart-waste-sorting",
      title: "Smart Waste Sorting Assistant",
      subtitle: "Computer Vision + AI Recycling Guidance",
      description:
        "An intelligent assistant that detects waste type from images and camera feeds, suggesting proper disposal methods and recycling classification in real-time.",
      problemSolution: {
        problem:
          "Improper waste disposal leads to recycling contamination and environmental degradation due to lack of immediate sorting guidance.",
        solution:
          "Uses computer vision classification models to instantly identify recyclable, organic, and hazardous waste categories with step-by-step disposal advice.",
      },
      highlights: [
        "Real-time object detection and multi-class waste tagging",
        "Recycling feasibility index and municipal guidelines match",
        "Fast image upload & mobile camera integration",
        "Sub-150ms inference time with lightweight model deployment",
      ],
      features: [
        "Computer Vision Classification",
        "Live Camera Stream Inference",
        "Categorized Bin Recommendation",
        "Eco-Impact Points Tracker",
      ],
      contribution: "Computer Vision Model Training, Backend API & Responsive Frontend",
      architecture: "Python OpenCV + PyTorch + FastAPI + React UI",
      result: "Achieved sub-150ms inference time with multi-class waste detection and real-time disposal guidance.",
      tags: ["Python", "OpenCV", "PyTorch", "FastAPI", "React", "AI / CV"],
      category: "AI / ML",
      featured: true,
      status: "Published",
      liveUrl: "https://brsml.netlify.app/",
      githubUrl: "https://github.com/sairakesh-143",
      imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    },
    {
      id: "portfolio-admin-dashboard",
      title: "Portfolio Admin Dashboard",
      subtitle: "Full-Featured CMS for Portfolio Management",
      description:
        "A complete administration panel to manage projects, review contact messages, run AI content generation, and monitor analytics with real-time statistics.",
      problemSolution: {
        problem:
          "Developers frequently have to manually edit code files just to add a new project, modify tags, or update contact links.",
        solution:
          "Built a secure, modular CMS with CRUD project management, local/cloud storage sync, and automated AI assistance.",
      },
      highlights: [
        "Live CRUD for projects with instant client-side reactivity",
        "Contact message inbox with unread badges & replies",
        "AI workspace for drafting summaries and tech stack descriptions",
        "LocalStorage persistence with optional Supabase cloud sync",
      ],
      features: [
        "Interactive Project Management Table & Form",
        "Message Center & Contact Alerts",
        "AI Content Generation Studio",
        "Theme & Settings Control",
      ],
      contribution: "Complete Architecture, State Management, UI/UX & Backend Integration",
      architecture: "React + TypeScript + Tailwind CSS + Radix UI + Supabase",
      result: "Built a full CMS with CRUD project management, contact message inbox, and AI content generation studio.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Radix UI"],
      category: "Tools",
      featured: true,
      status: "Published",
      liveUrl: "/admin",
      githubUrl: "https://github.com/sairakesh-143/My-Portfolio",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      id: "task-manager-app",
      title: "Task Manager App",
      subtitle: "Modern Productivity & Sprint Organizer",
      description:
        "A modern task manager to organize tasks, track sprint progress, set priority levels, and boost productivity with clean drag-and-drop boards.",
      problemSolution: {
        problem:
          "Complex task management tools are cluttered and slow down agile solo developers and small student teams.",
        solution:
          "Designed a sleek, lightweight task organizer with priority filters, status columns, and instant persistence.",
      },
      highlights: [
        "Drag & drop task board with real-time status transitions",
        "Category tagging and urgent priority alerts",
        "Progress analytics and completed task archive",
        "Lightweight bundle size with instant loading",
      ],
      features: [
        "Kanban & List Views",
        "Priority Matrix",
        "Deadline Reminders",
        "Export & Backup Support",
      ],
      contribution: "Full-Stack Development, State Store & Responsive UI",
      architecture: "React + Tailwind CSS + LocalStorage / Firebase",
      result: "Delivered a lightweight productivity tool with drag-and-drop boards and instant persistence.",
      tags: ["React", "Tailwind CSS", "Firebase", "TypeScript"],
      category: "Web Development",
      featured: false,
      status: "Published",
      liveUrl: "https://dbsr.netlify.app/",
      githubUrl: "https://github.com/sairakesh-143",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    },
  ] as Project[],

  skillCategories: [
    {
      title: "Frontend",
      iconName: "Layout",
      description: "Modern, responsive, and performant user interfaces",
      skills: [
        { name: "React.js", level: "Core", iconName: "Atom" },
        { name: "TypeScript", level: "Core", iconName: "FileCode2" },
        { name: "JavaScript", level: "Core", iconName: "Code2" },
        { name: "HTML5", level: "Expert", iconName: "Globe" },
        { name: "CSS3", level: "Expert", iconName: "Sparkles" },
        { name: "Tailwind CSS", level: "Advanced", iconName: "Palette" },
      ],
      usedIn: ["HackLens", "Portfolio CMS", "Task Manager"],
    },
    {
      title: "Backend",
      iconName: "Server",
      description: "Scalable server architectures, APIs, and microservices",
      skills: [
        { name: "Python", level: "Advanced", iconName: "Terminal" },
        { name: "FastAPI", level: "Proficient", iconName: "Zap" },
        { name: "Node.js", level: "Proficient", iconName: "Cpu" },
        { name: "Express.js", level: "Proficient", iconName: "Server" },
        { name: "REST APIs", level: "Advanced", iconName: "Network" },
      ],
      usedIn: ["HackLens", "Smart Waste Sorting"],
    },
    {
      title: "AI / ML",
      iconName: "Brain",
      description: "Generative AI, RAG pipelines, and intelligent models",
      skills: [
        { name: "Generative AI", level: "Advanced", iconName: "Sparkles" },
        { name: "LLMs & APIs", level: "Advanced", iconName: "Bot" },
        { name: "RAG Architecture", level: "Proficient", iconName: "Database" },
        { name: "Prompt Engineering", level: "Advanced", iconName: "Layers" },
        { name: "Vector Databases", level: "Proficient", iconName: "Cpu" },
      ],
      usedIn: ["HackLens", "Smart Waste Sorting"],
    },
    {
      title: "Database",
      iconName: "Database",
      description: "Relational, vector, and real-time database systems",
      skills: [
        { name: "Supabase", level: "Advanced", iconName: "Flame" },
        { name: "PostgreSQL", level: "Advanced", iconName: "Database" },
        { name: "pgvector", level: "Proficient", iconName: "Sparkles" },
        { name: "Firebase", level: "Proficient", iconName: "Flame" },
      ],
      usedIn: ["HackLens", "Portfolio CMS", "Task Manager"],
    },
    {
      title: "Tools & Others",
      iconName: "Wrench",
      description: "Development environment, versioning, and design tooling",
      skills: [
        { name: "Git", level: "Advanced", iconName: "GitBranch" },
        { name: "GitHub", level: "Advanced", iconName: "Github" },
        { name: "VS Code", level: "Expert", iconName: "Laptop" },
        { name: "Postman", level: "Advanced", iconName: "Send" },
        { name: "Figma", level: "Proficient", iconName: "Figma" },
      ],
      usedIn: ["All Projects"],
    },
  ] as SkillCategory[],

  journey: [
    {
      year: "2026",
      title: "B.Tech in Computer Science & Engineering",
      subtitle: "Currently in 3rd Year · KIET College",
      description:
        "Pursuing undergraduate degree with deep focus on AI, Data Science, Web Development, and real-world software architecture.",
      badges: ["B.Tech 3rd Year", "AI & DS", "KIET College"],
      icon: "GraduationCap",
      accentColor: "purple",
      isCurrent: true,
    },
    {
      year: "2026",
      title: "Started Building AI & RAG Projects",
      subtitle: "Autonomous Agents & Retrieval Pipelines",
      description:
        "Began integrating Generative AI, LLM APIs (Gemini, Groq), vector databases, and Retrieval-Augmented Generation to solve real problems.",
      badges: ["RAG", "LLMs", "Vector DBs", "FastAPI"],
      icon: "Brain",
      accentColor: "cyan",
    },
    {
      year: "2026",
      title: "Hackathon Projects & Rapid Prototyping",
      subtitle: "Built HackLens & Smart Waste Sorting Assistant",
      description:
        "Collaborated in hackathons and built award-winning prototypes, delivering functional AI solutions under tight deadlines.",
      badges: ["Hackathons", "HackLens", "Computer Vision", "Team Lead"],
      icon: "Trophy",
      accentColor: "emerald",
    },
    {
      year: "2026",
      title: "Full-Stack Web Development",
      subtitle: "Production React & TypeScript Systems",
      description:
        "Mastered React, Tailwind CSS, TypeScript, and modern state architectures. Shipped high-performance portfolio CMS and web apps.",
      badges: ["React.js", "TypeScript", "Tailwind CSS", "Supabase"],
      icon: "Layers",
      accentColor: "blue",
    },
    {
      year: "Future",
      title: "Building More, Learning More",
      subtitle: "Seeking Internship & Engineering Roles",
      description:
        "Continuing to learn, contribute to open source, build impactful products, and collaborate with forward-thinking engineering teams.",
      badges: ["Open for Internships", "Continuous Learning", "Full-Stack + AI"],
      icon: "Sparkles",
      accentColor: "amber",
    },
  ] as JourneyMilestone[],

  currentlyBuilding: {
    focus: "AI & RAG Applications",
    description:
      "Actively exploring Retrieval-Augmented Generation, document intelligence, vector search, and AI-powered developer tools. Building projects that leverage LLMs to solve real-world problems.",
    explorations: [
      { name: "Retrieval-Augmented Generation", icon: "Database" },
      { name: "Document Intelligence", icon: "FileText" },
      { name: "Vector Search & Embeddings", icon: "Layers" },
      { name: "AI-Powered Developer Tools", icon: "Wrench" },
    ],
  },
};
