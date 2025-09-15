import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div>
      <span className="text-[#4ec9b0]">gian@portfolio:~$ cat contact.txt</span>
      <div className="mt-4 space-y-4">
        <a
          href="mailto:vigogianmark@gmail.com"
          className="flex items-center gap-2 text-gray-300 hover:text-[#4ec9b0]"
        >
          <Mail size={18} /> vigogianmark@gmail.com
        </a>
        <a
          href="https://github.com/yunchan29"
          target="_blank"
          className="flex items-center gap-2 text-gray-300 hover:text-[#4ec9b0]"
        >
          <Github size={18} /> github.com/yunchan29
        </a>
        <a
          href="https://www.linkedin.com/in/gian-mark-vigo-99493b294"
          target="_blank"
          className="flex items-center gap-2 text-gray-300 hover:text-[#4ec9b0]"
        >
          <Linkedin size={18} /> linkedin.com/in/gian-mark-vigo-99493b294
        </a>
      </div>
    </div>
  );
}
