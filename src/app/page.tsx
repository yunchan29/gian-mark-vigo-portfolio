"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import {
  Github,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight,
  Globe,
  X,
  Image as ImageIcon,
} from "lucide-react";

const projects = [
  {
    title: "City Housing and Settlements Department MIS - Capstone Project",
    description: `City Housing and Settlements Department – Calamba City Hall (Apr 2024 – Nov 2024)
• Designed and developed a web-based Management Information System for permit and housing data.
• Implemented user roles, document archiving, and application tracking using Firebase.`,
    link: "https://github.com/yunchan29/CHSD-MIS",
    site: "https://chsd.netlify.app",
    images: [
      "/screenshots/chsd1.png",
      "/screenshots/chsd2.png",
      "/screenshots/chsd3.png",
    ],
  },
  {
    title: "Personnel Management System",
    description: `Vills Manpower Recruitment Agency (Apr 2025 – Present)
• Built a web-based system for recruitment, applicant tracking, and employee management.
• Designed role-based dashboards and modular UI using Laravel Blade and Alpine.js.
• Streamlined job postings, interviews, and training evaluations into one platform.`,
    link: "https://github.com/yunchan29/Personnel-Management-Vills",
    site: "https://your-deployed-site-2.com",
    images: [
      "/screenshots/pms1.png",
      "/screenshots/pms2.png",
      "/screenshots/pms3.png",
    ],
  },
  {
    title: "KairoAI – AI-Powered Meeting & Workflow Hub",
    description: `Personal Project (2025 – Ongoing)
• Building an AI platform that records meetings, transcribes speech, and generates automated summaries with action items.
• Implemented foundation stack with Next.js, NestJS, PostgreSQL, and Google OAuth; integrated speech-to-text and AI summarization via OpenAI GPT.
• Planned features: real-time collaboration, Jira/Slack integrations, semantic search, and cloud deployment with Docker + CI/CD.`,
    link: "https://github.com/yunchan29/kairoBackend",
    site: "https://your-deployed-site-3.com",
    images: [
      "/screenshots/kairo1.png",
      "/screenshots/kairo2.png",
      "/screenshots/kairo3.png",
    ],
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "about" | "projects" | "experience" | "contact"
  >("about");
  const [projectIndex, setProjectIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const nextProject = () =>
    setProjectIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const nextScreenshot = () =>
    setScreenshotIndex(
      (prev) =>
        (prev + 1) % (projects[projectIndex].images?.length || 1)
    );
  const prevScreenshot = () =>
    setScreenshotIndex(
      (prev) =>
        (prev - 1 + (projects[projectIndex].images?.length || 1)) %
        (projects[projectIndex].images?.length || 1)
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] text-[#d4d4d4] font-mono p-6 space-y-6">
      {/* Top Terminal (Intro) */}
      <div className="w-full max-w-4xl rounded-lg border border-white/20 
          bg-white/10 backdrop-blur-md shadow-xl shadow-black/30">
        <div className="flex items-center space-x-2 border-b border-white/20 px-4 py-2 bg-white/10 backdrop-blur-sm">
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
              Skills: HTML, CSS, JavaScript, Java, Next.js, React, Laravel,
              Tailwind, SQL, Git
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Terminal (Tabbed) */}
      <div className="w-full max-w-4xl rounded-lg border border-white/20 
          bg-white/10 backdrop-blur-md shadow-xl shadow-black/30 h-[28rem] flex flex-col">
        {/* Tabs */}
        <div className="flex items-center border-b border-white/20 bg-white/10 backdrop-blur-sm text-sm">
          {(["about", "projects", "experience", "contact"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 ${
                  activeTab === tab
                    ? "bg-white/5 text-[#9cdcfe]"
                    : "text-[#808080]"
                }`}
              >
                {tab}.txt
              </button>
            )
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto text-sm sm:text-base">
          {/* About Tab */}
          {activeTab === "about" && (
            <div>
              <span className="text-[#4ec9b0]">gian@portfolio:~$ cat about.txt</span>
              <p className="ml-4 mt-2">
                Passionate developer with experience in building full-stack
                applications, specializing in clean UI/UX and modern web stacks.
              </p>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <span className="text-[#4ec9b0]">
                gian@portfolio:~$ cat projects.txt
              </span>
              <div className="ml-4 mt-4 border border-white/20 bg-white/5 
                   backdrop-blur-md p-4 rounded-lg relative overflow-hidden shadow-lg">
                <h3 className="text-[#dcdcaa] font-bold">
                  {projects[projectIndex].title}
                </h3>
                <p className="mt-2 whitespace-pre-line">
                  {projects[projectIndex].description}
                </p>

                <div className="flex space-x-6 mt-3">
                  {projects[projectIndex].link && (
                    <Link
                      href={projects[projectIndex].link}
                      target="_blank"
                      className="flex items-center space-x-2 text-[#4fc1ff] hover:text-[#9cdcfe] transition"
                    >
                      <Github className="h-4 w-4" />
                      <span>View on GitHub</span>
                    </Link>
                  )}

                  {projects[projectIndex].site && (
                    <Link
                      href={projects[projectIndex].site}
                      target="_blank"
                      className="flex items-center space-x-2 text-[#4fc1ff] hover:text-[#9cdcfe] transition"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Live Site</span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setScreenshotIndex(0);
                    }}
                    className="flex items-center space-x-2 text-[#4fc1ff] hover:text-[#9cdcfe] transition"
                  >
                    <ImageIcon className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* Carousel Controls beside card */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={prevProject}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#4fc1ff] backdrop-blur-sm"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextProject}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#4fc1ff] backdrop-blur-sm"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div>
              <span className="text-[#4ec9b0]">
                gian@portfolio:~$ cat experience.txt
              </span>
              <div className="mt-4">
                <h2 className="text-[#4ec9b0] font-bold text-lg">
                  WORK EXPERIENCE
                </h2>

                <div className="mt-2 ml-4">
                  <h3 className="text-[#dcdcaa] font-semibold">
                    IT Support Intern
                  </h3>
                  <p className="text-gray-400 italic text-sm">
                    ICT Department – Calamba City Hall (Nov 2024 – Apr 2025)
                  </p>
                  <ul className="mt-2 list-disc ml-5 text-gray-300">
                    <li>
                      Provided technical support, software installation, and
                      network maintenance.
                    </li>
                    <li>
                      Assisted in daily IT operations, troubleshooting multiple
                      technical issues weekly.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div>
              <span className="text-[#4ec9b0]">
                gian@portfolio:~$ cat contact.txt
              </span>
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

      {/* Modal for Screenshot Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-3xl bg-[#1e1e1e] border border-white/20 rounded-lg p-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center">
              <img
                src={
                  projects[projectIndex].images?.[screenshotIndex] ||
                  "/placeholder.png"
                }
                alt="Project screenshot"
                className="rounded-md max-h-[70vh] object-contain"
              />
              <div className="flex justify-between w-full mt-4">
                <button
                  onClick={prevScreenshot}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#4fc1ff]"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextScreenshot}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#4fc1ff]"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
