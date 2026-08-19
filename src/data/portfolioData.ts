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
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level: string; icon?: string }[];
}

export interface MetricHighlight {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export const portfolioData = {
  personal: {
    name: "Rakesh",
    fullName: "Bhargava Sai Rakesh Reddy",
    initials: "BRS",
    title: "AI & Full Stack Developer",
    statusBadge: "Open to Internship / Full Stack Opportunities",
    shortBio:
      "I build modern full-stack applications and AI-powered solutions that solve practical problems and create useful user experiences.",
    location: "Kakinada, Andhra Pradesh, India",
    education: {
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "KIET College, Kakinada (Korangi)",
      status: "Undergraduate Student",
    },
    email: "sairakesh.dev@gmail.com",
    github: "https://github.com/sairakesh-143",
    linkedin: "https://www.linkedin.com/in/rakesh-reddy-450787321/",
    resumeUrl: "https://github.com/sairakesh-143",
  },

  highlights: [
    {
      label: "Focus Area",
      value: "AI & Full Stack",
      description: "Modern web applications & intelligent models",
      icon: "Code2",
    },
    {
      label: "Education",
      value: "B.Tech (AI & DS)",
      description: "KIET College, Kakinada",
      icon: "GraduationCap",
    },
    {
      label: "Real Projects",
      value: "Production Ready",
      description: "WareMind, Finance & Healthcare AI",
      icon: "Layers",
    },
    {
      label: "Availability",
      value: "Open for Roles",
      description: "Internships & Full Stack engineering",
      icon: "Briefcase",
    },
  ] as MetricHighlight[],

  aboutPillars: [
    {
      title: "Education",
      subtitle: "B.Tech in AI & Data Science",
      description:
        "Pursuing Artificial Intelligence & Data Science at KIET College, Kakinada. Deepening knowledge in algorithms, system design, machine learning foundations, and modern computer science.",
      icon: "GraduationCap",
      tags: ["AI & Data Science", "KIET College", "Kakinada"],
    },
    {
      title: "Full Stack Development",
      subtitle: "Scalable Web Architectures",
      description:
        "Building production-grade web applications with modern React, TypeScript, Vite, Node.js, Express, and database layers, prioritizing performance, responsiveness, and clean code.",
      icon: "Layers",
      tags: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    },
    {
      title: "AI & Machine Learning",
      subtitle: "Intelligent Workflows",
      description:
        "Implementing predictive models, smart decision logic, and integrating modern AI APIs to transform complex data into actionable automated user experiences.",
      icon: "Brain",
      tags: ["Python", "ML Models", "AI APIs", "Automation"],
    },
    {
      title: "Problem Solving",
      subtitle: "Practical Real-World Focus",
      description:
        "Driven by creating software that solves concrete human and operational bottlenecks with maintainable architecture, accessibility best practices, and fast load times.",
      icon: "Sparkles",
      tags: ["Architecture", "Accessibility", "Performance"],
    },
  ],

  whatIBuild: [
    {
      title: "Full Stack Web Applications",
      description:
        "Responsive, accessible, production-ready web apps with clean architecture, smooth user interactions, and robust backend integrations.",
      icon: "Laptop",
      points: [
        "Component-driven React & TypeScript architecture",
        "RESTful API design and database integrations",
        "Mobile-first, high-performance UI engineering",
      ],
    },
    {
      title: "AI-Powered Applications",
      description:
        "Intelligent applications combining smart decision-making models, AI APIs, and predictive logic to automate complex user workflows.",
      icon: "Brain",
      points: [
        "AI-driven classification and anomaly detection",
        "Automated operational recommendations & insights",
        "Seamless integration with modern frontend interfaces",
      ],
    },
    {
      title: "Data & Dashboard Solutions",
      description:
        "Interactive analytics dashboards and visualization platforms turning complex datasets into clear, actionable business metrics.",
      icon: "BarChart3",
      points: [
        "Real-time data visualization and interactive metrics",
        "Warehouse inventory, financial tracking & analytics",
        "Clean, high-density dashboard layouts",
      ],
    },
  ],

  projects: [
    {
      id: "waremind-ai",
      title: "WareMind AI",
      subtitle: "Smart Warehouse Operations & Order Fulfillment",
      description:
        "An intelligent warehouse operations platform focused on inventory visibility, order prioritization, smart allocation, fulfillment tracking, and operational decision-making.",
      problemSolution: {
        problem:
          "Traditional fulfillment centers suffer from inventory blind spots, stockout delays, and slow manual order batching.",
        solution:
          "WareMind AI provides automated order prioritization, real-time inventory allocation, and predictive replenishment triggers.",
      },
      highlights: [
        "Real-time inventory visibility across warehouse zones",
        "Automated order prioritization & allocation engine",
        "Fulfillment bottleneck analytics & worker task routing",
      ],
      tags: ["React", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs", "Analytics"],
      liveUrl: "https://dbsr.netlify.app/",
      githubUrl: "https://github.com/sairakesh-143",
      category: "Full Stack",
      featured: true,
      status: "Production Ready",
    },
    {
      id: "ai-finance-dashboard",
      title: "AI Finance Dashboard",
      subtitle: "Intelligent Financial Analytics & Spending Insights",
      description:
        "An intelligent finance dashboard designed to visualize financial data, track spending, and provide actionable insights through a modern responsive interface.",
      problemSolution: {
        problem:
          "Users and teams struggle to understand multi-account cash flows and predict upcoming month-end budget deficits.",
        solution:
          "Visualizes spending trends with automated anomaly detection, categorization, and predictive budget forecasting.",
      },
      highlights: [
        "Interactive cashflow charts and category breakdowns",
        "AI-assisted spending anomaly and recurring expense tracking",
        "Configurable budget thresholds with visual alerts",
      ],
      tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Data Visualization"],
      liveUrl: "https://brsml.netlify.app/",
      githubUrl: "https://github.com/sairakesh-143",
      category: "AI & Data",
      featured: true,
      status: "Active Project",
    },
    {
      id: "healthguard-ai",
      title: "HealthGuard AI",
      subtitle: "Healthcare Analysis & Inconsistencies Detection",
      description:
        "An AI-powered healthcare solution focused on analyzing medical information and identifying potential fraud or inconsistencies.",
      problemSolution: {
        problem:
          "Manual healthcare record audits are error-prone, time-consuming, and let billing discrepancies go unnoticed.",
        solution:
          "Leverages pattern verification and medical data validation to flag claims inconsistencies in real-time.",
      },
      highlights: [
        "Automated medical claim consistency checks",
        "Patient record visualization and diagnostic timeline",
        "Security-first audit trails and compliance reports",
      ],
      tags: ["React", "TypeScript", "Python", "Node.js", "Healthcare AI", "REST API"],
      liveUrl: "https://lnkd.in/eFbEk2UD",
      githubUrl: "https://github.com/sairakesh-143/portfolio",
      category: "Full Stack",
      featured: true,
      status: "Featured Project",
    },
  ] as Project[],

  skillCategories: [
    {
      title: "Frontend",
      iconName: "Layout",
      description: "Building fast, accessible, and responsive user interfaces",
      skills: [
        { name: "React", level: "Core" },
        { name: "TypeScript", level: "Core" },
        { name: "JavaScript (ES6+)", level: "Core" },
        { name: "HTML5", level: "Expert" },
        { name: "CSS3", level: "Expert" },
        { name: "Tailwind CSS", level: "Advanced" },
      ],
    },
    {
      title: "Backend",
      iconName: "Server",
      description: "Developing scalable server logic and data endpoints",
      skills: [
        { name: "Node.js", level: "Proficient" },
        { name: "Express", level: "Proficient" },
        { name: "REST APIs", level: "Advanced" },
        { name: "Firebase", level: "Proficient" },
        { name: "MongoDB", level: "Working Knowledge" },
      ],
    },
    {
      title: "AI & Data",
      iconName: "Brain",
      description: "Applying machine learning, data models, and intelligent APIs",
      skills: [
        { name: "Python", level: "Proficient" },
        { name: "Machine Learning", level: "Proficient" },
        { name: "AI APIs", level: "Advanced" },
        { name: "Data Analysis", level: "Proficient" },
      ],
    },
    {
      title: "Tools",
      iconName: "Wrench",
      description: "Professional developer workflow, versioning, and build tooling",
      skills: [
        { name: "Git", level: "Advanced" },
        { name: "GitHub", level: "Advanced" },
        { name: "Vite", level: "Advanced" },
        { name: "VS Code", level: "Advanced" },
        { name: "Vercel", level: "Advanced" },
      ],
    },
  ] as SkillCategory[],
};
