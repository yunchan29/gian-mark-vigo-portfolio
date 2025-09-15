"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  id: string;
  title: string;
  taskbar: { [key: string]: boolean };
  setTaskbar: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  activeTab: "about" | "projects" | "experience" | "contact";
  setActiveTab: any;
  setShowMainWindow: any;
  setIsResumeOpen: any;
}

const TerminalTop: React.FC<TerminalProps> = ({
  id,
  title,
  taskbar,
  setTaskbar,
  activeTab,
  setActiveTab,
  setShowMainWindow,
  setIsResumeOpen,
}) => {
  const isMinimized = taskbar[id];
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([
    "Welcome to my Portfolio CLI!",
    "Type 'help' to see available commands.",
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHints, setShowHints] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const clickableCommands = ["about", "projects", "experience", "contact", "resume"];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [output]);

  useEffect(() => {
    if (!isMinimized && inputRef.current) inputRef.current.focus();
  }, [isMinimized]);

  const handleCommand = (cmd: string) => {
    if (!cmd) return;
    const normalized = cmd.toLowerCase().trim();
    setHistory([...history, cmd]);
    setHistoryIndex(-1);

    if (["about", "projects", "experience", "contact"].includes(normalized)) {
      setActiveTab(normalized);
      setShowMainWindow(true);
      setOutput((prev) => [...prev, `$ ${cmd}`, `Opening ${normalized} tab...`]);
      setShowHints(false);
    } else if (normalized === "resume") {
      setIsResumeOpen(true);
      setOutput((prev) => [...prev, `$ ${cmd}`, "Opening Resume modal..."]);
      setShowHints(false);
    } else if (normalized === "help") {
      setOutput((prev) => [
        ...prev,
        `$ ${cmd}`,
        "Available commands: about | projects | experience | contact | resume",
      ]);
      setShowHints(true);
    } else {
      setOutput((prev) => [...prev, `$ ${cmd}`, `Command not found: ${cmd}`]);
    }
    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const index = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setCommand(history[index]);
        setHistoryIndex(index);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length > 0) {
        const index = historyIndex === -1 ? -1 : Math.min(history.length - 1, historyIndex + 1);
        setCommand(index === -1 ? "" : history[index]);
        setHistoryIndex(index);
      }
    }
    if (e.key === "Enter") handleCommand(command);
  };

  return (
    <>
      {!isMinimized && (
        <motion.div
          className="w-full max-w-4xl rounded-lg border border-white/20 bg-white/10 backdrop-blur-md shadow-xl shadow-black/30 flex flex-col overflow-hidden mb-4 max-h-[12rem]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-white/5 px-4 py-1 border-b border-white/20">
            <span className="font-bold text-sm">{title}</span>
            <button
              onClick={() => setTaskbar((prev) => ({ ...prev, [id]: true }))}
              className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition"
            >
              Minimize
            </button>
          </div>

          {/* Content */}
          <div ref={scrollRef} className="p-4 overflow-y-auto flex-1 flex flex-col">
            <div className="flex flex-col space-y-1 mb-2">
              {output.map((line, idx) => (
                <div key={idx} className="text-[#dcdcdc] text-xs">
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center mb-2">
              <span className="text-green-400 mr-1">gian@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-white/5 border border-white/10 rounded px-2 py-1 w-full text-xs text-[#d4d4d4] focus:outline-none focus:ring-1 focus:ring-[#4ec9b0]"
                placeholder="Type a command..."
                autoFocus
              />
              <span className="ml-1 animate-pulse text-[#4ec9b0]">█</span>
            </div>

            {/* Clickable hints */}
            {showHints && (
              <div className="flex gap-2 flex-wrap mt-2">
                {clickableCommands.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Taskbar Button */}
      {isMinimized && (
        <motion.button
          onClick={() => setTaskbar((prev) => ({ ...prev, [id]: false }))}
          className="fixed bottom-2 left-2 flex items-center gap-1 px-3 py-1 bg-white/10 text-sm rounded-md shadow-md hover:bg-white/20 transition"
          whileHover={{ scale: 1.05 }}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full" />
          {title}
        </motion.button>
      )}
    </>
  );
};

export default TerminalTop;
