"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight,
  Globe,
  X,
  Image as ImageIcon,
  FileDown,
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
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const nextProject = () =>
    setProjectIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const nextScreenshot = () =>
    setScreenshotIndex(
      (prev) => (prev + 1) % (projects[projectIndex].images?.length || 1)
    );
  const prevScreenshot = () =>
    setScreenshotIndex(
      (prev) =>
        (prev - 1 + (projects[projectIndex].images?.length || 1)) %
        (projects[projectIndex].images?.length || 1)
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] text-[#d4d4d4] font-mono px-4 sm:px-6 py-6 space-y-6">
      {/* Top Terminal (Intro) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl rounded-lg border border-white/20 
          bg-white/10 backdrop-blur-md shadow-xl shadow-black/30"
      >
        <div className="flex items-center space-x-2 border-b border-white/20 px-4 py-2 bg-white/10 backdrop-blur-sm text-xs sm:text-sm">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          <span className="ml-3 text-[#9cdcfe]">~/gian-portfolio</span>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="text-sm sm:text-base">
            <span className="text-[#4ec9b0]">gian@portfolio:~$ </span>
            <TypeAnimation
              sequence={["whoami", 1200, "cat about.txt", 2000]}
              speed={50}
              wrapper="span"
              repeat={Infinity}
            />
          </div>

          <div className="ml-2 sm:ml-4 space-y-2 text-xs sm:text-sm">
            <p>
              Hi, I’m <span className="text-[#dcdcaa]">Gian Mark Vigo</span> 👨‍💻
            </p>
           <p>
  Full-Stack Web Developer | React & Laravel  
  Experienced in building scalable management systems and hiring platforms, with a focus on clean design, user-friendly interfaces, and efficient backend solutions.
</p>

           
          </div>
        </div>
      </motion.div>

      {/* Bottom Terminal (Tabbed) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl rounded-lg border border-white/20 
          bg-white/10 backdrop-blur-md shadow-xl shadow-black/30 h-auto md:h-[28rem] flex flex-col"
      >
        {/* Tabs */}
        <div className="flex items-center overflow-x-auto border-b border-white/20 bg-white/10 backdrop-blur-sm text-xs sm:text-sm">
          {(["about", "projects", "experience", "contact"] as const).map(
            (tab) => (
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05, color: "#9cdcfe" }}
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white/5 text-[#9cdcfe]"
                    : "text-[#808080]"
                }`}
              >
                {tab}.txt
              </motion.button>
            )
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm md:text-base">
          <AnimatePresence mode="wait">
            {/* About Tab */}
            {activeTab === "about" && (
              <motion.div
  key="about"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4 }}
>
  <span className="text-[#4ec9b0]">
    gian@portfolio:~$ cat about.txt
  </span>

  {/* Intro */}
  <p className="ml-2 sm:ml-4 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
    Passionate full-stack developer with experience building interactive,
    user-focused applications. Skilled in modern web stacks and dedicated
    to delivering clean UI/UX with scalable solutions.
  </p>

  {/* Resume Buttons */}
  <div className="mt-4 flex flex-wrap gap-3 ml-2 sm:ml-4">
    <motion.a
      href="/Gian_Mark_Vigo_Resume_Latest.pdf"
      download
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px #4fc1ff" }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center space-x-2 bg-[#4ec9b0]/20 text-[#4ec9b0] px-4 py-2 rounded-md border border-[#4ec9b0]/50 hover:bg-[#4ec9b0]/30 transition"
    >
      <FileDown className="h-4 w-4" />
      <span>Download Resume</span>
    </motion.a>

    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px #4fc1ff" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsResumeOpen(true)}
      className="inline-flex items-center space-x-2 bg-[#4fc1ff]/20 text-[#4fc1ff] px-4 py-2 rounded-md border border-[#4fc1ff]/50 hover:bg-[#4fc1ff]/30 transition"
    >
      <ImageIcon className="h-4 w-4" />
      <span>Preview Resume</span>
    </motion.button>
  </div>

  {/* Skills */}
  <div className="mt-6 ml-2 sm:ml-4">
    <h3 className="text-lg font-semibold mb-3">Skills</h3>

    {/* Frontend */}
    <h4 className="text-sm font-medium text-[#4fc1ff] mb-2">Frontend</h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">HTML</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">CSS</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">JavaScript</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">React</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="h-8 w-8 dark:invert" />
        <span className="mt-2 text-xs sm:text-sm">Next.js</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" 
     alt="Tailwind CSS" 
     className="h-8 w-8" />

        <span className="mt-2 text-xs sm:text-sm">Tailwind</span>
      </div>
    </div>

    {/* Backend */}
    <h4 className="text-sm font-medium text-[#4fc1ff] mb-2">Backend</h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">PHP</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
       <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" 
     alt="Laravel" 
     className="h-8 w-8" />

        <span className="mt-2 text-xs sm:text-sm">Laravel</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">Firebase</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="SQL" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">SQL</span>
      </div>
    </div>

    {/* Tools */}
    <h4 className="text-sm font-medium text-[#4fc1ff] mb-2">Tools</h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">Git</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">Figma</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="h-8 w-8" />
        <span className="mt-2 text-xs sm:text-sm">Java</span>
      </div>
    </div>
  </div>
</motion.div>

            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[#4ec9b0]">
                  gian@portfolio:~$ cat experience.txt
                </span>
                <div className="mt-4">
                  <h2 className="text-[#4ec9b0] font-bold text-sm sm:text-base md:text-lg">
                    WORK EXPERIENCE
                  </h2>

                  <div className="mt-2 ml-2 sm:ml-4">
                    <h3 className="text-[#dcdcaa] font-semibold text-xs sm:text-sm md:text-base">
                      IT Support Intern
                    </h3>
                    <p className="text-gray-400 italic text-xs sm:text-sm">
                      ICT Department – Calamba City Hall (Nov 2024 – Apr 2025)
                    </p>
                    <ul className="mt-2 list-disc ml-4 sm:ml-5 text-gray-300 text-xs sm:text-sm">
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
              </motion.div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[#4ec9b0]">
                  gian@portfolio:~$ cat contact.txt
                </span>
                <div className="ml-2 sm:ml-4 mt-2 flex flex-col space-y-2">
                  <Link
                    href="https://github.com/yunchan29"
                    target="_blank"
                    className="flex items-center space-x-2 hover:text-[#9cdcfe] transition text-xs sm:text-sm"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/gian-mark-vigo-99493b294"
                    target="_blank"
                    className="flex items-center space-x-2 hover:text-[#9cdcfe] transition text-xs sm:text-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </Link>
                  <Link
                    href="mailto:vigogianmark@gmail.com"
                    className="flex items-center space-x-2 hover:text-[#9cdcfe] transition text-xs sm:text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal for Screenshot Preview */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-2"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-[#1e1e1e] border border-white/20 rounded-lg p-3 sm:p-4"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-300 hover:text-white"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className="flex flex-col items-center">
                <img
                  src={
                    projects[projectIndex].images?.[screenshotIndex] ||
                    "/placeholder.png"
                  }
                  alt="Project screenshot"
                  className="rounded-md max-h-[60vh] sm:max-h-[70vh] object-contain"
                />
                <div className="flex justify-between w-full mt-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={prevScreenshot}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#4fc1ff]"
                  >
                    <ChevronLeft />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={nextScreenshot}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#4fc1ff]"
                  >
                    <ChevronRight />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal for Resume Preview */}
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-2"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl h-[80vh] bg-[#1e1e1e] border border-white/20 rounded-lg p-3 sm:p-4 flex flex-col"
            >
              <button
                onClick={() => setIsResumeOpen(false)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-300 hover:text-white"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* PDF Preview with built-in browser controls */}
              <iframe
                src="/Gian_Mark_Vigo_Resume_Latest.pdf#toolbar=1&navpanes=0&scrollbar=1"
                className="w-full h-full rounded-md"
                title="Resume Preview"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
