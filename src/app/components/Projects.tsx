"use client";

import React from "react";
import ProjectModal from "./ProjectModal";

interface Project {
  title: string;
  description: string;
  link: string;
  screenshots?: string[];
}

interface ProjectsProps {
  projects: Project[];
  projectIndex: number;
  setProjectIndex: (index: number) => void;
  setIsModalOpen: (open: boolean) => void;
  setScreenshotIndex: (index: number) => void;
}

export default function Projects({
  projects,
  projectIndex,
  setProjectIndex,
  setIsModalOpen,
  setScreenshotIndex,
}: ProjectsProps) {
  return (
    <div>
      <span className="text-[#4ec9b0]">gian@portfolio:~$ cat projects.txt</span>
      <div className="ml-4 mt-4 space-y-4">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="border border-[#3c3c3c] p-4 rounded-lg hover:bg-[#252526] cursor-pointer"
            onClick={() => {
              setProjectIndex(idx);
              setIsModalOpen(true);
              setScreenshotIndex(0);
            }}
          >
            <h3 className="text-[#dcdcaa] font-bold">{proj.title}</h3>
            <p className="text-gray-400">{proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
