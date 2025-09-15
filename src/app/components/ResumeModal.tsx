// ResumeModal.tsx
"use client";

import React from "react";
import { X } from "lucide-react";

interface ResumeModalProps {
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
}

export default function ResumeModal({ isResumeOpen, setIsResumeOpen }: ResumeModalProps) {
  if (!isResumeOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-lg w-[90%] max-w-2xl relative">
        <button
          onClick={() => setIsResumeOpen(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl text-[#dcdcaa] font-bold mb-4">
          My Resume
        </h2>
        <iframe
          src="/Gian_Mark_Vigo_Resume_Latest.pdf"
          className="w-full h-[70vh] border border-[#3c3c3c] rounded"
        />
      </div>
    </div>
  );
}
