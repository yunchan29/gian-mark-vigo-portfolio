"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable"; // 👈 for dragging the minimized terminal

import FloatingAscii from "./components/FloatingAscii";
import TerminalTop from "./components/TerminalTop";
import MainWindow from "./components/MainWindow";
import ProjectModal from "./components/ProjectModal";
import ResumeModal from "./components/ResumeModal";

import { projects } from "./data/projects";

const Home: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [showMainWindow, setShowMainWindow] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [portalFlash, setPortalFlash] = useState(false);

  // NEW: minimized state
  const [terminalMinimized, setTerminalMinimized] = useState(false);

  // normal states
  const [taskbar, setTaskbar] = useState<{ [key: string]: boolean }>({
    top: false,
  });
  const [activeTab, setActiveTab] = useState<
    "about" | "projects" | "experience" | "contact"
  >("about");
  const [projectIndex, setProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  /** -------------------- HANDLERS -------------------- **/
  const handleStart = () => {
    setPortalFlash(true); // trigger flash
    setTimeout(() => {
      setStarted(true);
      setTerminalVisible(true);
      setPortalFlash(false);
    }, 1000); // after flash
  };

  const handleCommandExecuted = () => {
    // show main window with shimmer effect
    setTimeout(() => {
      setShowMainWindow(true);
      // auto-minimize terminal after main window is ready
      setTimeout(() => {
        setTerminalVisible(false);
        setTerminalMinimized(true); // 👈 minimized state
      }, 600);
    }, 600);
  };

  return (
    <main className="relative flex flex-col min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating ASCII after start */}
      {started && <FloatingAscii />}

      {/* ---------- INITIAL LANDING ---------- */}
      {!started && (
        <div className="flex flex-col items-center justify-center flex-1 text-center space-y-6 relative z-20">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Gian Mark Vigo
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Full-Stack Developer
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            {/* Explore Button */}
            <motion.button
              onClick={handleStart}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-lg shadow-lg font-semibold text-white relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1] }}
              transition={{ delay: 0.6, duration: 1.5, repeat: Infinity }}
            >
              Explore
            </motion.button>
            {/* Skip to Resume */}
            <motion.button
              onClick={() => setIsResumeOpen(true)}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-lg font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Resume
            </motion.button>
          </div>
        </div>
      )}

      {/* ---------- PORTAL FLASH / SHIMMER ---------- */}
      <AnimatePresence>
        {portalFlash && (
          <motion.div
            key="portal"
            className="absolute inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 bg-radial from-white via-transparent to-transparent"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- TERMINAL ---------- */}
     {/* ---------- TERMINAL ---------- */}
<AnimatePresence>
  {terminalVisible && (
    <motion.div
      key="terminal"
      className="fixed top-12 left-1/2 -translate-x-1/2 z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-[80vw] md:w-[60vw] bg-[#1a1a1a] rounded-lg shadow-lg pointer-events-auto">
        <TerminalTop
          id="terminal"
          title="gian@portfolio:~$"
          taskbar={taskbar}
          setTaskbar={setTaskbar}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowMainWindow={setShowMainWindow}
          setIsResumeOpen={setIsResumeOpen}
          onCommandExecuted={handleCommandExecuted}
        />
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* ---------- MINIMIZED TERMINAL ICON ---------- */}
      {terminalMinimized && (
        <Draggable>
          <motion.div
            className="fixed bottom-6 left-6 z-50 cursor-pointer bg-[#111] text-green-400 px-4 py-2 rounded-md shadow-lg border border-green-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setTerminalVisible(true);
              setTerminalMinimized(false);
            }}
          >
            $ terminal
          </motion.div>
        </Draggable>
      )}

      {/* ---------- MAIN WINDOW ---------- */}
      <AnimatePresence>
        {showMainWindow && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div className="bg-[#2c2c2c] rounded-xl shadow-2xl w-[90%] sm:w-[70%] lg:w-[50%] max-h-[80vh] overflow-auto">
              <MainWindow
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                projectIndex={projectIndex}
                setProjectIndex={setProjectIndex}
                setIsModalOpen={setIsModalOpen}
                setScreenshotIndex={setScreenshotIndex}
                setIsResumeOpen={setIsResumeOpen}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- MODALS ---------- */}
      <ProjectModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        projects={projects}
        projectIndex={projectIndex}
        screenshotIndex={screenshotIndex}
        setScreenshotIndex={setScreenshotIndex}
      />
      <ResumeModal
        isResumeOpen={isResumeOpen}
        setIsResumeOpen={setIsResumeOpen}
      />
    </main>
  );
};

export default Home;
