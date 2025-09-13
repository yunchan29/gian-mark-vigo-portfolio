"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "City Housing and Settlements Department MIS - Capstone Project",
    description: `City Housing and Settlements Department – Calamba City Hall (Apr 2024 – Nov 2024)
• Designed and developed a web-based Management Information System for permit and housing data.
• Implemented user roles, document archiving, and application tracking using Firebase.`,
    link: "https://github.com/yunchan29/CHSD-MIS",
  },
  {
    title: "Personnel Management System",
    description: `Vills Manpower Recruitment Agency (Apr 2025 – Present)
• Built a web-based system for recruitment, applicant tracking, and employee management.
• Designed role-based dashboards and modular UI using Laravel Blade and Alpine.js.
• Streamlined job postings, interviews, and training evaluations into one platform.`,
    link: "https://github.com/yunchan29/Personnel-Management-Vills",
  },
  {
    title: "KairoAI – AI-Powered Meeting & Workflow Hub",
    description: `Personal Project (2025 – Ongoing)
• Building an AI platform that records meetings, transcribes speech, and generates automated summaries with action items.
• Implemented foundation stack with Next.js, NestJS, PostgreSQL, and Google OAuth; integrated speech-to-text and AI summarization via OpenAI GPT.
• Planned features: real-time collaboration, Jira/Slack integrations, semantic search, and cloud deployment with Docker + CI/CD.`,
    link: "https://github.com/yunchan29/kairoBackend",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"about" | "projects" | "experience" | "contact">("about");
  const [projectIndex, setProjectIndex] = useState(0);

  const nextProject = () =>
    setProjectIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] text-[#d4d4d4] font-mono p-6 space-y-6">
      
      {/* Top Terminal (Intro) */}
      <div className="w-full max-w-4xl rounded-lg border border-[#3c3c3c] bg-[#1e1e1e] shadow-lg">
        <div className="flex items-center space-x-2 border-b border-[#3c3c3c] px-4 py-2 bg-[#2d2d2d]">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="ml-3 text-sm text-[#9cdcfe]">~/gian-portfolio</span>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <span className="text-[#4ec9b0]">gian@portfolio:~$ </span>
            <TypeAnimation
              sequence={["whoami", 1200, "cat about.txt", 2000]}
              speed={50}
              wrapper="span"
              repeat={Infinity}
            />
          </div>

          <div className="ml-4 space-y-2">
            <p>
              Hi, I’m <span className="text-[#dcdcaa]">Gian Mark Vigo</span> 👨‍💻
            </p>
            <p>
              Web Developer | Programmer  
              Focused on building clean, interactive, and user-friendly apps.
            </p>
            <p>
              Skills: HTML, CSS, JavaScript, Java, Next.js, React, Laravel, Tailwind, SQL, Git
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Terminal (Tabbed) */}
      <div className="w-full max-w-4xl rounded-lg border border-[#3c3c3c] bg-[#1e1e1e] shadow-lg h-[28rem] flex flex-col">
       {/* Tabs */}
<div className="flex items-center border-b border-[#3c3c3c] bg-[#2d2d2d] text-sm">
  {(["about", "projects", "experience", "contact"] as const).map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 ${
        activeTab === tab ? "bg-[#1e1e1e] text-[#9cdcfe]" : "text-[#808080]"
      }`}
    >
      {tab}.txt
    </button>
  ))}
</div>


        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto text-sm sm:text-base">
          
          {/* About Tab */}
          {activeTab === "about" && (
            <div>
              <span className="text-[#4ec9b0]">gian@portfolio:~$ cat about.txt</span>
              <p className="ml-4 mt-2">
                Passionate developer with experience in building full-stack applications,  
                specializing in clean UI/UX and modern web stacks.
              </p>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <span className="text-[#4ec9b0]">gian@portfolio:~$ cat projects.txt</span>
              <div className="ml-4 mt-4 border border-[#3c3c3c] p-4 rounded-lg relative overflow-hidden">
                <h3 className="text-[#dcdcaa] font-bold">{projects[projectIndex].title}</h3>
                <p className="mt-2 whitespace-pre-line">{projects[projectIndex].description}</p>
                {projects[projectIndex].link && (
                  <Link
                    href={projects[projectIndex].link}
                    target="_blank"
                    className="text-[#4fc1ff] underline hover:text-[#9cdcfe] mt-2 inline-block"
                  >
                    View on GitHub
                  </Link>
                )}

                {/* Carousel Controls */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
                  <button
                    onClick={prevProject}
                    className="pointer-events-auto p-2 rounded-full bg-[#2d2d2d] hover:bg-[#3c3c3c] text-[#4fc1ff]"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={nextProject}
                    className="pointer-events-auto p-2 rounded-full bg-[#2d2d2d] hover:bg-[#3c3c3c] text-[#4fc1ff]"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div>
              <span className="text-[#4ec9b0]">gian@portfolio:~$ cat experience.txt</span>
              <div className="mt-4">
                <h2 className="text-[#4ec9b0] font-bold text-lg">WORK EXPERIENCE</h2>

                <div className="mt-2 ml-4">
                  <h3 className="text-[#dcdcaa] font-semibold">IT Support Intern</h3>
                  <p className="text-gray-400 italic text-sm">
                    ICT Department – Calamba City Hall (Nov 2024 – Apr 2025)
                  </p>
                  <ul className="mt-2 list-disc ml-5 text-gray-300">
                    <li>Provided technical support, software installation, and network maintenance.</li>
                    <li>Assisted in daily IT operations, troubleshooting multiple technical issues weekly.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div>
              <span className="text-[#4ec9b0]">gian@portfolio:~$ cat contact.txt</span>
              <div className="ml-4 mt-2 flex flex-col space-y-2">
                <Link
                  href="https://github.com/yunchan29"
                  target="_blank"
                  className="flex items-center space-x-2 hover:text-[#9cdcfe] transition"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/gian-mark-vigo-99493b294"
                  target="_blank"
                  className="flex items-center space-x-2 hover:text-[#9cdcfe] transition"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Link>
                <Link
                  href="mailto:vigogianmark@gmail.com"
                  className="flex items-center space-x-2 hover:text-[#9cdcfe] transition"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
