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
  category: "Full Stack" | "AI & Data" | "Web App";
  featured: boolean;
  status: string;
  impactMetric?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level: string; iconName?: string }[];
}

export interface MetricHighlight {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  role: string;
  description: string;
  badges: string[];
  isCurrent?: boolean;
}

export interface GithubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export const portfolioData = {
  personal: {
    name: "Rakesh",
    fullName: "Bhargava Sai Rakesh Reddy",
    initials: "BRS",
    title: "AI & Full-Stack Developer",
    statusBadge: "Available for Internship",
    availabilityDetail:
      "Currently seeking Full-Stack, AI, and Software Engineering internships (Summer / Fall). Ready to build impactful, scalable products.",
    shortBio:
      "I build intelligent, production-ready web applications that turn real-world problems into scalable digital solutions.",
    location: "Kakinada, Andhra Pradesh, India",
    profilePhoto: "/profile.jpg",
    proofStats: [
      { label: "Projects Built", value: "3+ Production Ready" },
      { label: "Core Focus", value: "AI + Full Stack" },
      { label: "Opportunity", value: "Open for Internships" },
    ],
    education: {
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "KIET College, Kakinada (Korangi)",
      status: "Undergraduate Student (Class of 2028)",
      timeline: "2024 – 2028",
    },
    email: "sairakesh.dev@gmail.com",
    github: "https://github.com/sairakesh-143",
    linkedin: "https://www.linkedin.com/in/rakesh-reddy-450787321/",
    resumeUrl: "https://github.com/sairakesh-143", // Fallback to GitHub / downloadable resume link
  },

  highlights: [
    {
      label: "Production Projects",
      value: "3+",
      description: "WareMind, Finance & Healthcare AI",
      icon: "Code2",
    },
    {
      label: "Core Specialization",
      value: "AI + Full Stack",
      description: "Modern web apps & intelligent models",
      icon: "Brain",
    },
    {
      label: "Hands-on Experience",
      value: "Problem Solver",
      description: "Clean architecture & practical APIs",
      icon: "Layers",
    },
    {
      label: "Graduation Target",
      value: "2028",
      description: "B.Tech (AI & DS) · KIET College",
      icon: "GraduationCap",
    },
  ] as MetricHighlight[],

  whatIBuild: [
    {
      id: "ai-apps",
      title: "AI-Powered Applications",
      description:
        "Intelligent applications combining smart decision-making models, AI APIs, predictive logic, and automated workflows.",
      icon: "Brain",
      points: [
        "AI integrations & intelligent task automation",
        "Predictive classification & anomaly detection logic",
        "Data-driven conversational and analytics features",
      ],
      tag: "Intelligent Systems",
    },
    {
      id: "full-stack",
      title: "Full-Stack Web Apps",
      description:
        "Modern frontend, backend, and database architectures engineered for speed, high performance, and great user experience.",
      icon: "Laptop",
      points: [
        "Component-driven React & TypeScript architecture",
        "Secure RESTful APIs, Node.js & Firebase backends",
        "Mobile-first, responsive, and accessible UI engineering",
      ],
      tag: "End-to-End Solutions",
    },
    {
      id: "data-products",
      title: "Data-Driven Products",
      description:
        "Dashboards, analytics engines, and practical data tools turning complex raw inputs into clear, actionable business metrics.",
      icon: "BarChart3",
      points: [
        "Real-time data visualization & interactive metrics",
        "Inventory tracking, financial flows & healthcare audits",
        "High-density, responsive dashboard dashboards",
      ],
      tag: "Analytics & Insights",
    },
  ],

  projects: [
    {
      id: "waremind-ai",
      title: "WareMind AI",
      subtitle: "Smart Warehouse Operations & Order Fulfillment System",
      description:
        "An intelligent warehouse operations platform designed to automate inventory visibility, order prioritization, smart batching, fulfillment tracking, and operational decisions.",
      problemSolution: {
        problem:
          "Traditional fulfillment centers suffer from inventory blind spots, slow manual batching, and stockout delays that hurt SLA fulfillment times.",
        solution:
          "WareMind AI provides automated order prioritization, real-time multi-zone inventory allocation, predictive replenishment triggers, and live operator routing.",
      },
      highlights: [
        "Real-time inventory visibility across multi-zone warehouse layouts",
        "Automated order prioritization & dynamic allocation engine",
        "Fulfillment bottleneck analytics & worker task routing",
        "Sub-100ms UI interactions with responsive data tables",
      ],
      tags: ["React", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs", "Analytics"],
      liveUrl: "https://dbsr.netlify.app/",
      githubUrl: "https://github.com/sairakesh-143",
      category: "Full Stack",
      featured: true,
      status: "Production Ready",
      impactMetric: "Real-Time Multi-Zone Allocation",
    },
    {
      id: "ai-finance-dashboard",
      title: "AI Finance",
      subtitle: "Intelligent Personal Finance & Budget Analytics Dashboard",
      description:
        "A full-featured personal financial analytics dashboard that visualizes cash flows, detects spending anomalies, and provides predictive budget recommendations.",
      problemSolution: {
        problem:
          "Individuals and small teams struggle to aggregate multi-channel expenses, spot sneaky recurring charges, and forecast month-end balance shortfalls.",
        solution:
          "Visualizes spending trends with automated anomaly detection, recurring charge classification, and interactive predictive budget forecasting charts.",
      },
      highlights: [
        "Interactive cashflow charts and customizable category breakdowns",
        "AI-assisted spending anomaly and recurring expense tracking",
        "Configurable budget thresholds with visual warning alerts",
        "Instant client-side filtering and dark mode data visualizations",
      ],
      tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Data Visualization"],
      liveUrl: "https://brsml.netlify.app/",
      githubUrl: "https://github.com/sairakesh-143",
      category: "AI & Data",
      featured: true,
      status: "Active Project",
      impactMetric: "Predictive Cash Flow Insights",
    },
    {
      id: "healthguard-ai",
      title: "HealthGuard AI",
      subtitle: "AI-Powered Medical Fraud & Clinical Inconsistencies Detection",
      description:
        "A security-focused AI healthcare platform analyzing clinical records, diagnostic histories, and claims data to identify potential billing fraud and medical discrepancies.",
      problemSolution: {
        problem:
          "Manual healthcare record and insurance audit processes are slow, error-prone, and allow billing discrepancies and inconsistencies to slip through.",
        solution:
          "Leverages rule-based validation and pattern recognition algorithms to flag diagnostic and billing inconsistencies in real time.",
      },
      highlights: [
        "Automated medical claim consistency checks and anomaly scoring",
        "Patient record visualization and diagnostic timeline explorer",
        "Security-first audit trails, compliance exports, and report generation",
        "Clean REST API integration with robust schema validation",
      ],
      tags: ["React", "TypeScript", "Python", "Node.js", "Healthcare AI", "REST API"],
      liveUrl: "https://lnkd.in/eFbEk2UD",
      githubUrl: "https://github.com/sairakesh-143/portfolio",
      category: "Full Stack",
      featured: true,
      status: "Featured Project",
      impactMetric: "Automated Clinical Audit Engine",
    },
  ] as Project[],

  journey: [
    {
      year: "2024",
      title: "Development Foundations",
      role: "Self-Driven Learning & CS Fundamentals",
      description:
        "Started deep dive into Web Development and Computer Science fundamentals. Mastered HTML5, CSS3, JavaScript (ES6+), and Python algorithms. Built initial frontend interactive applications.",
      badges: ["JavaScript", "Python", "HTML/CSS", "Git Basics"],
    },
    {
      year: "2025",
      title: "AI & Data Science Exploration",
      role: "B.Tech Undergraduate at KIET College",
      description:
        "Expanded into Data Science, Machine Learning fundamentals, and AI API integrations. Engineered healthcare analysis tools (HealthGuard AI) and explored predictive models.",
      badges: ["Machine Learning", "React", "Data Analysis", "AI APIs"],
    },
    {
      year: "2026",
      title: "Full-Stack + AI Production Systems",
      role: "Software Engineering & Real-World Projects",
      description:
        "Built production-ready applications including WareMind AI and AI Finance Dashboard. Focused on robust component architectures, TypeScript safety, and scalable web solutions.",
      badges: ["TypeScript", "Node.js", "Tailwind CSS", "Vite", "Recharts"],
    },
    {
      year: "2026 & Beyond",
      title: "Open to Internship Opportunities",
      role: "Aspiring Software Engineer / Full-Stack & AI",
      description:
        "Actively seeking internships and collaborative roles where I can contribute to production codebases, ship user-centric products, and grow with ambitious engineering teams.",
      badges: ["Internships", "Full Stack", "AI Engineering", "Collaboration"],
      isCurrent: true,
    },
  ] as JourneyMilestone[],

  skillCategories: [
    {
      title: "Frontend",
      iconName: "Layout",
      description: "Building fast, accessible, and responsive user interfaces",
      skills: [
        { name: "React", level: "Core", iconName: "Atom" },
        { name: "TypeScript", level: "Core", iconName: "FileCode2" },
        { name: "JavaScript (ES6+)", level: "Core", iconName: "Code2" },
        { name: "Tailwind CSS", level: "Advanced", iconName: "Palette" },
        { name: "HTML5", level: "Expert", iconName: "Globe" },
        { name: "CSS3", level: "Expert", iconName: "Sparkles" },
      ],
    },
    {
      title: "Backend",
      iconName: "Server",
      description: "Developing scalable server logic and REST endpoints",
      skills: [
        { name: "Python", level: "Proficient", iconName: "Terminal" },
        { name: "Node.js", level: "Proficient", iconName: "Cpu" },
        { name: "Express.js", level: "Proficient", iconName: "Server" },
        { name: "REST APIs", level: "Advanced", iconName: "Network" },
        { name: "Firebase", level: "Proficient", iconName: "Flame" },
      ],
    },
    {
      title: "AI & Data",
      iconName: "Brain",
      description: "Applying machine learning, data models, and intelligent APIs",
      skills: [
        { name: "Python", level: "Proficient", iconName: "Terminal" },
        { name: "Machine Learning", level: "Proficient", iconName: "Brain" },
        { name: "AI APIs & Prompting", level: "Advanced", iconName: "Sparkles" },
        { name: "Data Analysis", level: "Proficient", iconName: "BarChart3" },
      ],
    },
    {
      title: "Tools & Workflow",
      iconName: "Wrench",
      description: "Professional developer workflow, versioning, and build tooling",
      skills: [
        { name: "Git", level: "Advanced", iconName: "GitBranch" },
        { name: "GitHub", level: "Advanced", iconName: "Github" },
        { name: "Vite", level: "Advanced", iconName: "Zap" },
        { name: "VS Code", level: "Advanced", iconName: "Laptop" },
        { name: "Vercel / Netlify", level: "Advanced", iconName: "Cloud" },
      ],
    },
  ] as SkillCategory[],

  githubShowcase: {
    username: "sairakesh-143",
    profileUrl: "https://github.com/sairakesh-143",
    stats: [
      { label: "Active Repositories", value: "8+" },
      { label: "Core Stacks", value: "TS · Python · React" },
      { label: "Commit Consistency", value: "Active Builder" },
    ],
    topRepos: [
      {
        name: "WareMind-AI",
        description: "Intelligent Warehouse Operations & Order Fulfillment System with multi-zone allocation.",
        language: "TypeScript",
        stars: 3,
        forks: 1,
        url: "https://github.com/sairakesh-143",
      },
      {
        name: "AI-Finance-Dashboard",
        description: "Personal finance analytics dashboard with anomaly tracking and interactive visual charts.",
        language: "TypeScript",
        stars: 2,
        forks: 0,
        url: "https://github.com/sairakesh-143",
      },
      {
        name: "HealthGuard-AI",
        description: "AI-driven clinical claims analysis and medical discrepancy detection system.",
        language: "Python",
        stars: 2,
        forks: 0,
        url: "https://github.com/sairakesh-143",
      },
      {
        name: "My-Portfolio",
        description: "Production portfolio showcase built with React, Vite, Tailwind CSS, and Framer Motion.",
        language: "TypeScript",
        stars: 1,
        forks: 0,
        url: "https://github.com/sairakesh-143/My-Portfolio",
      },
    ] as GithubRepo[],
  },

  aboutPillars: [
    {
      title: "Academic Background",
      subtitle: "B.Tech in AI & Data Science",
      description:
        "Undergraduate at KIET College, Kakinada (Korangi). Building strong foundations in data structures, algorithms, machine learning, and system architecture.",
      icon: "GraduationCap",
      tags: ["AI & Data Science", "KIET College", "Kakinada"],
    },
    {
      title: "Product-First Full Stack",
      subtitle: "End-to-End Craftsmanship",
      description:
        "I don't just build UI mockups; I focus on shipping end-to-end applications with clean architectures, robust error handling, and high-performance user journeys.",
      icon: "Layers",
      tags: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    },
    {
      title: "Practical AI Integrations",
      subtitle: "Beyond the Hype",
      description:
        "Applying AI where it truly creates leverage — operational automation, financial insights, and automated discrepancy detection rather than gimmicks.",
      icon: "Brain",
      tags: ["Python", "ML Foundations", "AI APIs", "Automation"],
    },
    {
      title: "Collaboration & Growth",
      subtitle: "Continuous Improvement",
      description:
        "Driven by feedback, version control best practices, clean documentation, and learning emerging web standards rapidly.",
      icon: "Sparkles",
      tags: ["Git Workflow", "Clean Code", "Fast Learner"],
    },
  ],
};
