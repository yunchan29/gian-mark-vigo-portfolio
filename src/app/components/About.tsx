"use client";

import React from "react";
import { motion } from "framer-motion";

interface AboutProps {
  setIsResumeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function About({ setIsResumeOpen }: AboutProps) {
  return (
    <div className="space-y-4">
      <span className="text-[#4ec9b0] font-mono">
        gian@portfolio:~$ cat about.txt
      </span>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-gray-300 leading-relaxed"
      >
        Hi, I’m{" "}
        <span className="text-[#4ec9b0] font-semibold hover:underline hover:decoration-dotted transition">
          Gian Mark Vigo
        </span>{" "}
        — a developer passionate about building{" "}
        <span className="hover:text-[#4ec9b0] transition">
          modern web apps
        </span>{" "}
        with clean interfaces and interactive experiences.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsResumeOpen(true)}
        className="mt-2 px-5 py-2.5 rounded-lg bg-[#4ec9b0] text-[#1e1e1e] font-medium 
                   shadow-md hover:bg-[#3ecab0] hover:shadow-lg transition-all duration-200"
      >
        Open Resume
      </motion.button>
    </div>
  );
}
