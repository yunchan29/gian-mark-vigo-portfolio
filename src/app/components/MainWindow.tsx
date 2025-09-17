"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as TabsModule from "./Tabs";
const Tabs = TabsModule.default;
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import { projects } from "../data/projects";

interface MainWindowProps {
  activeTab: "about" | "projects" | "experience" | "contact";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"about" | "projects" | "experience" | "contact">
  >;
  projectIndex: number;
  setProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setScreenshotIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsResumeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainWindow: React.FC<MainWindowProps> = ({
  activeTab,
  setActiveTab,
  projectIndex,
  setProjectIndex,
  setIsModalOpen,
  setScreenshotIndex,
  setIsResumeOpen,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Background gradients per tab
  const tabGradients: Record<typeof activeTab, string> = {
    about: "from-blue-500/10 via-indigo-500/5 to-purple-500/10",
    projects: "from-yellow-500/10 via-orange-500/5 to-red-500/10",
    experience: "from-green-500/10 via-emerald-500/5 to-teal-500/10",
    contact: "from-pink-500/10 via-fuchsia-500/5 to-purple-500/10",
  };

  // Accent colors for scrollbars
  const tabAccentColors: Record<typeof activeTab, string> = {
    about: "#60a5fa", // blue-400
    projects: "#fbbf24", // yellow-400
    experience: "#34d399", // emerald-400
    contact: "#ec4899", // pink-500
  };

  return (
    <motion.div
      layout
      animate={{
        width: isMaximized ? "100%" : "100%",
        height: isMaximized ? "100%" : isMinimized ? "2.5rem" : "28rem",
        borderRadius: isMaximized ? "0px" : "0.75rem",
      }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      className={`${
        isMaximized
          ? "fixed top-0 left-0 w-full h-full z-50"
          : "relative w-full max-w-4xl mt-6"
      } border border-white/20 bg-white/10 backdrop-blur-xl 
      shadow-2xl shadow-black/40 flex flex-col overflow-hidden`}
      style={
        {
          // inject CSS variable for active scrollbar accent
          "--scrollbar-accent": tabAccentColors[activeTab],
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 20 }}
   
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md">
        <div className="flex space-x-2">
          {/* Close */}
          <motion.span
            className="w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-900/50 relative group cursor-pointer"
            whileHover={{ scale: 1.2 }}
            onClick={() => setIsMinimized(true)}
          >
            <span className="absolute left-1/2 -translate-x-1/2 top-5 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Close
            </span>
          </motion.span>

          {/* Minimize */}
          <motion.span
            className="w-3 h-3 rounded-full bg-yellow-500 shadow-md shadow-yellow-900/50 relative group cursor-pointer"
            whileHover={{ scale: 1.2 }}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <span className="absolute left-1/2 -translate-x-1/2 top-5 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              {isMinimized ? "Restore" : "Minimize"}
            </span>
          </motion.span>

          {/* Maximize */}
          <motion.span
            className="w-3 h-3 rounded-full bg-green-500 shadow-md shadow-green-900/50 relative group cursor-pointer"
            whileHover={{ scale: 1.2 }}
            onClick={() => setIsMaximized(!isMaximized)}
          >
            <span className="absolute left-1/2 -translate-x-1/2 top-5 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              {isMaximized ? "Restore" : "Maximize"}
            </span>
          </motion.span>
        </div>

        <p className="text-xs text-white/70 tracking-wide select-none font-mono">
          ~/portfolio
        </p>
        <div className="w-12" />
      </div>

      {/* Tabs */}
      {!isMinimized && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}

      {/* Content */}
      {!isMinimized && (
        <div
          className={`p-4 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm md:text-base 
          custom-scrollbar flex-1 bg-gradient-to-br ${tabGradients[activeTab]} 
          transition-all duration-500`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "about" && (
                <About setIsResumeOpen={setIsResumeOpen} />
              )}
              {activeTab === "projects" && (
                <Projects
                  projects={projects}
                  projectIndex={projectIndex}
                  setProjectIndex={setProjectIndex}
                  setIsModalOpen={setIsModalOpen}
                  setScreenshotIndex={setScreenshotIndex}
                />
              )}
              {activeTab === "experience" && <Experience />}
              {activeTab === "contact" && <Contact />}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default MainWindow;
