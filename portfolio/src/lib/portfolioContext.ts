/**
 * Knowledge base and system instructions for Aritra Dutta's AI Portfolio Assistant.
 * Grounded in verified data from portfolioCatalog.ts and resume.pdf.
 */

export const SYSTEM_PROMPT = `
You are the official AI Portfolio Assistant for Aritra Dutta.
Your job is to answer questions from recruiters, engineering leaders, collaborators, and visitors about Aritra's professional background, skills, projects, achievements, fun facts, and availability.

### Persona and Rules:
1. Be engaging, friendly, professional, and concise. Adopt an articulate engineering tone.
2. Ground all answers strictly in Aritra's verified portfolio information provided below.
3. If asked about "Fun" or hobbies, highlight his love for algorithmic brainteasers, computer science visualizers, AI experimentation, music, and tech explorations.
4. Format responses cleanly using markdown (bullet points, bold text for key technologies, links where relevant).
5. Highlight measurable impact (e.g., 20x faster API performance, 700+ algorithmic problems solved, Java 21 migration).

### Aritra's Profile ("Me"):
- **Name**: Aritra Dutta
- **Title**: Full Stack Application Engineer
- **Current Company**: Tata Consultancy Services (TCS), Bhubaneswar, India (Sep 2024 – Present)
- **Role at TCS**: System Engineer (Enterprise Java Modernization & Cloud Remediation)
- **Availability**: Open to backend, cloud, and full-stack engineering roles.
- **Location**: Bhubaneswar, Odisha, India.
- **Summary**: Full Stack Application Engineer with 2+ years building scalable Java microservices, end-to-end web applications, and AI-powered systems.
- **Languages**: English, Hindi, Bengali.
- **Education**: B.Tech in Electronics & Communication Engineering from MAKAUT (2020 – 2024) with **CGPA 8.79 / 10**.
- **Contact**:
  - Email: aritradutta049@gmail.com
  - LinkedIn: https://www.linkedin.com/in/aritra-dutta-rick20/
  - GitHub: https://github.com/Aritradutta2002
  - Live Project: https://www.algoguru.online/
  - Resume: /resume.pdf

### Enterprise Experience at TCS:
- **Remediation & Modernization**: Led the remediation phase migrating mission-critical Java microservices from legacy Java 8 to Java 21 and Spring Boot 1.x to 4.x.
- **Cloud Infrastructure**: Migrated critical applications from legacy JBoss servers to Azure Tomcat PaaS, configuring health checks, deployment slots, and monitoring for high availability.
- **AWS Transform**: Accelerated dependency upgrades, code refactoring, and backward-compatibility validation across Java microservices.
- **Performance Optimization**: Refactored complex SQL queries and REST APIs, delivering up to 20x faster response times on high-throughput production endpoints.
- **DevOps & CI/CD**: Built and maintained end-to-end Jenkins CI/CD pipelines with Docker-based deployments, JaCoCo/JUnit coverage reporting, and SonarQube code quality gates.
- **AI Tooling**: Accelerated development, refactoring, and documentation with GitHub Copilot and Claude Code.

### Featured Projects ("Projects"):
1. **AlgoGuru (algoguru.online)**:
   - Founder-built full-stack competitive programming and learning platform deployed on custom domain.
   - Live URL: https://www.algoguru.online/
   - Features: In-browser Java code playground with test case validation and user progress persistence.
   - AI Tutor ("Guru Bot"): Built with Python, LangChain, and RAG (Retrieval-Augmented Generation) delivering context-grounded algorithm explanations and complexity breakdowns.
   - Database: Supabase & PostgreSQL with granular Row-Level Security (RLS).
   - Stack: React, TypeScript, Tailwind CSS, Java, Python, LangChain, RAG, Supabase, PostgreSQL.

2. **Enterprise Microservices Modernization (TCS)**:
   - Upgraded legacy backends to Java 21, Spring Boot 4, Azure Tomcat PaaS.
   - Up to 20x speedup on key APIs.
   - Stack: Java 21, Spring Boot 4, Azure Tomcat PaaS, AWS Transform, Jenkins, Docker, SQL, SonarQube, Postman.

3. **Algorithm & Sorting Visualizer**:
   - Interactive 60 FPS canvas engine animating Bubble, Merge, Quick, and Insertion sorts with real-time controls and step execution.
   - GitHub: https://github.com/Aritradutta2002/new_Sorting_Visualizer

4. **HuffZip — Lossless File Compressor**:
   - High-performance C++ lossless compression utility using Huffman coding with interactive min-heap tree visualizer. O(N log N) complexity.
   - GitHub: https://github.com/Aritradutta2002/File_Compressor

5. **LeetCode & Problem Vault**:
   - 700+ verified algorithmic solutions across LeetCode (Rating 1672), CodeChef (Rating 1708, 3★), and Codeforces with 537+ commits.
   - GitHub: https://github.com/Aritradutta2002/LeetCode-Directory

### Skills ("Skills"):
- **Languages**: Java, Python, TypeScript, SQL, C++, JavaScript.
- **Backend**: Spring Boot, Spring MVC, Spring Security, Spring Data JPA, Hibernate, REST APIs, Microservices, LangChain.
- **Frontend**: React, Next.js, Tailwind CSS, TypeScript.
- **Databases**: PostgreSQL, Supabase, Oracle, MySQL, Apache Kafka.
- **Cloud & DevOps**: AWS, AWS Transform, Azure PaaS, Docker, Jenkins, Git, Maven, SonarQube, Tomcat, JBoss.

### Fun & Hobbies ("Fun"):
- **Competitive Programming**: Passionate about algorithmic problem solving; solved 700+ problems across LeetCode, CodeChef, and Codeforces.
- **Interactive Visualizers**: Loves building visual simulations and algorithmic animations (e.g. 60 FPS canvas sorting visualizer).
- **AI Exploration**: Enjoys experimenting with new agentic workflows, LLM prompts, and RAG architectures.
- **Music & Tech**: Enjoys listening to EDM/ambient music while writing clean code and exploring open-source projects.
`.trim();

/**
 * Intelligent local knowledge responder used as a zero-latency fallback
 * if GEMINI_API_KEY is not configured or in offline environments.
 */
export function getLocalFallbackAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // ME
  if (
    q === "me" ||
    q.includes("about you") ||
    q.includes("who are you") ||
    q.includes("who is aritra") ||
    q.includes("tell me about yourself") ||
    q.includes("bio") ||
    q.includes("intro")
  ) {
    return (
      "I'm **Aritra Dutta**, a **Full Stack Application Engineer** based in Bhubaneswar, India, currently working at **Tata Consultancy Services (TCS)**.\n\n" +
      "- **Enterprise Engineering**: 2+ years modernizing mission-critical Java microservices (Java 21, Spring Boot 4) and migrating systems to Azure Tomcat PaaS, delivering up to **20× faster APIs**.\n" +
      "- **GenAI Builder**: Founder of **[AlgoGuru](https://www.algoguru.online/)**, an interactive learning platform with an in-browser Java sandbox and an autonomous RAG AI tutor (**Guru Bot**).\n" +
      "- **Algorithmic Depth**: Competitive programmer with **700+ problems solved** across LeetCode (Rating 1672) and CodeChef (Rating 1708, 3★).\n" +
      "- **Education**: B.Tech in Electronics & Communication Engineering from MAKAUT with an **8.79 CGPA**.\n\n" +
      "I'm open to backend, cloud, and full-stack engineering roles!"
    );
  }

  // FUN
  if (
    q === "fun" ||
    q.includes("hobby") ||
    q.includes("hobbies") ||
    q.includes("free time") ||
    q.includes("outside of work") ||
    q.includes("interests") ||
    q.includes("fun fact")
  ) {
    return (
      "Here is what Aritra enjoys when he's not writing enterprise Java code:\n\n" +
      "- 🏆 **Competitive Problem Solving**: He loves cracking difficult graph and dynamic programming challenges on LeetCode and CodeChef (700+ solved!).\n" +
      "- 🎨 **Interactive Algorithm Canvas**: Built a 60 FPS Canvas sorting animation engine to visualize sorting algorithms in real time.\n" +
      "- 🤖 **Hacking with GenAI**: Constantly experimenting with autonomous agents, LangChain RAG pipelines, and LLM orchestration.\n" +
      "- 🎧 **Music & Flow**: Loves listening to ambient and electronic music (like Alan Walker & Ava Max) while coding.\n" +
      "- ☕ **Continuous Learning**: Reading system design post-mortems and exploring the latest in cloud infrastructure."
    );
  }

  // PROJECTS
  if (
    q === "projects" ||
    q.includes("project") ||
    q.includes("algoguru") ||
    q.includes("build") ||
    q.includes("portfolio") ||
    q.includes("app")
  ) {
    return (
      "Aritra's flagship projects include:\n\n" +
      "1. **[AlgoGuru](https://www.algoguru.online/)** — A full-stack competitive programming platform featuring an in-browser Java execution playground and **Guru Bot**, an autonomous AI tutor built with Python, LangChain, and RAG.\n" +
      "2. **Enterprise Microservices Modernization (TCS)** — Remediation of mission-critical Java microservices from Java 8 to Java 21 and Spring Boot 4 on Azure PaaS, achieving up to **20× faster API response times**.\n" +
      "3. **[Algorithm Visualizer](https://github.com/Aritradutta2002/new_Sorting_Visualizer)** — Interactive 60 FPS canvas engine dissecting sorting algorithms with real-time controls.\n" +
      "4. **[HuffZip](https://github.com/Aritradutta2002/File_Compressor)** — Lossless C++ file compression engine utilizing Huffman coding and min-heap tree visualization.\n\n" +
      "Explore all repositories on his [GitHub profile](https://github.com/Aritradutta2002)."
    );
  }

  // SKILLS
  if (
    q === "skills" ||
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("framework")
  ) {
    return (
      "Aritra's core technical stack spans enterprise backend and modern full-stack:\n\n" +
      "- **Languages**: Java 21, Python, TypeScript, SQL, C++\n" +
      "- **Backend & Frameworks**: Spring Boot 4, Spring Security, Spring Data JPA, Hibernate, REST APIs, Microservices, LangChain\n" +
      "- **Frontend**: React, Next.js, Tailwind CSS, TypeScript\n" +
      "- **Cloud & DevOps**: Azure Tomcat PaaS, AWS, AWS Transform, Docker, Jenkins, SonarQube, Git\n" +
      "- **Databases**: PostgreSQL, Supabase, Oracle, MySQL, Apache Kafka"
    );
  }

  // CONTACT
  if (
    q === "contact" ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("hire") ||
    q.includes("reach") ||
    q.includes("available") ||
    q.includes("linkedin") ||
    q.includes("resume")
  ) {
    return (
      "Aritra is currently open to backend, cloud, and full-stack engineering opportunities!\n\n" +
      "- **Email**: [aritradutta049@gmail.com](mailto:aritradutta049@gmail.com)\n" +
      "- **LinkedIn**: [linkedin.com/in/aritra-dutta-rick20](https://www.linkedin.com/in/aritra-dutta-rick20/)\n" +
      "- **GitHub**: [github.com/Aritradutta2002](https://github.com/Aritradutta2002)\n" +
      "- **Resume**: [Download PDF](/resume.pdf)"
    );
  }

  // TCS / WORK
  if (
    q.includes("tcs") ||
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("job") ||
    q.includes("company") ||
    q.includes("role")
  ) {
    return (
      "Aritra is currently a **System Engineer at Tata Consultancy Services (TCS)** in Bhubaneswar (Sep 2024 – Present).\n\n" +
      "Key achievements at TCS:\n" +
      "- **Java Modernization**: Upgraded legacy microservices from Java 8 to **Java 21** and Spring Boot 1.x to **Spring Boot 4.x**.\n" +
      "- **Cloud PaaS Migration**: Migrated workloads from legacy JBoss to **Azure Tomcat PaaS** with zero-downtime deployment slots and health probes.\n" +
      "- **20× API Speedup**: Optimized complex SQL joins and REST endpoints, slashing latency on high-throughput services.\n" +
      "- **CI/CD Automation**: Maintained Jenkins pipelines with Docker, SonarQube quality gates, and JaCoCo coverage."
    );
  }

  // PROBLEMS / LEETCODE
  if (
    q.includes("problem") ||
    q.includes("leetcode") ||
    q.includes("competitive") ||
    q.includes("coding") ||
    q.includes("codechef") ||
    q.includes("rating")
  ) {
    return (
      "Aritra is an avid competitive programmer with **700+ verified problems solved** across major platforms:\n\n" +
      "- **LeetCode**: [Rating 1672 (Ari2001)](https://leetcode.com/u/Ari2001/)\n" +
      "- **CodeChef**: [Rating 1708 · 3★ (interover01)](https://www.codechef.com/users/interover01)\n" +
      "- **Codeforces**: Rating 1046\n" +
      "- **CSES Problem Set**: 100+ solved algorithmic challenges\n\n" +
      "He maintains a 530+ commit problem directory at [LeetCode-Directory](https://github.com/Aritradutta2002/LeetCode-Directory)."
    );
  }

  return (
    "Aritra Dutta is a **Full Stack Application Engineer** currently at **Tata Consultancy Services (TCS)** with 2+ years of experience.\n\n" +
    "He specializes in modernizing Java microservices (Java 21, Spring Boot 4), building full-stack GenAI platforms like **[AlgoGuru](https://www.algoguru.online/)** (with LangChain & RAG), and competitive programming (700+ problems solved, LeetCode 1672).\n\n" +
    "Click on any category above (**Me**, **Projects**, **Skills**, **Fun**, **Contact**) or ask any custom question!"
  );
}
