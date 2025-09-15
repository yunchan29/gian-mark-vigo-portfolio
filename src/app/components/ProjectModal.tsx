 

"use client";

import React, { useState } from "react";
import { X, Github, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  description: string;
  link: string; // GitHub
  site?: string; // live site
  images?: string[];
}

interface ProjectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projects: Project[];
  projectIndex: number;
  screenshotIndex: number;
  setScreenshotIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProjectModal({
  isModalOpen,
  setIsModalOpen,
  projects,
  projectIndex,
  screenshotIndex,
  setScreenshotIndex,
}: ProjectModalProps) {
  const [expanded, setExpanded] = useState(false); // moved above conditional ✅

  if (!isModalOpen) return null;

  const project = projects[projectIndex];

  const handlePrev = () => {
    if (!project.images) return;
    setScreenshotIndex(
      (screenshotIndex - 1 + project.images.length) % project.images.length
    );
  };

  const handleNext = () => {
    if (!project.images) return;
    setScreenshotIndex((screenshotIndex + 1) % project.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
      <div className="bg-[#1e1e1e] p-8 rounded-lg w-[95%] max-w-7xl max-h-[95vh] overflow-auto flex gap-6 relative">
        {/* Close button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <X size={24} />
        </button>

        {/* Left Column */}
        <div className="flex-1 flex flex-col justify-start gap-4">
          <h2 className="text-2xl text-[#dcdcaa] font-bold">{project.title}</h2>

          <div className="text-gray-300 whitespace-pre-line max-h-[250px] overflow-hidden">
            {expanded
              ? project.description
              : `${project.description.slice(0, 250)}...`}
          </div>
          {project.description.length > 250 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[#4ec9b0] hover:underline self-start"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}

          {/* Links */}
          <div className="flex gap-4 mt-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                <Github size={18} /> <span>GitHub</span>
              </a>
            )}
            {project.site && (
              <a
                href={project.site}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#4ec9b0] text-black px-4 py-2 rounded-lg hover:bg-[#3ab49d] transition"
              >
                <ExternalLink size={18} /> <span>Live Preview</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Screenshot carousel */}
        {project.images && project.images.length > 0 && (
          <div className="w-[50%] flex flex-col items-center justify-center relative">
            <div className="w-full rounded-xl border border-[#3c3c3c] p-4 bg-[#121212] shadow-lg relative">
              <div className="w-full h-[300px] bg-black rounded-md overflow-hidden relative flex items-center justify-center shadow-inner">
                {/* Reflection overlay */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-md" />

                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={screenshotIndex}
                    src={project.images[screenshotIndex]}
                    alt={`${project.title} screenshot`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Carousel buttons */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Carousel dots */}
            {project.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setScreenshotIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === screenshotIndex
                        ? "bg-[#4ec9b0] w-5"
                        : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
