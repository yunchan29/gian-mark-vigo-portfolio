"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  id: string;
  title: string;
  taskbar: { [key: string]: boolean };
  setTaskbar: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  activeTab: "about" | "projects" | "experience" | "contact";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"about" | "projects" | "experience" | "contact">
  >;
  setShowMainWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsResumeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCommandExecuted: () => void;
}

const TerminalTop: React.FC<TerminalProps> = ({
  id,
  title,
  taskbar,
  setTaskbar,
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
  const [typingLine, setTypingLine] = useState<string | null>(null); // current line being typed
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clickableCommands = [
    "about",
    "projects",
    "experience",
    "contact",
    "resume",
  ];

  // auto scroll on new output
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [output, typingLine]);

  // focus input when restored
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  // focus input on first mount (instead of autoFocus)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // simulate typing animation
  const typeLine = (line: string) => {
    return new Promise<void>((resolve) => {
      let i = -1; // ✅ fixed: start at 0
      setTypingLine("");
      const tick = () => {
        setTypingLine((prev) => (prev ?? "") + line[i]);
        i++;
        if (i < line.length) {
          typingTimeoutRef.current = setTimeout(tick, 20);
        } else {
          setOutput((prev) => [...prev, line]);
          setTypingLine(null);
          resolve();
        }
      };
      tick();
    });
  };

  const handleCommand = async (cmd: string) => {
    if (!cmd) return;
    const normalized = cmd.toLowerCase().trim();
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    setOutput((prev) => [...prev, `$ ${cmd}`]);

    if (["about", "projects", "experience", "contact"].includes(normalized)) {
      await typeLine(`Opening ${normalized} tab...`);
      setActiveTab(normalized as TerminalProps["activeTab"]);
      setShowMainWindow(true);
      setShowHints(false);
      setTimeout(() => {
        setTaskbar((prev) => ({ ...prev, [id]: true }));
      }, 300);
    } else if (normalized === "resume") {
      await typeLine("Opening Resume modal...");
      setIsResumeOpen(true);
      setShowHints(false);
      setTimeout(() => {
        setTaskbar((prev) => ({ ...prev, [id]: true }));
      }, 300);
    } else if (normalized === "help") {
      await typeLine(
        "Available commands: about | projects | experience | contact | resume"
      );
      setShowHints(true);
    } else {
      await typeLine(`Command not found: ${cmd}`);
    }
    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const index =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setCommand(history[index]);
        setHistoryIndex(index);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length > 0) {
        const index =
          historyIndex === -1
            ? -1
            : Math.min(history.length - 1, historyIndex + 1);
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
          className="w-full max-w-4xl rounded-lg border border-white/20 bg-black/80 backdrop-blur-md shadow-xl shadow-black/50 flex flex-col overflow-hidden mb-4 max-h-[14rem]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-white/10 px-4 py-1 border-b border-white/20">
            <span className="font-bold text-sm text-gray-200">{title}</span>
            <button
              onClick={() =>
                setTaskbar((prev) => ({ ...prev, [id]: true }))
              }
              className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition"
            >
              Minimize
            </button>
          </div>

          {/* Content */}
          <div
            ref={scrollRef}
            className="p-4 overflow-y-auto flex-1 flex flex-col font-mono text-xs"
          >
            <div className="flex flex-col space-y-1 mb-2">
              {output.map((line, idx) => (
                <div key={idx} className="text-[#dcdcdc] whitespace-pre-wrap">
                  {line}
                </div>
              ))}
              {typingLine && (
                <div className="text-[#dcdcdc] whitespace-pre-wrap">
                  {typingLine}
                  <span className="animate-pulse text-[#4ec9b0]">█</span>
                </div>
              )}
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
                className="bg-transparent border-none outline-none w-full text-[#d4d4d4] caret-transparent"
                placeholder="Type a command..."
              />
              {/* Blinking cursor */}
              <span className="ml-1 animate-ping text-[#4ec9b0]">
                {command === "" ? "█" : ""}
              </span>
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
