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
    <div className="flex items-center overflow-x-auto border-b border-white/20 bg-white/10 backdrop-blur-sm text-xs sm:text-sm">
      {tabList.map((tab) => (
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05, color: "#9cdcfe" }}
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 sm:px-4 py-2 whitespace-nowrap ${
            activeTab === tab ? "bg-white/5 text-[#9cdcfe]" : "text-[#808080]"
          }`}
        >
          {tab}.txt
        </motion.button>
      ))}
    </div>
  );
}
