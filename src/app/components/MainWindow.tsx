 

"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as TabsModule from "./Tabs";
const Tabs = TabsModule.default;
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import { projects } from "../data/projects";

// MainWindowProps
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
  return (
    <motion.div
      className="w-full max-w-4xl rounded-lg border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl shadow-black/40 flex flex-col h-auto md:h-[28rem] mt-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* --------- Window Mock Header --------- */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm">
        {/* MacOS-style control buttons */}
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-900/50"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-md shadow-yellow-900/50"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 shadow-md shadow-green-900/50"></span>
        </div>
        <p className="text-xs text-white/60 tracking-wide select-none">
          Gian’s Portfolio
        </p>
        <div className="w-12" /> {/* spacer for symmetry */}
      </div>

      {/* --------- Tabs --------- */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* --------- Content --------- */}
      <div className="p-4 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm md:text-base custom-scrollbar flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "about" && <About setIsResumeOpen={setIsResumeOpen} />}
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
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MainWindow;
