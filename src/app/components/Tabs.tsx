"use client";

import { motion } from "framer-motion";
import React from "react";

interface TabsProps {
  activeTab: "about" | "projects" | "experience" | "contact";
  setActiveTab: (tab: "about" | "projects" | "experience" | "contact") => void;
}

const tabList = ["about", "projects", "experience", "contact"] as const;

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="relative border-b border-white/20 bg-white/5 backdrop-blur-md">
      <div className="flex items-center overflow-x-auto no-scrollbar text-xs sm:text-sm">
        {tabList.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-3 sm:px-4 py-2 whitespace-nowrap transition-colors duration-200 ${
              activeTab === tab
                ? "text-sky-300"
                : "text-white/60 hover:text-white"
            }`}
          >
            {tab}.txt
            {/* Active underline glow */}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.7)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
