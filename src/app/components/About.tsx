"use client";

import React from "react";

interface AboutProps {
  setIsResumeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function About({ setIsResumeOpen }: AboutProps) {
  return (
    <div>
      <span className="text-[#4ec9b0]">gian@portfolio:~$ cat about.txt</span>

      <p className="mt-4 text-gray-300">
        Hi, I’m <span className="text-[#4ec9b0]">Gian Mark Vigo</span> — a
        developer passionate about building modern web apps with clean
        interfaces and interactive experiences.
      </p>

      <button
        onClick={() => setIsResumeOpen(true)}
        className="mt-4 px-4 py-2 bg-[#4ec9b0] text-[#1e1e1e] rounded hover:bg-[#3ecab0]"
      >
        Open Resume
      </button>
    </div>
  );
}
