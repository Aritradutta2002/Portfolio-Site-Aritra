/**
 * Knowledge base and system instructions for Aritra Dutta's AI Portfolio Assistant.
 * Grounded in verified data from portfolioCatalog.ts and resume.pdf.
 */

export const SYSTEM_PROMPT = `
You are the official AI Portfolio Assistant for Aritra Dutta.
Your job is to answer questions from recruiters, engineering leaders, and collaborators about Aritra's work, skills, projects, and achievements.

### Strict Brevity & Tone Rules:
1. **Ultra-Compact**: Keep your entire response under 60–70 words. Use maximum 2 to 3 concise, high-impact bullet points.
2. **Zero Filler**: Never start with conversational fluff like "Certainly!", "Hello!", or "As an AI assistant...". Jump straight into the facts.
3. **Bold Key Metrics**: Highlight measurable impact in bold (e.g. **20× API speedup**, **Java 21**, **700+ LeetCode**, **CGPA 8.79**, **AlgoGuru**).
4. **Interactive Closer**: Always conclude with one short interactive prompt suggesting 2 logical next topics or links (e.g., "👉 *Ask about his TCS 20× speedup or explore [AlgoGuru](https://www.algoguru.online/)?*").
5. Ground all answers strictly in Aritra's verified facts below.

### Aritra's Profile:
- **Title**: Full Stack Application Engineer
- **Current Role**: System Engineer at Tata Consultancy Services (TCS), Bhubaneswar (Sep 2024 – Present)
- **Education**: B.Tech in Electronics & Communication from MAKAUT (2020–2024), **CGPA 8.79 / 10**
- **Availability**: Open to backend, cloud, and full-stack engineering roles
- **Contact**: Email: aritradutta049@gmail.com | LinkedIn: https://www.linkedin.com/in/aritra-dutta-rick20/ | Résumé: /resume.pdf

### Enterprise Experience at TCS:
- **Java 21 Modernization**: Migrated critical microservices from legacy Java 8 to Java 21 and Spring Boot 1.x.x to 4.x.x using AWS Transform (ATX).
- **Cloud Migration**: Moved legacy JBoss apps to Azure Tomcat PaaS with health checks and zero-downtime deployment slots.
- **20× API Speedup**: Optimized complex SQL queries and REST endpoints for high-throughput production services.
- **CI/CD & Productivity**: Jenkins CI/CD pipelines with Docker, SonarQube, JaCoCo, and accelerated delivery using Claude Code and GitHub Copilot.

### Featured Projects:
1. **AlgoGuru (https://www.algoguru.online/)**: Full-stack competitive programming platform with an in-browser Java sandbox and **Guru Bot**, an autonomous AI tutor built with Python, LangChain, and RAG. Database: Supabase & PostgreSQL with Row-Level Security (RLS).
2. **Enterprise Microservices Modernization (TCS)**: Java 21, Spring Boot 4, Azure PaaS, 20× API performance speedup.
3. **Algorithm & Sorting Visualizer**: 60 FPS interactive canvas engine animating sorting algorithms in real time. (GitHub: https://github.com/Aritradutta2002/new_Sorting_Visualizer)
4. **HuffZip**: C++ lossless compression utility using Huffman coding with interactive min-heap tree visualizer. (GitHub: https://github.com/Aritradutta2002/File_Compressor)

### Competitive Programming & Problem Solving:
- **700+ verified algorithmic solutions** across LeetCode (Rating 1672), CodeChef (Rating 1708, 3★), and Codeforces with 537+ commits.

### Technical Stack:
- **Languages**: Java 21, Python, TypeScript, SQL, C++
- **Backend**: Spring Boot (1.x.x to 4.x.x), Spring MVC, Spring Security, Spring Data JPA, Hibernate, REST APIs, Microservices, LangChain
- **Frontend**: React, Next.js, Angular, Tailwind CSS, TypeScript
- **Cloud & DevOps**: Azure PaaS, AWS, AWS Transform (ATX), Docker, Jenkins, SonarQube, Tomcat, JBoss, Git, Maven, Claude Code, GitHub Copilot
- **Databases**: PostgreSQL, Supabase, Oracle, MySQL, Apache Kafka
`.trim();

interface Topic {
  id: string;
  keywords: Record<string, number>;
  intros: string[];
  body: string;
}

const TOPICS: Topic[] = [
  {
    id: "me",
    keywords: {
      "who are you": 5, "who is aritra": 5, "about you": 5, "about aritra": 5,
      yourself: 4, bio: 4, intro: 4, background: 4, summary: 4, hi: 3, hello: 3, hey: 3,
      greetings: 3, role: 3, profile: 4,
    },
    intros: [
      "Here is a quick snapshot of Aritra:",
      "Meet Aritra Dutta:",
      "At a glance:",
    ],
    body:
      "- **Full Stack Engineer at TCS**: Upgrading enterprise microservices to **Java 21 & Spring Boot 4** with up to **20× faster APIs**.\n" +
      "- **GenAI Founder**: Built **[AlgoGuru](https://www.algoguru.online/)**, a CP platform with an autonomous RAG AI tutor (**Guru Bot**).\n" +
      "- **Algorithms & Academics**: **700+ LeetCode/DSA problems solved** and B.Tech from MAKAUT (**CGPA 8.79**).\n\n" +
      "👉 *Ask about his **TCS experience**, **tech stack**, or **[Download Résumé](/resume.pdf)**!*",
  },
  {
    id: "work",
    keywords: {
      tcs: 5, experience: 5, work: 4, job: 4, career: 4, enterprise: 4, modernization: 4,
      azure: 4, spring: 3, "spring boot": 4, "20x": 4, speedup: 4, optimization: 4, remediation: 4,
    },
    intros: [
      "Aritra's enterprise engineering at TCS:",
      "Key achievements at TCS (Sep 2024 – Present):",
      "Work experience at TCS:",
    ],
    body:
      "- **Java 21 Modernization**: Migrated legacy Java 8 microservices to **Java 21** and **Spring Boot 4.x**.\n" +
      "- **Cloud & PaaS**: Transitioned legacy JBoss apps to **Azure Tomcat PaaS** with health probes and deployment slots.\n" +
      "- **20× API Optimization**: Refactored complex SQL queries and endpoints, achieving **20× latency reductions**.\n\n" +
      "👉 *Curious about his **flagship projects** like AlgoGuru or his **core tech stack**?*",
  },
  {
    id: "projects",
    keywords: {
      project: 5, projects: 5, algoguru: 5, rag: 4, ai: 4, visualizer: 4, huffzip: 4,
      compressor: 4, sorting: 3, apps: 3, build: 3, built: 3, github: 2,
    },
    intros: [
      "Aritra's top engineering projects:",
      "Featured production projects:",
      "Flagship project highlights:",
    ],
    body:
      "- **[AlgoGuru](https://www.algoguru.online/)**: Full-stack CP learning platform with in-browser Java sandbox & RAG AI tutor (**Guru Bot**).\n" +
      "- **[Enterprise Java Modernization](https://github.com/Aritradutta2002)**: Microservices upgrade to **Java 21**, delivering **20× API speedups**.\n" +
      "- **[Sorting Visualizer](https://github.com/Aritradutta2002/new_Sorting_Visualizer)**: 60 FPS interactive HTML5 canvas engine animating algorithms.\n\n" +
      "👉 *Want to explore his **700+ LeetCode track** or **tech stack** next?*",
  },
  {
    id: "skills",
    keywords: {
      skill: 5, skills: 5, stack: 5, "tech stack": 5, tech: 4, language: 4, languages: 4,
      framework: 4, frameworks: 4, java: 4, python: 3, typescript: 3, react: 3, nextjs: 3,
      docker: 3, kubernetes: 2, jenkins: 3, backend: 3, frontend: 3,
    },
    intros: [
      "Aritra's core technology stack:",
      "Technical toolkit at a glance:",
      "Core competencies:",
    ],
    body:
      "- **Languages & Core**: **Java 21**, Python, TypeScript, SQL, C++.\n" +
      "- **Backend & Cloud**: **Spring Boot 4**, Microservices, REST APIs, **Azure PaaS**, AWS, Docker, Jenkins, SonarQube.\n" +
      "- **Frontend & AI**: React, Next.js, Tailwind CSS, LangChain, RAG architectures.\n\n" +
      "👉 *Ask about his **TCS modernization work** or **[Download Résumé PDF](/resume.pdf)**!*",
  },
  {
    id: "dsa",
    keywords: {
      leetcode: 5, dsa: 5, problem: 4, problems: 4, competitive: 5, codechef: 5,
      codeforces: 4, rating: 4, contest: 4, algorithms: 4, "data structures": 4, solved: 3,
    },
    intros: [
      "Competitive programming & algorithms track:",
      "Problem-solving credentials:",
      "DSA & LeetCode breakdown:",
    ],
    body:
      "- **700+ Problems Solved**: Active track across LeetCode, CodeChef, and Codeforces with 530+ commits.\n" +
      "- **Ratings**: **LeetCode 1672** (Top 15%), **CodeChef 1708 (3★)**, and 100+ CSES problems.\n" +
      "- **Specialties**: Graph theory, Dynamic Programming, and tree data structures.\n\n" +
      "👉 *Check out his **[LeetCode Vault](https://github.com/Aritradutta2002/LeetCode-Directory)** or ask about **AlgoGuru**!*",
  },
  {
    id: "contact",
    keywords: {
      contact: 5, hire: 5, email: 5, reach: 4, connect: 4, resume: 5, cv: 5,
      linkedin: 4, interview: 4, available: 4, availability: 4, recruiter: 3,
    },
    intros: [
      "Get in touch with Aritra:",
      "Connect with Aritra directly:",
      "Contact details & channels:",
    ],
    body:
      "- **Email**: [aritradutta049@gmail.com](mailto:aritradutta049@gmail.com)\n" +
      "- **LinkedIn**: [linkedin.com/in/aritra-dutta-rick20](https://www.linkedin.com/in/aritra-dutta-rick20/)\n" +
      "- **GitHub**: [github.com/Aritradutta2002](https://github.com/Aritradutta2002)\n" +
      "- **Verified Résumé**: [Download PDF](/resume.pdf)\n\n" +
      "👉 *Open to backend, cloud, and full-stack engineering opportunities!*",
  },
  {
    id: "education",
    keywords: {
      education: 5, degree: 5, college: 4, university: 4, makaut: 5, btech: 5,
      cgpa: 5, gpa: 4, graduate: 3, study: 3, academic: 3,
    },
    intros: [
      "Academic background:",
      "Education credentials:",
      "University details:",
    ],
    body:
      "- **Degree**: B.Tech in Electronics & Communication Engineering (2020–2024).\n" +
      "- **Institution**: MAKAUT, West Bengal, India.\n" +
      "- **Academic Performance**: Graduated with **CGPA 8.79 / 10**.\n\n" +
      "👉 *Would you like to review his **work experience at TCS** or **flagship projects**?*",
  },
  {
    id: "fun",
    keywords: {
      fun: 5, hobby: 5, hobbies: 5, "free time": 4, music: 4, interests: 4,
      personal: 3, "fun fact": 5, enjoy: 3, passion: 3,
    },
    intros: [
      "Beyond engineering:",
      "Aritra's personal interests:",
      "Outside of work:",
    ],
    body:
      "- 🏆 **Algorithmic Brainteasers**: Graph challenges and timed contest solving (700+ solved).\n" +
      "- 🎨 **Canvas Visualizers**: Built a 60 FPS real-time algorithm visualizer.\n" +
      "- 🎧 **EDM & Tech**: Ships clean Java code listening to ambient electronic music.\n\n" +
      "👉 *Ask about his **AlgoGuru platform** or **enterprise Java work**!*",
  },
];

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function scoreTopic(q: string, topic: Topic): number {
  let score = 0;
  for (const [kw, weight] of Object.entries(topic.keywords)) {
    if (q.includes(kw)) score += weight;
  }
  if (q === topic.id) score += 6;
  return score;
}

function renderTopic(topic: Topic, q: string): string {
  const intro = topic.intros[hashString(q) % topic.intros.length];
  return `${intro}\n\n${topic.body}`;
}

export function getLocalFallbackAnswer(query: string): string {
  const q = (query || "").toLowerCase().trim();

  if (!q) {
    return (
      "I'm Aritra's AI assistant. Ask me about his **experience at TCS**, **AlgoGuru project**, " +
      "**tech stack**, or **[Download his Résumé](/resume.pdf)**!"
    );
  }

  const ranked = TOPICS.map((t) => ({ topic: t, score: scoreTopic(q, t) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    return (
      "Aritra Dutta is a **Full Stack Application Engineer** at **TCS** specializing in Java microservices & GenAI.\n\n" +
      "- **Enterprise**: Upgraded core microservices to **Java 21 & Azure PaaS** with **20× API speedups**.\n" +
      "- **GenAI Builder**: Created **[AlgoGuru](https://www.algoguru.online/)** (LangChain + RAG interactive tutor).\n" +
      "- **Algorithms**: Solved **700+ problems** across LeetCode & CodeChef with **8.79 CGPA**.\n\n" +
      "👉 *Try asking about his **TCS role**, **AlgoGuru**, **core skills**, or **[Download Résumé](/resume.pdf)**!*"
    );
  }

  return renderTopic(ranked[0].topic, q);
}
