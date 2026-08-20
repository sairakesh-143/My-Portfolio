import { ProjectItem } from "./types";
import { authService } from "./auth";

export interface RawProjectInput {
  name: string;
  rawText?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string;
  problem?: string;
  features?: string;
  readmeContent?: string;
  notes?: string;
  category?: string;
}

// Built-in intelligent rule engine to format and structure project content
export function generateProjectWithBuiltinAI(input: RawProjectInput): Partial<ProjectItem> {
  const name = input.name.trim() || "Untitled Project";
  const rawContent = [
    input.rawText || "",
    input.problem || "",
    input.features || "",
    input.readmeContent || "",
    input.notes || "",
  ].filter(Boolean).join("\n\n");

  // Extract / Detect Technologies
  const techCandidates = [
    "React", "TypeScript", "JavaScript", "Python", "Node.js", "Express", "Supabase",
    "Firebase", "Tailwind CSS", "Next.js", "Vite", "MongoDB", "PostgreSQL", "Recharts",
    "Framer Motion", "Machine Learning", "PyTorch", "TensorFlow", "FastAPI", "Docker",
    "REST APIs", "GraphQL", "Redux", "Zustand", "Prisma", "OpenAI API", "Gemini API"
  ];

  const foundTech = new Set<string>();
  if (input.technologies) {
    input.technologies.split(/[,;\n]+/).forEach((t) => {
      const trimmed = t.trim();
      if (trimmed) foundTech.add(trimmed);
    });
  }

  // Detect tech from text
  techCandidates.forEach((t) => {
    const regex = new RegExp(`\\b${t.replace(/\./g, "\\.")}\\b`, "i");
    if (regex.test(rawContent) || regex.test(name)) {
      foundTech.add(t);
    }
  });

  if (foundTech.size === 0) {
    foundTech.add("React");
    foundTech.add("TypeScript");
    foundTech.add("Tailwind CSS");
  }

  const tags = Array.from(foundTech).slice(0, 7);

  // Detect Category
  let category: "Full Stack" | "AI & Data" | "Web App" | "Mobile" = "Full Stack";
  const lowerAll = (name + " " + rawContent + " " + (input.technologies || "")).toLowerCase();

  if (lowerAll.includes("ai") || lowerAll.includes("machine learning") || lowerAll.includes("data") || lowerAll.includes("model") || lowerAll.includes("prediction") || lowerAll.includes("analytics")) {
    category = "AI & Data";
  } else if (lowerAll.includes("mobile") || lowerAll.includes("react native") || lowerAll.includes("flutter") || lowerAll.includes("ios") || lowerAll.includes("android")) {
    category = "Mobile";
  } else if (lowerAll.includes("backend") || lowerAll.includes("node") || lowerAll.includes("supabase") || lowerAll.includes("api") || lowerAll.includes("database")) {
    category = "Full Stack";
  } else {
    category = "Web App";
  }

  // Generate Title & Tagline
  const title = name.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  let tagline = "";
  if (category === "AI & Data") {
    tagline = `Intelligent ${title} & Predictive Analytics Platform`;
  } else if (category === "Full Stack") {
    tagline = `Scalable ${title} & Full-Stack System Architecture`;
  } else {
    tagline = `Modern Responsive ${title} Application`;
  }

  const subtitle = input.notes || `${title} · Engineered for Performance & Scalability`;

  // Generate Problem & Solution
  let problem = input.problem?.trim();
  if (!problem) {
    problem = `Traditional approaches to managing ${title.toLowerCase()} workflows suffer from fragmented data, manual delays, and lack of real-time visibility.`;
  }

  let solution = "";
  if (input.features) {
    solution = `Engineered an automated solution leveraging ${tags.slice(0, 3).join(", ")} to streamline operations, provide real-time updates, and eliminate manual bottlenecks.`;
  } else {
    solution = `Delivers a robust end-to-end platform with automated decision logic, instant status feedback, and a high-performance responsive interface.`;
  }

  // Generate Short & Detailed Description
  const shortDescription = `A production-ready ${category.toLowerCase()} application designed to solve real-world bottlenecks through clean component architecture, reliable data layers, and intuitive user experiences.`;
  const description = `${title} is built to address critical operational pain points by integrating modern web technologies (${tags.join(", ")}) into an accessible, responsive, and secure digital platform.`;

  // Highlights
  const rawFeatureLines = (input.features || "")
    .split(/\n+/)
    .map((l) => l.replace(/^[-*•0-9.)\s]+/, "").trim())
    .filter((l) => l.length > 5);

  let highlights: string[] = [];
  if (rawFeatureLines.length >= 2) {
    highlights = rawFeatureLines.slice(0, 4);
  } else {
    highlights = [
      `Real-time dashboard and state management with ${tags[0] || "React"}`,
      `Secure RESTful data flows and optimized query performance`,
      `Mobile-first accessible UI with responsive dark mode aesthetics`,
      `Clean architectural modularity and TypeScript type-safety`,
    ];
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return {
    title,
    slug,
    subtitle,
    tagline,
    shortDescription,
    description,
    problem,
    solution,
    highlights,
    tags,
    category,
    githubUrl: input.githubUrl?.trim() || "https://github.com/sairakesh-143",
    liveUrl: input.liveUrl?.trim() || undefined,
    status: "Published",
    featured: true,
    impactMetric: `Engineered with ${tags[0] || "Modern Tech"} & ${tags[1] || "APIs"}`,
    role: "Full-Stack & Architecture Developer",
  };
}

// Optional Live Gemini API caller
export async function generateProjectWithGemini(
  input: RawProjectInput,
  apiKey: string
): Promise<Partial<ProjectItem>> {
  const prompt = `
You are an expert technical portfolio copywriter for a high-performing AI and Full-Stack Developer (Bhargava Sai Rakesh Reddy).
Transform the following raw project details into a structured, production-grade portfolio project JSON entry.

RAW PROJECT DETAILS:
- Name: ${input.name}
- Raw Text / Description: ${input.rawText || "N/A"}
- Problem Context: ${input.problem || "N/A"}
- Key Features: ${input.features || "N/A"}
- Technologies: ${input.technologies || "N/A"}
- GitHub URL: ${input.githubUrl || "https://github.com/sairakesh-143"}
- Live Demo URL: ${input.liveUrl || ""}
- README Snippet: ${input.readmeContent || "N/A"}
- Additional Notes: ${input.notes || "N/A"}

CRITICAL RULES:
1. NEVER invent fake facts, false metrics, or technologies not mentioned.
2. Return ONLY a valid JSON object matching the requested schema.
3. Be concise, punchy, and recruiter-friendly.

JSON Schema to return:
{
  "title": "string",
  "slug": "string",
  "subtitle": "string",
  "tagline": "string",
  "shortDescription": "string (1-2 sentences)",
  "description": "string (1 strong paragraph)",
  "problem": "string (the problem context)",
  "solution": "string (how the system solves it)",
  "highlights": ["string", "string", "string", "string"],
  "tags": ["string", "string", "string"],
  "category": "Full Stack" | "AI & Data" | "Web App" | "Mobile",
  "githubUrl": "string",
  "liveUrl": "string or empty",
  "impactMetric": "string",
  "role": "string"
}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Empty response from Gemini AI.");

  const parsed = JSON.parse(rawText);
  return {
    ...parsed,
    status: "Published",
    featured: true,
  };
}

export async function generateProject(input: RawProjectInput): Promise<Partial<ProjectItem>> {
  const settings = authService.getSettings();
  if (settings.aiProvider === "gemini" && settings.geminiApiKey) {
    try {
      return await generateProjectWithGemini(input, settings.geminiApiKey);
    } catch (err) {
      console.warn("Gemini API call failed, falling back to built-in transformer:", err);
      return generateProjectWithBuiltinAI(input);
    }
  }

  // Default to built-in smart transformer
  return generateProjectWithBuiltinAI(input);
}
